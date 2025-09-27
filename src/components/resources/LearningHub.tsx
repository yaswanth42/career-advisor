import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  Play,
  FileText,
  Video,
  Link,
  Star,
  Clock
} from 'lucide-react';
import { LearningResource } from '../../types';

const LearningHub: React.FC = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadedResources, setDownloadedResources] = useState<string[]>([]);

  useEffect(() => {
    // Mock learning resources data
    const mockResources: LearningResource[] = [
      {
        id: '1',
        title: 'Complete Guide to JEE Mathematics',
        description: 'Comprehensive mathematics preparation guide for JEE Main and Advanced with solved examples and practice problems.',
        type: 'ebook',
        category: 'Engineering',
        provider: 'IIT Delhi',
        url: 'https://iitd.ac.in/resources/jee-math-guide',
        download_url: 'https://iitd.ac.in/downloads/jee-math-guide.pdf',
        rating: 4.8,
        tags: ['mathematics', 'jee', 'engineering', 'entrance-exam'],
        created_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'NEET Biology Video Lectures',
        description: 'High-quality video lectures covering entire NEET Biology syllabus by experienced faculty from AIIMS.',
        type: 'video',
        category: 'Medical',
        provider: 'AIIMS Delhi',
        url: 'https://aiims.edu/neet-biology-lectures',
        rating: 4.9,
        tags: ['biology', 'neet', 'medical', 'video-lectures'],
        created_at: '2024-01-20T00:00:00Z'
      },
      {
        id: '3',
        title: 'Python Programming for Beginners',
        description: 'Learn Python programming from scratch with hands-on examples and projects. Perfect for students entering tech field.',
        type: 'course',
        category: 'Technology',
        provider: 'IIT Kharagpur',
        url: 'https://nptel.ac.in/courses/106105077',
        rating: 4.7,
        tags: ['python', 'programming', 'technology', 'beginners'],
        created_at: '2024-02-01T00:00:00Z'
      },
      {
        id: '4',
        title: 'Financial Accounting Fundamentals',
        description: 'Complete guide to financial accounting principles and practices for commerce students.',
        type: 'ebook',
        category: 'Commerce',
        provider: 'Delhi School of Economics',
        url: 'https://dse.du.ac.in/accounting-guide',
        download_url: 'https://dse.du.ac.in/downloads/accounting-fundamentals.pdf',
        rating: 4.5,
        tags: ['accounting', 'finance', 'commerce', 'business'],
        created_at: '2024-02-10T00:00:00Z'
      },
      {
        id: '5',
        title: 'Physics Concepts and Problem Solving',
        description: 'Master physics concepts with step-by-step problem-solving techniques for Class 11 and 12.',
        type: 'article',
        category: 'Science',
        provider: 'NCERT',
        url: 'https://ncert.nic.in/physics-concepts',
        rating: 4.6,
        tags: ['physics', 'science', 'problem-solving', 'ncert'],
        created_at: '2024-02-15T00:00:00Z'
      },
      {
        id: '6',
        title: 'English Literature Analysis',
        description: 'Detailed analysis of major English literature works for humanities students.',
        type: 'ebook',
        category: 'Arts',
        provider: 'Jawaharlal Nehru University',
        url: 'https://jnu.ac.in/literature-analysis',
        download_url: 'https://jnu.ac.in/downloads/literature-guide.pdf',
        rating: 4.4,
        tags: ['literature', 'english', 'arts', 'humanities'],
        created_at: '2024-02-20T00:00:00Z'
      },
      {
        id: '7',
        title: 'Data Structures and Algorithms',
        description: 'Complete course on DSA with coding examples in multiple programming languages.',
        type: 'course',
        category: 'Technology',
        provider: 'IIT Bombay',
        url: 'https://nptel.ac.in/courses/106101061',
        rating: 4.8,
        tags: ['data-structures', 'algorithms', 'programming', 'computer-science'],
        created_at: '2024-02-25T00:00:00Z'
      },
      {
        id: '8',
        title: 'Organic Chemistry Made Easy',
        description: 'Simplified approach to organic chemistry with reaction mechanisms and examples.',
        type: 'video',
        category: 'Science',
        provider: 'IIT Kanpur',
        url: 'https://iitk.ac.in/organic-chemistry-videos',
        rating: 4.7,
        tags: ['chemistry', 'organic', 'science', 'reactions'],
        created_at: '2024-03-01T00:00:00Z'
      }
    ];
    
    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  useEffect(() => {
    let filtered = resources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        resource.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedType, selectedCategory, resources]);

  const handleDownload = (resourceId: string, downloadUrl?: string) => {
    if (downloadUrl) {
      // In a real app, this would trigger actual download
      setDownloadedResources(prev => [...prev, resourceId]);
      window.open(downloadUrl, '_blank');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return FileText;
      case 'video': return Video;
      case 'course': return Play;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'course': return 'bg-green-100 text-green-800';
      case 'article': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['all', 'Engineering', 'Medical', 'Technology', 'Commerce', 'Science', 'Arts'];
  const types = ['all', 'ebook', 'video', 'course', 'article'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Access quality educational resources curated for your success</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources, topics, or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.filter(r => r.rating >= 4.8).slice(0, 3).map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TypeIcon className="w-5 h-5 text-blue-600" />
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{resource.rating}</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{resource.provider}</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Resource →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600">
          Found {filteredResources.length} resources
        </span>
        <div className="text-sm text-gray-600">
          Downloaded: {downloadedResources.length} resources
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const TypeIcon = getTypeIcon(resource.type);
          const isDownloaded = downloadedResources.includes(resource.id);
          
          return (
            <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <TypeIcon className="w-5 h-5 text-blue-600" />
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{resource.rating}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{resource.description}</p>
              
              {/* Provider and Category */}
              <div className="flex items-center justify-between mb-3 text-sm">
                <span className="text-gray-600">{resource.provider}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {resource.category}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="text-blue-600 text-xs">+{resource.tags.length - 3}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </a>
                  {resource.download_url && (
                    <button
                      onClick={() => handleDownload(resource.id, resource.download_url)}
                      disabled={isDownloaded}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        isDownloaded
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(resource.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* External Learning Platforms */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Learning Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="https://swayam.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">SWAYAM</h3>
              <p className="text-sm text-gray-600">Government courses</p>
            </div>
          </a>
          
          <a
            href="https://nptel.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">NPTEL</h3>
              <p className="text-sm text-gray-600">IIT/IISc courses</p>
            </div>
          </a>
          
          <a
            href="https://coursera.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Coursera</h3>
              <p className="text-sm text-gray-600">University courses</p>
            </div>
          </a>
          
          <a
            href="https://khanacademy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Khan Academy</h3>
              <p className="text-sm text-gray-600">Free learning</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;