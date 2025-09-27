export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'mentor';
  profile?: StudentProfile | MentorProfile;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  grade: string;
  interests: string[];
  academic_scores: Record<string, number>;
  career_goals: string[];
  location: string;
  phone?: string;
  date_of_birth?: string;
}

export interface MentorProfile {
  id: string;
  user_id: string;
  expertise: string[];
  experience_years: number;
  education: string;
  current_position: string;
  company: string;
  bio: string;
  rating: number;
  total_sessions: number;
}

export interface College {
  id: string;
  name: string;
  location: string;
  type: 'government' | 'private' | 'deemed';
  courses: string[];
  eligibility_criteria: Record<string, any>;
  fees: Record<string, number>;
  placement_stats: {
    average_package: number;
    highest_package: number;
    placement_rate: number;
  };
  rating: number;
  established_year: number;
  website?: string;
  contact_info: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: 'government' | 'private' | 'institutional';
  amount: number;
  eligibility_criteria: Record<string, any>;
  application_deadline: string;
  description: string;
  requirements: string[];
  application_link: string;
  tags: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_role: 'student' | 'mentor';
  category: string;
  tags: string[];
  votes: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
  is_solved: boolean;
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_role: 'student' | 'mentor';
  votes: number;
  created_at: string;
  is_accepted: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'video' | 'article' | 'course';
  category: string;
  provider: string;
  url: string;
  download_url?: string;
  rating: number;
  tags: string[];
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'admission' | 'scholarship' | 'exam' | 'forum' | 'general';
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface CareerRecommendation {
  career_path: string;
  match_percentage: number;
  required_skills: string[];
  education_path: string[];
  salary_range: {
    min: number;
    max: number;
  };
  job_outlook: string;
  description: string;
}