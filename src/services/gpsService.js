// HeritageQuest Live GPS & Geolocation Service
// Formats high-precision coordinates (Latitude / Longitude) inspired by SIH reference platform
// Computes Haversine great-circle distances to the 8 heritage monuments and identifies nearest sites

export const GPS_PRESETS = [
  {
    id: 'agra-taj',
    name: 'Agra (Taj Mahal)',
    state: 'Uttar Pradesh',
    lat: 27.175144,
    lng: 78.042142,
    monumentId: 'taj-mahal'
  },
  {
    id: 'mysore-palace',
    name: 'Mysuru (Mysore Palace)',
    state: 'Karnataka',
    lat: 12.305163,
    lng: 76.655184,
    monumentId: 'mysore-palace'
  },
  {
    id: 'konark-suntemple',
    name: 'Konark (Sun Temple)',
    state: 'Odisha',
    lat: 19.887600,
    lng: 86.094500,
    monumentId: 'konark-sun-temple'
  },
  {
    id: 'mumbai-gateway',
    name: 'Mumbai (Gateway of India)',
    state: 'Maharashtra',
    lat: 18.921984,
    lng: 72.834654,
    monumentId: 'gateway-of-india'
  },
  {
    id: 'thanjavur-brihadisvara',
    name: 'Thanjavur (Brihadisvara Temple)',
    state: 'Tamil Nadu',
    lat: 10.782800,
    lng: 79.131800,
    monumentId: 'brihadisvara-temple'
  },
  {
    id: 'sanchi-stupa',
    name: 'Sanchi (Great Stupa)',
    state: 'Madhya Pradesh',
    lat: 23.479500,
    lng: 77.739700,
    monumentId: 'sanchi-stupa'
  },
  {
    id: 'jaipur-hawamahal',
    name: 'Jaipur (Hawa Mahal)',
    state: 'Rajasthan',
    lat: 26.923900,
    lng: 75.826700,
    monumentId: 'hawa-mahal'
  },
  {
    id: 'kolkata-victoria',
    name: 'Kolkata (Victoria Memorial)',
    state: 'West Bengal',
    lat: 22.544800,
    lng: 88.342600,
    monumentId: 'victoria-memorial'
  }
];

export function formatLatitude(lat) {
  if (typeof lat !== 'number' || isNaN(lat)) return '0.000000° N';
  const hemisphere = lat >= 0 ? 'N' : 'S';
  return `${Math.abs(lat).toFixed(6)}° ${hemisphere}`;
}

export function formatLongitude(lng) {
  if (typeof lng !== 'number' || isNaN(lng)) return '0.000000° E';
  const hemisphere = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lng).toFixed(6)}° ${hemisphere}`;
}

// Format coordinates into traditional Degrees, Minutes, Seconds (DMS)
export function formatDMS(deg, isLat = true) {
  if (typeof deg !== 'number' || isNaN(deg)) return '0° 0\' 0"';
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  const direction = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W');
  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
}

// Haversine formula to compute great-circle distance between two GPS coordinates in kilometers
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Computes compass bearing from point 1 to point 2 in degrees (0 = North, 90 = East, etc.)
export function calculateBearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin((lon2 - lon1) * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos((lon2 - lon1) * (Math.PI / 180));
  const bearing = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
  return Math.round(bearing);
}

export function findNearestMonument(userLat, userLng, monuments = []) {
  if (!monuments || monuments.length === 0) return null;

  let nearest = null;
  let minDistance = Infinity;

  monuments.forEach((m) => {
    if (!m.coordinates || m.coordinates.length < 2) return;
    const dist = calculateDistanceKm(userLat, userLng, m.coordinates[0], m.coordinates[1]);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = {
        ...m,
        distanceKm: dist,
        bearing: calculateBearing(userLat, userLng, m.coordinates[0], m.coordinates[1])
      };
    }
  });

  return nearest;
}

class HeritageGPSService {
  constructor() {
    this.watchId = null;
    this.subscribers = new Set();
    // Default to Agra (Taj Mahal)
    this.currentPosition = {
      lat: 27.175144,
      lng: 78.042142,
      accuracy: 12,
      altitude: 171,
      isLive: false,
      presetLabel: 'Agra (Taj Mahal)',
      timestamp: Date.now()
    };
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.currentPosition);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.currentPosition));
  }

  // Request high-accuracy live browser/device GPS coordinates
  requestLiveLocation() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.currentPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy || 10),
          altitude: Math.round(pos.coords.altitude || 160),
          isLive: true,
          presetLabel: 'Live Geolocation',
          timestamp: pos.timestamp || Date.now()
        };
        this.notifySubscribers();
      },
      (err) => {
        console.warn('Live GPS lookup declined or unavailable, maintaining preset:', err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  // Start continuous GPS stream watch
  startWatching() {
    if (typeof window === 'undefined' || !navigator.geolocation || this.watchId) return;

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        this.currentPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy || 8),
          altitude: Math.round(pos.coords.altitude || 160),
          isLive: true,
          presetLabel: 'Live GPS Satellite Stream',
          timestamp: pos.timestamp || Date.now()
        };
        this.notifySubscribers();
      },
      (err) => console.warn('GPS Watch warning:', err.message),
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000
      }
    );
  }

  stopWatching() {
    if (this.watchId && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Set simulated position from curated presets
  setPreset(presetId) {
    const preset = GPS_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    this.stopWatching();
    this.currentPosition = {
      lat: preset.lat,
      lng: preset.lng,
      accuracy: 5,
      altitude: 168,
      isLive: false,
      presetLabel: preset.name,
      monumentId: preset.monumentId,
      timestamp: Date.now()
    };
    this.notifySubscribers();
  }
}

export const gpsService = new HeritageGPSService();
