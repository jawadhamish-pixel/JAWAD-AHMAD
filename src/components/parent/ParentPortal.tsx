import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  BookOpen,
  Award,
  CreditCard,
  MessageSquare,
  Bus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  Phone
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_TIMETABLE, MOCK_ROUTES } from '../../data/mockData';

interface ParentPortalProps {
  onNavigateToTab: (tab: string) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ onNavigateToTab }) => {
  const {
    currentUser,
    selectedChildId,
    setSelectedChildId,
    currentStudent,
    allStudents,
    attendanceRecords,
    homeworkList,
    feesList,
    openModal,
    t
  } = useApp();

  // Children for Mr. Tariq Khan
  const children = allStudents.filter(
    (s) => s.id === 'student-ali-khan' || s.id === 'student-fatima-noor'
  );

  const student = currentStudent;

  // Student's today attendance
  const todayRecord = attendanceRecords.find(
    (r) => r.studentId === student.id && r.date === '2026-09-29'
  );

  // Student's pending fees
  const pendingFee = feesList.find(
    (f) => f.studentId === student.id && f.status !== 'Paid'
  );

  // Student's pending homework
  const pendingHw = homeworkList.filter((h) => !h.submitted);

  // Assigned bus route
  const assignedRoute = MOCK_ROUTES.find((r) => r.id === student.busRouteId) || MOCK_ROUTES[0];

  return (
    <div className="space-y-6">
      {/* Multi-Child Switcher Banner (Mandatory feature from Section 6 of prompt) */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Parent Account · {currentUser.name}
          </span>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Select Enrolled Child:
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-3 transition-all text-left ${
                selectedChildId === child.id
                  ? 'bg-[#0A2540] text-white shadow-md ring-2 ring-orange-500'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <img
                src={child.photo}
                alt={child.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-white/50"
              />
              <div>
                <div className="text-xs font-bold leading-tight">{child.name}</div>
                <div className={`text-[10px] ${selectedChildId === child.id ? 'text-amber-300' : 'text-slate-400'}`}>
                  {child.className} - {child.section} · Roll #{child.rollNo}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Child Status Hero Card */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0F3256] to-[#0A2540] rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <img
            src={student.photo}
            alt={student.name}
            className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl object-cover ring-2 ring-[#F37021] shadow-lg"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F37021] font-bold">
                {student.studentId}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300">Session {student.academicYear}</span>
            </div>
            <h1 className="text-2xl font-black text-white">{student.name}</h1>
            <p className="text-xs text-amber-200 font-medium">
              {student.className} · Section {student.section} · Roll #{student.rollNo} · Position: {student.currentRank}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => openModal('id_card', student)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors"
          >
            Digital ID Card
          </button>
          <button
            onClick={() => onNavigateToTab('communication')}
            className="px-3.5 py-2 rounded-xl bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message Teacher</span>
          </button>
        </div>
      </div>

      {/* Child Live Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Status */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Attendance</span>
            {todayRecord?.status === 'present' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white capitalize">
            {todayRecord ? todayRecord.status : 'Present'}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Overall Term: <strong>{student.attendancePercentage}%</strong>
          </div>
        </div>

        {/* Term GPA / Rank */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Academic Grade</span>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Grade A1
          </div>
          <div className="text-xs text-slate-500 mt-1">
            GPA {student.currentTermGpa}
          </div>
        </div>

        {/* Pending Homework */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Tasks</span>
            <BookOpen className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {pendingHw.length} Due
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Physics Numerical Sheet
          </div>
        </div>

        {/* Tuition Fee Status */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tuition Fee</span>
            <CreditCard className="w-5 h-5 text-[#F37021]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {pendingFee ? 'PKR ' + pendingFee.totalAmount.toLocaleString() : 'All Cleared'}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {pendingFee ? `Due: ${pendingFee.dueDate}` : 'September 2026 Paid'}
          </div>
        </div>
      </div>

      {/* Main Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homework & Academic Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Homework Feed */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Active Homework & Submissions
                </h3>
                <p className="text-xs text-slate-500">
                  Daily assignments uploaded by subject teachers
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('academics')}
                className="text-xs font-bold text-[#F37021] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {homeworkList.slice(0, 3).map((hw) => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      {hw.description}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      By {hw.assignedBy} · Due: <strong className="text-slate-700 dark:text-slate-300">{hw.dueDate}</strong>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {hw.submitted ? (
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submitted ({hw.obtainedMarks ? `${hw.obtainedMarks}/${hw.totalMarks}` : 'Grading'})</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Card & Results Callout */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#F37021] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Term 1 Summative Assessment Report Card
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Published by Examination Directorate · Grade A1 (91.14%) · 2nd Position
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal('report_card')}
              className="px-4 py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report Card</span>
            </button>
          </div>
        </div>

        {/* Sidebar: School Bus Transit & Fee Voucher */}
        <div className="space-y-6">
          {/* Fee Voucher Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Fee Voucher
              </h3>
              <span className="text-xs font-mono font-bold text-[#F37021]">October 2026</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Voucher No:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">PMS-V-2026-10-1042</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Payable:</span>
                <span className="font-bold text-sm text-[#0A2540] dark:text-blue-400">PKR 12,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Due Date:</span>
                <span className="font-bold text-red-600">10th October 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal('fee_voucher')}
                className="flex-1 py-2.5 rounded-xl bg-[#F37021] hover:bg-orange-600 text-white text-xs font-bold transition-colors text-center"
              >
                Pay Online (EasyPaisa/JazzCash)
              </button>
              <button
                onClick={() => openModal('fee_voucher')}
                className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-300"
                title="Print Voucher"
              >
                Print
              </button>
            </div>
          </div>

          {/* Transport Route Info */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#0A2540]" />
                <span>Assigned School Bus</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                Active Fleet
              </span>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                {assignedRoute.busNumber}
              </div>
              <p className="text-slate-500 text-[11px]">
                {assignedRoute.routeTitle}
              </p>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver Incharge:</span>
                  <span className="font-bold">{assignedRoute.driverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Contact:</span>
                  <a
                    href={`tel:${assignedRoute.driverPhone}`}
                    className="font-mono font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{assignedRoute.driverPhone}</span>
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup Stop:</span>
                  <span className="font-semibold text-[#F37021]">Sector C Park (07:25 AM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
