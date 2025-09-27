import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import QuickActions from './QuickActions';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: `Hello ${user?.name || 'there'}! 👋 I'm your AI Career & Education Advisor. I can help you with:

• Career guidance and path recommendations
• College and course selection advice
• Scholarship opportunities
• Study tips and exam preparation
• Subject selection after Class 10/12
• Job market insights and salary expectations

What would you like to know about your educational journey?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, user?.name, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Career guidance responses
    if (message.includes('career') || message.includes('job') || message.includes('profession')) {
      if (message.includes('engineering') || message.includes('engineer')) {
        return `🔧 **Engineering Career Guidance:**

**Popular Engineering Fields:**
• Computer Science - High demand, ₹6-25L starting salary
• Mechanical - Core industry, ₹4-12L starting salary  
• Electronics & Communication - Growing field, ₹5-15L
• Civil - Infrastructure focus, ₹3-10L starting salary

**Path after Class 12:**
1. Prepare for JEE Main & Advanced
2. Consider state-level entrance exams
3. Look into NITs, IITs, and good private colleges
4. Build programming/technical skills early

**Skills to develop:** Problem-solving, mathematics, programming (for CSE), communication skills.

Would you like specific advice for any engineering branch?`;
      }
      
      if (message.includes('medical') || message.includes('doctor') || message.includes('mbbs')) {
        return `🏥 **Medical Career Guidance:**

**Medical Career Options:**
• MBBS - 5.5 years, high respect, ₹5-20L+ salary
• BDS (Dental) - 5 years, ₹3-15L salary
• BAMS/BHMS - Alternative medicine, ₹2-8L
• Nursing - 4 years, ₹2-6L starting salary
• Pharmacy - 4 years, ₹3-8L salary

**Preparation Strategy:**
1. Focus on NEET preparation (Physics, Chemistry, Biology)
2. Maintain 90%+ in Class 12
3. Join coaching if needed
4. Practice previous year papers

**Important:** Medical field requires dedication, long study hours, and genuine interest in helping people.

Need specific guidance for NEET preparation?`;
      }

      if (message.includes('commerce') || message.includes('business') || message.includes('ca')) {
        return `💼 **Commerce Career Guidance:**

**Top Commerce Careers:**
• Chartered Accountant (CA) - ₹6-25L, high prestige
• Company Secretary (CS) - ₹4-15L
• Cost & Management Accountant (CMA) - ₹5-18L
• MBA - ₹8-30L+ depending on college
• Banking & Finance - ₹3-12L starting

**After Class 12 Options:**
1. B.Com (Hons) from top colleges like SRCC, LSR
2. BBA for management focus
3. Start CA/CS preparation alongside graduation
4. Consider integrated courses

**Skills needed:** Analytical thinking, attention to detail, communication, mathematics.

Which commerce field interests you most?`;
      }

      return `🎯 **General Career Guidance:**

To give you the best advice, I'd like to know:
• What are your favorite subjects?
• Are you in Class 10, 12, or college?
• What are your interests/hobbies?
• Any specific career you're curious about?

**Popular Career Paths:**
• **STEM:** Engineering, Medical, Research, Data Science
• **Commerce:** CA, Banking, Finance, Business Management  
• **Arts:** Law, Journalism, Psychology, Design, Teaching
• **Government:** Civil Services, Banking, Defense, Railways

