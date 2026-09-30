import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Calendar,
  Award,
  Download,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { MOCK_EXAMS } from '../../data/mockData';

export const AcademicsModule: React.FC = () => {
  const { homeworkList, openModal, currentUser, currentStudent, submitHomework } = useApp();
  const [subTab, setSubTab] = useState<'homework' | 'exams'>('homework');
  const [activeSubmitHwId, setActiveSubmitHwId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const upcomingExam = MOCK_EXAMS.find((e) => e.status === 'Upcoming') || MOCK_EXAMS[0];

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmitHwId || !notes.trim()) return;
    submitHomework(activeSubmitHwId, notes);
    setActiveSubmitHwId(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Tabs (Zero-pill compliant tabs) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021]">
            Curriculum & Evaluations
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Academic Portals
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setSubTab('homework')}
            className={`px-4 py-2 rounded-lg transition-all ${
              subTab === 'homework'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Homework & Tasks
          </button>
          <button
            onClick={() => setSubTab('exams')}
            className={`px-4 py-2 rounded-lg transition-all ${
              subTab === 'exams'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Examinations & Results
          </button>
        </div>
      </div>

      {subTab === 'homework' ? (
        /* HOMEWORK SECTION */
        <div className="space-y-4">
          {activeSubmitHwId && (
            <form onSubmit={handleSub} className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800/50 space-y-3 text-xs">
              <span className="font-bold text-orange-950 dark:text-orange-200">
                Submit Homework Solution
              </span>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your solutions or notes for the subject teacher..."
                className="w-full p-2.5 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmitHwId(null)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0A2540] text-white font-bold rounded-lg"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeworkList.map((hw) => (
              <div
                key={hw.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      {hw.subject} · {hw.className}-{hw.section}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Total: {hw.totalMarks} Marks
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {hw.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    Due: <strong className="text-slate-700 dark:text-slate-300">{hw.dueDate}</strong>
                  </div>

                  {hw.submitted ? (
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Submitted ({hw.obtainedMarks || 'Pending Grade'})</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveSubmitHwId(hw.id)}
                      className="px-3 py-1 rounded-lg bg-[#F37021] hover:bg-orange-600 text-white font-bold text-xs"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* EXAMS & RESULTS SECTION */
        <div className="space-y-6">
          {/* Upcoming Exam Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 tracking-wider">
                  Official Exam Notification
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {upcomingExam.name} ({upcomingExam.academicYear})
                </h3>
                <p className="text-xs text-slate-500">
                  Conducted according to Board of Intermediate & Secondary Education (BISE) Mardan regulations
                </p>
              </div>

              <button
                onClick={() => openModal('report_card')}
                className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View Digital Report Card</span>
              </button>
            </div>

            {/* Exam Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Timing</th>
                    <th className="py-2.5 px-3">Examination Hall</th>
                    <th className="py-2.5 px-3">Total Marks</th>
                    <th className="py-2.5 px-3">Syllabus Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {upcomingExam.schedule.map((paper, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{paper.subject}</td>
                      <td className="py-3 px-3 font-mono text-purple-600 font-bold">{paper.date}</td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{paper.time}</td>
                      <td className="py-3 px-3 text-slate-500">{paper.room}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{paper.maxMarks}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-500 max-w-xs truncate">{paper.syllabus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
