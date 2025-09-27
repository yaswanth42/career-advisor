// AI Service for Career and Education Guidance
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UserContext {
  name?: string;
  role?: 'student' | 'mentor';
  grade?: string;
  interests?: string[];
  academicScores?: Record<string, number>;
  careerGoals?: string[];
}

export class AICareerAdvisor {
  private userContext: UserContext;

  constructor(userContext: UserContext = {}) {
    this.userContext = userContext;
  }

  async generateResponse(userMessage: string): Promise<string> {
    const message = userMessage.toLowerCase();
    
    // Analyze user intent and provide contextual responses
    if (this.isCareerQuery(message)) {
      return this.handleCareerGuidance(message);
    }
    
    if (this.isCollegeQuery(message)) {
      return this.handleCollegeGuidance(message);
    }
    
    if (this.isStudyQuery(message)) {
      return this.handleStudyGuidance(message);
    }
    
    if (this.isScholarshipQuery(message)) {
      return this.handleScholarshipGuidance(message);
    }
    
    if (this.isSubjectQuery(message)) {
      return this.handleSubjectGuidance(message);
    }

    return this.getDefaultResponse();
  }

  private isCareerQuery(message: string): boolean {
    const careerKeywords = ['career', 'job', 'profession', 'work', 'salary', 'future', 'path'];
    return careerKeywords.some(keyword => message.includes(keyword));
  }

  private isCollegeQuery(message: string): boolean {
    const collegeKeywords = ['college', 'university', 'admission', 'course', 'degree', 'iit', 'nit'];
    return collegeKeywords.some(keyword => message.includes(keyword));
  }

  private isStudyQuery(message: string): boolean {
    const studyKeywords = ['study', 'exam', 'preparation', 'tips', 'how to', 'learn'];
    return studyKeywords.some(keyword => message.includes(keyword));
  }

  private isScholarshipQuery(message: string): boolean {
    const scholarshipKeywords = ['scholarship', 'financial aid', 'funding', 'money', 'fee'];
    return scholarshipKeywords.some(keyword => message.includes(keyword));
  }

  private isSubjectQuery(message: string): boolean {
    const subjectKeywords = ['subject', 'stream', 'class 10', 'class 11', 'pcm', 'pcb', 'commerce'];
    return subjectKeywords.some(keyword => message.includes(keyword));
  }

  private handleCareerGuidance(message: string): string {
    if (message.includes('engineering')) {
      return this.getEngineeringCareerAdvice();
    }
    
    if (message.includes('medical') || message.includes('doctor')) {
      return this.getMedicalCareerAdvice();
    }
    
    if (message.includes('commerce') || message.includes('business')) {
      return this.getCommerceCareerAdvice();
    }

    return this.getGeneralCareerAdvice();
  }

  private handleCollegeGuidance(message: string): string {
    if (message.includes('engineering') || message.includes('iit') || message.includes('nit')) {
      return this.getEngineeringCollegeAdvice();
    }
    
    return this.getGeneralCollegeAdvice();
  }

  private handleStudyGuidance(message: string): string {
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

Which specific exam are you preparing for?`;
  }

  private handleScholarshipGuidance(message: string): string {
    return `💰 **Scholarship Opportunities:**

**Government Scholarships:**
• **National Merit Scholarship** - Merit-based, ₹50,000/year
• **INSPIRE Scholarship** - Science students, ₹80,000/year
• **Central Sector Scheme** - Need-based, ₹20,000/year

**Private Scholarships:**
• **Reliance Foundation** - ₹2,00,000/year
• **Aditya Birla** - For IIT/IIM students, ₹1,75,000
• **Tata Scholarships** - Various programs

**Application Tips:**
1. Start early - Many deadlines are in March-June
2. Keep all documents ready
3. Write compelling personal statements
4. Apply to multiple scholarships
5. Track application status

Need help finding scholarships for your specific situation?`;
  }

  private handleSubjectGuidance(message: string): string {
    return `📖 **Subject Selection Guidance:**

**After Class 10 - Stream Selection:**

**Science Stream:**
• **PCM** → Engineering, Architecture, Pure Sciences
• **PCB** → Medical, Life Sciences, Agriculture
• **PCMB** → Keeps both options open (demanding)

**Commerce Stream:**
• **With Math** → CA, Economics, Statistics
• **Without Math** → Business, Humanities, Law

**Arts/Humanities:**
• Languages, History → Civil Services, Law, Journalism
• Psychology, Sociology → Social work, Counseling

**Selection Criteria:**
1. Interest & Aptitude
2. Career Goals
3. Scoring Ability
4. College Requirements

What are your favorite subjects and career interests?`;
  }

  private getEngineeringCareerAdvice(): string {
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

**Skills to develop:** Problem-solving, mathematics, programming, communication.

Would you like specific advice for any engineering branch?`;
  }

