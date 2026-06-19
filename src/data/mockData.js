// ── VOCI Hub Mock Data ─────────────────────────────────────────────────────
// This simulates the backend database. In Phase 2, replace with API calls.

export const currentUser = {
  id: 'u001',
  name: 'Brian Ingwee',
  role: 'Founder & President',
  email: 'ingwebrian@gmail.com',
  avatar: 'BI',
  sphere: 'Government / Science & Technology',
  level: 5,
  levelName: 'Transformer',
  cohort: 'Cohort 1 — Founding Member',
  campus: "Murang'a University of Technology",
  joinDate: 'March 14, 2025',
  bio: 'Founder of VOCI. Computer Science student. CEO of Ingweplex Designs Agency. Building a system to transform a nation.',
  values: ['Integrity', 'Excellence', 'Empowerment'],
  uvp: 'I build systems that transform nations — one voice at a time.',
  xp: 4850,
  xpToNext: 5000,
  streak: 12,
  badges: ['Founding Member', 'Level 5 Transformer', 'Facilitator L1', 'Impact Pioneer'],
  mentor: { name: 'Dr. Wanjiku Kamau', sphere: 'Government', avatar: 'WK' },
  mentee: { name: 'Joy Karimi', sphere: 'Economics', avatar: 'JK' },
  peerPartner: { name: 'Martin Gitau', sphere: 'Government', avatar: 'MG' },
}

export const pillars = [
  {
    id: 'p1', number: 1,
    title: 'Public Speaking & Communication',
    icon: '🎙️',
    color: '#BF0000',
    progress: 85,
    modules: 4, completed: 3,
    description: 'Find your voice, master storytelling, persuasive speaking, and digital communication.',
    frameworks: ['POWER', 'HOOK-HEART-HABIT', 'PREP', 'PAUSE'],
    currentModule: 'Module 4: Digital & Media Communication',
    nextSession: 'Sunday, Jun 22 · 8:00 PM',
  },
  {
    id: 'p2', number: 2,
    title: 'Personal Branding',
    icon: '✨',
    color: '#D4A017',
    progress: 100,
    modules: 4, completed: 4,
    description: 'Discover your identity, craft your brand story, and build your digital presence.',
    frameworks: ['STAR', 'GIVE'],
    currentModule: 'Completed ✓',
    nextSession: null,
  },
  {
    id: 'p3', number: 3,
    title: 'Principled Leadership',
    icon: '👑',
    color: '#BF0000',
    progress: 60,
    modules: 4, completed: 2,
    description: 'Values-based leadership, ethical decision-making, and emotional intelligence.',
    frameworks: ['DECIDE', 'GROW'],
    currentModule: 'Module 3: Resilience & Emotional Intelligence',
    nextSession: 'Tuesday, Jun 24 · 7:00 PM',
  },
  {
    id: 'p4', number: 4,
    title: 'Mentorship',
    icon: '🤝',
    color: '#D4A017',
    progress: 75,
    modules: 3, completed: 2,
    description: 'Peer mentorship, vertical mentorship, and the GROW framework.',
    frameworks: ['GROW'],
    currentModule: 'Module 3: Sphere-Specific Mentorship',
    nextSession: 'Wednesday, Jun 25 · 6:00 PM',
  },
  {
    id: 'p5', number: 5,
    title: 'Community Engagement',
    icon: '🌍',
    color: '#1E90FF',
    progress: 40,
    modules: 4, completed: 1,
    description: 'Needs assessment, impact project design, advocacy, and community mobilisation.',
    frameworks: ['VOICE'],
    currentModule: 'Module 2: Impact Project Design',
    nextSession: 'Friday, Jun 27 · 7:30 PM',
  },
]

