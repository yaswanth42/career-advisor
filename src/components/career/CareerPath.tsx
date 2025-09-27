import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = {
  id: number;
  level: string;
  title: string;
  duration?: string;
  stream?: string;
  eligibility?: string;
  jobOptions?: string[];
  fees?: string;
};

const STAGES: Stage[] = [
  {
    id: 1,
    level: "Class10",
    title: "Class 10 Completion",
    duration: "1 year",
    stream: "all",
    eligibility: "Completion of Class 9",
    jobOptions: [
      "Continue to 11th/12th (Science/Commerce/Arts)",
      "Vocational courses (IT, Design, Hospitality)",
      "Diploma (Engineering, IT, Commerce, Arts)",
      "ITI (Electrician, Fitter, Mechanic, etc.)"
    ],
    fees: "Depends on school",
  },
  {
    id: 2,
    level: "Class12Science",
    title: "Class 11-12 Science (MPC/BiPC)",
    duration: "2 years",
    stream: "science",
    eligibility: "Class 10 pass",
    jobOptions: [
      "Engineering (CSE, ECE, Mechanical, Civil, Electrical)",
      "Medical (MBBS, BDS, Nursing, Pharmacy, Physiotherapy)",
      "Pure Sciences (B.Sc, Research, Biotechnology)",
      "Agriculture / Veterinary Sciences",
      "Architecture (B.Arch)"
    ],
    fees: "₹50,000 - ₹2,50,000 per year",
  },
  {
    id: 3,
    level: "Class12Commerce",
    title: "Class 11-12 Commerce (CEC/MEC)",
    duration: "2 years",
    stream: "commerce",
    eligibility: "Class 10 pass",
    jobOptions: [
      "B.Com, BBA, Economics",
      "CA, CS, CMA",
      "Banking & Finance",
      "Management Courses (BBA, BBM)",
      "Hotel Management / Business Analytics"
    ],
    fees: "₹30,000 - ₹1,50,000 per year",
  },
  {
    id: 4,
    level: "Class12Arts",
    title: "Class 11-12 Arts/Humanities",
    duration: "2 years",
    stream: "arts",
    eligibility: "Class 10 pass",
    jobOptions: [
      "BA in Psychology, History, Political Science, Sociology, Geography",
      "Design / Fashion / Fine Arts / Media Studies",
      "Hotel Management / Event Management",
      "Journalism / Mass Communication"
    ],
    fees: "₹20,000 - ₹1,50,000 per year",
  },
  {
    id: 5,
    level: "Diploma",
    title: "Diploma Courses",
    duration: "1-3 years",
    stream: "diploma",
    eligibility: "Class 10 pass",
    jobOptions: [
      "Junior Engineer / Technician / IT Support",
      "Computer Hardware / Networking",
      "Design / Animation / Multimedia",
      "Management / Hospitality Assistant"
    ],
    fees: "₹50,000 - ₹2,00,000 per year",
  },
  {
    id: 6,
    level: "ITI",
    title: "ITI Courses",
    duration: "1-2 years",
    stream: "iti",
    eligibility: "Class 10 pass",
    jobOptions: [
      "Electrician / Fitter / Mechanic / Welder",
      "Skilled Technician / Apprentice",
      "Government jobs / Public Sector Jobs"
    ],
    fees: "₹20,000 - ₹80,000",
  },
  {
    id: 7,
    level: "BachelorsScience",
    title: "Bachelor's Degree (Science / Engineering / Medical / Law / Agriculture / Architecture)",
    duration: "3-5 years",
    stream: "science",
    eligibility: "Class 12 Science pass",
    jobOptions: [
      "Engineer (CSE, ECE, Mechanical, Civil, Electrical)",
      "Doctor / Nurse / Pharmacist / Physiotherapist",
      "Scientist / Researcher / Lab Technician",
      "Agriculture / Horticulture / Veterinary Specialist",
      "Architect / Interior Designer",
      "Data Analyst / AI/ML Specialist / Cybersecurity Expert"
    ],
    fees: "₹1,00,000 - ₹5,00,000 per year",
  },
  {
    id: 8,
    level: "BachelorsCommerce",
    title: "Bachelor's Degree (Commerce / Finance / Management / Law)",
    duration: "3 years",
    stream: "commerce",
    eligibility: "Class 12 Commerce pass",
    jobOptions: [
      "Accountant / Auditor / Tax Consultant",
      "Banking / Finance Specialist",
      "CA / CS / CMA / CFA / FRM",
      "Business Analyst / Manager / Entrepreneur",
      "Lawyer (after CLAT)"
    ],
    fees: "₹50,000 - ₹3,00,000 per year",
  },
  {
    id: 9,
    level: "BachelorsArts",
    title: "Bachelor's Degree (Arts / Design / Media / Humanities)",
    duration: "3 years",
    stream: "arts",
    eligibility: "Class 12 Arts pass",
    jobOptions: [
      "Teacher / Lecturer / Educationist",
      "Content Creator / Social Media Specialist",
      "Designer / Artist / Animator / UX/UI Designer",
      "Journalist / Media Professional / Editor",
      "Event / Hotel Management"
    ],
    fees: "₹20,000 - ₹2,00,000 per year",
  },
  {
    id: 10,
    level: "Masters",
    title: "Postgraduate Degree (M.Sc / MBA / ME / MD / MA / M.Arch)",
    duration: "2 years",
    stream: "all",
    eligibility: "Bachelor's degree",
    jobOptions: [
      "Specialist Engineer / Consultant",
      "Manager / Business Leader / Entrepreneur",
      "Doctor / Surgeon / Specialist",
      "Researcher / Scientist / Data Scientist",
      "Architect / Designer / Urban Planner"
    ],
    fees: "₹1,50,000 - ₹6,00,000 per year",
  },
  {
    id: 11,
    level: "Professional",
    title: "Professional Certifications",
    duration: "6 months - 2 years",
    stream: "all",
    eligibility: "Depends on certification",
    jobOptions: [
      "IT Specialist (AWS, DevOps, AI/ML, Cybersecurity, Cloud Computing)",
      "Finance Specialist (CFA, FRM, Accounting, Taxation)",
      "Management Consultant / Business Analyst / Project Manager",
      "Designer / Animator / UX/UI Specialist / Media Expert"
    ],
    fees: "₹30,000 - ₹2,00,000",
  },
  {
    id: 12,
    level: "PhD",
    title: "Doctorate (PhD / DPhil / Research)",
    duration: "3-6 years",
    stream: "all",
    eligibility: "Master's degree",
    jobOptions: [
      "Professor / Lecturer / Academic Researcher",
      "Scientist / Research Lead / Lab Head",
      "Consultant / Policy Analyst / Advisor",
      "Entrepreneur / Specialist in your field"
    ],
    fees: "Varies; scholarships available",
  },
];

