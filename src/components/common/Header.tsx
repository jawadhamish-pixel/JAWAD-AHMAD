import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfficialBranding } from './OfficialBranding';
import {
  Bell,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Globe,
  UserCheck,
  Search,
  Sparkles,
  QrCode,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { UserRole, Language } from '../../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNotifications
}) => {
  const {
    currentUser,
    switchUser,
    viewMode,
    setViewMode,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    isOffline,
    setIsOffline,
    notificationsList,
    noticesList,
    openModal,
    searchQuery,
    setSearchQuery,
    t
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadNotifs = notificationsList.filter((n) => !n.read).length;
  const emergencyNotice = noticesList.find((n) => n.priority === 'Emergency');

  const navLinks = [
    { id: 'dashboard', label: t('dashboard') },
    { id: 'academics', label: 'Academics' },
    { id: 'attendance', label: t('attendance') },
    { id: 'fees', label: t('fees') },
    { id: 'communication', label: 'Communication' },
    { id: 'campus', label: 'Campus & Info' }
  ];

  const rolesList: { role: UserRole; name: string; title: string }[] = [
    { role: 'super_admin', name: 'Dr. Tariq Mahmood', title: 'Principal / Super Admin' },
    { role: 'teacher', name: 'Sir Muhammad Ahmed', title: 'Senior Teacher (Class 9-A)' },
    { role: 'parent', name: 'Mr. Tariq Khan', title: 'Parent (Ali & Fatima)' },
    { role: 'student', name: 'Ali Khan', title: 'Student (Class 9-A)' }
  ];

  const roleNameDisplay: Record<UserRole, string> = {
    super_admin: 'Admin Portal',
    teacher: 'Teacher Portal',
    parent: 'Parent Portal',
    student: 'Student Portal',
    admin: 'Admin Portal'
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* High-Priority Emergency Notice Banner if present */}
      {emergencyNotice && (
        <div className="bg-red-600 text-white text-xs px-4 py-1.5 flex items-center justify-between font-medium">
          <div className="flex items-center gap-2 max-w-5xl mx-auto truncate">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-300 animate-pulse" />
            <span className="font-bold tracking-wide uppercase">Urgent Advisory:</span>
            <span className="truncate">{emergencyNotice.title} — {emergencyNotice.description}</span>
          </div>
          <button
            onClick={() => openModal('notice_detail', emergencyNotice)}
            className="text-xs underline font-semibold hover:text-amber-200 shrink-0 ml-3"
          >
            Read Full
          </button>
        </div>
      )}

      {/* Offline Mode Indicator */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 text-xs py-1 px-4 text-center font-bold tracking-wide">
          {t('offlineModeNotice')}
        </div>
      )}

      {/* Top Bar Contract: 3-Zone Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single Brand Zone */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
          >
            <OfficialBranding size="md" />
          </button>

          {/* Active Portal Badge */}
          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {roleNameDisplay[currentUser.role]}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Text with subtle hover underline) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                activeTab === link.id
                  ? 'text-[#0A2540] dark:text-white font-bold'
                  : 'hover:text-[#F37021] dark:hover:text-orange-400'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F37021] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Bar Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 z-50">
                <input
                  type="text"
                  placeholder="Search students, exams, notices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  className="w-full h-9 pl-8 pr-3 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white shadow-lg"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                title="Global Search"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* QR Code Verification Tool */}
          <button
            onClick={() => openModal('qr_scanner')}
            title="Scan Student QR / Verify ID"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* AI School Assistant */}
          <button
            onClick={() => openModal('ai_assistant')}
            title="PMS AI Assistant"
            className="hidden sm:flex items-center gap-1.5 px-2.5 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 hover:bg-orange-100 transition-colors text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
            <span className="hidden xl:inline">AI Help</span>
          </button>

          {/* Device Simulator Toggle: Mobile vs Web View */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'web' : 'mobile')}
            title={viewMode === 'mobile' ? 'Switch to Full Web Dashboard' : 'Switch to Mobile App Preview'}
            className="flex items-center gap-1 px-2.5 h-9 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            {viewMode === 'mobile' ? (
              <>
                <Monitor className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Web Portal</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#F37021]" />
                <span className="hidden sm:inline">Mobile App</span>
              </>
            )}
          </button>

          {/* Notification Inbox Bell */}
          <button
            onClick={onOpenNotifications}
            title="Notifications"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2 h-9 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="uppercase font-bold">{language}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    language === 'en' ? 'font-bold text-orange-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage('ur');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    language === 'ur' ? 'font-bold text-orange-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  اردو (Urdu)
                </button>
                <button
                  onClick={() => {
                    setLanguage('ps');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    language === 'ps' ? 'font-bold text-orange-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  پښتو (Pashto)
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Role Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 h-9 rounded-lg bg-[#0A2540] dark:bg-slate-800 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-[#F37021] text-white flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline font-semibold max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Logged in as
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-[#F37021] font-medium">
                    {roleNameDisplay[currentUser.role]}
                  </div>
                </div>

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Active Role Demo:
                </div>

                <div className="space-y-1">
                  {rolesList.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        switchUser(item.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        currentUser.role === item.role
                          ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.title}</div>
                      </div>
                      {currentUser.role === item.role && (
                        <UserCheck className="w-3.5 h-3.5 text-[#F37021]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Simulated Offline Mode Toggle */}
                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 px-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Simulate Offline</span>
                  <input
                    type="checkbox"
                    checked={isOffline}
                    onChange={(e) => setIsOffline(e.target.checked)}
                    className="accent-orange-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