export const frameworks = [
  {
    id: 'f1', name: 'POWER', color: '#BF0000', pillar: 'Communication',
    tagline: 'The Persuasive Speech & Pitch Framework',
    steps: [
      { letter: 'P', label: 'Problem / Hook', desc: 'Open with a hook that grabs attention immediately.' },
      { letter: 'O', label: 'Own Your Authority', desc: 'Establish your credibility and connection to the topic.' },
      { letter: 'W', label: 'Win with Evidence', desc: 'Present your core argument with evidence and stories.' },
      { letter: 'E', label: 'Engage Objections', desc: 'Address the most likely objections honestly.' },
      { letter: 'R', label: 'Rally to Action', desc: 'End with a clear, compelling call to action.' },
    ]
  },
  {
    id: 'f2', name: 'HOOK-HEART-HABIT', color: '#D4A017', pillar: 'Communication',
    tagline: 'The Universal Speech Structure',
    steps: [
      { letter: 'H', label: 'Hook', desc: 'Earn the audience\'s attention in the first 30–60 seconds.' },
      { letter: 'H', label: 'Heart', desc: 'Build emotional connection and deliver your core message.' },
      { letter: 'H', label: 'Habit', desc: 'Leave the audience with a new belief or specific action.' },
    ]
  },
  {
    id: 'f3', name: 'PREP', color: '#1E90FF', pillar: 'Communication',
    tagline: 'The Impromptu Speaking Framework',
    steps: [
      { letter: 'P', label: 'Point', desc: 'State your main point clearly and directly.' },
      { letter: 'R', label: 'Reason', desc: 'Explain why you hold this position.' },
      { letter: 'E', label: 'Example', desc: 'Illustrate with a brief story or analogy.' },
      { letter: 'P', label: 'Point (restated)', desc: 'Restate your main point to close.' },
    ]
  },
  {
    id: 'f4', name: 'PAUSE', color: '#BF0000', pillar: 'Communication',
    tagline: 'The Q&A Mastery Framework',
    steps: [
      { letter: 'P', label: 'Pause', desc: 'Take a breath. A 2-second pause signals confidence.' },
      { letter: 'A', label: 'Acknowledge', desc: 'Restate or clarify the question.' },
      { letter: 'U', label: 'Understand & Answer', desc: 'Give your answer clearly and concisely.' },
      { letter: 'S', label: 'Support', desc: 'Provide a brief example or evidence.' },
      { letter: 'E', label: 'End with message', desc: 'Bring your answer back to your core message.' },
    ]
  },
  {
    id: 'f5', name: 'GROW', color: '#D4A017', pillar: 'Mentorship',
    tagline: 'The Mentorship Conversation Framework',
    steps: [
      { letter: 'G', label: 'Goal', desc: 'What does the mentee want to achieve?' },
      { letter: 'R', label: 'Reality', desc: 'Where are they now? What is working?' },
      { letter: 'O', label: 'Options', desc: 'What are the possible paths forward?' },
      { letter: 'W', label: 'Way Forward', desc: 'What will the mentee commit to doing?' },
    ]
  },
  {
    id: 'f6', name: 'VOICE', color: '#1E90FF', pillar: 'Community Engagement',
    tagline: 'The Advocacy Communication Framework',
    steps: [
      { letter: 'V', label: 'Vision & Issue Clarity', desc: 'Clearly define the specific issue your campaign addresses.' },
      { letter: 'O', label: 'Own Your Audience', desc: 'Identify who you are trying to reach and influence.' },
      { letter: 'I', label: 'Inspire with Message', desc: 'Develop a clear, compelling core message.' },
      { letter: 'C', label: 'Choose Your Channels', desc: 'Select the platforms that will reach your audience.' },
      { letter: 'E', label: 'Engage to Action', desc: 'End with a clear, specific call to action.' },
    ]
  },
]

