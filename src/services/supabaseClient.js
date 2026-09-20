// HeritageQuest Supabase Auth & Database Service (with Audit Trail & Offline Resilience)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('hq_supabase_url') || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('hq_supabase_anon_key') || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Configure Supabase credentials dynamically
 */
export function setSupabaseConfig(url, key) {
  if (url && key) {
    localStorage.setItem('hq_supabase_url', url);
    localStorage.setItem('hq_supabase_anon_key', key);
    window.location.reload();
  }
}

/**
 * Register user with Email & Password
 */
export async function signUpWithEmail(email, password, userName = 'Cultural Explorer') {
  if (!isSupabaseConfigured || !supabase) {
    // Local fallback account creation
    const localUser = {
      id: 'local-' + Date.now(),
      email,
      user_metadata: { full_name: userName },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('hq_user_session', JSON.stringify(localUser));
    await logUserAction({
      action_type: 'signup',
      details: `User registered via offline fallback (${email})`
    });
    return { data: { user: localUser }, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: userName }
    }
  });

  if (!error && data?.user) {
    await syncUserProfile({
      id: data.user.id,
      email,
      user_name: userName
    });
    await logUserAction({
      userId: data.user.id,
      action_type: 'signup',
      details: `User registered with email ${email}`
    });
  }

  return { data, error };
}

/**
 * Login user with Email & Password
 */
export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured || !supabase) {
    const localUser = {
      id: 'local-' + Date.now(),
      email,
      user_metadata: { full_name: email.split('@')[0] },
      created_at: new Date().toISOString()
    };
    localStorage.setItem('hq_user_session', JSON.stringify(localUser));
    await logUserAction({
      action_type: 'login',
      details: `User logged in via offline fallback (${email})`
    });
    return { data: { user: localUser }, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error && data?.user) {
    await logUserAction({
      userId: data.user.id,
      action_type: 'login',
      details: `User logged in (${email})`
    });
  }

  return { data, error };
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  if (!isSupabaseConfigured || !supabase) {
    const localUser = {
      id: 'google-local-' + Date.now(),
      email: 'explorer@heritagequest.org',
      user_metadata: { full_name: 'Google Traveler' }
    };
    localStorage.setItem('hq_user_session', JSON.stringify(localUser));
    return { data: { user: localUser }, error: null };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  return { data, error };
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  localStorage.removeItem('hq_user_session');
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
}

/**
 * Get current active user session
 */
export async function getCurrentUser() {
  if (isSupabaseConfigured && supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return user;
  }
  const saved = localStorage.getItem('hq_user_session');
  return saved ? JSON.parse(saved) : null;
}

/**
 * Sync user profile (points, badges, visited monuments) to Supabase Database
 */
export async function syncUserProfile(profileData) {
  if (!profileData || !profileData.id) return;
  if (!isSupabaseConfigured || !supabase) {
    localStorage.setItem('hq_user_profile_sync', JSON.stringify(profileData));
    return;
  }

  try {
    const { error } = await supabase.from('profiles').upsert(
      {
        id: profileData.id,
        email: profileData.email,
        user_name: profileData.user_name || 'Cultural Explorer',
        points: profileData.points || 100,
        unlocked_badges: profileData.unlocked_badges || ['history_explorer'],
        visited_monuments: profileData.visited_monuments || ['taj-mahal'],
        updated_at: new Date().toISOString()
      },
      { onConflict: 'id' }
    );
    if (error) console.warn('Supabase Profile Sync Warning:', error.message);
  } catch (err) {
    console.warn('Supabase profile sync fallback:', err);
  }
}

/**
 * Log user action to Database Audit Trail (Issue 5)
 */
export async function logUserAction({ userId, action_type, monument_id, character_name, details }) {
  const timestamp = new Date().toISOString();
  const auditEntry = {
    user_id: userId || 'anonymous',
    action_type,
    monument_id: monument_id || null,
    character_name: character_name || null,
    details: details || '',
    created_at: timestamp
  };

  // Local audit trail logging
  const existingAudit = JSON.parse(localStorage.getItem('hq_audit_logs') || '[]');
  localStorage.setItem('hq_audit_logs', JSON.stringify([auditEntry, ...existingAudit.slice(0, 99)]));

  // Supabase Database audit table insert
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('user_audit_logs').insert([auditEntry]);
    } catch (err) {
      console.warn('Supabase audit log fallback:', err);
    }
  }
}

/**
 * Fetch audit trail logs
 */
export async function fetchUserAuditLogs() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('user_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data) return data;
    } catch (e) {}
  }
  return JSON.parse(localStorage.getItem('hq_audit_logs') || '[]');
}
