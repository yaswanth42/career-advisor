import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

// Define the type for a college
export interface College {
  id: string;
  name: string;
  type: 'government' | 'private' | 'deemed';
  location: string;
  stream: 'Medical' | 'Engineering' | 'Arts' | 'Commerce' | 'Science' | 'Law' | 'Management' | 'Pharmacy' | 'Dental' | 'Nursing' | 'Architecture' | 'Agriculture' | 'Veterinary' | 'Education';
  totalSeats: number;
  reservedSeats: number | string;
  courses: string[];
  website: string;
  ranking?: number;
  fees?: string;
}

const CollegeFinder: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    course: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedColleges, setSavedColleges] = useState<string[]>([]);

  useEffect(() => {
    const mockColleges: College[] = [
      // Medical Colleges
      { id: '1', name: 'SMS Medical College, Jaipur', type: 'government', location: 'Rajasthan', stream: 'Medical', totalSeats: 250, reservedSeats: 38, courses: ['MBBS'], website: 'https://education.rajasthan.gov.in/smsmcjaipur', ranking: 15, fees: '₹50,000/year' },
      { id: '2', name: 'AIIMS Delhi', type: 'government', location: 'Delhi', stream: 'Medical', totalSeats: 125, reservedSeats: 'All-India', courses: ['MBBS'], website: 'https://www.aiims.edu', ranking: 1, fees: '₹5,856/year' },
      { id: '3', name: 'Christian Medical College, Vellore', type: 'private', location: 'Tamil Nadu', stream: 'Medical', totalSeats: 100, reservedSeats: 'Merit-based', courses: ['MBBS'], website: 'https://www.cmch-vellore.edu', ranking: 2, fees: '₹95,000/year' },
      
      // Engineering Colleges
      { id: '4', name: 'IIT Bombay', type: 'government', location: 'Maharashtra', stream: 'Engineering', totalSeats: 1200, reservedSeats: 'All-India', courses: ['B.Tech', 'M.Tech'], website: 'https://www.iitb.ac.in', ranking: 1, fees: '₹2,15,000/year' },
      { id: '5', name: 'IIT Delhi', type: 'government', location: 'Delhi', stream: 'Engineering', totalSeats: 1100, reservedSeats: 'All-India', courses: ['B.Tech', 'M.Tech'], website: 'https://home.iitd.ac.in', ranking: 2, fees: '₹2,15,000/year' },
      { id: '6', name: 'NIT Trichy', type: 'government', location: 'Tamil Nadu', stream: 'Engineering', totalSeats: 900, reservedSeats: 'All-India', courses: ['B.Tech', 'M.Tech'], website: 'https://www.nitt.edu', ranking: 8, fees: '₹1,35,000/year' },
      
      // Commerce & Management
      { id: '7', name: 'Shri Ram College of Commerce, Delhi', type: 'government', location: 'Delhi', stream: 'Commerce', totalSeats: 600, reservedSeats: 200, courses: ['B.Com', 'B.Com (Hons)'], website: 'https://www.srcc.edu', ranking: 1, fees: '₹25,000/year' },
      { id: '8', name: 'Lady Shri Ram College for Women', type: 'government', location: 'Delhi', stream: 'Commerce', totalSeats: 500, reservedSeats: 150, courses: ['B.Com', 'Economics (Hons)'], website: 'https://lsr.edu.in', ranking: 2, fees: '₹22,000/year' },
      { id: '9', name: 'IIM Ahmedabad', type: 'government', location: 'Gujarat', stream: 'Management', totalSeats: 395, reservedSeats: 'All-India', courses: ['MBA', 'PGDM'], website: 'https://www.iima.ac.in', ranking: 1, fees: '₹25,00,000/2 years' },
      { id: '10', name: 'IIM Bangalore', type: 'government', location: 'Karnataka', stream: 'Management', totalSeats: 460, reservedSeats: 'All-India', courses: ['MBA', 'EPGP'], website: 'https://www.iimb.ac.in', ranking: 2, fees: '₹24,50,000/2 years' },
      
      // Arts & Humanities
      { id: '11', name: 'Hindu College, Delhi', type: 'government', location: 'Delhi', stream: 'Arts', totalSeats: 1200, reservedSeats: 400, courses: ['BA (Hons) English', 'BA (Hons) History', 'BA (Hons) Political Science'], website: 'https://www.hinducollege.ac.in', ranking: 3, fees: '₹20,000/year' },
      { id: '12', name: 'St. Stephen\'s College, Delhi', type: 'private', location: 'Delhi', stream: 'Arts', totalSeats: 800, reservedSeats: 250, courses: ['BA (Hons) English', 'BA (Hons) Philosophy'], website: 'https://www.ststephens.edu', ranking: 1, fees: '₹85,000/year' },
      { id: '13', name: 'Presidency University, Kolkata', type: 'government', location: 'West Bengal', stream: 'Arts', totalSeats: 900, reservedSeats: 300, courses: ['BA (Hons) English', 'BA (Hons) Bengali'], website: 'https://www.presiuniv.ac.in', ranking: 5, fees: '₹18,000/year' },
      
  // Science
  { id: '14', name: 'St. Xavier\'s College, Mumbai', type: 'private', location: 'Maharashtra', stream: 'Science', totalSeats: 800, reservedSeats: 200, courses: ['BSc Physics', 'BSc Chemistry', 'BSc Mathematics'], website: 'https://xaviers.edu', ranking: 4, fees: '₹45,000/year' },
  { id: '15', name: 'Loyola College, Chennai', type: 'private', location: 'Tamil Nadu', stream: 'Science', totalSeats: 600, reservedSeats: 150, courses: ['BSc Physics', 'BSc Biotechnology'], website: 'https://www.loyolacollege.edu', ranking: 6, fees: '₹40,000/year' },
  { id: '16', name: 'Fergusson College, Pune', type: 'government', location: 'Maharashtra', stream: 'Science', totalSeats: 1000, reservedSeats: 350, courses: ['BSc Chemistry', 'BSc Botany'], website: 'https://fergusson.edu', ranking: 12, fees: '₹25,000/year' },
      
  // Law
  { id: '17', name: 'National Law School, Bangalore', type: 'government', location: 'Karnataka', stream: 'Law', totalSeats: 100, reservedSeats: 35, courses: ['BA LLB', 'LLM'], website: 'https://www.nls.ac.in', ranking: 1, fees: '₹2,50,000/year' },
  { id: '18', name: 'Nalsar University of Law, Hyderabad', type: 'government', location: 'Telangana', stream: 'Law', totalSeats: 120, reservedSeats: 40, courses: ['BA LLB', 'BBA LLB'], website: 'https://www.nalsar.ac.in', ranking: 2, fees: '₹2,00,000/year' },
  { id: '19', name: 'Gujarat National Law University', type: 'government', location: 'Gujarat', stream: 'Law', totalSeats: 180, reservedSeats: 65, courses: ['BA LLB', 'BBA LLB'], website: 'https://www.gnlu.ac.in', ranking: 3, fees: '₹1,80,000/year' },
      
  // Pharmacy
  { id: '20', name: 'Jamia Hamdard, Delhi', type: 'deemed', location: 'Delhi', stream: 'Pharmacy', totalSeats: 120, reservedSeats: 40, courses: ['B.Pharm', 'M.Pharm'], website: 'https://jamiahamdard.edu', ranking: 2, fees: '₹1,50,000/year' },
  { id: '21', name: 'Manipal College of Pharmaceutical Sciences', type: 'private', location: 'Karnataka', stream: 'Pharmacy', totalSeats: 180, reservedSeats: 'Merit-based', courses: ['B.Pharm', 'Pharm.D'], website: 'https://manipal.edu/mcops.html', ranking: 3, fees: '₹2,80,000/year' },
  { id: '22', name: 'Institute of Chemical Technology, Mumbai', type: 'government', location: 'Maharashtra', stream: 'Pharmacy', totalSeats: 60, reservedSeats: 20, courses: ['B.Pharm', 'M.Pharm'], website: 'https://www.ictmumbai.edu.in', ranking: 1, fees: '₹85,000/year' },
      
  // Dental
  { id: '23', name: 'Maulana Azad Institute of Dental Sciences', type: 'government', location: 'Delhi', stream: 'Dental', totalSeats: 100, reservedSeats: 35, courses: ['BDS', 'MDS'], website: 'https://www.maids.ac.in', ranking: 1, fees: '₹25,000/year' },
  { id: '24', name: 'Government Dental College, Trivandrum', type: 'government', location: 'Kerala', stream: 'Dental', totalSeats: 100, reservedSeats: 35, courses: ['BDS'], website: 'https://gdctvm.org', ranking: 5, fees: '₹30,000/year' },
  { id: '25', name: 'AB Shetty Memorial Institute of Dental Sciences', type: 'private', location: 'Karnataka', stream: 'Dental', totalSeats: 150, reservedSeats: 'Merit-based', courses: ['BDS', 'MDS'], website: 'https://absmids.edu.in', ranking: 8, fees: '₹4,50,000/year' },
      
  // Nursing
  { id: '26', name: 'AIIMS College of Nursing, Delhi', type: 'government', location: 'Delhi', stream: 'Nursing', totalSeats: 60, reservedSeats: 20, courses: ['BSc Nursing', 'MSc Nursing'], website: 'https://www.aiims.edu/en/nursing.html', ranking: 1, fees: '₹15,000/year' },
  { id: '27', name: 'Christian Medical College, Vellore - Nursing', type: 'private', location: 'Tamil Nadu', stream: 'Nursing', totalSeats: 80, reservedSeats: 'Merit-based', courses: ['BSc Nursing'], website: 'https://www.cmch-vellore.edu', ranking: 2, fees: '₹85,000/year' },
  { id: '28', name: 'Kasturba Gandhi Nursing College, Delhi', type: 'government', location: 'Delhi', stream: 'Nursing', totalSeats: 40, reservedSeats: 15, courses: ['BSc Nursing'], website: 'https://www.kgnc.edu.in', ranking: 4, fees: '₹18,000/year' },
      
  // Architecture
  { id: '29', name: 'School of Planning and Architecture, Delhi', type: 'government', location: 'Delhi', stream: 'Architecture', totalSeats: 120, reservedSeats: 40, courses: ['B.Arch', 'M.Arch'], website: 'https://spa.ac.in', ranking: 1, fees: '₹85,000/year' },
  { id: '30', name: 'CEPT University, Ahmedabad', type: 'deemed', location: 'Gujarat', stream: 'Architecture', totalSeats: 180, reservedSeats: 'All-India', courses: ['B.Arch', 'M.Arch'], website: 'https://cept.ac.in', ranking: 2, fees: '₹3,50,000/year' },
  { id: '31', name: 'Sir JJ College of Architecture, Mumbai', type: 'government', location: 'Maharashtra', stream: 'Architecture', totalSeats: 80, reservedSeats: 28, courses: ['B.Arch'], website: 'https://www.sirjjarchitecture.org', ranking: 3, fees: '₹65,000/year' },
      
  // Agriculture
  { id: '32', name: 'Indian Agricultural Research Institute, Delhi', type: 'government', location: 'Delhi', stream: 'Agriculture', totalSeats: 200, reservedSeats: 70, courses: ['BSc Agriculture', 'MSc Agriculture'], website: 'https://www.iari.res.in', ranking: 1, fees: '₹45,000/year' },
  { id: '33', name: 'Punjab Agricultural University', type: 'government', location: 'Punjab', stream: 'Agriculture', totalSeats: 300, reservedSeats: 105, courses: ['BSc Agriculture', 'BTech Food Technology'], website: 'https://www.pau.edu', ranking: 2, fees: '₹55,000/year' },
  { id: '34', name: 'Tamil Nadu Agricultural University', type: 'government', location: 'Tamil Nadu', stream: 'Agriculture', totalSeats: 250, reservedSeats: 88, courses: ['BSc Agriculture', 'BSc Horticulture'], website: 'https://tnau.ac.in', ranking: 4, fees: '₹40,000/year' },
      
  // Veterinary
  { id: '35', name: 'Indian Veterinary Research Institute', type: 'government', location: 'Uttar Pradesh', stream: 'Veterinary', totalSeats: 60, reservedSeats: 21, courses: ['BVSc & AH', 'MVSc'], website: 'https://www.ivri.nic.in', ranking: 1, fees: '₹35,000/year' },
  { id: '36', name: 'College of Veterinary Sciences, Hyderabad', type: 'government', location: 'Telangana', stream: 'Veterinary', totalSeats: 80, reservedSeats: 28, courses: ['BVSc & AH'], website: 'https://tsvu.nic.in', ranking: 3, fees: '₹45,000/year' },
  { id: '37', name: 'Bombay Veterinary College, Mumbai', type: 'government', location: 'Maharashtra', stream: 'Veterinary', totalSeats: 60, reservedSeats: 21, courses: ['BVSc & AH'], website: 'https://mvc.maharashtra.gov.in', ranking: 5, fees: '₹40,000/year' },
      
  // Education
  { id: '38', name: 'Jamia Millia Islamia - Faculty of Education', type: 'government', location: 'Delhi', stream: 'Education', totalSeats: 150, reservedSeats: 52, courses: ['BEd', 'MEd'], website: 'https://www.jmi.ac.in', ranking: 3, fees: '₹25,000/year' },
  { id: '39', name: 'Banaras Hindu University - Faculty of Education', type: 'government', location: 'Uttar Pradesh', stream: 'Education', totalSeats: 200, reservedSeats: 70, courses: ['BEd', 'MEd', 'DEd'], website: 'https://www.bhu.ac.in', ranking: 2, fees: '₹22,000/year' },
  { id: '40', name: 'Regional Institute of Education, Mysore', type: 'government', location: 'Karnataka', stream: 'Education', totalSeats: 100, reservedSeats: 35, courses: ['BEd', 'MEd'], website: 'https://www.riemysore.ac.in', ranking: 1, fees: '₹18,000/year' }
    ];
    
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);

  // 🔍 Search + Filter logic
  useEffect(() => {
    let filtered = [...colleges];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(term) ||
        college.location.toLowerCase().includes(term) ||
        college.type.toLowerCase().includes(term) ||
        college.stream.toLowerCase().includes(term) ||
        college.courses.some(course => course.toLowerCase().includes(term))
      );
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(c => c.type === filters.type);
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(c => c.location === filters.location);
    }

    if (filters.course !== 'all') {
      filtered = filtered.filter(c => c.stream === filters.course);
    }

    setFilteredColleges(filtered);
  }, [searchTerm, filters, colleges]);

  const handleSaveCollege = (collegeId: string) => {
    setSavedColleges(prev => 
      prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      case 'deemed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College Finder</h1>
        <p className="text-gray-600">Search & explore the right college for you</p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges, locations, or courses..."
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

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border p-2 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="deemed">Deemed</option>
            </select>
            <select
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
              className="border p-2 rounded-lg"
            >
              <option value="all">All Streams</option>
              <option value="Medical">Medical</option>
              <option value="Engineering">Engineering</option>
              <option value="Arts">Arts & Humanities</option>
              <option value="Commerce">Commerce & Business</option>
              <option value="Science">Science</option>
              <option value="Law">Law</option>
              <option value="Management">Management</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Dental">Dental</option>
              <option value="Nursing">Nursing</option>
              <option value="Architecture">Architecture</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Education">Education</option>
            </select>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="border p-2 rounded-lg"
              >
                <option value="all">All Locations</option>
                {[
                  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh", "Andaman & Nicobar Islands", "Dadra & Nagar Haveli", "Daman & Diu", "Lakshadweep"
                ].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
          </div>
        )}
      </div>

      {/* College Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredColleges.map((college) => (
          <div key={college.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{college.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(college.type)}`}>
                    {college.type}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {college.location}
                </div>
              </div>
              <button
                onClick={() => handleSaveCollege(college.id)}
                className={`p-2 rounded-full ${savedColleges.includes(college.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
              >
                <Heart className="w-5 h-5" fill={savedColleges.includes(college.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">{college.totalSeats}</div>
                <div className="text-xs text-gray-600">Total Seats</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{college.reservedSeats}</div>
                <div className="text-xs text-gray-600">Reserved for J&amp;K</div>
              </div>
              {college.ranking && (
                <div>
                  <div className="text-lg font-semibold text-green-600">#{college.ranking}</div>
                  <div className="text-xs text-gray-600">Ranking</div>
                </div>
              )}
              {college.fees && (
                <div>
                  <div className="text-sm font-semibold text-purple-600">{college.fees}</div>
                  <div className="text-xs text-gray-600">Fees</div>
                </div>
              )}
            </div>

            {/* Courses */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {college.courses.map((course, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Stream Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {college.stream}
              </span>
            </div>

            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm flex items-center space-x-1 hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> <span>Visit Website</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeFinder;
