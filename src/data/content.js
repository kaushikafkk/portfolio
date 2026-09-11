/**
 * Every word and number on the page lives here.
 * Edit this file to update the portfolio; components read from it and never
 * hard-code copy.
 */

export const PROFILE = {
  name: 'Motesha Kaushik Singh',
  initials: 'MKS',
  role: 'Full-Stack Software Engineer',
  tagline: ['Building intelligent systems', 'for a better tomorrow.'],
  focus: ['AI / ML', 'DevOps', 'Cloud'],
  location: 'Hyderabad, Telangana, India',
  emails: ['kaushik184002@gmail.com', '18kaushiksingh@gmail.com'],
  phone: '+91 8074777488',
  loop: ['Discover', 'Learn', 'Build', 'Repeat'],
  closingLine: 'A curious mind builds a brighter future.',
  quote: {
    text: 'Technology is a tool. Impact is the goal.',
    attribution: 'Motesha Kaushik Singh',
  },
  statue: {
    title: 'The Thinking Statue',
    body: 'A symbol of curiosity, discipline and a better tomorrow.',
  },
};

/** Section registry — drives the nav rail, the 01–12 counter and scroll spy. */
export const SECTIONS = [
  { id: 'hero', number: '01', label: 'Welcome', group: 'Ideas' },
  { id: 'about', number: '02', label: 'About', group: 'Ideas' },
  { id: 'experience', number: '03', label: 'Experience', group: 'People' },
  { id: 'projects', number: '04', label: 'Projects', group: 'Impact' },
  { id: 'ai', number: '05', label: 'AI / ML', group: 'Systems' },
  { id: 'stack', number: '06', label: 'Engineering Stack', group: 'Systems' },
  { id: 'architecture', number: '07', label: 'Architecture', group: 'Systems' },
  { id: 'devops', number: '08', label: 'Cloud & DevOps', group: 'Systems' },
  { id: 'achievements', number: '09', label: 'Achievements', group: 'Impact' },
  { id: 'learning', number: '10', label: 'Learning', group: 'Ideas' },
  { id: 'philosophy', number: '11', label: 'Philosophy', group: 'People' },
  { id: 'contact', number: '12', label: 'Contact', group: 'People' },
];

export const NAV_GROUPS = ['Ideas', 'Systems', 'People', 'Impact'];

/* ------------------------------------------------------------------ 02 about */
export const ABOUT_CONTENT = {
  eyebrow: 'More than a developer',
  headline: ['I Build', 'Systems', 'That Matter.'],
  body: "I'm Motesha Kaushik Singh, a final-year Computer Science engineer who loves building real-world systems. I specialize in full-stack development, AI/ML, and cloud infrastructure with a focus on creating scalable and meaningful solutions.",
  signature: ['Curious', 'Disciplined', 'Builder'],
  stats: [
    { value: '1+', label: 'Years exp' },
    { value: '2+', label: 'Major projects' },
    { value: '2+', label: 'Research works' },
    { value: '10+', label: 'Technologies' },
  ],
};

/* ------------------------------------------------------------- 03 experience */
export const EXPERIENCE_CONTENT = {
  eyebrow: 'Growth through real work',
  span: { from: '2025', to: '2026' },
  roles: [
    {
      title: 'Software Developer Intern',
      org: 'Systems Group, Hyderabad',
      period: 'Jun 2025 — Present',
      current: true,
      points: [
        'Built full-stack SaaS platforms with scalable backend systems.',
        'Worked with modern DevOps tools and cloud infrastructure.',
        'Solved real-world problems through clean and efficient code.',
      ],
    },
  ],
  capabilities: [
    {
      title: 'Full-Stack Development',
      items: ['React / Next.js', 'Node.js / Express'],
    },
    {
      title: 'Backend Systems',
      items: ['PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      title: 'DevOps & Deployment',
      items: ['Docker • CI/CD', 'AWS • Terraform'],
    },
    {
      title: 'Product & Collaboration',
      items: ['System Design', 'Technical Writing'],
    },
  ],
};

/* --------------------------------------------------------------- 04 projects */
export const PROJECTS = [
  {
    number: '01',
    title: 'AI Architectural Planning Platform',
    tags: ['AI', 'LLM', '3D', 'Generative'],
    summary:
      'Generates architectural floor plans using LLMs and 3D visualization. Converts natural language into structured layouts with cost estimates.',
    metric: { value: '-60%', label: 'Manual revision cycles' },
    mediaCaption: { title: 'Interactive 3D model', body: 'Turn ideas into structures.' },
    href: null,
  },
  {
    number: '02',
    title: 'Enterprise File Collaboration Platform',
    tags: ['SaaS', 'Security', 'Cloud'],
    summary:
      'A secure file collaboration platform with RBAC, audit logging, versioning and enterprise-grade storage using Cloudflare R2.',
    features: ['Permissions • Version history', 'Audit logs • Cloud storage'],
    cta: { label: 'Live demo', href: '#contact' },
  },
];

/* ------------------------------------------------------------------ 05 ai/ml */
export const AI_CONTENT = {
  eyebrow: 'Intelligence in action',
  headline: 'I build systems that think.',
  pipeline: ['User', 'Prompt', 'LLM', 'RAG', 'Automation', 'Product'],
  caption: 'From ideas to intelligent systems.',
};

/* ------------------------------------------------------------------ 06 stack */
export const STACK = {
  eyebrow: 'Tools that power my work',
  core: ['Kaushik', 'Engineering', 'Stack'],
  clusters: [
    {
      id: 'ai',
      title: 'AI / ML',
      side: 'left',
      items: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      side: 'right',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    },
    {
      id: 'database',
      title: 'Database',
      side: 'left',
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    },
    {
      id: 'cloud',
      title: 'Cloud',
      side: 'right',
      items: ['AWS', 'Azure', 'Cloudflare', 'Firebase', 'Supabase'],
    },
    {
      id: 'devops',
      title: 'DevOps',
      side: 'left',
      items: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'ArgoCD'],
    },
    {
      id: 'backend',
      title: 'Backend',
      side: 'right',
      items: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'Flask'],
    },
  ],
};