  private getMedicalCareerAdvice(): string {
    return `🏥 **Medical Career Guidance:**

**Medical Career Options:**
• MBBS - 5.5 years, high respect, ₹5-20L+ salary
• BDS (Dental) - 5 years, ₹3-15L salary
• BAMS/BHMS - Alternative medicine, ₹2-8L
• Nursing - 4 years, ₹2-6L starting salary

**Preparation Strategy:**
1. Focus on NEET preparation (Physics, Chemistry, Biology)
2. Maintain 90%+ in Class 12
3. Join coaching if needed
4. Practice previous year papers

Medical field requires dedication and genuine interest in helping people.

Need specific guidance for NEET preparation?`;
  }

  private getCommerceCareerAdvice(): string {
    return `💼 **Commerce Career Guidance:**

**Top Commerce Careers:**
• Chartered Accountant (CA) - ₹6-25L, high prestige
• Company Secretary (CS) - ₹4-15L
• MBA - ₹8-30L+ depending on college
• Banking & Finance - ₹3-12L starting

**After Class 12 Options:**
1. B.Com (Hons) from top colleges
2. BBA for management focus
3. Start CA/CS preparation alongside graduation

**Skills needed:** Analytical thinking, attention to detail, communication.

Which commerce field interests you most?`;
  }

  private getGeneralCareerAdvice(): string {
    return `🎯 **General Career Guidance:**

To give you the best advice, I'd like to know:
• What are your favorite subjects?
• Are you in Class 10, 12, or college?
• What are your interests/hobbies?

**Popular Career Paths:**
• **STEM:** Engineering, Medical, Research, Data Science
• **Commerce:** CA, Banking, Finance, Management  
• **Arts:** Law, Journalism, Psychology, Design

Share more about your interests for personalized guidance!`;
  }

  private getEngineeringCollegeAdvice(): string {
    return `🏛️ **Engineering College Guidance:**

**Top Engineering Colleges:**
• **IITs** - Premier institutes, JEE Advanced required
• **NITs** - Excellent government colleges, JEE Main cutoff
• **IIITs** - IT focused, good placement records
• **Private Colleges** - Manipal, VIT, SRM, BITS Pilani

**Selection Criteria:**
1. Rank/Cutoff based on previous years
2. Location preference
3. Placement records and average packages
4. Infrastructure and faculty quality
5. Fees (Government vs private)

**Application Process:**
• JEE Main → NIT, IIIT eligibility
• JEE Advanced → IIT eligibility  
• State CETs for local colleges

Need help with specific college selection?`;
  }

  private getGeneralCollegeAdvice(): string {
    return `🎓 **College Selection Guidance:**

**Key Factors to Consider:**
1. Course alignment with career goals
2. NAAC/NBA accreditation
3. Placement records and companies
4. Faculty quality and student-teacher ratio
5. Infrastructure and facilities
6. Location and cost factors

**Research Tips:**
• Visit college websites
• Check NIRF rankings
• Talk to current students/alumni
• Attend college fairs

Which field are you looking for colleges in?`;
  }

  private getDefaultResponse(): string {
    return `🤖 **I'm here to help with your educational journey!**

I can assist you with:
• **Career Guidance** - Explore different career paths
• **College Selection** - Find the right institutions
• **Study Tips** - Effective preparation strategies
• **Scholarship Information** - Financial aid opportunities
• **Subject Selection** - Choose the right stream

Please ask me something specific about your education or career concerns!

*Example: "I'm in Class 12 PCM, should I go for engineering or explore other options?"*`;
  }

  updateUserContext(context: Partial<UserContext>): void {
    this.userContext = { ...this.userContext, ...context };
  }
}

// Export singleton instance
export const aiCareerAdvisor = new AICareerAdvisor();