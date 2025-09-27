import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import StudentDashboard from './components/dashboard/StudentDashboard';
import MentorDashboard from './components/dashboard/MentorDashboard';
import AptitudeTest from './components/aptitude/AptitudeTest';
import CollegeFinder from './components/colleges/CollegeFinder';
import CareerMapping from './components/career/CareerMapping';
import CareerPath from './components/career/CareerPath';
import ScholarshipFinder from './components/scholarships/ScholarshipFinder';
import CommunityForum from './components/forum/CommunityForum';
import LearningHub from './components/resources/LearningHub';
import UserProfile from './components/profile/UserProfile';
import LoadingSpinner from './components/common/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRoute: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'student') {
    return <StudentDashboard />;
  } else if (user?.role === 'mentor') {
    return <MentorDashboard />;
  }
  
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardRoute />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/aptitude" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <AptitudeTest />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/colleges" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <CollegeFinder />
                  </Layout>
                </ProtectedRoute>
              } 
            />
              <Route 
                path="/career-mapping" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CareerMapping />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/career" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CareerPath />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            <Route 
              path="/scholarships" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <ScholarshipFinder />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forum" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <CommunityForum />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <LearningHub />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserProfile />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <MentorDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;