const colors: Record<string, string> = {
  all: "from-indigo-50 via-purple-50 to-blue-50",
  science: "from-green-50 via-green-100 to-green-200",
  commerce: "from-yellow-50 via-yellow-100 to-yellow-200",
  arts: "from-pink-50 via-pink-100 to-pink-200",
  diploma: "from-purple-50 via-purple-100 to-purple-200",
  iti: "from-orange-50 via-orange-100 to-orange-200",
};

// StreamFilter component
const StreamFilter = ({ selected, onChange }: { selected: string; onChange: (s: string) => void }) => {
  const streams = ["all", "science", "commerce", "arts", "diploma", "iti"];
  return (
    <div className="flex justify-center gap-3 mb-6">
      {streams.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 ${
            selected === s
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
};

// StageCard component
const StageCard = ({ stage, onClick }: { stage: Stage; onClick?: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="rounded-2xl p-5 shadow-lg transition cursor-pointer border border-transparent hover:border-gray-300 bg-white"
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        {stage.title}
      </h3>
      <ArrowRight className="w-6 h-6 text-indigo-400" />
    </div>
    <div className="mt-3 flex items-center gap-3 text-indigo-700 font-medium">
      <Clock className="w-4 h-4" /> {stage.duration}
    </div>
  </motion.div>
);

// RoadmapTimeline component
const RoadmapTimeline = ({ stages, onStageSelect }: { stages: Stage[]; onStageSelect: (s: Stage) => void }) => (
  <div className="relative">
    <div className="absolute inset-x-1/2 -translate-x-1/2 top-20 bottom-0 w-1 bg-gradient-to-b from-indigo-300 to-purple-300"></div>
    <div className="space-y-12">
      {stages.map((stage, idx) => (
        <div key={stage.id} className="flex items-start">
          <div className={`w-1/2 pr-6 ${idx % 2 === 0 ? "" : "order-2"}`}>
            {idx % 2 === 0 && <StageCard stage={stage} onClick={() => onStageSelect(stage)} />}
          </div>
          <div className="w-0 flex justify-center">
            <div className="w-6 h-6 rounded-full border-4 border-indigo-400 bg-white shadow-lg"></div>
          </div>
          <div className={`w-1/2 pl-6 ${idx % 2 === 0 ? "order-3" : ""}`}>
            {idx % 2 !== 0 && <StageCard stage={stage} onClick={() => onStageSelect(stage)} />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main CareerPath component
const CareerPath: React.FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStream, setSelectedStream] = useState("all");
  const [view, setView] = useState<"timeline" | "cards">("timeline");
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  useEffect(() => {
    setStages(STAGES);
  }, []);

  const filtered = useMemo(
    () => stages.filter((s) => selectedStream === "all" || s.stream === selectedStream || s.stream === "all"),
    [stages, selectedStream]
  );

  return (
    <div className={`min-h-screen p-6 md:p-12 bg-gradient-to-br ${colors[selectedStream]}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-10 drop-shadow-sm"
        >
          Education Roadmap
        </motion.h1>

        <StreamFilter selected={selectedStream} onChange={setSelectedStream} />

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 mt-8 mb-10 flex gap-2 shadow-lg">
          <button
            className={`flex-1 py-3 rounded-lg transition-all ${
              view === "timeline" ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setView("timeline")}
          >
            Timeline
          </button>
          <button
            className={`flex-1 py-3 rounded-lg transition-all ${
              view === "cards" ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setView("cards")}
          >
            Detailed
          </button>
        </div>

        {view === "timeline" ? (
          <RoadmapTimeline stages={filtered} onStageSelect={setSelectedStage} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((stage) => (
              <motion.div
                key={stage.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 cursor-pointer transition"
                onClick={() => setSelectedStage(stage)}
              >
                <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  {stage.title}
                </h3>
                <p className="text-indigo-700 font-medium mb-1">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Duration: {stage.duration}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Stream:</span> {stage.stream?.toUpperCase()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Eligibility:</span> {stage.eligibility}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Job Options:</span> {stage.jobOptions?.join(", ")}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Fees:</span> {stage.fees}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedStage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedStage(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-indigo-200 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {selectedStage.title}
                  </h2>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="text-gray-500 hover:text-indigo-600 transition"
                  >
                    ×
                  </button>
                </div>
                <p className="text-indigo-700 font-medium mb-2">Duration: {selectedStage.duration}</p>
                <p className="text-gray-600 mb-2">Stream: {selectedStage.stream?.toUpperCase()}</p>
                <p className="text-gray-600 mb-2">Eligibility: {selectedStage.eligibility}</p>
                <p className="text-gray-600 mb-2">Job Options: {selectedStage.jobOptions?.join(", ")}</p>
                <p className="text-gray-600 mb-2">Fees: {selectedStage.fees}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CareerPath;
