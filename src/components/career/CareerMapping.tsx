import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const careerOptions = [
  { name: 'Science', next: ['Engineering', 'Medical', 'Pure Sciences', 'Pharmacy', 'Architecture', 'Agriculture', 'Veterinary', 'Nursing'] },
  { name: 'Commerce', next: ['CA/CS/CMA', 'B.Com', 'Management', 'Economics', 'Banking', 'Finance'] },
  { name: 'Arts/Humanities', next: ['BA', 'Law', 'Design', 'Hotel Management', 'Mass Communication', 'Social Work'] },
  { name: 'Diploma/Polytechnic', next: ['Engineering Diploma', 'Hotel Management', 'Design', 'Technical Jobs'] }
];

const CareerMapping: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 2);
    }, 5000); // switch every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="steps"
            className="max-w-2xl text-center p-8 bg-white/90 rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Career Mapping</h2>
            <ol className="list-decimal text-left ml-6 text-gray-700 space-y-3">
              <li>Identify your interests, strengths, and preferred subjects.</li>
              <li>Research available streams and career options.</li>
              <li>Consult mentors, teachers, or career counselors.</li>
              <li>Shortlist courses and entrance exams (if any).</li>
              <li>Apply to colleges or vocational courses.</li>
              <li>Seek scholarships, internships, and skill development.</li>
            </ol>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="options"
            className="grid gap-6 max-w-4xl p-8 bg-white/90 rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {careerOptions.map((opt) => (
              <div key={opt.name} className="p-6 border rounded-xl bg-gray-50 hover:shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-indigo-700">{opt.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {opt.next.map((n, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerMapping;
