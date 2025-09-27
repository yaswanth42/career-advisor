import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  School,
  Award,
  MessageSquare,
  BookOpen,
  User,
  Brain,
  Users,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const studentNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/aptitude', icon: Brain, label: 'Aptitude Test' },
    { to: '/colleges', icon: School, label: 'Colleges' },
    { to: '/scholarships', icon: Award, label: 'Scholarships' },
    { to: '/forum', icon: MessageSquare, label: 'Community' },
    { to: '/resources', icon: BookOpen, label: 'Learning Hub' },
    { to: '/career', icon: Briefcase, label: 'Career Path' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const mentorNavItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'My Students' },
    { to: '/forum', icon: MessageSquare, label: 'Community' },
    { to: '/resources', icon: BookOpen, label: 'Resources' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const navItems = user?.role === 'student' ? studentNavItems : mentorNavItems;

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white shadow-lg z-40">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;