export const heritageSites = [
  {
    id: 'shaniwar_wada',
    name: 'Shaniwar Wada',
    location: 'Pune, Maharashtra, India',
    coordinates: { lat: 18.5196, lng: 73.8553 },
    eraBuilt: '1732 CE (Peshwa Bajirao I)',
    architectureStyle: 'Maratha Imperial Military & Timber Architecture',
    shortDescription: 'The grand seven-story fortification seat of the Peshwas of the Maratha Empire.',
    longDescription: 'Constructed in 1732 as the seat of the Peshwa prime ministers of the Maratha Empire, Shaniwar Wada stands as a symbol of Maratha pride and military valor. Known for its colossal Dilli Darwaza gate, wooden bastions, lotus-shaped fountain, and mysterious fires that engulfed the palace in 1828.',
    colorTheme: '#c05c46',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#1c2541',
        description: 'Preserved stone ramparts, Dilli Darwaza, garden manicured foundations, and heritage light shows.',
        ambientSound: 'wind'
      },
      {
        id: 'golden_era',
        name: 'Peshwa Golden Era',
        year: '1740 CE',
        skyColor: '#3a2414',
        description: 'Pristine 7-story teakwood palace structure, royal Maratha saffron flags flying, guards at Dilli Darwaza.',
        ambientSound: 'sitar'
      },
      {
        id: 'great_fire',
        name: 'The Great Fire of 1828',
        year: '1828 CE',
        skyColor: '#4a1505',
        description: 'The tragic night fire that burned the timber palace for seven days, leaving the stone foundations intact.',
        ambientSound: 'fire'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'The Foundation by Bajirao I',
        summary: 'Peshwa Bajirao I laid the foundation stone on a Saturday in 1730.',
        narration: 'Namaste! Step back into 1730. Peshwa Bajirao I, the unvanquished military commander of the Maratha Empire, selected this auspicious site near the Mutha River. The foundation stone was laid on a Saturday — giving it the name Shaniwar Wada.',
        hotspotId: 'dilli_gate'
      },
      {
        id: 'c2',
        title: 'Impenetrable Dilli Darwaza',
        summary: 'The main entrance gate designed with steel spikes to deter war elephants.',
        narration: 'Look closely at the massive teak doors of Dilli Darwaza! Notice the 72 iron spikes set at eye level for elephants. This gate faced north toward Delhi, symbolizing the Maratha ambition to influence imperial politics.',
        hotspotId: 'dilli_gate'
      },
      {
        id: 'c3',
        title: 'The Hazari Karanja Lotus Fountain',
        summary: 'A breathtaking 16-petal lotus fountain that shot a thousand jet streams.',
        narration: 'Behold the Hazari Karanja! In the 18th century, this intricate 16-petal lotus fountain was an engineering marvel. Driven by gravity fed aqueducts, it spurted a thousand delicate streams of water for royal celebrations.',
        hotspotId: 'fountain'
      },
      {
        id: 'c4',
        title: 'The Mysterious Fire & Present Legacy',
        summary: 'How a 7-day fire transformed the wooden palace into timeless stone ruins.',
        narration: 'In February 1828, a sudden inferno raged for seven days, destroying the intricate carved wooden stories. Today, the majestic stone basements remain as eternal testaments to Maratha resilience.',
        hotspotId: 'bastion'
      }
    ],
    hotspots: [
      {
        id: 'dilli_gate',
        title: 'Dilli Darwaza (Delhi Gate)',
        position: [0, 4, -12],
        category: 'Architecture',
        icon: 'Shield',
        description: 'Imposing main gate reinforced with 72 sharp iron spikes to resist war elephant battering rams.',
        artifactId: 'maratha_sword'
      },
      {
        id: 'fountain',
        title: 'Hazari Karanja Fountain',
        position: [0, 0.5, 2],
        category: 'Archaeology',
        icon: 'Sparkles',
        description: '16-petal lotus fountain built for Peshwa Madhavrao, famous for its thousand water jets.',
        artifactId: 'lotus_aqueduct'
      },
      {
        id: 'bastion',
        title: 'Narayanrao Bastion & Ramparts',
        position: [-10, 5, -5],
        category: 'Hidden Story',
        icon: 'Crown',
        description: 'Fortified stone ramparts providing panoramic surveillance across old Pune city.',
        artifactId: 'peshwa_seal'
      }
    ],
    artifacts: [
      {
        id: 'maratha_sword',
        name: 'Maratha Khanda Sword',
        era: '18th Century',
        description: 'Double-edged broadsword featuring a spike pommel used by Maratha cavalry troopers under Bajirao I.',
        shape3d: 'sword'
      },
      {
        id: 'lotus_aqueduct',
        name: 'Terracotta Water Conduit Tile',
        era: '1750 CE',
        description: 'Gravity-assisted subterranean pipe tile used to supply pressurized water to Hazari Karanja.',
        shape3d: 'pipe'
      },
      {
        id: 'peshwa_seal',
        name: 'Royal Peshwa Copper Coin & Seal',
        era: '1760 CE',
        description: 'Official seal bearing Devanagari script used for imperial royal decrees across India.',
        shape3d: 'coin'
      }
    ],
    quiz: [
      {
        question: 'Who laid the foundation of Shaniwar Wada in 1730?',
        options: ['Shivaji Maharaj', 'Peshwa Bajirao I', 'Madhavrao Peshwa', 'Balaji Vishwanath'],
        correct: 1,
        explanation: 'Peshwa Bajirao I laid the foundation of Shaniwar Wada on January 10, 1730.'
      },
      {
        question: 'Why were 72 iron spikes installed on Dilli Darwaza?',
        options: ['Decorative art', 'To prevent war elephant rams', 'To hold oil lamps', 'To catch enemy arrows'],
        correct: 1,
        explanation: 'Iron spikes prevented enemy war elephants from charge-battering the heavy wooden gates.'
      },
      {
        question: 'What does "Hazari Karanja" mean?',
        options: ['Thousand-Jet Fountain', 'Golden Court', 'Seven-Story Tower', 'Royal Garden'],
        correct: 0,
        explanation: 'Hazari Karanja translates to "Fountain of a Thousand Streams".'
      }
    ]
  },

  {
    id: 'kailasa_ellora',
    name: 'Ellora Caves (Kailasa Temple)',
    location: 'Verul, Chhatrapati Sambhajinagar, Maharashtra',
    coordinates: { lat: 20.0268, lng: 75.1780 },
    eraBuilt: '8th Century CE (Rashtrakuta King Krishna I)',
    architectureStyle: 'Monolithic Rock-Cut Dravidian Architecture',
    shortDescription: 'The largest single monolithic rock excavation in the world, carved top to bottom from solid basalt cliff.',
    longDescription: 'Cave 16 at Ellora, the Kailasa Temple, is an unmatched wonder of human engineering. Master sculptors extracted over 200,000 tons of rock starting from the cliff top down to carve a full multi-story Dravidian temple complex complete with life-size carved elephants and Ramayana relief panels.',
    colorTheme: '#dfb15b',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#111827',
        description: 'World Heritage basalt monument with visiting pilgrims, preserved carved monolithic structures.',
        ambientSound: 'bell'
      },
      {
        id: 'golden_era',
        name: 'Rashtrakuta Carving Era',
        year: '760 CE',
        skyColor: '#2b1d0c',
        description: 'Master artisans with chisels, glowing white plaster coatings, active chanting priests in sanctum.',
        ambientSound: 'chant'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Top-Down Carving Miracle',
        summary: 'Sculptors carved the entire temple downward out of a vertical basalt hill.',
        narration: 'Welcome to Cave 16! Unlike modern buildings constructed bottom-up, ancient Indian artisans carved Kailasa Temple top-down into a single giant mountain of solid basalt rock. No scaffolding room, no mistakes permitted!',
        hotspotId: 'top_sanctum'
      },
      {
        id: 'c2',
        title: 'The Great Elephant Courtyard',
        summary: 'Life-sized monolithic carved elephants guarding the sacred central hall.',
        narration: 'Walk into the open courtyard. Observe these majestic life-sized stone elephants sculpted directly out of the mountain base. They appear to bear the weight of the entire temple temple on their shoulders.',
        hotspotId: 'elephants'
      },
      {
        id: 'c3',
        title: 'Ravana Shaking Mount Kailash',
        summary: 'Intricate relief panel depicting Ravana attempting to lift Lord Shiva’s mountain.',
        narration: 'Look at this masterwork relief sculpture! It depicts the demon king Ravana attempting to lift Mount Kailash, while Goddess Parvati clings to Lord Shiva, who calmly presses his toe down to anchor the universe.',
        hotspotId: 'ravana_panel'
      }
    ],
    hotspots: [
      {
        id: 'top_sanctum',
        title: 'Shikhara Tower Peak',
        position: [0, 8, -6],
        category: 'Architecture',
        icon: 'Sparkles',
        description: 'The 30-meter high Dravidian pyramid tower carved starting from the mountain cliff summit.',
        artifactId: 'chisel_tool'
      },
      {
        id: 'elephants',
        title: 'Monolithic Elephant Frieze',
        position: [-6, 2, 0],
        category: 'Archaeology',
        icon: 'Crown',
        description: 'Row of giant carved stone elephants supporting the main mandapa basement structure.',
        artifactId: 'basalt_carving'
      },
      {
        id: 'ravana_panel',
        title: 'Ravana Anugraha Panel',
        position: [6, 3, -4],
        category: 'Hidden Story',
        icon: 'Shield',
        description: 'World-famous sculpture showcasing dynamic tension, emotion, and fluid stone relief work.',
        artifactId: 'ancient_inscription'
      }
    ],
    artifacts: [
      {
        id: 'chisel_tool',
        name: 'Ancient Iron Chisel & Hammer',
        era: '8th Century CE',
        description: 'Hand-forged iron chisels used by Rashtrakuta sculptors to carve 200,000 tons of rock.',
        shape3d: 'tool'
      },
      {
        id: 'basalt_carving',
        name: 'Miniature Carved Elephant Votive',
        era: '770 CE',
        description: 'Polished basalt miniature sculpture demonstrating the smooth finishing technique.',
        shape3d: 'statue'
      },
      {
        id: 'ancient_inscription',
        name: 'Kannada & Sanskrit Copper Plate Seal',
        era: '768 CE',
        description: 'Inscription recording King Krishna I’s astonishment: "Oh, how did I make it!"',
        shape3d: 'plate'
      }
    ],
    quiz: [
      {
        question: 'Which dynasty commissioned the Kailasa Temple at Ellora?',
        options: ['Mughal Empire', 'Rashtrakuta Dynasty', 'Chola Empire', 'Gupta Empire'],
        correct: 1,
        explanation: 'King Krishna I of the Rashtrakuta Dynasty commissioned the Kailasa Temple in the 8th century.'
      },
      {
        question: 'What makes the engineering of Kailasa Temple unique?',
        options: ['It was assembled from marble bricks', 'It was carved top-to-bottom from a single rock', 'It was built under water', 'It has no foundation'],
        correct: 1,
        explanation: 'It was excavated top-down directly from a cliff of solid basalt rock.'
      }
    ]
  },

  {
    id: 'taj_mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh, India',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    eraBuilt: '1632–1653 CE (Mughal Emperor Shah Jahan)',
    architectureStyle: 'Mughal Marble Architecture & Pietra Dura Inlay',
    shortDescription: 'The ivory-white marble mausoleum on the Yamuna riverbank, an eternal monument of love.',
    longDescription: 'Commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his favorite wife Mumtaz Mahal, the Taj Mahal is globally celebrated for its perfect symmetry, bulbous onion dome, four tilt-engineered minarets, and intricate floral pietra dura gemstone inlays.',
    colorTheme: '#f7d88c',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#0f172a',
        description: 'Pristine white marble gleaming under sky, reflecting pools surrounded by cypress gardens.',
        ambientSound: 'wind'
      },
      {
        id: 'construction_era',
        name: '1640 Construction Era',
        year: '1640 CE',
        skyColor: '#362312',
        description: 'Thousands of artisans, bamboo scaffolding around onion dome, ox carts bringing Rajasthan marble.',
        ambientSound: 'sitar'
      },
      {
        id: 'moonlight',
        name: 'Moonlit Yamuna Night',
        year: '1653 CE',
        skyColor: '#030712',
        description: 'Silvery glowing translucent marble reflecting under full moon and Yamuna river mist.',
        ambientSound: 'water'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Pinnacle of Mughal Symmetry',
        summary: 'Designed around mathematical harmony and optical perfection.',
        narration: 'Greetings! Stand before the Taj Mahal. Notice the absolute bilateral symmetry. Every element — from the four minarets to the cypress trees — mirrors its counterpart, creating perfect aesthetic harmony.',
        hotspotId: 'main_dome'
      },
      {
        id: 'c2',
        title: 'Pietra Dura Gemstone Artistry',
        summary: 'Semi-precious lapis lazuli, jade, and jasper inlaid into white Makrana marble.',
        narration: 'Examine the marble walls up close! Artisans used Parchin Kari (Pietra Dura), inlaying thousands of tiny semi-precious stones — lapis lazuli, turquoise, carnelian, and jade — into intricate floral motifs.',
        hotspotId: 'marble_inlay'
      },
      {
        id: 'c3',
        title: 'Minarets Engineered for Safety',
        summary: 'Minarets slightly tilted outward to protect the central dome from earthquakes.',
        narration: 'Observe the four 40-meter minarets. They were deliberately engineered with a slight outward tilt so that in the event of an earthquake, they would fall away from the sacred tomb.',
        hotspotId: 'minaret'
      }
    ],
    hotspots: [
      {
        id: 'main_dome',
        title: 'Central Onion Dome',
        position: [0, 9, -10],
        category: 'Architecture',
        icon: 'Sparkles',
        description: 'The 35-meter high lotus-motif marble dome topped with a gilded brass finial.',
        artifactId: 'makrana_marble'
      },
      {
        id: 'marble_inlay',
        title: 'Parchin Kari Floral Wall',
        position: [-3, 2, -5],
        category: 'Archaeology',
        icon: 'Crown',
        description: 'Exquisite inlaid floral arabesques crafted with 28 varieties of semi-precious gemstones.',
        artifactId: 'pietra_gem'
      },
      {
        id: 'minaret',
        title: 'Outward-Tilted Minaret',
        position: [9, 6, -10],
        category: 'Hidden Story',
        icon: 'Shield',
        description: 'Three-story minaret tilted 2 degrees outward as an anti-seismic protective measure.',
        artifactId: 'mughal_coin'
      }
    ],
    artifacts: [
      {
        id: 'makrana_marble',
        name: 'Translucent Makrana Marble Tile',
        era: '1635 CE',
        description: 'High-grade white marble quarried from Rajasthan that glows under moonlight.',
        shape3d: 'block'
      },
      {
        id: 'pietra_gem',
        name: 'Lapis Lazuli & Jade Inlay Gemstone',
        era: '1642 CE',
        description: 'Polished semi-precious gems carved into delicate flower petal shapes.',
        shape3d: 'gem'
      },
      {
        id: 'mughal_coin',
        name: 'Gold Mohur of Shah Jahan',
        era: '1648 CE',
        description: 'Pure gold currency coin issued during Shah Jahan’s golden architectural reign.',
        shape3d: 'coin'
      }
    ],
    quiz: [
      {
        question: 'Which Mughal Emperor commissioned the Taj Mahal?',
        options: ['Akbar', 'Shah Jahan', 'Babur', 'Aurangzeb'],
        correct: 1,
        explanation: 'Shah Jahan built the Taj Mahal in memory of Mumtaz Mahal.'
      },
      {
        question: 'Why are the minarets slightly tilted outward?',
        options: ['Architectural flaw', 'To fall away from central dome during earthquakes', 'To catch river wind', 'For acoustic echo'],
        correct: 1,
        explanation: 'The outward tilt ensures that during seismic events, minarets fall outward, protecting the central tomb.'
      }
    ]
  },

  {
    id: 'ajanta_caves',
    name: 'Ajanta Caves',
    location: 'Chhatrapati Sambhajinagar, Maharashtra, India',
    coordinates: { lat: 20.5519, lng: 75.7033 },
    eraBuilt: '2nd Century BCE – 5th Century CE',
    architectureStyle: 'Ancient Rock-Cut Buddhist Cave Monasteries & Murals',
    shortDescription: '30 rock-cut Buddhist cave monuments famous for world-renowned ancient fresco paintings like Padmapani.',
    longDescription: 'Carved into a horseshoe-shaped cliff along the Waghora River, the Ajanta Caves represent the pinnacle of ancient Indian painting and Buddhist rock-cut architecture. Famous for master murals depicting Jataka tales, Bodhisattva Padmapani, and arched Chaitya halls.',
    colorTheme: '#1f4e5b',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#0b132b',
        description: 'Preserved cave sanctuaries glowing under specialized fiber-optic preservation lights.',
        ambientSound: 'chant'
      },
      {
        id: 'gupta_era',
        name: 'Vakataka Golden Era',
        year: '475 CE',
        skyColor: '#2b1a0a',
        description: 'Monks meditating in Viharas, oil lamps illuminating vivid murals of Bodhisattva Padmapani.',
        ambientSound: 'bell'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Horseshoe Gorge Discovery',
        summary: 'Hidden in a dense forested ravine until rediscovered in 1819.',
        narration: 'Step inside Cave 19! For centuries, these 30 caves lay hidden under thick jungle vines along the Waghora river canyon until British officer John Smith stumbled upon Cave 10 during a tiger hunt in 1819.',
        hotspotId: 'chaitya_arch'
      },
      {
        id: 'c2',
        title: 'Bodhisattva Padmapani Mural',
        summary: 'The iconic painting of compassion holding a blue lotus flower.',
        narration: 'Look upon the masterpiece painting of Bodhisattva Padmapani! Painted over 1,500 years ago using natural mineral pigments, notice the subtle shading, graceful tilt of the head, and serene blue lotus in hand.',
        hotspotId: 'padmapani'
      }
    ],
    hotspots: [
      {
        id: 'chaitya_arch',
        title: 'Chaitya Horseshoe Arch',
        position: [0, 5, -8],
        category: 'Architecture',
        icon: 'Sparkles',
        description: 'Ribbed stone ceiling mimicking wooden barrel vaults with central Stupa sanctuary.',
        artifactId: 'stupa_relic'
      },
      {
        id: 'padmapani',
        title: 'Padmapani Fresco Wall',
        position: [-5, 3, -3],
        category: 'Archaeology',
        icon: 'Crown',
        description: 'Vibrant tempera fresco painting depicting Lord Buddha’s boundless compassion.',
        artifactId: 'pigment_bowl'
      }
    ],
    artifacts: [
      {
        id: 'stupa_relic',
        name: 'Carved Terracotta Relic Casket',
        era: '5th Century CE',
        description: 'Miniature stupa casket found inside cave sanctuary niches.',
        shape3d: 'statue'
      },
      {
        id: 'pigment_bowl',
        name: 'Natural Lapis & Ochre Pigment Vessel',
        era: '480 CE',
        description: 'Earthen bowl used by ancient painters to mix vegetable dyes and mineral powders.',
        shape3d: 'block'
      }
    ],
    quiz: [
      {
        question: 'What river canyon surrounds the Ajanta Caves?',
        options: ['Ganga', 'Waghora', 'Godavari', 'Narmada'],
        correct: 1,
        explanation: 'Ajanta Caves are carved into a horseshoe cliff along the Waghora River.'
      }
    ]
  },

  {
    id: 'red_fort',
    name: 'Red Fort (Lal Qila)',
    location: 'Old Delhi, India',
    coordinates: { lat: 28.6562, lng: 77.2410 },
    eraBuilt: '1639–1648 CE (Shah Jahan)',
    architectureStyle: 'Mughal Red Sandstone Citadel Architecture',
    shortDescription: 'The majestic red sandstone fortress palace seat of Shahjahanabad, symbol of Indian independence.',
    longDescription: 'Built when Shah Jahan shifted his capital from Agra to Delhi, the Red Fort features octagonal sandstone walls, Lahori Gate, Diwan-i-Aam (Hall of Public Audience), and Diwan-i-Khas. Today, it stands as the venue where India’s Prime Minister hoists the national tricolor every Independence Day.',
    colorTheme: '#9b2335',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#1c2541',
        description: 'National monument waving the Indian Tricolor flag above Lahori Gate ramparts.',
        ambientSound: 'wind'
      },
      {
        id: 'mughal_peak',
        name: 'Shahjahanabad Court',
        year: '1650 CE',
        skyColor: '#3d1b10',
        description: 'Peacock Throne in Diwan-i-Khas, royal silk canopies, Stream of Paradise canal flowing with water.',
        ambientSound: 'sitar'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'The Lahori Gate Ramparts',
        summary: 'The main entrance fortress gate and Indian national freedom symbol.',
        narration: 'Welcome to the Red Fort! Towering before you is Lahori Gate, crafted from rich red sandstone quarried in Rajasthan. On August 15, 1947, India’s first Prime Minister Jawaharlal Nehru hoisted the national flag right here.',
        hotspotId: 'lahori_gate'
      },
      {
        id: 'c2',
        title: 'Nahr-i-Bihisht (Stream of Paradise)',
        summary: 'Subterranean marble canal that cooled the royal palace pavilions.',
        narration: 'Step into Diwan-i-Khas! Running through the center of these white marble halls was the Nahr-i-Bihisht (Stream of Paradise), a continuous marble canal supplied by water from the Yamuna River.',
        hotspotId: 'diwan_khas'
      }
    ],
    hotspots: [
      {
        id: 'lahori_gate',
        title: 'Lahori Gate & Chhatris',
        position: [0, 6, -12],
        category: 'Architecture',
        icon: 'Shield',
        description: 'Octagonal towers crowned with domed chhatris guarding the fort entrance.',
        artifactId: 'sandstone_block'
      },
      {
        id: 'diwan_khas',
        title: 'Diwan-i-Khas Inlay Pillars',
        position: [0, 3, 0],
        category: 'Archaeology',
        icon: 'Crown',
        description: 'Hall of Private Audience where the legendary jeweled Peacock Throne once stood.',
        artifactId: 'peacock_feather'
      }
    ],
    artifacts: [
      {
        id: 'sandstone_block',
        name: 'Red Sandstone Fortification Ashlar',
        era: '1640 CE',
        description: 'Durable iron-rich red sandstone block quarried from Bharatpur.',
        shape3d: 'block'
      },
      {
        id: 'peacock_feather',
        name: 'Gilded Enamel Peacock Plaque',
        era: '1650 CE',
        description: 'Fragment depicting the golden peacock feathers from Shah Jahan’s throne.',
        shape3d: 'gem'
      }
    ],
    quiz: [
      {
        question: 'Which gate of Red Fort is famous for the annual Independence Day flag hoisting?',
        options: ['Delhi Gate', 'Lahori Gate', 'Kashmiri Gate', 'Ajmeri Gate'],
        correct: 1,
        explanation: 'Lahori Gate is the iconic location of the national flag hoisting ceremony.'
      }
    ]
  },

  {
    id: 'gateway_india',
    name: 'Gateway of India',
    location: 'Apollo Bunder, Mumbai, Maharashtra, India',
    coordinates: { lat: 18.9220, lng: 72.8347 },
    eraBuilt: '1911–1924 CE (George Wittet)',
    architectureStyle: 'Indo-Saracenic Revival Architecture',
    shortDescription: 'The iconic basalt arch monument overlooking the Arabian Sea at Mumbai harbour.',
    longDescription: 'Erected to commemorate the landing of King George V and Queen Mary at Mumbai in 1911, the Gateway of India combines Roman triumph arch elements with 16th-century Gujarati Islamic lattice and dome motifs. It also marked the formal exit point of British troops in 1948.',
    colorTheme: '#e67e22',
    timeEras: [
      {
        id: 'present',
        name: 'Present Day',
        year: '2026 CE',
        skyColor: '#0f172a',
        description: 'Bustling waterfront promenade with sea breezes, ferries, Taj Mahal Palace Hotel backdrop.',
        ambientSound: 'water'
      },
      {
        id: 'historical_exit',
        name: '1948 British Troop Exit',
        year: '1948 CE',
        skyColor: '#2b1e10',
        description: 'First Battalion Somerset Light Infantry marching through the arch onto ships leaving India forever.',
        ambientSound: 'wind'
      }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Triumphal Arch on the Arabian Sea',
        summary: 'Designed by George Wittet combining Roman arch and Gujarati carvings.',
        narration: 'Namaste! Welcome to Mumbai’s waterfront landmark, the Gateway of India. Built from yellow basalt stone, this 26-meter high arch blends Roman victory design with intricate traditional Indian Jali fretwork.',
        hotspotId: 'arch_peak'
      },
      {
        id: 'c2',
        title: 'The Portal of Departure',
        summary: 'Where the last British troops departed India on February 28, 1948.',
        narration: 'Look through the central arch toward the open Arabian Sea! On February 28, 1948, the last British military regiment marched through this arch onto ships, marking the end of colonial rule in independent India.',
        hotspotId: 'sea_water'
      }
    ],
    hotspots: [
      {
        id: 'arch_peak',
        title: 'Central Basalt Dome & Turrets',
        position: [0, 8, -8],
        category: 'Architecture',
        icon: 'Sparkles',
        description: '26-meter high arch surmounted by four turrets and intricate stone lattice Jali screens.',
        artifactId: 'basalt_stone'
      },
      {
        id: 'sea_water',
        title: 'Arabian Sea Promenade Jetty',
        position: [0, 0.5, 4],
        category: 'Hidden Story',
        icon: 'Shield',
        description: 'Historic landing stage where ocean liners once docked.',
        artifactId: 'commemorative_medal'
      }
    ],
    artifacts: [
      {
        id: 'basalt_stone',
        name: 'Kharodi Yellow Basalt Block',
        era: '1920 CE',
        description: 'Locally quarried yellow basalt stone resistant to marine salt weathering.',
        shape3d: 'block'
      },
      {
        id: 'commemorative_medal',
        name: '1911 Royal Visit Silver Medal',
        era: '1911 CE',
        description: 'Silver medal commemorating the foundation stone laying of Apollo Bunder.',
        shape3d: 'coin'
      }
    ],
    quiz: [
      {
        question: 'In which year did the last British troops depart India through the Gateway of India?',
        options: ['1947', '1948', '1950', '1945'],
        correct: 1,
        explanation: 'The last British troops departed through the Gateway of India on February 28, 1948.'
      }
    ]
  }
];