export const members = [
  { id: 'm1', name: 'Brian Ingwee', avatar: 'BI', sphere: 'Government / Science', level: 5, levelName: 'Transformer', role: 'Founder & President', campus: 'MUT', cohort: 1 },
  { id: 'm2', name: 'Hopewin Adams', avatar: 'HA', sphere: 'Family / Education', level: 3, levelName: 'Developer', role: 'Vice President', campus: 'MUT', cohort: 1 },
  { id: 'm3', name: 'Joy Karimi', avatar: 'JK', sphere: 'Economics / Education', level: 4, levelName: 'Influencer', role: 'Head of Treasury', campus: 'MUT', cohort: 1 },
  { id: 'm4', name: 'Ezekiel Thaara', avatar: 'ET', sphere: 'Government / Education', level: 3, levelName: 'Developer', role: 'Secretariat', campus: 'MUT', cohort: 1 },
  { id: 'm5', name: 'Martin Gitau', avatar: 'MG', sphere: 'Government', level: 3, levelName: 'Developer', role: 'Membership Coordinator', campus: 'MUT', cohort: 1 },
  { id: 'm6', name: 'Zack Njenga', avatar: 'ZN', sphere: 'Arts & Entertainment', level: 3, levelName: 'Developer', role: 'Head of Partnerships', campus: 'MUT', cohort: 1 },
  { id: 'm7', name: 'Sandra Mutanu', avatar: 'SM', sphere: 'Communication', level: 3, levelName: 'Developer', role: 'Head of Digital Media', campus: 'MUT', cohort: 1 },
  { id: 'm8', name: 'Felister Kaarie', avatar: 'FK', sphere: 'Education / Family', level: 2, levelName: 'Discoverer', role: 'Member', campus: 'MUT', cohort: 1 },
  { id: 'm9', name: 'Victor Omulando', avatar: 'VO', sphere: 'Government / Communication', level: 2, levelName: 'Discoverer', role: 'Member', campus: 'MUT', cohort: 1 },
  { id: 'm10', name: 'Nelson Musili', avatar: 'NM', sphere: 'Economics / Church', level: 2, levelName: 'Discoverer', role: 'Member', campus: 'MUT', cohort: 1 },
  { id: 'm11', name: 'Juliet Kariuki', avatar: 'JKa', sphere: 'Government / Education', level: 2, levelName: 'Discoverer', role: 'Member', campus: 'MUT', cohort: 1 },
  { id: 'm12', name: 'Charity Wanza', avatar: 'CW', sphere: 'Science & Technology', level: 2, levelName: 'Discoverer', role: 'Member', campus: 'MUT', cohort: 1 },
]

export const spheres = [
  { id: 's1', name: 'Government', icon: '🏛️', color: '#BF0000', members: 18, description: 'Civic leaders, policy advocates, public servants' },
  { id: 's2', name: 'Economics', icon: '💼', color: '#D4A017', members: 14, description: 'Entrepreneurs, business leaders, marketplace professionals' },
  { id: 's3', name: 'Science & Technology', icon: '🔬', color: '#1E90FF', members: 12, description: 'Innovators, engineers, technology professionals' },
  { id: 's4', name: 'Church', icon: '⛪', color: '#BF0000', members: 8, description: 'Faith leaders, ministers, spiritual community workers' },
  { id: 's5', name: 'Family', icon: '🏠', color: '#D4A017', members: 10, description: 'Parents, counsellors, community advocates' },
  { id: 's6', name: 'Education', icon: '📚', color: '#1E90FF', members: 16, description: 'Teachers, academics, educational advocates' },
  { id: 's7', name: 'Communication', icon: '📡', color: '#BF0000', members: 6, description: 'Journalists, marketers, media creators' },
  { id: 's8', name: 'Arts & Entertainment', icon: '🎨', color: '#D4A017', members: 2, description: 'Artists, musicians, filmmakers, performers' },
]

export const hubs = [
  { id: 'h1', name: 'Business Hub', icon: '💼', color: '#BF0000', spheres: 'Economics · Science & Technology', members: 26, nextEvent: 'Pitch Competition — Jun 28', description: 'Where marketplace leaders are built.' },
  { id: 'h2', name: 'Creative & Innovation Hub', icon: '🎨', color: '#D4A017', spheres: 'Communication · Arts & Entertainment', members: 18, nextEvent: 'Creative Showcase — Jun 25', description: 'Where creative voices find their power.' },
  { id: 'h3', name: 'Community Advocacy Hub', icon: '🌍', color: '#BF0000', spheres: 'Family · Church · Community', members: 22, nextEvent: 'Impact Project Review — Jun 26', description: 'Where servant leaders create lasting change.' },
  { id: 'h4', name: 'Governance Hub', icon: '🏛️', color: '#D4A017', spheres: 'Government · Education', members: 20, nextEvent: 'Mock Parliament — Jun 29', description: 'Where principled civic leaders are formed.' },
]

