import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Award,
  Brain,
  Users
} from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const quickActions = [
    {
      icon: Brain,
      label: 'Career Guidance',
      message: 'I need career guidance. What are the best career options for me?',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      icon: GraduationCap,
      label: 'College Selection',
      message: 'Help me choose the right college and course for my career goals.',
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      icon: BookOpen,
      label: 'Study Tips',
      message: 'Give me effective study tips and exam preparation strategies.',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    {
      icon: Award,
      label: 'Scholarships',
      message: 'What scholarship opportunities are available for students like me?',
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    },
    {
      icon: Briefcase,
      label: 'Job Market',
      message: 'Tell me about current job market trends and salary expectations.',
      color: 'bg-red-100 text-red-700 hover:bg-red-200'
    },
    {
      icon: Users,
      label: 'Stream Selection',
      message: 'Help me choose the right stream after Class 10 based on my interests.',
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
    }
  ];

  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</h4>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.message)}
            className={`flex items-center space-x-2 p-2 rounded-lg text-xs transition-colors ${action.color}`}
          >
            <action.icon className="w-4 h-4" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;