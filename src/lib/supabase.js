import { createClient } from '@supabase/supabase-js'

// ── Supabase Configuration ─────────────────────────────────────────────────
// Replace these with your actual Supabase project credentials
// Get them from: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: { eventsPerSecond: 10 },
  },
})

// ── Auth Helpers ───────────────────────────────────────────────────────────
export const auth = {
  signUp: async ({ email, password, name, sphere }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, sphere, avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) },
      },
    })
    return { data, error }
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// ── Database Helpers ───────────────────────────────────────────────────────
export const db = {
  // Members
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  getAllMembers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })
    return { data, error }
  },

  // Wins Feed
  getWins: async (limit = 20) => {
    const { data, error } = await supabase
      .from('wins')
      .select('*, profiles(name, avatar, sphere)')
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  postWin: async (userId, text) => {
    const { data, error } = await supabase
      .from('wins')
      .insert({ user_id: userId, content: text })
      .select('*, profiles(name, avatar, sphere)')
      .single()
    return { data, error }
  },

  likeWin: async (winId, userId) => {
    // Upsert like (toggle)
    const { data: existing } = await supabase
      .from('win_likes')
      .select('id')
      .eq('win_id', winId)
      .eq('user_id', userId)
      .single()

    if (existing) {
      await supabase.from('win_likes').delete().eq('id', existing.id)
    } else {
      await supabase.from('win_likes').insert({ win_id: winId, user_id: userId })
    }

    // Get updated count
    const { count } = await supabase
      .from('win_likes')
      .select('*', { count: 'exact', head: true })
      .eq('win_id', winId)
    return count
  },

  // Sessions
  getSessions: async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('session_date', { ascending: true })
    return { data, error }
  },

  // Announcements
  getAnnouncements: async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Action Plan Tasks
  getTasks: async (userId) => {
    const { data, error } = await supabase
      .from('action_plan_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('week', { ascending: true })
    return { data, error }
  },

  toggleTask: async (taskId, done) => {
    const { data, error } = await supabase
      .from('action_plan_tasks')
      .update({ done, updated_at: new Date().toISOString() })
      .eq('id', taskId)
      .select()
      .single()
    return { data, error }
  },

  // Mentorship Sessions
  getMentorshipSessions: async (userId) => {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .select('*, mentor:mentor_id(name, avatar, sphere), mentee:mentee_id(name, avatar, sphere)')
      .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`)
      .order('session_date', { ascending: false })
    return { data, error }
  },

  saveMentorshipNotes: async (sessionId, notes) => {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .update({ notes, updated_at: new Date().toISOString() })
      .eq('id', sessionId)
      .select()
      .single()
    return { data, error }
  },

  // Impact Projects
  getImpactProjects: async () => {
    const { data, error } = await supabase
      .from('impact_projects')
      .select('*, profiles(name, avatar)')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  createImpactProject: async (userId, project) => {
    const { data, error } = await supabase
      .from('impact_projects')
      .insert({ ...project, user_id: userId, status: 'Planning' })
      .select('*, profiles(name, avatar)')
      .single()
    return { data, error }
  },

  // Notifications
  getNotifications: async (userId) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
    return { data, error }
  },

  markNotificationRead: async (notificationId) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
    return { error }
  },
}

// ── Realtime Subscriptions ─────────────────────────────────────────────────
export const realtime = {
  subscribeToWins: (callback) => {
    return supabase
      .channel('wins-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wins' }, callback)
      .subscribe()
  },

  subscribeToAnnouncements: (callback) => {
    return supabase
      .channel('announcements')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, callback)
      .subscribe()
  },

  subscribeToNotifications: (userId, callback) => {
    return supabase
      .channel(`notifications-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, callback)
      .subscribe()
  },

  unsubscribe: (channel) => {
    supabase.removeChannel(channel)
  },
}