export const sessions = [
  { id: 'ses1', title: 'Evaluating Your UVP — Cohort 1 Alignment Session', date: 'Sunday, Jun 21, 2026', time: '8:00 PM – 9:30 PM', type: 'Special Session', pillar: 'All Pillars', facilitator: 'Brian Ingwee', platform: 'Zoom', status: 'upcoming', attendees: 42 },
  { id: 'ses2', title: 'Module 4: Digital & Media Communication', date: 'Tuesday, Jun 24, 2026', time: '7:00 PM – 8:30 PM', type: 'Pillar 1', pillar: 'Communication', facilitator: 'Hopewin Adams', platform: 'Google Meet', status: 'upcoming', attendees: 38 },
  { id: 'ses3', title: 'Module 3: Sphere-Specific Mentorship', date: 'Wednesday, Jun 25, 2026', time: '6:00 PM – 7:30 PM', type: 'Pillar 4', pillar: 'Mentorship', facilitator: 'Martin Gitau', platform: 'Zoom', status: 'upcoming', attendees: 35 },
  { id: 'ses4', title: 'Module 2: Impact Project Design', date: 'Friday, Jun 27, 2026', time: '7:30 PM – 9:00 PM', type: 'Pillar 5', pillar: 'Community Engagement', facilitator: 'Zack Njenga', platform: 'Google Meet', status: 'upcoming', attendees: 30 },
  { id: 'ses5', title: 'Module 3: Resilience & Emotional Intelligence', date: 'Sunday, Jun 15, 2026', time: '8:00 PM – 9:30 PM', type: 'Pillar 3', pillar: 'Leadership', facilitator: 'Brian Ingwee', platform: 'Zoom', status: 'completed', attendees: 44, rating: 9.2 },
  { id: 'ses6', title: 'Module 3: Networking & Relationship Building', date: 'Friday, Jun 13, 2026', time: '7:00 PM – 8:30 PM', type: 'Pillar 2', pillar: 'Personal Branding', facilitator: 'Sandra Mutanu', platform: 'Google Meet', status: 'completed', attendees: 40, rating: 9.5 },
]

export const announcements = [
  { id: 'a1', title: 'UVP Alignment Session This Sunday!', body: 'Join us this Sunday, June 21st at 8:00 PM for our special Cohort 1 Alignment Session. Come with openness and a readiness for growth.', date: 'Jun 19, 2026', type: 'event', urgent: true, author: 'Brian Ingwee' },
  { id: 'a2', title: 'VOCI Strategic Plan 2025–2030 Released', body: 'The full VOCI Strategic Plan is now available in the Training Library. Read it, own it, and let it shape your sphere leadership journey.', date: 'Jun 15, 2026', type: 'resource', urgent: false, author: 'VOCI ELT' },
  { id: 'a3', title: 'Cohort 2 Recruitment Begins July 1st', body: 'We are opening applications for Cohort 2! Every Cohort 1 member is challenged to bring at least 2 new members. Share the VOCI story.', date: 'Jun 12, 2026', type: 'recruitment', urgent: false, author: 'Martin Gitau' },
  { id: 'a4', title: 'Business Hub Pitch Competition — June 28th', body: 'The Business Hub is hosting its first Pitch Competition. All members with business ideas are invited to participate. Register via WhatsApp.', date: 'Jun 10, 2026', type: 'event', urgent: false, author: 'Zack Njenga' },
]

export const wins = [
  { id: 'w1', member: 'Joy Karimi', avatar: 'JK', win: 'Delivered my first public speech at FOCUS Kenya — 200+ people! The POWER framework changed everything. 🔥', date: '2 days ago', likes: 34, sphere: 'Economics' },
  { id: 'w2', member: 'Victor Omulando', avatar: 'VO', win: 'Published my first LinkedIn article on civic leadership. 500+ views in 24 hours. VOCI Personal Branding pillar works!', date: '3 days ago', likes: 28, sphere: 'Communication' },
  { id: 'w3', member: 'Charity Wanza', avatar: 'CW', win: 'Pitched my Space Technology idea to a panel of engineers using the POWER framework. They loved it. Next step: prototype! 🚀', date: '5 days ago', likes: 41, sphere: 'Science & Technology' },
  { id: 'w4', member: 'Felister Kaarie', avatar: 'FK', win: 'Led my first community mentorship session for 15 high school girls. Used the GROW framework. One of them said it changed her life. 💙', date: '1 week ago', likes: 52, sphere: 'Education' },
  { id: 'w5', member: 'Martin Gitau', avatar: 'MG', win: 'Completed my Personal Brand Canvas and updated my LinkedIn. Already got 3 connection requests from professionals in my sphere!', date: '1 week ago', likes: 19, sphere: 'Government' },
]

