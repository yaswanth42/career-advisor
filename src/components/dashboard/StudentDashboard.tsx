import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp, 
  Bell,
  Calendar,
  Target,
  Brain
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CareerRecommendation, Notification } from '../../types';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({
    profileCompletion: 75,
    collegesViewed: 12,
    scholarshipsApplied: 3,
    forumPosts: 5
  });

  useEffect(() => {
    // Simulate fetching recommendations
    setRecommendations([
      {
        career_path: "Software Engineering",
        match_percentage: 92,
        required_skills: ["Programming", "Problem Solving", "Mathematics"],
        education_path: ["B.Tech Computer Science", "Coding Bootcamp"],
        salary_range: { min: 400000, max: 1500000 },
        job_outlook: "Excellent",
        description: "High demand field with excellent growth prospects"
      },
      {
        career_path: "Data Science",
        match_percentage: 85,
        required_skills: ["Statistics", "Python", "Machine Learning"],
        education_path: ["B.Tech", "M.Tech/M.S. Data Science"],
        salary_range: { min: 600000, max: 2000000 },
        job_outlook: "Very Good",
        description: "Rapidly growing field with high earning potential"
      }
    ]);

    setNotifications([
      {
        id: '1',
        user_id: user?.id || '',
        title: "New Scholarship Available",
        message: "Merit-based scholarship for engineering students - Apply by March 15",
        type: 'scholarship',
        is_read: false,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: user?.id || '',
        title: "JEE Mains Registration",
        message: "Last date for JEE Mains registration is approaching",
        type: 'exam',
        is_read: false,
        created_at: new Date().toISOString()
      }
    ]);
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-blue-100">Ready to explore your career journey today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profile Completion</p>
              <p className="text-2xl font-bold text-gray-900">{stats.profileCompletion}%</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${stats.profileCompletion}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Colleges Explored</p>
              <p className="text-2xl font-bold text-gray-900">{stats.collegesViewed}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scholarships Applied</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scholarshipsApplied}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Forum Interactions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.forumPosts}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-500" />
              AI Career Recommendations
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{rec.career_path}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {rec.match_percentage}% match
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.required_skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Salary: ₹{rec.salary_range.min/100000}L - ₹{rec.salary_range.max/100000}L
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              Recent Updates
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${notification.is_read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/career-mapping" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-indigo-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Career Mapping</p>
              <p className="text-sm text-gray-600">Opportunities after 10th & 12th</p>
            </div>
          </a>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Brain className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Take Aptitude Test</p>
              <p className="text-sm text-gray-600">Discover your strengths</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <BookOpen className="w-6 h-6 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Explore Colleges</p>
              <p className="text-sm text-gray-600">Find your dream college</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
            <Award className="w-6 h-6 text-yellow-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Browse Scholarships</p>
              <p className="text-sm text-gray-600">Find financial aid</p>
            </div>
          </button>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-500" />
          Upcoming Deadlines
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">JEE Mains Registration</p>
              <p className="text-sm text-gray-600">Last date to register</p>
            </div>
            <span className="text-red-600 font-medium text-sm">March 15, 2024</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">NEET Application</p>
              <p className="text-sm text-gray-600">Medical entrance exam</p>
            </div>
            <span className="text-yellow-600 font-medium text-sm">March 20, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;