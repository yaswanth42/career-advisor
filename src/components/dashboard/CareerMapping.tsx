import React from 'react';

const CareerMapping: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Career Mapping</h1>
      <p className="text-gray-700 mb-6">Explore all career opportunities after 10th and 12th standard. Find the best paths for your interests, skills, and goals!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">After 10th Standard</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Diploma Courses (Engineering, Polytechnic, Design, etc.)</li>
            <li>ITI (Industrial Training Institute) Programs</li>
            <li>Science, Commerce, Arts Streams (11th & 12th)</li>
            <li>Vocational Courses</li>
            <li>Paramedical Courses</li>
            <li>Skill Development Programs</li>
            <li>Open Schooling</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">After 12th Standard</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Bachelor's Degrees (BA, BSc, BCom, BBA, BCA, B.Tech, MBBS, etc.)</li>
            <li>Professional Courses (CA, CS, Law, Design, Hotel Management, etc.)</li>
            <li>Paramedical & Allied Health Sciences</li>
            <li>Defence Services (NDA, Navy, Air Force)</li>
            <li>Government Exams (SSC, UPSC, Banking, etc.)</li>
            <li>Skill Development & Certification Programs</li>
            <li>Entrepreneurship & Startups</li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">How to Choose?</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Assess your interests, strengths, and career goals</li>
          <li>Research eligibility, entrance exams, and future scope</li>
          <li>Talk to mentors, teachers, and professionals</li>
          <li>Explore aptitude tests and career guidance resources</li>
        </ul>
      </div>
    </div>
  );
};

export default CareerMapping;
