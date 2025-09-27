import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, Award } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct: number;
}

interface TestResult {
  category: string;
  score: number;
  maxScore: number;
  recommendations: string[];
}

const AptitudeTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [selectedClass, setSelectedClass] = useState<'10th' | '12th' | null>(null);

  // Questions for 10th and 12th class
  const questionsByClass: Record<string, Question[]> = {
    '10th': [
      // Section A: Numerical & Logical Reasoning
      { id: '1', category: 'Numerical & Logical Reasoning', question: 'Solve: 7 + 3 × 5 = ?', options: ['50', '22', '16', '20'], correct: 1 },
      { id: '2', category: 'Numerical & Logical Reasoning', question: 'Find the missing number: 2, 4, 8, 16, ?', options: ['18', '24', '32', '64'], correct: 2 },
      { id: '3', category: 'Numerical & Logical Reasoning', question: 'A shop sells 12 pens for ₹240. How much for 1 pen?', options: ['₹15', '₹20', '₹25', '₹18'], correct: 1 },
      { id: '4', category: 'Numerical & Logical Reasoning', question: 'If the sum of 3 consecutive numbers is 36, what is the largest number?', options: ['10', '11', '12', '13'], correct: 2 },
      { id: '5', category: 'Numerical & Logical Reasoning', question: 'Which number comes next: 5, 10, 20, 40, ?', options: ['60', '70', '80', '90'], correct: 2 },
      { id: '6', category: 'Numerical & Logical Reasoning', question: 'Solve: (15 ÷ 3) + 2 × 4 = ?', options: ['10', '12', '14', '18'], correct: 2 },
      { id: '7', category: 'Numerical & Logical Reasoning', question: 'If 3x + 5 = 20, x = ?', options: ['3', '4', '5', '6'], correct: 1 },
      { id: '8', category: 'Numerical & Logical Reasoning', question: 'Find the odd one out: 2, 4, 6, 9, 10', options: ['2', '4', '6', '9'], correct: 3 },
      { id: '9', category: 'Numerical & Logical Reasoning', question: 'A train travels 120 km in 2 hours. How far in 5 hours at same speed?', options: ['280 km', '300 km', '320 km', '350 km'], correct: 1 },
      { id: '10', category: 'Numerical & Logical Reasoning', question: 'If a shirt costs ₹800 and is sold at 10% discount, what is selling price?', options: ['₹700', '₹720', '₹750', '₹780'], correct: 1 },
  
      // Section B: Verbal / Language Ability
      { id: '11', category: 'Verbal Ability', question: 'Choose the correct spelling:', options: ['Recieve', 'Receive', 'Recieive', 'Receeve'], correct: 1 },
      { id: '12', category: 'Verbal Ability', question: 'Fill in the blank: He _ to school every day.', options: ['go', 'goes', 'went', 'going'], correct: 1 },
      { id: '13', category: 'Verbal Ability', question: 'Choose the opposite of “Generous”:', options: ['Kind', 'Stingy', 'Honest', 'Polite'], correct: 1 },
      { id: '14', category: 'Verbal Ability', question: 'Which word doesn’t belong?', options: ['Rose', 'Lily', 'Sunflower', 'Table'], correct: 3 },
      { id: '15', category: 'Verbal Ability', question: 'Rearrange: book / the / on / table / is', options: ['The table is on book', 'The book is on the table', 'On the table is book the', 'Book is on table the'], correct: 1 },
      { id: '16', category: 'Verbal Ability', question: 'Fill in the blank: I _ my homework yesterday.', options: ['do', 'did', 'done', 'doing'], correct: 1 },
      { id: '17', category: 'Verbal Ability', question: 'Choose synonym of “Happy”:', options: ['Sad', 'Joyful', 'Angry', 'Lazy'], correct: 1 },
      { id: '18', category: 'Verbal Ability', question: 'Choose correct sentence:', options: ['She don’t like apples', 'She doesn’t likes apples', 'She doesn’t like apples', 'She no likes apples'], correct: 2 },
      { id: '19', category: 'Verbal Ability', question: 'Which word is a noun?', options: ['Run', 'Happiness', 'Quickly', 'Beautiful'], correct: 1 },
      { id: '20', category: 'Verbal Ability', question: 'Choose correct plural form of “Child”:', options: ['Childs', 'Children', 'Childes', 'Childen'], correct: 1 },
  
      // Section C: Interest / Career-Oriented
      { id: '21', category: 'Career / Interest', question: 'Which subjects do you enjoy most?', options: ['Math / Science', 'Commerce / Accounts', 'Arts / Literature / History', 'Vocational / Technical'], correct: 0 },
      { id: '22', category: 'Career / Interest', question: 'Do you enjoy experiments and practical work?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '23', category: 'Career / Interest', question: 'Are you more creative or analytical?', options: ['Creative', 'Analytical', 'Both', 'Neither'], correct: 2 },
      { id: '24', category: 'Career / Interest', question: 'Do you prefer working alone or in teams?', options: ['Alone', 'Teams', 'Both', 'Neither'], correct: 2 },
      { id: '25', category: 'Career / Interest', question: 'Do you enjoy drawing, painting, or designing?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '26', category: 'Career / Interest', question: 'Are you comfortable with numbers and calculations?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '27', category: 'Career / Interest', question: 'Do you like working with computers and technology?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '28', category: 'Career / Interest', question: 'Do you enjoy reading, writing, or storytelling?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '29', category: 'Career / Interest', question: 'Would you prefer a hands-on technical job or a desk job?', options: ['Hands-on', 'Desk job', 'Both', 'Neither'], correct: 0 },
      { id: '30', category: 'Career / Interest', question: 'Do you enjoy helping or teaching others?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
    ],
  
    '12th': [
      // Section A: Numerical & Logical Reasoning
      { id: '1', category: 'Numerical & Logical Reasoning', question: 'Solve: 3x + 7 = 19. Find x.', options: ['3', '4', '5', '6'], correct: 2 },
      { id: '2', category: 'Numerical & Logical Reasoning', question: 'Find the missing number: 7, 14, 28, 56, ?', options: ['84', '98', '112', '120'], correct: 2 },
      { id: '3', category: 'Numerical & Logical Reasoning', question: 'A student scored 85 in Physics, 90 in Chemistry, and 80 in Math. Average score?', options: ['83', '85', '87', '86'], correct: 1 },
      { id: '4', category: 'Numerical & Logical Reasoning', question: 'If 5 pens cost ₹250, how much will 8 pens cost?', options: ['₹350', '₹375', '₹400', '₹450'], correct: 2 },
      { id: '5', category: 'Numerical & Logical Reasoning', question: 'Which number comes next: 2, 6, 12, 20, 30, ?', options: ['36', '40', '42', '48'], correct: 1 },
      { id: '6', category: 'Numerical & Logical Reasoning', question: 'A train travels 150 km in 3 hours. Distance in 7 hours at same speed?', options: ['320 km', '340 km', '350 km', '360 km'], correct: 2 },
      { id: '7', category: 'Numerical & Logical Reasoning', question: 'Find the odd one out: 121, 144, 169, 196, 220', options: ['121', '144', '196', '220'], correct: 3 },
      { id: '8', category: 'Numerical & Logical Reasoning', question: 'If a book costs ₹480 after 20% discount, original price?', options: ['₹500', '₹550', '₹600', '₹650'], correct: 2 },
      { id: '9', category: 'Numerical & Logical Reasoning', question: 'Solve: (12 ÷ 3) + (4 × 5) = ?', options: ['20', '21', '22', '23'], correct: 2 },
      { id: '10', category: 'Numerical & Logical Reasoning', question: 'A man invests ₹5000 at 10% per year simple interest. Interest after 3 years?', options: ['₹1500', '₹1550', '₹1600', '₹1650'], correct: 0 },
  
      // Section B: Verbal / Communication Skills
      { id: '11', category: 'Verbal Ability', question: 'Choose correct sentence:', options: ['He don’t like tea.', 'He doesn’t likes tea.', 'He doesn’t like tea.', 'He no like tea.'], correct: 2 },
      { id: '12', category: 'Verbal Ability', question: 'Fill in the blank: I have _ my homework.', options: ['do', 'did', 'done', 'doing'], correct: 2 },
      { id: '13', category: 'Verbal Ability', question: 'Choose synonym of “Quick”:', options: ['Slow', 'Fast', 'Lazy', 'Weak'], correct: 1 },
      { id: '14', category: 'Verbal Ability', question: 'Choose antonym of “Difficult”:', options: ['Hard', 'Easy', 'Tough', 'Complex'], correct: 1 },
      { id: '15', category: 'Verbal Ability', question: 'Which word doesn’t belong?', options: ['Physics', 'Chemistry', 'Math', 'Painting'], correct: 3 },
      { id: '16', category: 'Verbal Ability', question: 'Rearrange words: sky / blue / the / is', options: ['The sky is blue', 'Sky the is blue', 'Is blue the sky', 'Blue is sky the'], correct: 0 },
      { id: '17', category: 'Verbal Ability', question: 'Identify the noun: She loves reading books.', options: ['She', 'Loves', 'Reading', 'Books'], correct: 3 },
      { id: '18', category: 'Verbal Ability', question: 'Choose correct plural form of “Analysis”:', options: ['Analysises', 'Analyses', 'Analysi', 'Analyzes'], correct: 1 },
      { id: '19', category: 'Verbal Ability', question: 'Fill in blank: They _ playing football now.', options: ['is', 'are', 'was', 'be'], correct: 1 },
      { id: '20', category: 'Verbal Ability', question: 'Correct spelling:', options: ['Occassion', 'Occasion', 'Occation', 'Ocassion'], correct: 1 },
  
      // Section C: Career / Interest-Oriented
      { id: '21', category: 'Career / Interest', question: 'Which area interests you most?', options: ['Engineering / Technology', 'Medicine / Healthcare', 'Business / Commerce / Economics', 'Arts / Design / Humanities', 'Teaching / Social Work'], correct: 0 },
      { id: '22', category: 'Career / Interest', question: 'Do you enjoy coding, programming, or problem-solving?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '23', category: 'Career / Interest', question: 'Are you more creative or analytical?', options: ['Creative', 'Analytical', 'Both', 'Neither'], correct: 2 },
      { id: '24', category: 'Career / Interest', question: 'Do you prefer indoor or outdoor work?', options: ['Indoor', 'Outdoor', 'Both', 'Neither'], correct: 2 },
      { id: '25', category: 'Career / Interest', question: 'Do you enjoy designing, painting, or music?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '26', category: 'Career / Interest', question: 'Are you comfortable with numbers, calculations, or finance?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '27', category: 'Career / Interest', question: 'Do you enjoy working in teams or individually?', options: ['Teams', 'Individually', 'Both', 'Neither'], correct: 2 },
      { id: '28', category: 'Career / Interest', question: 'Would you prefer a research-focused or practical job?', options: ['Research-focused', 'Practical', 'Both', 'Neither'], correct: 2 },
      { id: '29', category: 'Career / Interest', question: 'Are you interested in healthcare, biology, or medicine?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
      { id: '30', category: 'Career / Interest', question: 'Do you like leading, organizing, or managing projects?', options: ['Always', 'Often', 'Sometimes', 'Rarely'], correct: 0 },
    ]
  };
  

  const questions = selectedClass ? questionsByClass[selectedClass] : [];

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [testStarted, timeLeft, showResults]);

  const handleStartTest = () => {
    if (!selectedClass) return;
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    const categoryScores: { [key: string]: { correct: number; total: number } } = {};
    
    questions.forEach((question, index) => {
      const category = question.category;
      if (!categoryScores[category]) {
        categoryScores[category] = { correct: 0, total: 0 };
      }
      categoryScores[category].total++;
      if (answers[index] === question.correct) {
        categoryScores[category].correct++;
      }
    });

    const testResults: TestResult[] = Object.entries(categoryScores).map(([category, scores]) => {
      const percentage = (scores.correct / scores.total) * 100;
      let recommendations: string[] = [];

      switch (category) {
        case 'Logical Reasoning':
          recommendations = percentage >= 75 ? ['Law', 'Philosophy', 'Computer Science', 'Research']
            : percentage >= 50 ? ['Business Administration', 'Management', 'Psychology']
            : ['Creative Arts', 'Design', 'Literature'];
          break;
        case 'Mathematical Aptitude':
          recommendations = percentage >= 75 ? ['Engineering', 'Mathematics', 'Physics', 'Data Science']
            : percentage >= 50 ? ['Economics', 'Statistics', 'Architecture']
            : ['Social Sciences', 'Languages', 'Arts'];
          break;
        case 'Verbal Ability':
          recommendations = percentage >= 75 ? ['Literature', 'Journalism', 'Law', 'Teaching']
            : percentage >= 50 ? ['Business', 'Psychology', 'History']
            : ['Technical Fields', 'Mathematics', 'Sciences'];
          break;
        default:
          recommendations = ['Consider exploring various fields'];
      }

      return { category, score: scores.correct, maxScore: scores.total, recommendations };
    });

    setResults(testResults);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOverallRecommendations = () => {
    const allRecommendations = results.flatMap(r => r.recommendations);
    const recommendationCounts = allRecommendations.reduce((acc, rec) => {
      acc[rec] = (acc[rec] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(recommendationCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([rec]) => rec);
  };

  // Class selection screen
  if (!selectedClass) {
    return (
      <div className="max-w-4xl mx-auto text-center p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold mb-6">Select Your Class</h1>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setSelectedClass('10th')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              10th Class
            </button>
            <button
              onClick={() => setSelectedClass('12th')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              12th Class
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Before starting the test
  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Career Aptitude Test ({selectedClass} Class)</h1>
          <p className="text-gray-600 mb-8">
            Discover your strengths and get personalized career recommendations.
          </p>
          <button
            onClick={handleStartTest}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // Show results
  if (showResults) {
    const overallRecommendations = getOverallRecommendations();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-gray-600">Here's your personalized career aptitude analysis</p>
          </div>

          {/* Category-wise Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{result.category}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">{result.score}/{result.maxScore}</span>
                  <span className="text-sm text-gray-600">{Math.round((result.score / result.maxScore) * 100)}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                  ></div>
                </div>
                <div className="space-y-1">
                  {result.recommendations.slice(0, 3).map((rec, idx) => (
                    <span key={idx} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded mr-1">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Career Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {overallRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all mr-4"
            >
              Retake Test
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Save Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test in progress
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        {/* Header with timer */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aptitude Test</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {questions[currentQuestion].category}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
