import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  ThumbsDown,
  Reply,
  Search,
  Filter,
  Trophy,
  Clock,
  User,
  CheckCircle
} from 'lucide-react';
import { ForumPost, ForumReply } from '../../types';
import { useAuth } from '../../context/AuthContext';

const CommunityForum: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: MessageSquare },
    { id: 'engineering', name: 'Engineering', icon: MessageSquare },
    { id: 'medical', name: 'Medical', icon: MessageSquare },
    { id: 'commerce', name: 'Commerce', icon: MessageSquare },
    { id: 'science', name: 'Science', icon: MessageSquare },
    { id: 'arts', name: 'Arts & Humanities', icon: MessageSquare },
    { id: 'career-guidance', name: 'Career Guidance', icon: MessageSquare },
    { id: 'college-admission', name: 'College Admission', icon: MessageSquare },
    { id: 'scholarships', name: 'Scholarships', icon: MessageSquare }
  ];

  useEffect(() => {
    // Mock forum posts with Indian context
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Should I choose Computer Science or Information Technology?',
        content: 'I\'m confused between CSE and IT branches in engineering. Can someone explain the key differences and career prospects for both? I have JEE rank of 25000.',
        author_id: 'user1',
        author_name: 'Arjun Kumar',
        author_role: 'student',
        category: 'engineering',
        tags: ['computer-science', 'information-technology', 'career-choice'],
        votes: 15,
        replies_count: 8,
        created_at: '2024-03-10T10:30:00Z',
        updated_at: '2024-03-10T10:30:00Z',
        is_solved: false
      },
      {
        id: '2',
        title: 'Best preparation strategy for NEET 2024',
        content: 'I am in Class 12 and planning to appear for NEET 2024. Can experienced students or mentors share their preparation strategies? Which books and coaching materials worked best?',
        author_id: 'user2',
        author_name: 'Priya Singh',
        author_role: 'student',
        category: 'medical',
        tags: ['neet', 'preparation', 'study-tips'],
        votes: 32,
        replies_count: 15,
        created_at: '2024-03-09T14:20:00Z',
        updated_at: '2024-03-09T14:20:00Z',
        is_solved: true
      },
      {
        id: '3',
        title: 'Career options after B.Com apart from MBA',
        content: 'I am pursuing B.Com and everyone suggests MBA. But I want to explore other career options. Can someone guide me about professional courses and job opportunities in commerce field?',
        author_id: 'user3',
        author_name: 'Rohit Sharma',
        author_role: 'student',
        category: 'commerce',
        tags: ['bcom', 'career-options', 'professional-courses'],
        votes: 8,
        replies_count: 6,
        created_at: '2024-03-08T16:45:00Z',
        updated_at: '2024-03-08T16:45:00Z',
        is_solved: false
      },
      {
        id: '4',
        title: 'How to get internships in data science field?',
        content: 'I am a final year student with good knowledge of Python, SQL, and machine learning. But I\'m unable to get internships in data science. Any tips for resume building and interview preparation?',
        author_id: 'user4',
        author_name: 'Sneha Patel',
        author_role: 'student',
        category: 'career-guidance',
        tags: ['internships', 'data-science', 'resume-tips'],
        votes: 22,
        replies_count: 12,
        created_at: '2024-03-07T11:15:00Z',
        updated_at: '2024-03-07T11:15:00Z',
        is_solved: false
      },
      {
        id: '5',
        title: 'Government colleges vs Private colleges for engineering',
        content: 'I got admission in both NIT and a top private college. The fees difference is huge. Can someone help me understand the pros and cons of both options?',
        author_id: 'user5',
        author_name: 'Vijay Krishna',
        author_role: 'student',
        category: 'college-admission',
        tags: ['nit', 'private-college', 'engineering'],
        votes: 18,
        replies_count: 10,
        created_at: '2024-03-06T09:30:00Z',
        updated_at: '2024-03-06T09:30:00Z',
        is_solved: false
      }
    ];

    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          votes: voteType === 'up' ? post.votes + 1 : post.votes - 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author_id: user?.id || '',
      author_name: user?.name || '',
      author_role: user?.role || 'student',
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      votes: 0,
      replies_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_solved: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'general', tags: '' });
    setShowNewPostModal(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'engineering': 'bg-blue-100 text-blue-800',
      'medical': 'bg-green-100 text-green-800',
      'commerce': 'bg-yellow-100 text-yellow-800',
      'science': 'bg-purple-100 text-purple-800',
      'arts': 'bg-pink-100 text-pink-800',
      'career-guidance': 'bg-indigo-100 text-indigo-800',
      'college-admission': 'bg-red-100 text-red-800',
      'scholarships': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect, learn, and grow with fellow students and mentors</p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Top Contributors */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="ml-1 text-sm font-medium">Dr. Ravi Kumar</span>
                  </div>
                  <span className="text-xs text-gray-500">Mentor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm font-medium">Ananya Gupta</span>
                  </div>
                  <span className="text-xs text-gray-500">Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {post.author_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{post.author_name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.author_role === 'mentor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {post.author_role}
                        </span>
                        {post.is_solved && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{timeAgo(post.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category.replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <span className="font-medium">{post.votes}</span>
                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Reply className="w-4 h-4" />
                      <span>{post.replies_count} replies</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search or create a new post</p>
            </div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your question or topic..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  {categories.filter(cat => cat.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your question or topic in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas (e.g., engineering, career, advice)"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;