export const mentorshipSessions = [
  { id: 'ms1', type: 'mentor', with: 'Joy Karimi', avatar: 'JK', date: 'Jun 18, 2026', topic: 'Financial literacy goals and sphere impact project', notes: 'Joy is ready to launch her financial literacy workshop. Action: connect her with FOCUS Kenya contacts.', status: 'completed' },
  { id: 'ms2', type: 'mentor', with: 'Joy Karimi', avatar: 'JK', date: 'Jun 25, 2026', topic: 'Workshop launch preparation and pitch practice', notes: '', status: 'upcoming' },
  { id: 'ms3', type: 'mentee', with: 'Dr. Wanjiku Kamau', avatar: 'WK', date: 'Jun 17, 2026', topic: 'Presidential vision and VOCI scaling strategy', notes: 'Key insight: "Build the system before you need it." Focus on governance structures now.', status: 'completed' },
  { id: 'ms4', type: 'mentee', with: 'Dr. Wanjiku Kamau', avatar: 'WK', date: 'Jun 24, 2026', topic: 'VOCI legal registration and board constitution', notes: '', status: 'upcoming' },
]

export const actionPlan = [
  { id: 'ap1', week: 1, theme: 'Connect', action: 'Complete VOCI Profile Page and share with peer partner', done: true, dueDate: 'Jun 1' },
  { id: 'ap2', week: 1, theme: 'Connect', action: 'Follow VOCI on Instagram and LinkedIn. Introduce in WhatsApp group', done: true, dueDate: 'Jun 2' },
  { id: 'ap3', week: 2, theme: 'Discover', action: 'Complete Personal Brand Foundation Statement', done: true, dueDate: 'Jun 8' },
  { id: 'ap4', week: 2, theme: 'Discover', action: 'Write three-format bio (long, short, social)', done: true, dueDate: 'Jun 9' },
  { id: 'ap5', week: 3, theme: 'Develop', action: 'Deliver 2-minute self-introduction to 3 different audiences', done: true, dueDate: 'Jun 15' },
  { id: 'ap6', week: 3, theme: 'Develop', action: 'Post first branded content on LinkedIn or Instagram', done: false, dueDate: 'Jun 20' },
  { id: 'ap7', week: 4, theme: 'Commit', action: 'Complete Participant Self-Assessment Form for Pillar 1', done: false, dueDate: 'Jun 25' },
  { id: 'ap8', week: 4, theme: 'Commit', action: 'Sign and share 30-Day Commitment Card with peer partner', done: false, dueDate: 'Jun 28' },
]

export const impactProjects = [
  { id: 'ip1', title: 'Youth Financial Literacy Workshop', member: 'Joy Karimi', sphere: 'Economics', status: 'In Progress', beneficiaries: 30, description: 'Monthly financial literacy sessions for university students using tech tools.', startDate: 'Jun 2026' },
  { id: 'ip2', title: 'Space Technology Awareness Campaign', member: 'Charity Wanza', sphere: 'Science & Technology', status: 'Planning', beneficiaries: 0, description: 'Making space technology accessible to rural Kenyan youth through workshops and content.', startDate: 'Jul 2026' },
  { id: 'ip3', title: 'Girls Leadership Mentorship Programme', member: 'Felister Kaarie', sphere: 'Education', status: 'Active', beneficiaries: 15, description: 'Weekly mentorship sessions for high school girls on identity, voice, and leadership.', startDate: 'May 2026' },
  { id: 'ip4', title: 'Civic Education for Campus Students', member: 'Victor Omulando', sphere: 'Government', status: 'Planning', beneficiaries: 0, description: 'Voter education and civic rights awareness campaign for MUT students.', startDate: 'Aug 2026' },
]

export const progressData = [
  { month: 'Mar', sessions: 4, members: 86, projects: 0 },
  { month: 'Apr', sessions: 8, members: 86, projects: 1 },
  { month: 'May', sessions: 12, members: 86, projects: 3 },
  { month: 'Jun', sessions: 6, members: 86, projects: 4 },
]

export const levelSystem = [
  { level: 1, name: 'Explorer', color: '#888888', description: 'New to personal development. Beginning the journey.' },
  { level: 2, name: 'Discoverer', color: '#1E90FF', description: 'Growing self-awareness. Beginning to step out.' },
  { level: 3, name: 'Developer', color: '#D4A017', description: 'Clear self-awareness. Consistent initiative.' },
  { level: 4, name: 'Influencer', color: '#BF0000', description: 'Strong self-awareness. Proactive across contexts.' },
  { level: 5, name: 'Transformer', color: '#8B0000', description: 'Exceptional self-awareness. Bold initiative creating measurable impact.' },
]