Share more about your interests, and I'll provide personalized guidance!`;
    }

    // College and course selection
    if (message.includes('college') || message.includes('course') || message.includes('admission')) {
      if (message.includes('engineering') || message.includes('iit') || message.includes('nit')) {
        return `🏛️ **Engineering College Guidance:**

**Top Engineering Colleges:**
• **IITs** - Premier institutes, JEE Advanced required
• **NITs** - Excellent government colleges, JEE Main cutoff
• **IIITs** - IT focused, good placement records
• **State Colleges** - Affordable, decent opportunities
• **Private Colleges** - Manipal, VIT, SRM, BITS Pilani

**Selection Criteria:**
1. **Rank/Cutoff:** Check previous year cutoffs
2. **Location:** Consider distance from home
3. **Placements:** Average package, top recruiters
4. **Infrastructure:** Labs, hostels, faculty
5. **Fees:** Government vs private cost difference

**Application Process:**
• JEE Main (Jan & April) → NIT, IIIT eligibility
• JEE Advanced (June) → IIT eligibility  
• State CETs for local colleges
• Private college entrance exams

Need help with specific college selection?`;
      }

      return `🎓 **College Selection Guidance:**

**Key Factors to Consider:**
1. **Course Alignment:** Matches your career goals
2. **Accreditation:** NAAC/NBA accredited colleges
3. **Placement Records:** Check average packages & companies
4. **Faculty Quality:** Student-teacher ratio, qualifications
5. **Infrastructure:** Libraries, labs, hostels
6. **Location & Cost:** Affordable and accessible

**Research Tips:**
• Visit college websites for detailed info
• Check NIRF rankings for quality assessment
• Talk to current students/alumni
• Attend college fairs and counseling sessions
• Consider both government and private options

**Popular Entrance Exams:**
• JEE (Engineering), NEET (Medical), CUET (Central Universities)
• CAT (MBA), CLAT (Law), NATA (Architecture)

Which field are you looking for colleges in?`;
    }

    // Study tips and exam preparation
    if (message.includes('study') || message.includes('exam') || message.includes('preparation') || message.includes('tips')) {
      return `📚 **Study Tips & Exam Preparation:**

**Effective Study Strategies:**
1. **Time Management:** Create a realistic timetable
2. **Active Learning:** Summarize, teach others, practice problems
3. **Regular Revision:** Review topics weekly
4. **Mock Tests:** Simulate exam conditions
5. **Healthy Routine:** 7-8 hours sleep, regular exercise

**Subject-Specific Tips:**
• **Mathematics:** Practice daily, understand concepts before memorizing
• **Science:** Focus on understanding, not rote learning
• **Languages:** Read extensively, practice writing
• **Social Studies:** Make mind maps, connect events

**Exam Day Strategy:**
• Read questions carefully
• Attempt easy questions first
• Manage time effectively
• Stay calm and confident

**Stress Management:**
• Take regular breaks (Pomodoro technique)
• Practice meditation/deep breathing
• Stay physically active
• Maintain social connections

Which specific exam are you preparing for?`;
    }

    // Scholarship information
    if (message.includes('scholarship') || message.includes('financial aid') || message.includes('funding')) {
      return `💰 **Scholarship Opportunities:**

**Government Scholarships:**
• **National Merit Scholarship** - Merit-based, ₹50,000/year
• **INSPIRE Scholarship** - Science students, ₹80,000/year
• **Central Sector Scheme** - Need-based, ₹20,000/year
• **State Government Scholarships** - Varies by state
• **Minority Scholarships** - For specific communities

**Private Scholarships:**
• **Reliance Foundation** - ₹2,00,000/year
• **Aditya Birla** - For IIT/IIM students, ₹1,75,000
• **Tata Scholarships** - Various programs
• **Corporate CSR Programs** - Many companies offer aid

**Application Tips:**
1. **Start Early:** Many deadlines are in March-June
2. **Documentation:** Keep all certificates ready
3. **Essays:** Write compelling personal statements
4. **Multiple Applications:** Apply to several scholarships
5. **Follow Up:** Track application status

**Eligibility Criteria:**
• Academic performance (usually 60-80%+ required)
• Family income limits (varies by scheme)
• Course/institution requirements
• Age restrictions for some programs

Need help finding scholarships for your specific situation?`;
    }

    // Subject selection guidance
    if (message.includes('subject') || message.includes('stream') || message.includes('class 10') || message.includes('class 11')) {
      return `📖 **Subject Selection Guidance:**

**After Class 10 - Stream Selection:**

**Science Stream:**
• **PCM (Physics, Chemistry, Math)** → Engineering, Architecture, Pure Sciences
• **PCB (Physics, Chemistry, Biology)** → Medical, Life Sciences, Agriculture
• **PCMB (All four)** → Keeps both options open (demanding)

**Commerce Stream:**
• **With Math** → CA, Economics, Statistics, Engineering (some colleges)
• **Without Math** → Business, Humanities, Law, Journalism

**Arts/Humanities:**
• **Languages, History, Political Science** → Civil Services, Law, Journalism, Teaching
• **Psychology, Sociology** → Social work, Counseling, HR

**Selection Criteria:**
1. **Interest & Aptitude:** Choose subjects you enjoy
2. **Career Goals:** Align with future plans
3. **Scoring Ability:** Consider your strengths
4. **College Requirements:** Check eligibility for target courses

**Important:** Don't choose based on peer pressure or societal expectations. Your interests and aptitude matter most!

What are your favorite subjects and career interests?`;
    }

  // Default response for general/unknown queries
  return `🤖 **I'm here to help with your educational journey!**

I can assist you with:
• Career Guidance
• College Selection
• Study Tips
• Scholarship Information
• Subject Selection
• Exam Preparation

**Popular Topics:**
• Engineering vs Medical vs Commerce career paths
• IIT/NIT admission process and preparation
• NEET preparation strategies
• CA/CS career guidance
• Government job opportunities
• Study abroad options

If I didn't understand your question, please try rephrasing or ask about:
• "What are the best career options after 12th Science?"
• "How do I prepare for NEET?"
• "Which scholarships are available for engineering?"
• "How to choose a stream after 10th?"

Would you like to know about career mapping, college selection, scholarships, or something else? Feel free to ask follow-up questions!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or rephrase your question.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
    // Auto-send the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const clearChat = () => {
    setMessages([]);
    // Add welcome message back
    const welcomeMessage: Message = {
      id: '1',
      content: `Hello ${user?.name || 'there'}! 👋 I'm your AI Career & Education Advisor. What would you like to know about your educational journey?`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span className="font-medium">Career Advisor AI</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 p-1 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={clearChat}
            className="text-white hover:bg-white/20 p-1 rounded"
            title="Clear chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onToggle}
            className="text-white hover:bg-white/20 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-[480px] space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200">
            {messages.length <= 1 && (
              <QuickActions onActionClick={handleQuickAction} />
            )}
            <div className="flex space-x-2 p-4">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers, colleges, exams, or study tips..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;