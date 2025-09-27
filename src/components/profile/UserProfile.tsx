import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3,
  Save,
  X,
  Award,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  grade: string;
  interests: string[];
  academicScores: { [key: string]: number };
  careerGoals: string[];
  bio: string;
}

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    dateOfBirth: '',
    grade: 'Class 12',
    interests: ['Technology', 'Science'],
    academicScores: {
      'Mathematics': 95,
      'Physics': 92,
      'Chemistry': 89,
      'English': 88
    },
    careerGoals: ['Software Engineering', 'Data Science'],
    bio: 'Aspiring engineer with keen interest in technology and innovation.'
  });

  const [newInterest, setNewInterest] = useState('');
  const [newCareerGoal, setNewCareerGoal] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleScoreChange = (subject: string, score: number) => {
    setFormData({
      ...formData,
      academicScores: {
        ...formData.academicScores,
        [subject]: score
      }
    });
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const addCareerGoal = () => {
    if (newCareerGoal.trim() && !formData.careerGoals.includes(newCareerGoal.trim())) {
      setFormData({
        ...formData,
        careerGoals: [...formData.careerGoals, newCareerGoal.trim()]
      });
      setNewCareerGoal('');
    }
  };

  const removeCareerGoal = (goal: string) => {
    setFormData({
      ...formData,
      careerGoals: formData.careerGoals.filter(g => g !== goal)
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const calculateOverallScore = () => {
    const scores = Object.values(formData.academicScores);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{formData.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.name}</h1>
              <p className="text-blue-100 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Personal Information
              </h2>
              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{formData.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formData.phone || 'Not provided'}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formData.location || 'Not provided'}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formData.dateOfBirth || 'Not provided'}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Grade</label>
                {isEditing ? (
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{formData.grade}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.bio}</p>
              )}
            </div>
          </div>

          {/* Academic Scores */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Academic Performance
            </h3>
            <div className="space-y-4">
              {Object.entries(formData.academicScores).map(([subject, score]) => (
                <div key={subject} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{subject}</span>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => handleScoreChange(subject, parseInt(e.target.value) || 0)}
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-10 text-right">{score}%</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">Overall Average</span>
                  <span className="text-xl font-bold text-green-600">{calculateOverallScore()}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Interests */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Interests
            </h3>
            <div className="space-y-2">
              {formData.interests.map((interest, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded-lg">
                  <span className="text-purple-800">{interest}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add interest"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={addInterest}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Career Goals */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-500" />
              Career Goals
            </h3>
            <div className="space-y-2">
              {formData.careerGoals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-lg">
                  <span className="text-orange-800">{goal}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeCareerGoal(goal)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCareerGoal}
                    onChange={(e) => setNewCareerGoal(e.target.value)}
                    placeholder="Add career goal"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={addCareerGoal}
                    className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Achievements
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Academic Excellence</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">Scored 95%+ in Mathematics</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Science Olympiad</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">State level qualifier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;