/* ----------------------------------------------------------- 07 architecture */
export const ARCHITECTURE_CONTENT = {
  eyebrow: 'From idea to system',
  headline: 'From idea to system.',
  body: 'I design scalable, secure and maintainable systems that solve real problems.',
  footline: 'Designed to scale.',
  nodes: {
    entry: [{ id: 'user', label: 'User', icon: 'user' }],
    edge: [
      { id: 'cloudflare', label: 'Cloudflare', icon: 'cloud' },
      { id: 'nginx', label: 'Nginx', icon: 'shuffle' },
      { id: 'gateway', label: 'API Gateway', icon: 'gateway' },
    ],
    services: [
      { id: 'auth', label: 'Auth Service', icon: 'lock' },
      { id: 'app', label: 'Application Services', icon: 'grid' },
      { id: 'workers', label: 'Workers', icon: 'cog' },
    ],
    data: [
      { id: 'postgres', label: 'PostgreSQL', icon: 'db' },
      { id: 'redis', label: 'Redis', icon: 'db' },
    ],
  },
};

/* ----------------------------------------------------------- 08 cloud/devops */
export const DEVOPS_CONTENT = {
  eyebrow: 'Deploy. Monitor. Scale.',
  metrics: [
    { label: 'CPU', value: 68 },
    { label: 'Memory', value: 52 },
    { label: 'Storage', value: 73 },
  ],
  pipeline: ['Code', 'Build', 'Test', 'Deploy', 'Monitor'],
  status: { label: 'Production', state: 'Healthy' },
  technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
};

/* ----------------------------------------------------------- 09 achievements */
export const ACHIEVEMENTS = [
  {
    number: '01',
    title: 'Vice President',
    org: 'Automachine Club',
    detail: 'KL University',
    icon: 'trophy',
  },
  {
    number: '02',
    title: 'Blind Coding Finalist',
    org: '200+ participants',
    detail: '',
    icon: 'medal',
  },
  {
    number: '03',
    title: 'Advanced RPA Professional',
    org: 'Certified',
    detail: '',
    icon: 'certificate',
  },
  {
    number: '04',
    title: 'Self-Hosted AI',
    org: 'Open-WebUI + LLaMA',
    detail: 'Personal setup',
    icon: 'code',
  },
];

/* --------------------------------------------------------------- 10 learning */
export const LEARNING = {
  eyebrow: 'Better every day',
  headline: ['Always', 'Learning.'],
  tracks: [
    { name: 'AWS DevOps', level: 'Professional', status: 'In progress', icon: 'aws', progress: 62 },
    { name: 'CKA', level: 'Kubernetes', status: 'In progress', icon: 'cka', progress: 48 },
    { name: 'Terraform', level: 'Associate', status: 'In progress', icon: 'terraform', progress: 71 },
    { name: 'Google Cloud', level: 'DevOps', status: 'In progress', icon: 'gcp', progress: 35 },
  ],
};

/* ------------------------------------------------------------- 11 philosophy */
export const PHILOSOPHY_CONTENT = {
  eyebrow: 'A long-term mindset',
  headline: ["I don't just", 'write code.'],
  verbs: ['I build.', 'I break.', 'I learn.', 'I rebuild.', 'Better.'],
};

/* ---------------------------------------------------------------- 12 contact */
export const CONTACT_CONTENT = {
  eyebrow: "Let's build what's next",
  headline: ["Let's build", 'something.'],
  invitation: "Have an idea? Let's talk.",
  cta: 'Start a conversation',
};

/** Opens Gmail's composer with both portfolio inboxes addressed. */
export const GMAIL_COMPOSE_URL =
  `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.emails.join(','))}`;

export const SOCIALS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/moteshakaushiksingh/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/kaushikafkk' },
  { id: 'mail', label: 'Email', href: GMAIL_COMPOSE_URL },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kaushik.afk/' },
];

export const FOOTER_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_PILLARS = ['Ideas', 'People', 'Systems', 'Impact'];

export const COPYRIGHT = `© ${new Date().getFullYear()} Motesha Kaushik Singh. All rights reserved.`;
