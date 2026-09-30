import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ParentPortal } from './components/parent/ParentPortal';
import { TeacherPortal } from './components/teacher/TeacherPortal';
import { StudentPortal } from './components/student/StudentPortal';
import { AcademicsModule } from './components/academic/AcademicsModule';
import { AttendanceSystem } from './components/attendance/AttendanceSystem';
import { FeeManagement } from './components/finance/FeeManagement';
import { ParentTeacherChat } from './components/communication/ParentTeacherChat';
import { CampusAndInfo } from './components/information/CampusAndInfo';
import { MobileAppShell } from './components/mobile/MobileAppShell';
import { DigitalIdCardModal } from './components/common/DigitalIdCardModal';
import { ReportCardModal } from './components/common/ReportCardModal';
import { FeeVoucherModal } from './components/common/FeeVoucherModal';
import { QrScannerModal } from './components/common/QrScannerModal';
import { AiAssistantModal } from './components/common/AiAssistantModal';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { SCHOOL_INFO } from './data/mockData';
import { OfficialBranding } from './components/common/OfficialBranding';
import { Phone, Mail, MapPin, Globe, Shield, Sparkles } from 'lucide-react';

const MainPortalContent: React.FC = () => {
  const { currentUser, viewMode, activeModal, openModal, closeModal, modalData } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Render role-specific dashboard or selected module
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'super_admin' || currentUser.role === 'admin') {
          return <AdminDashboard />;
        }
        if (currentUser.role === 'teacher') {
          return <TeacherPortal onNavigateToTab={setActiveTab} />;
        }
        if (currentUser.role === 'parent') {
          return <ParentPortal onNavigateToTab={setActiveTab} />;
        }
        if (currentUser.role === 'student') {
          return <StudentPortal onNavigateToTab={setActiveTab} />;
        }
        return <AdminDashboard />;

      case 'academics':
        return <AcademicsModule />;

      case 'attendance':
        return <AttendanceSystem />;

      case 'fees':
        return <FeeManagement />;

      case 'communication':
        return <ParentTeacherChat />;

      case 'campus':
        return <CampusAndInfo />;

      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Global Header Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {viewMode === 'mobile' ? (
          <MobileAppShell
            onOpenNotifications={() => setNotificationsOpen(true)}
            onOpenIdCard={() => openModal('id_card')}
            onOpenReportCard={() => openModal('report_card')}
            onOpenFeeVoucher={() => openModal('fee_voucher')}
            onOpenQrScanner={() => openModal('qr_scanner')}
            onOpenAiAssistant={() => openModal('ai_assistant')}
          />
        ) : (
          renderContent()
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <OfficialBranding size="sm" />
            <div className="text-[11px] text-slate-400 pl-3 border-l border-slate-200 dark:border-slate-800 hidden sm:block">
              {SCHOOL_INFO.affiliation}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Sheikh Maltoon Town, Mardan, KPK</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#0A2540]" />
              <span>+92 937 860124</span>
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authorized Institutional Portal</span>
            </span>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            © 1979 - 2026 Peshawar Model Schools. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      {activeModal === 'id_card' && (
        <DigitalIdCardModal student={modalData} onClose={closeModal} />
      )}
      {activeModal === 'report_card' && (
        <ReportCardModal onClose={closeModal} />
      )}
      {activeModal === 'fee_voucher' && (
        <FeeVoucherModal fee={modalData} onClose={closeModal} />
      )}
      {activeModal === 'qr_scanner' && (
        <QrScannerModal onClose={closeModal} />
      )}
      {activeModal === 'ai_assistant' && (
        <AiAssistantModal onClose={closeModal} />
      )}

      {/* FCM Notifications Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainPortalContent />
    </AppProvider>
  );
}
