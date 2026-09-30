import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  Send,
  MessageSquare,
  Award,
  BellRing,
  BookOpen,
  Filter
} from 'lucide-react';
import { AttendanceStatus, AttendanceRecord } from '../../types';

interface TeacherPortalProps {
  onNavigateToTab: (tab: string) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ onNavigateToTab }) => {
  const {
    currentUser,
    allStudents,
    attendanceRecords,
    markAttendance,
    sendAbsentNotice,
    homeworkList,
    createHomework,
    gradeHomework
  } = useApp();

  const [selectedClass, setSelectedClass] = useState('Class 9-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  // Homework creation state
  const [showHwModal, setShowHwModal] = useState(false);
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState('2026-10-02');
  const [hwMarks, setHwMarks] = useState(20);

  // Homework grading state
  const [gradingHwId, setGradingHwId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(18);
  const [gradeFeedback, setGradeFeedback] = useState('Good conceptual working.');

  // Students in selected class (Class 9-A)
  const classStudents = allStudents.filter(
    (s) => `${s.className}-${s.section}` === selectedClass || selectedClass.includes(s.className)
  );

  // Today's date
  const today = '2026-09-29';

  const handleMark = (studentId: string, studentName: string, rollNo: number, status: AttendanceStatus) => {
    const record: AttendanceRecord = {
      id: `att-${studentId}-${today}`,
      studentId,
      studentName,
      rollNo,
      className: 'Class 9',
      section: 'A',
      date: today,
      status
    };
    markAttendance(record);
  };

  const handleNotifyAbsentees = () => {
    const absentees = classStudents.filter((st) => {
      const rec = attendanceRecords.find((r) => r.studentId === st.id && r.date === today);
      return rec?.status === 'absent';
    });

    if (absentees.length === 0) {
      alert('All students are present or marked with leave. No absentee notices needed.');
      return;
    }

    absentees.forEach((st) => {
      sendAbsentNotice(st.name, selectedClass);
    });

    alert(`Dispatched automated SMS & App push alerts to ${absentees.length} parents regarding absent status.`);
  };

  const handleCreateHw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim() || !hwDesc.trim()) return;

    createHomework({
      title: hwTitle,
      subject: selectedSubject,
      className: 'Class 9',
      section: 'A',
      assignedDate: today,
      dueDate: hwDueDate,
      assignedBy: currentUser.name,
      description: hwDesc,
      totalMarks: Number(hwMarks)
    });

    setHwTitle('');
    setHwDesc('');
    setShowHwModal(false);
  };

  const handleSaveGrade = (hwId: string) => {
    gradeHomework(hwId, gradeScore, gradeFeedback);
    setGradingHwId(null);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D2E50] to-[#0A2540] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F37021]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Faculty Console · Peshawar Model School Mardan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300">
            Head of Mathematics · Class 9-A Incharge · Employee ID: EMP-MDR-104
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => setShowHwModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Homework</span>
          </button>
          <button
            onClick={() => onNavigateToTab('communication')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Parent Messages</span>
          </button>
        </div>
      </div>

      {/* Class Switcher & Quick Action Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Assigned Class:
          </span>
          <div className="flex items-center gap-1.5">
            {['Class 9-A', 'Class 9-B', 'Class 10-A'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedClass === cls
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNotifyAbsentees}
          className="px-3.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-bold border border-red-200 dark:border-red-900/50 flex items-center gap-1.5 transition-colors"
        >
          <BellRing className="w-4 h-4 text-red-500 animate-bounce" />
          <span>Notify Parents of Absentees</span>
        </button>
      </div>

      {/* Homework Creation Modal */}
      {showHwModal && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg animate-in slide-in-from-top-3 duration-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F37021]" />
              <span>Create Homework for {selectedClass}</span>
            </h3>
            <button
              onClick={() => setShowHwModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateHw} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Homework Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Exercise 2.2 Quadratic Roots Word Problems"
                  value={hwTitle}
                  onChange={(e) => setHwTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={hwDueDate}
                  onChange={(e) => setHwDueDate(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Description & Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Detailed instructions for students..."
                value={hwDesc}
                onChange={(e) => setHwDesc(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowHwModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
              >
                Publish & Notify Class
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Dual Grid: Attendance Marking Grid & Submissions Review */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Marking Grid (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Daily Attendance Register · {selectedClass}
              </h3>
              <p className="text-xs text-slate-500">
                Marking for today ({today}). Click status button to toggle.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F37021]">
              {classStudents.length} Students
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {classStudents.map((st) => {
              const currentRec = attendanceRecords.find(
                (r) => r.studentId === st.id && r.date === today
              );
              const status = currentRec ? currentRec.status : 'present';

              return (
                <div
                  key={st.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={st.photo}
                      alt={st.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {st.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Roll #{st.rollNo} · {st.studentId}
                      </div>
                    </div>
                  </div>

                  {/* Attendance Status Buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => handleMark(st.id, st.name, st.rollNo, 'present')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === 'present'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleMark(st.id, st.name, st.rollNo, 'absent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === 'absent'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleMark(st.id, st.name, st.rollNo, 'late')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === 'late'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => handleMark(st.id, st.name, st.rollNo, 'leave')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        status === 'leave'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Leave
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submissions & Grading Review (1 Column) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Submitted Tasks
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600">
              Needs Review
            </span>
          </div>

          <div className="space-y-3">
            {homeworkList
              .filter((h) => h.submitted)
              .map((hw) => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{hw.title}</div>
                      <div className="text-[11px] text-slate-500">Student: Ali Khan (Roll #12)</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Submitted
                    </span>
                  </div>

                  {hw.studentSubmissionText && (
                    <p className="text-[11px] text-slate-600 italic bg-white dark:bg-slate-900 p-2 rounded border border-slate-100">
                      "{hw.studentSubmissionText}"
                    </p>
                  )}

                  {gradingHwId === hw.id ? (
                    <div className="pt-2 space-y-2 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold">Marks:</span>
                        <input
                          type="number"
                          value={gradeScore}
                          onChange={(e) => setGradeScore(Number(e.target.value))}
                          className="w-16 h-7 px-2 text-xs border rounded"
                        />
                        <span className="text-[11px] text-slate-400">/ {hw.totalMarks}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Feedback note..."
                        value={gradeFeedback}
                        onChange={(e) => setGradeFeedback(e.target.value)}
                        className="w-full h-8 px-2 text-xs border rounded"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setGradingHwId(null)}
                          className="px-2 py-1 text-[11px] text-slate-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveGrade(hw.id)}
                          className="px-3 py-1 bg-[#0A2540] text-white text-[11px] font-bold rounded"
                        >
                          Save Grade
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-700">
                        {hw.obtainedMarks ? `Graded: ${hw.obtainedMarks}/${hw.totalMarks}` : 'Ungraded'}
                      </span>
                      <button
                        onClick={() => setGradingHwId(hw.id)}
                        className="text-xs font-bold text-[#F37021] hover:underline"
                      >
                        {hw.obtainedMarks ? 'Edit Grade' : 'Grade Submission'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
