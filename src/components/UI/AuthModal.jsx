import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Shield, Key, History, Check, AlertCircle, LogOut, Lock } from 'lucide-react';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  fetchUserAuditLogs,
  isSupabaseConfigured,
  setSupabaseConfig
} from '../../services/supabaseClient';

export function AuthModal({ isOpen, onClose, currentUser, onUserChange }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup', 'audit', 'settings'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [persona, setPersona] = useState('explorer');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Supabase Config Inputs
  const [supabaseUrlInput, setSupabaseUrlInput] = useState('');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'audit') {
      setLoadingLogs(true);
      fetchUserAuditLogs().then((logs) => {
        setAuditLogs(logs);
        setLoadingLogs(false);
      });
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const { data, error } = await signInWithEmail(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Successfully authenticated!');
      if (onUserChange && data?.user) onUserChange(data.user);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const { data, error } = await signUpWithEmail(email, password, userName || 'Cultural Explorer');
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Account registered successfully!');
      if (onUserChange && data?.user) onUserChange(data.user);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    const { data, error } = await signInWithGoogle();
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else if (data?.user) {
      setSuccessMsg('Signed in with Google!');
      if (onUserChange) onUserChange(data.user);
      setTimeout(() => onClose(), 1200);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    if (onUserChange) onUserChange(null);
    setSuccessMsg('Logged out.');
    setTimeout(() => onClose(), 1000);
  };

  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault();
    if (supabaseUrlInput && supabaseKeyInput) {
      setSupabaseConfig(supabaseUrlInput, supabaseKeyInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#090c15] border-2 border-[#dfba73]/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#dfba73]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#dfba73] to-[#c25e36] text-[#060913]">
              <Shield className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Cinzel'] text-white">
                HeritageQuest Passport &amp; Auth
              </h3>
              <p className="text-xs text-[#dfba73]">
                {isSupabaseConfigured ? 'Connected to Supabase Security Cloud' : 'Offline Storage & Local Auth Active'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-[#0b1120] p-1 rounded-2xl border border-[#dfba73]/20 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'login' ? 'bg-[#dfba73] text-[#060913] font-bold shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>

          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'signup' ? 'bg-[#dfba73] text-[#060913] font-bold shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'audit' ? 'bg-[#dfba73] text-[#060913] font-bold shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Log</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#dfba73] text-[#060913] font-bold shadow' : 'text-stone-400 hover:text-white'
            }`}
            title="Database API Keys"
          >
            <Key className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Currently Logged In State */}
        {currentUser && activeTab !== 'audit' && activeTab !== 'settings' && (
          <div className="p-3 rounded-2xl bg-[#0b1120] border border-emerald-500/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold">
                {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <span className="font-bold text-white block">
                  {currentUser.user_metadata?.full_name || currentUser.email}
                </span>
                <span className="text-stone-400 text-[10px]">{currentUser.email}</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Tab 1: Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="traveler@heritagequest.org"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#060913] font-bold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer mt-1"
            >
              {loading ? 'Authenticating...' : 'Sign In to HeritageQuest'}
            </button>

            <div className="relative text-center my-1">
              <span className="bg-[#090c15] px-2 text-[10px] text-stone-500 font-mono">OR OAUTH SIGN IN</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2 rounded-xl bg-[#0b1120] hover:bg-[#111827] border border-[#dfba73]/30 text-stone-200 font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🌐 Sign In with Google OAuth</span>
            </button>
          </form>
        )}

        {/* Tab 2: Register Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Traveler Name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="e.g. Ananya, Marcus"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="traveler@heritagequest.org"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c25e36] text-[#060913] font-bold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer mt-1"
            >
              {loading ? 'Creating Passport...' : 'Create Registered Account'}
            </button>
          </form>
        )}

        {/* Tab 3: Database Audit Log Trail (Issue 5) */}
        {activeTab === 'audit' && (
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-300 font-semibold border-b border-[#dfba73]/20 pb-1">
              <span>Database Action Audit Trail</span>
              <span className="text-[10px] text-[#dfba73]">{auditLogs.length} Records Logged</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[45vh]">
              {loadingLogs ? (
                <div className="py-8 text-center text-xs text-stone-400">Loading audit trail records...</div>
              ) : auditLogs.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-400">No audit logs recorded yet.</div>
              ) : (
                auditLogs.map((log, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#0b1120] border border-[#dfba73]/20 text-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[#dfba73] font-semibold text-[11px]">
                      <span className="uppercase font-mono tracking-wider">{log.action_type}</span>
                      <span className="text-stone-400 text-[10px]">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    {log.monument_id && (
                      <span className="text-stone-300 text-[11px] font-medium">📍 Monument: {log.monument_id}</span>
                    )}
                    {log.character_name && (
                      <span className="text-amber-300 text-[11px]">👑 Host: {log.character_name}</span>
                    )}
                    {log.details && (
                      <span className="text-stone-400 text-[10px] italic">{log.details}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Supabase Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSupabaseConfig} className="flex flex-col gap-3">
            <p className="text-xs text-stone-300 leading-relaxed">
              HeritageQuest works out-of-the-box with local storage auth. Paste your custom Supabase Project keys below to connect real-time cloud Postgres:
            </p>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Supabase URL:</label>
              <input
                type="text"
                value={supabaseUrlInput}
                onChange={(e) => setSupabaseUrlInput(e.target.value)}
                placeholder="https://xyz.supabase.co"
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <div>
              <label className="text-xs text-stone-300 block mb-1 font-semibold">Supabase Anon Key:</label>
              <input
                type="password"
                value={supabaseKeyInput}
                onChange={(e) => setSupabaseKeyInput(e.target.value)}
                placeholder="eyJh..."
                className="w-full px-3 py-2 rounded-xl bg-[#060913] border border-[#dfba73]/30 text-xs text-white focus:outline-none focus:border-[#dfba73]"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c5a059] text-[#060913] font-bold text-xs shadow hover:brightness-110 cursor-pointer"
            >
              Save Keys &amp; Reconnect
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
