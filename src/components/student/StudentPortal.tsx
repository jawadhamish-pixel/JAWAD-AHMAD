import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Calendar,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Download,
  Upload,
  QrCode,
  BookMarked,
  ArrowRight
} from 'lucide-react';
import { MOCK_TIMETABLE, MOCK_BOOKS, MOCK_EXAMS } from '../../data/mockData';

interface StudentPortalProps {
  onNavigateToTab: (tab: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onNavigateToTab }) => {
  const { currentStudent, homeworkList, submitHomework, openModal } = useApp();

  const [activeSubmissionHwId, setActiveSubmissionHwId] = useState<string | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');

  const todayTimetable = MOCK_TIMETABLE.find((d) => d.day === 'Monday') || MOCK_TIMETABLE[0];
  const upcomingExam = MOCK_EXAMS.find((e) => e.status === 'Upcoming') || MOCK_EXAMS[0];
  const issuedBooks = MOCK_BOOKS.filter((b) =>
    b.issuedTo?.some((i) => i.studentId === currentStudent.studentId)
  );

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmissionHwId || !submissionNotes.trim()) return;

    submitHomework(activeSubmissionHwId, submissionNotes);
    setActiveSubmissionHwId(null);
    setSubmissionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome & Digital ID Bar */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D2E50] to-[#0A2540] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <img
            src={currentStudent.photo}
            alt={currentStudent.name}
            className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl object-cover ring-2 ring-[#F37021] shadow-lg"
          />
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F37021] font-bold">
              {currentStudent.studentId} · Roll #{currentStudent.rollNo}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {currentStudent.name}!
            </h1>
            <p className="text-xs text-slate-300">
              {currentStudent.className} · Section {currentStudent.section} · Current Rank: <strong className="text-amber-300">{currentStudent.currentRank}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => openModal('id_card', currentStudent)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-orange-400" />
            <span>Digital Student ID</span>
          </button>
          <button
            onClick={() => openModal('report_card')}
            className="px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>Report Card</span>
          </button>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timetable & Homework Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Timetable */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Today's Academic Schedule · {todayTimetable.day}
                </h3>
                <p className="text-xs text-slate-500">
                  Room 204 & Science Labs · Class 9-A
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('academics')}
                className="text-xs font-bold text-[#F37021] hover:underline flex items-center gap-1"
              >
                <span>Full Week</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayTimetable.periods.map((p, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                    p.isBreak
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#F37021]">
                        P{p.period}
                      </span>
                      <span className="font-bold truncate">{p.subject}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {p.teacher} · {p.room}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 shrink-0 font-medium">
                    {p.time.split(' - ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Homework & Submissions */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Homework & Assignments
                </h3>
                <p className="text-xs text-slate-500">
                  Review tasks, download worksheets and upload completed work
                </p>
              </div>
            </div>

            {/* Submission Modal / Box if active */}
            {activeSubmissionHwId && (
              <form
                onSubmit={handleSubmitHomework}
                className="p-4 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-900 dark:text-orange-200">
                    Upload & Submit Homework
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSubmissionHwId(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Enter brief answers or notes on completed numericals / attachment description..."
                  className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Upload className="w-3.5 h-3.5 text-orange-500" />
                    <span>Attach document / photos simulation</span>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
                  >
                    Submit Assignment
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {homeworkList.map((hw) => (
                <div
                  key={hw.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {hw.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {hw.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {hw.description}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Assigned by {hw.assignedBy} · Due: <strong className="text-slate-700 dark:text-slate-300">{hw.dueDate}</strong>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {hw.submitted ? (
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </span>
                        {hw.obtainedMarks && (
                          <span className="text-[11px] font-mono text-slate-500 block">
                            Score: {hw.obtainedMarks}/{hw.totalMarks}
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSubmissionHwId(hw.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Exams & Library Books */}
        <div className="space-y-6">
          {/* Upcoming Exams Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Upcoming Exams
              </h3>
              <span className="text-xs font-bold text-purple-600">12th Oct 2026</span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 space-y-2 text-xs">
              <div className="font-bold text-purple-950 dark:text-purple-200">
                {upcomingExam.name}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Formal examination covering Units 1 to 4 under BISE Mardan guidelines.
              </p>
              <div className="divide-y divide-purple-100 dark:divide-purple-900/40 pt-1 text-[11px]">
                {upcomingExam.schedule.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="py-1.5 flex justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{s.subject}</span>
                    <span className="font-mono text-slate-500">{s.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab('academics')}
              className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              View Full Exam Datesheet
            </button>
          </div>

          {/* Library Books Issued */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#F37021]" />
                <span>Library Borrowing</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">1 Issued</span>
            </div>

            {issuedBooks.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-white">{b.title}</div>
                <div className="text-slate-500 text-[11px]">By {b.author}</div>
                <div className="flex justify-between items-center text-[10px] text-amber-600 font-semibold pt-1">
                  <span>Return Due Date:</span>
                  <span className="font-mono">06 Oct 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
