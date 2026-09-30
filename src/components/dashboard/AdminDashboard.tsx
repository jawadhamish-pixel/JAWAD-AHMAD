import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_INFO } from '../../data/mockData';
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Download,
  PlusCircle,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  Sparkles,
  QrCode
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    allStudents,
    allTeachers,
    attendanceRecords,
    feesList,
    examsList,
    noticesList,
    auditLogsList,
    openModal,
    addNotice,
    t
  } = useApp();

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');
  const [newNoticePriority, setNewNoticePriority] = useState<'Normal' | 'High' | 'Emergency'>('Normal');
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  // Enrollment stats
  const totalStudents = 1480;
  const totalTeachers = 68;
  const totalClasses = 24; // Prep through Class 10

  // Attendance stats for today
  const todayRecords = attendanceRecords;
  const presentCount = todayRecords.filter((r) => r.status === 'present').length;
  const absentCount = todayRecords.filter((r) => r.status === 'absent').length;
  const lateCount = todayRecords.filter((r) => r.status === 'late').length;
  const totalMarked = todayRecords.length || 1;
  const presentRate = ((presentCount / totalMarked) * 100).toFixed(1);

  // Fee collection stats
  const collectedFee = 4280000;
  const targetFee = 4650000;
  const collectionPercentage = ((collectedFee / targetFee) * 100).toFixed(1);

  // Class-wise grading oversight data
  const classPerformance = [
    { name: 'Class 10 (SSC-II)', students: 165, avgScore: '86.4%', passRate: '98.5%', leadTeacher: 'Sir Tariq Aziz' },
    { name: 'Class 9 (SSC-I)', students: 178, avgScore: '84.2%', passRate: '97.2%', leadTeacher: 'Sir Muhammad Ahmed' },
    { name: 'Class 8 (Middle)', students: 182, avgScore: '82.8%', passRate: '96.0%', leadTeacher: 'Ms. Sana Khan' },
    { name: 'Class 7 (Middle)', students: 175, avgScore: '81.5%', passRate: '95.4%', leadTeacher: 'Sir Usman Ali' },
    { name: 'Class 6 (Middle)', students: 180, avgScore: '83.0%', passRate: '96.8%', leadTeacher: 'Dr. Naila Parveen' },
    { name: 'Primary (Classes 1-5)', students: 520, avgScore: '88.5%', passRate: '99.0%', leadTeacher: 'Ms. Rubina Khattak' }
  ];

  const handleExportData = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Action,User,Role,Record,Timestamp\n' +
      auditLogsList.map((l) => `"${l.id}","${l.action}","${l.user}","${l.role}","${l.affectedRecord}","${l.timestamp}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PMS_Mardan_Audit_Logs_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeDesc.trim()) return;

    addNotice({
      title: newNoticeTitle,
      description: newNoticeDesc,
      category: 'General',
      priority: newNoticePriority,
      author: 'Campus Administration'
    });

    setNewNoticeTitle('');
    setNewNoticeDesc('');
    setShowNoticeForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Central Oversight Header */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D2E50] to-[#0A2540] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F37021]">
              <span className="w-2 h-2 rounded-full bg-[#F37021] animate-pulse" />
              <span>Real-Time Academic Management & Administrative Oversight</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Peshawar Model School · Mardan Campus
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Executive console for real-time student enrollment tracking, grading performance, faculty deployment, fee collections, and automated parental communications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => openModal('qr_scanner')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/15"
            >
              <QrCode className="w-4 h-4 text-orange-400" />
              <span>Gate QR Verifier</span>
            </button>
            <button
              onClick={handleExportData}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/15"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Audit CSV</span>
            </button>
            <button
              onClick={() => setShowNoticeForm(!showNoticeForm)}
              className="px-4 py-2 rounded-xl bg-[#F37021] hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notice Creation Drawer / Form */}
      {showNoticeForm && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md animate-in slide-in-from-top-3 duration-200">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-[#F37021]" />
            <span>Broadcast New Official Announcement</span>
          </h3>
          <form onSubmit={handleCreateNotice} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Notice Title (e.g. Schedule for Sports Week 2026)"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <select
                  value={newNoticePriority}
                  onChange={(e) => setNewNoticePriority(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Emergency">🚨 EMERGENCY BROADCAST</option>
                </select>
              </div>
            </div>
            <div>
              <textarea
                placeholder="Detailed announcement instructions for students, parents and staff..."
                value={newNoticeDesc}
                onChange={(e) => setNewNoticeDesc(e.target.value)}
                rows={2}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoticeForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
              >
                Publish & Push Alert
              </button>
            </div>
          </form>
        </div>
      )}

      {/* KPI Stat Cards Grid (Zero-pill, high contrast, clean typography) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Enrolled</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalStudents.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">+48 admissions</span>
              <span aria-hidden="true">·</span>
              <span>2025-26 Session</span>
            </div>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Attendance Rate</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {presentRate}%
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="font-semibold text-emerald-600">{presentCount} Present</span>
              <span aria-hidden="true">·</span>
              <span className="text-red-500 font-semibold">{absentCount} Absent</span>
            </div>
          </div>
        </div>

        {/* Fee Collection */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Fee Collection</span>
            <CreditCard className="w-5 h-5 text-[#F37021]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {collectionPercentage}%
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 truncate">
              <span>PKR 4.28M collected</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 font-medium">PKR 370K due</span>
            </div>
          </div>
        </div>

        {/* Teaching Staff */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Faculty & Staff</span>
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalTeachers}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>100% on duty</span>
              <span aria-hidden="true">·</span>
              <span>24 Classes active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Real-Time Enrollment & Grading Oversight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grading & Academic Oversight (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Class-Wise Academic Grading & Pass Rates
              </h3>
              <p className="text-xs text-slate-500">
                Evaluation results aggregated from Term 1 & Monthly Progress Evaluations
              </p>
            </div>
            <button
              onClick={() => openModal('report_card')}
              className="text-xs font-bold text-[#F37021] hover:underline flex items-center gap-1"
            >
              <span>Sample Report Card</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Class Group</th>
                  <th className="py-2.5 px-3">Enrolled</th>
                  <th className="py-2.5 px-3">Average Score</th>
                  <th className="py-2.5 px-3">Board Pass Rate</th>
                  <th className="py-2.5 px-3">Head of Department</th>
                  <th className="py-2.5 px-3 text-right">Oversight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {classPerformance.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{c.name}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 tabular-nums">{c.students}</td>
                    <td className="py-3 px-3 text-emerald-600 font-bold tabular-nums">{c.avgScore}</td>
                    <td className="py-3 px-3 text-blue-600 font-bold tabular-nums">{c.passRate}</td>
                    <td className="py-3 px-3 text-slate-500">{c.leadTeacher}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        On Target
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grade Distribution Meter */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
              Overall Campus Grade Distribution (BISE Mardan Benchmark)
            </span>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: '42%' }} className="bg-emerald-600" title="A1 Grade: 42%" />
              <div style={{ width: '34%' }} className="bg-blue-600" title="A Grade: 34%" />
              <div style={{ width: '18%' }} className="bg-amber-500" title="B Grade: 18%" />
              <div style={{ width: '6%' }} className="bg-slate-400" title="C Grade: 6%" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600" /> A1 (Outstanding): 42%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" /> A (Excellent): 34%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> B (Good): 18%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> C: 6%</span>
            </div>
          </div>
        </div>

        {/* Real-Time Enrollment & Capacity Oversight (1 Column) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Enrollment Capacity
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600">92.5% Filled</span>
          </div>

          <div className="space-y-3">
            {[
              { level: 'Senior Secondary (Classes 9-10)', count: 343, max: 360, pct: 95 },
              { level: 'Middle Wing (Classes 6-8)', count: 537, max: 580, pct: 92 },
              { level: 'Primary Wing (Classes 1-5)', count: 520, max: 560, pct: 93 },
              { level: 'Early Childhood (Prep & Nursery)', count: 80, max: 100, pct: 80 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.level}</span>
                  <span className="font-mono text-slate-500">{item.count} / {item.max}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A2540] dark:bg-blue-600 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Verification Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Administrative Tools
            </span>
            <button
              onClick={() => openModal('id_card')}
              className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#0A2540]" />
              <span>Preview Digital Student ID</span>
            </button>
            <button
              onClick={() => openModal('fee_voucher')}
              className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Preview Bank Fee Voucher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Audit Log Stream */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              System Audit & Compliance Log
            </h3>
            <p className="text-xs text-slate-500">
              Immutable record of administrative actions, grade postings, and communication alerts
            </p>
          </div>
          <button
            onClick={handleExportData}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Download Full Log</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
          {auditLogsList.slice(0, 5).map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#F37021] font-bold">[{log.role.toUpperCase()}]</span>
                <span className="font-semibold text-slate-900 dark:text-white">{log.user}:</span>
                <span className="text-slate-600 dark:text-slate-300">{log.action}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-[11px] shrink-0 font-mono">
                <span>{log.affectedRecord}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
