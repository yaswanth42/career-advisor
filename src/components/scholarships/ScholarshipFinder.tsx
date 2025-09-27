import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Award, 
  Calendar, 
  IndianRupee,
  ExternalLink,
  Clock,
  Users,
  BookOpen
} from 'lucide-react';
import { Scholarship } from '../../types';

const ScholarshipFinder: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    amount: 'all',
    category: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [appliedScholarships, setAppliedScholarships] = useState<string[]>([]);

  useEffect(() => {
    // Mock scholarship data with Indian scholarships, including Jammu & Kashmir and other notable scholarships
    const mockScholarships: Scholarship[] = [
      {
        id: '1',
        name: 'Jammu & Kashmir Post-Matric Scholarship',
        provider: 'Social Welfare Department, J&K',
        type: 'government',
        amount: 30000,
        eligibility_criteria: {
          'Domicile': 'Jammu & Kashmir',
          'Course': 'Class 11 to PhD',
          'Income': 'Family income below ₹2.5 lakhs per annum',
          'Category': 'SC/ST/OBC/EBC/Minorities'
        },
        application_deadline: '2024-10-31',
        description: 'Scholarship for students of Jammu & Kashmir pursuing post-matric studies in India.',
        requirements: [
          'Domicile certificate',
          'Income certificate',
          'Caste certificate',
          'Academic mark sheets',
          'Bank account details'
        ],
        application_link: 'https://jk.gov.in/scholarships',
        tags: ['Jammu & Kashmir', 'Post-Matric', 'Government']
      },
      {
        id: '2',
        name: 'Prime Minister’s Special Scholarship Scheme (PMSSS)',
        provider: 'AICTE',
        type: 'government',
        amount: 120000,
        eligibility_criteria: {
          'Domicile': 'Jammu & Kashmir, Ladakh',
          'Course': 'Professional UG courses',
          'Income': 'Family income below ₹8 lakhs per annum',
          'Marks': 'Minimum 50% in Class 12'
        },
        application_deadline: '2024-09-15',
        description: 'Special scholarship for J&K and Ladakh students to pursue undergraduate studies outside the region.',
        requirements: [
          'Domicile certificate',
          'Class 12 mark sheet',
          'Income certificate',
          'Admission proof',
          'Bank account details'
        ],
        application_link: 'https://aicte-india.org/bureaus/jk',
        tags: ['Jammu & Kashmir', 'Ladakh', 'PMSSS', 'Government']
      },
      {
        id: '3',
        name: 'National Merit Scholarship',
        provider: 'Government of India',
        type: 'government',
        amount: 50000,
        eligibility_criteria: {
          'Minimum Marks': '80% in Class 12',
          'Family Income': 'Below ₹8 lakhs per annum',
          'Category': 'Open to all',
          'Course': 'Any undergraduate program'
        },
        application_deadline: '2024-04-30',
        description: 'Merit-based scholarship for outstanding students pursuing undergraduate studies in recognized institutions.',
        requirements: [
          'Class 12 mark sheet',
          'Income certificate',
          'Admission proof',
          'Bank account details',
          'Passport size photographs'
        ],
        application_link: 'https://scholarships.gov.in',
        tags: ['Merit-based', 'Undergraduate', 'All Courses']
      },
      {
        id: '4',
        name: 'INSPIRE Scholarship',
        provider: 'Department of Science & Technology',
        type: 'government',
        amount: 80000,
        eligibility_criteria: {
          'Course': 'B.Sc./B.S./Int. M.S./M.Sc. in Natural Sciences',
          'Rank': 'Top 1% in Class 12 Board Exam',
          'Age Limit': '17-22 years',
          'Commitment': '5 years in R&D after graduation'
        },
        application_deadline: '2024-05-15',
        description: 'Scholarship to attract students towards science and research through early identification of talent.',
        requirements: [
          'Class 12 mark sheet (Science subjects)',
          'Admission letter from recognized institution',
          'Undertaking for R&D commitment',
          'Medical certificate',
          'Character certificate'
        ],
        application_link: 'http://online-inspire.gov.in',
        tags: ['Science', 'Research', 'Government']
      },
      {
        id: '5',
        name: 'Kishore Vaigyanik Protsahan Yojana',
        provider: 'Indian Institute of Science',
        type: 'institutional',
        amount: 70000,
        eligibility_criteria: {
          'Course': 'Science stream (Math/Physics/Chemistry/Biology)',
          'Exam': 'KVPY examination qualified',
          'Class': 'Students in Class 11, 12 or 1st year UG',
          'Citizenship': 'Indian citizens only'
        },
        application_deadline: '2024-03-31',
        description: 'Fellowship program to identify and encourage students with research aptitude in basic sciences.',
        requirements: [
          'KVPY examination qualification',
          'Academic transcripts',
          'Research proposal (for senior students)',
          'Recommendation letters',
          'Medical fitness certificate'
        ],
        application_link: 'http://www.kvpy.iisc.ernet.in',
        tags: ['Science', 'Research', 'Fellowship']
      },
      {
        id: '6',
        name: 'Central Sector Scheme',
        provider: 'Ministry of Education',
        type: 'government',
        amount: 20000,
        eligibility_criteria: {
          'Income': 'Family income below ₹4.5 lakhs per annum',
          'Marks': 'Above 80% in qualifying examination',
          'Course': 'Regular courses in recognized institutions',
          'Category': 'General, OBC, SC, ST categories'
        },
        application_deadline: '2024-06-30',
        description: 'Need-cum-merit based scholarship for students from economically weaker sections.',
        requirements: [
          'Income certificate (below ₹4.5 lakhs)',
          'Academic mark sheets',
          'Caste certificate (if applicable)',
          'Bank account proof',
          'Institution verification'
        ],
        application_link: 'https://scholarships.gov.in',
        tags: ['Need-based', 'Merit-based', 'Government']
      },
      {
        id: '7',
        name: 'Reliance Foundation Scholarship',
        provider: 'Reliance Foundation',
        type: 'private',
        amount: 200000,
        eligibility_criteria: {
          'Course': 'Undergraduate programs',
          'Marks': 'Minimum 60% in Class 12',
          'Income': 'Family income below ₹15 lakhs per annum',
          'Selection': 'Based on merit and need'
        },
        application_deadline: '2024-07-15',
        description: 'Comprehensive scholarship supporting students with academic excellence and financial need.',
        requirements: [
          'Academic transcripts',
          'Income proof',
          'Personal essay',
          'Recommendation letters',
          'Community service certificate'
        ],
        application_link: 'https://www.reliancefoundation.org',
        tags: ['Private', 'Comprehensive', 'Need-based']
      },
      {
        id: '8',
        name: 'Aditya Birla Scholarship',
        provider: 'Aditya Birla Group',
        type: 'private',
        amount: 175000,
        eligibility_criteria: {
          'Course': 'Engineering from IIT/BITS or Management from IIM',
          'Performance': 'Top performers in entrance exams',
          'Leadership': 'Demonstrated leadership qualities',
          'Character': 'Strong ethical values'
        },
        application_deadline: '2024-05-30',
        description: 'Prestigious scholarship for high-achieving students in premier institutions with leadership potential.',
        requirements: [
          'JEE/CAT scorecard',
          'Academic transcripts',
          'Leadership portfolio',
          'Personal interview',
          'Character references'
        ],
        application_link: 'https://scholarship.adityabirlascience.org',
        tags: ['Prestigious', 'Leadership', 'IIT/IIM']
      }
    ];
    setScholarships(mockScholarships);
    setFilteredScholarships(mockScholarships);
  }, []);

  useEffect(() => {
    let filtered = scholarships;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(scholarship => scholarship.type === filters.type);
    }

    // Amount filter
    if (filters.amount !== 'all') {
      filtered = filtered.filter(scholarship => {
        switch (filters.amount) {
          case 'low': return scholarship.amount < 50000;
          case 'medium': return scholarship.amount >= 50000 && scholarship.amount < 100000;
          case 'high': return scholarship.amount >= 100000;
          default: return true;
        }
      });
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(scholarship =>
        scholarship.tags.some(tag => 
          tag.toLowerCase().includes(filters.category.toLowerCase())
        )
      );
    }

    setFilteredScholarships(filtered);
  }, [searchTerm, filters, scholarships]);

  const handleApply = (scholarshipId: string) => {
    setAppliedScholarships(prev => [...prev, scholarshipId]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      case 'institutional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (days: number) => {
    if (days < 7) return 'text-red-600 bg-red-50';
    if (days < 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Finder</h1>
        <p className="text-gray-600">Find financial aid opportunities for your education</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search scholarships, providers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Types</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="institutional">Institutional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                <select
                  value={filters.amount}
                  onChange={(e) => setFilters({...filters, amount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Amounts</option>
                  <option value="low">Under ₹50,000</option>
                  <option value="medium">₹50,000 - ₹1,00,000</option>
                  <option value="high">Above ₹1,00,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="merit">Merit-based</option>
                  <option value="need">Need-based</option>
                  <option value="science">Science & Research</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          Found {filteredScholarships.length} scholarships matching your criteria
        </span>
        <div className="text-sm text-gray-600">
          Applied to: {appliedScholarships.length} scholarships
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="space-y-6">
        {filteredScholarships.map((scholarship) => {
          const daysLeft = getDaysUntilDeadline(scholarship.application_deadline);
          const isApplied = appliedScholarships.includes(scholarship.id);
          
          return (
            <div key={scholarship.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(scholarship.type)}`}>
                      {scholarship.type}
                    </span>
                  </div>
                  <p className="text-gray-600">{scholarship.provider}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {(scholarship.amount / 1000).toFixed(0)}K
                  </div>
                  <p className="text-sm text-gray-600">per year</p>
                </div>
              </div>

              {/* Deadline Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDeadlineColor(daysLeft)}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{scholarship.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {scholarship.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Eligibility Criteria */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Eligibility Criteria</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(scholarship.eligibility_criteria).slice(0, 4).map(([key, value], index) => (
                    <div key={index} className="flex">
                      <span className="font-medium text-gray-700 w-24 flex-shrink-0">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements Preview */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                <div className="text-sm text-gray-600">
                  {scholarship.requirements.slice(0, 3).join(', ')}
                  {scholarship.requirements.length > 3 && ` and ${scholarship.requirements.length - 3} more...`}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium">
                    View Details
                  </button>
                  {isApplied ? (
                    <button 
                      disabled
                      className="bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                    >
                      Applied ✓
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleApply(scholarship.id)}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Deadline: {new Date(scholarship.application_deadline).toLocaleDateString()}
                  </div>
                  <a 
                    href={scholarship.application_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Official Link
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ScholarshipFinder;