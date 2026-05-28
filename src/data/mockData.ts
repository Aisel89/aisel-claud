export interface YogaClass {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: "Vinyasa" | "Hatha" | "Yin" | "Meditation" | "Private" | "Special";
  price: number;
  image: string;
}

export interface ScheduleItem {
  id: string;
  classId: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string;
  endTime: string;
  instructor: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "Studio" | "Classes" | "Retreats" | "Community";
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // YouTube or Vimeo embed ID
  duration: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface Retreat {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  price: string;
  image: string;
  status: "Upcoming" | "Sold Out" | "Past";
}

export interface Teacher {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  image: string;
  socials?: {
    instagram?: string;
    website?: string;
  };
}

export const initialClasses: YogaClass[] = [
  {
    id: "1",
    title: "Vinyasa Flow",
    description: "A dynamic practice connecting breath with movement to build strength, flexibility, and focus.",
    instructor: "Aisel",
    duration: "60 min",
    level: "All Levels",
    category: "Vinyasa",
    price: 35,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Gentle Hatha",
    description: "Slower-paced class focused on alignment and foundational poses. Perfect for relaxation and beginners.",
    instructor: "Sarah",
    duration: "75 min",
    level: "Beginner",
    category: "Hatha",
    price: 35,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Yin & Sound Healing",
    description: "Deep passive stretching held for longer durations, accompanied by healing crystal bowl frequencies.",
    instructor: "Aisel",
    duration: "90 min",
    level: "All Levels",
    category: "Yin",
    price: 45,
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80",
  },
];

export const initialSchedule: ScheduleItem[] = [
  { id: "s1", classId: "1", day: "Monday", startTime: "08:00", endTime: "09:00", instructor: "Aisel", location: "Main Studio" },
  { id: "s2", classId: "2", day: "Monday", startTime: "17:30", endTime: "18:45", instructor: "Sarah", location: "Main Studio" },
  { id: "s3", classId: "1", day: "Wednesday", startTime: "08:00", endTime: "09:00", instructor: "Aisel", location: "Main Studio" },
  { id: "s4", classId: "3", day: "Friday", startTime: "18:00", endTime: "19:30", instructor: "Aisel", location: "Zen Room" },
  { id: "s5", classId: "1", day: "Sunday", startTime: "08:00", endTime: "09:00", instructor: "Aisel", location: "Lake Side" },
];

export const initialPricing: PricingPlan[] = [
  {
    id: "p1",
    name: "Drop-in",
    price: "$35",
    period: "per class",
    features: ["Single class entry", "Mat rental included", "Valid for 30 days"],
  },
  {
    id: "p2",
    name: "Monthly Flow",
    price: "$150",
    period: "per month",
    features: ["Unlimited classes", "10% off retreats", "Guest pass monthly", "Early booking access"],
    isPopular: true,
  },
  {
    id: "p3",
    name: "Class Pack",
    price: "$280",
    period: "10 classes",
    features: ["Valid for 6 months", "Sharable with friends", "Priority waitlist"],
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena R.",
    role: "Member",
    content: "Aisel's classes are more than just movement. It's a journey back to yourself. The atmosphere is always so welcoming and warm.",
  },
  {
    id: "t2",
    name: "Marcus T.",
    role: "Practitioner",
    content: "Finding this studio was a turning point in my practice. The focus on breathwork and mindfulness is exceptional.",
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Mindful Breathing",
    excerpt: "Discover how simple breathwork can transform your daily stress into calm energy.",
    content: "Full content here...",
    author: "Aisel",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    category: "Wellness",
    slug: "art-of-mindful-breathing",
  },
];

export const initialGallery: GalleryImage[] = [
  { id: "g1", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80", caption: "Sunrise Flow", category: "Classes" },
  { id: "g2", url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80", caption: "Our Sacred Space", category: "Studio" },
  { id: "g3", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80", caption: "Sunday Yoga Club", category: "Community" },
];

export const initialVideos: Video[] = [
  {
    id: "v1",
    title: "15 Min Morning Wake Up",
    description: "A gentle flow to start your day with intention.",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
    videoUrl: "dQw4w9WgXcQ",
    duration: "15:00",
    category: "Flow",
  },
];

export const initialRetreats: Retreat[] = [
  {
    id: "r1",
    title: "Autumn Awakening Retreat",
    date: "Oct 12-15, 2025",
    location: "Lake District",
    description: "Three days of immersive yoga, forest bathing, and sound healing.",
    price: "From $850",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    status: "Upcoming",
  },
];
