import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfficialBranding } from '../common/OfficialBranding';
import {
  Home,
  BookOpen,
  Bell,
  MessageSquare,
  User,
  Monitor,
  Calendar,
  CreditCard,
  QrCode,
  Sparkles,
  Wifi,
  Battery,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Download,
  Bus
} from 'lucide-react';
import { MOCK_NOTICES, MOCK_TIMETABLE } from '../../data/mockData';

interface MobileAppShellProps {
  onOpenNotifications: () => void;
  onOpenIdCard: () => void;
  onOpenReportCard: () => void;
  onOpenFeeVoucher: () => void;
  onOpenQrScanner: () => void;
  onOpenAiAssistant: () => void;
}

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  onOpenNotifications,
  onOpenIdCard,
  onOpenReportCard,
  onOpenFeeVoucher,
  onOpenQrScanner,
  onOpenAiAssistant
}) => {
  const {
    currentUser,
    switchUser,
    currentStudent,
    allStudents,
    selectedChildId,
    setSelectedChildId,
    homeworkList,
    feesList,
    notificationsList,
    setViewMode
  } = useApp();

  const [mobileTab, setMobileTab] = useState<'home' | 'academics' | 'notices' | 'messages' | 'profile'>('home');

  const unreadNotifs = notificationsList.filter((n) => !n.read).length;
  const pendingFee = feesList.find((f) => f.studentId === currentStudent.id && f.status !== 'Paid');
  const todayTimetable = MOCK_TIMETABLE[0];

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 sm:px-4">
      {/* Top Device Switcher Controls */}
      <div className="mb-4 flex items-center justify-between w-full max-w-sm px-2 text-xs">
        <span className="text-slate-500 font-medium">Smartphone App Simulation</span>
        <button
          onClick={() => setViewMode('web')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A2540] text-white font-bold hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Monitor className="w-3.5 h-3.5 text-[#F37021]" />
          <span>Switch to Web Portal</span>
        </button>
      </div>

      {/* Realistic Mobile Phone Frame (390px x 844px iPhone/Android Canvas) */}
      <div className="w-full max-w-[400px] h-[830px] max-h-[92vh] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 relative overflow-hidden flex flex-col">
        {/* Physical outer border & screen canvas */}
        <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-11 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-slate-200 shrink-0 select-none z-30">
            <span>09:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Top App Bar (52px height) */}
          <div className="h-14 px-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
            <OfficialBranding size="sm" />
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenQrScanner}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenNotifications}
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F37021]" />
                )}
              </button>
            </div>
          </div>

          {/* Scrollable Mobile Body Content Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {mobileTab === 'home' && (
              <>
                {/* Child Quick Selector if Parent Role */}
                {currentUser.role === 'parent' && (
                  <div className="flex items-center gap-2 p-1.5 bg-slate-200 dark:bg-slate-800 rounded-2xl">
                    {['student-ali-khan', 'student-fatima-noor'].map((cid) => {
                      const st = allStudents.find((s) => s.id === cid);
                      if (!st) return null;
                      return (
                        <button
                          key={cid}
                          onClick={() => setSelectedChildId(cid)}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center truncate ${
                            selectedChildId === cid
                              ? 'bg-white dark:bg-slate-900 text-[#0A2540] dark:text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {st.name} ({st.className})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Hero Greeting Card */}
                <div className="p-4 rounded-3xl bg-gradient-to-r from-[#0A2540] to-[#123963] text-white shadow-lg space-y-3 relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentStudent.photo}
                      alt={currentStudent.name}
                      className="w-12 h-14 rounded-xl object-cover ring-2 ring-[#F37021]"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#F37021] font-bold block">
                        {currentStudent.studentId}
                      </span>
                      <h3 className="text-base font-black leading-tight text-white">
                        {currentStudent.name}
                      </h3>
                      <p className="text-[11px] text-amber-200">
                        {currentStudent.className}-{currentStudent.section} · Roll #{currentStudent.rollNo}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                    <div className="bg-white/10 p-2 rounded-xl text-center">
                      <span className="text-slate-300 block text-[9px]">Attendance</span>
                      <span className="font-bold text-white text-xs">{currentStudent.attendancePercentage}%</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl text-center">
                      <span className="text-slate-300 block text-[9px]">Academic Grade</span>
                      <span className="font-bold text-amber-300 text-xs">A1 (91.1%)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Touch Action Row (Thumb Friendly) */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  <button
                    onClick={onOpenIdCard}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <QrCode className="w-5 h-5 text-[#0A2540] dark:text-blue-400" />
                    <span>Digital ID</span>
                  </button>
                  <button
                    onClick={onOpenReportCard}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Award className="w-5 h-5 text-[#F37021]" />
                    <span>Results</span>
                  </button>
                  <button
                    onClick={onOpenFeeVoucher}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>Pay Fee</span>
                  </button>
                  <button
                    onClick={onOpenAiAssistant}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>AI Help</span>
                  </button>
                </div>

                {/* Pending Fees Warning Banner if any */}
                {pendingFee && (
                  <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#F37021] block">
                        October Tuition Voucher
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        PKR {pendingFee.totalAmount.toLocaleString()} Due
                      </span>
                    </div>
                    <button
                      onClick={onOpenFeeVoucher}
                      className="px-3 py-1.5 rounded-xl bg-[#F37021] text-white text-xs font-bold shadow-xs"
                    >
                      Pay Online
                    </button>
                  </div>
                )}

                {/* Today's Schedule Snapshot */}
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Today's Classes (Monday)
                    </span>
                    <button
                      onClick={() => setMobileTab('academics')}
                      className="text-[#F37021] font-bold"
                    >
                      All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {todayTimetable.periods.slice(0, 3).map((p, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">{p.subject}</div>
                          <div className="text-[10px] text-slate-500">{p.teacher} · {p.room}</div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{p.time.split(' - ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Notice Callout */}
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-blue-600 block">
                    Campus Circular
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {MOCK_NOTICES[0].title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {MOCK_NOTICES[0].description}
                  </p>
                </div>
              </>
            )}

            {mobileTab === 'academics' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Academic Tasks & Homework
                </h3>
                <div className="space-y-2.5">
                  {homeworkList.map((hw) => (
                    <div
                      key={hw.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex justify-between">
                        <span className="font-bold text-blue-600">{hw.subject}</span>
                        <span className="text-[10px] text-slate-400">Due: {hw.dueDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{hw.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{hw.description}</p>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className="text-slate-400">By {hw.assignedBy}</span>
                        <span className="font-bold text-emerald-600">
                          {hw.submitted ? 'Submitted' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'notices' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  School Notices & Alerts
                </h3>
                <div className="space-y-2.5">
                  {MOCK_NOTICES.map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                    >
                      <div className="flex justify-between text-[10px] font-bold text-[#F37021]">
                        <span>{n.priority} · {n.category}</span>
                        <span className="text-slate-400">{n.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{n.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{n.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'messages' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Teacher Conversations
                </h3>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Sir Muhammad Ahmed (Mathematics)</span>
                    <span className="text-[10px] text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    "Ali has shown complete mastery in class tests. He is very well prepared."
                  </p>
                </div>
              </div>
            )}

            {mobileTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <img
                    src={currentStudent.photo}
                    alt={currentStudent.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-orange-500"
                  />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">{currentUser.name}</h3>
                  <p className="text-slate-500 text-[11px]">{currentUser.role.toUpperCase()} ACCOUNT</p>
                </div>

                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-medium">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">School Campus</span>
                    <span className="font-bold">PMS Mardan Campus</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Emergency Phone</span>
                    <span className="font-mono">+92 937 860124</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Active Session</span>
                    <span className="font-mono">2025-2026</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Ergonomic Bottom Tab Bar (Pattern 1 from mobile touch reference) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 items-center px-2 z-30">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'academics', label: 'Academics', icon: BookOpen },
              { id: 'notices', label: 'Notices', icon: Bell },
              { id: 'messages', label: 'Chat', icon: MessageSquare },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id as any)}
                className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                  mobileTab === tab.id
                    ? 'text-[#F37021] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
