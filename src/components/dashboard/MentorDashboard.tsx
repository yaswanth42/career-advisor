import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Award, 
  TrendingUp,
  Calendar,
  Star,
  BookOpen,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Student {
  id: string;
  name: string;
  grade: string;
  lastActive: string;
  progress: number;
}

interface Session {
  id: string;
  studentName: string;
  date: string;
  time: string;
  topic: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const MentorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 25,
    completedSessions: 48,
    averageRating: 4.8,
    responseRate: 95
  });

  useEffect(() => {
    // Mock data for students
    setStudents([
      {
        id: '1',
        name: 'Arjun Kumar',
        grade: 'Class 12',
        lastActive: '2 hours ago',
        progress: 85
      },
      {
        id: '2',
        name: 'Priya Singh',
        grade: 'Class 11',
        lastActive: '5 hours ago',
        progress: 72
      },
      {
        id: '3',
        name: 'Rahul Sharma',
        grade: 'Class 10',
        lastActive: '1 day ago',
        progress: 68
      }
    ]);

    setSessions([
      {
        id: '1',
        studentName: 'Arjun Kumar',
        date: '2024-03-15',
        time: '3:00 PM',
        topic: 'Career Guidance',
        status: 'upcoming'
      },
      {
        id: '2',
        studentName: 'Priya Singh',
        date: '2024-03-15',
        time: '5:00 PM',
        topic: 'College Selection',
        status: 'upcoming'
      }
    ]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}! 🌟</h1>
        <p className="text-purple-100">Ready to make a difference in students' lives today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ +3 this week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedSessions}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ +5 this week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-3 h-3 ${star <= stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full" 
              style={{ width: `${stats.responseRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Recent Students
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.grade}</p>
                    <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              Upcoming Sessions
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Schedule New
            </button>
          </div>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{session.studentName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    session.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {session.date} at {session.time}
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
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Answer Questions</p>
              <p className="text-sm text-gray-600">Help students in forum</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <Calendar className="w-6 h-6 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Schedule Session</p>
              <p className="text-sm text-gray-600">Book mentorship call</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <BookOpen className="w-6 h-6 text-purple-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add Resources</p>
              <p className="text-sm text-gray-600">Share learning materials</p>
            </div>
          </button>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Performance Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Most Discussed Topics</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engineering Careers</span>
                <span className="text-gray-500">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medical Entrance</span>
                <span className="text-gray-500">28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Commerce Fields</span>
                <span className="text-gray-500">22%</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Student Feedback</h3>
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-800">"Very helpful guidance!"</p>
                <p className="text-xs text-green-600">- Arjun K.</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">"Clear career roadmap provided."</p>
                <p className="text-xs text-blue-600">- Priya S.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;