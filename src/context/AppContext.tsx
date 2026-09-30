import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Student,
  Teacher,
  AttendanceRecord,
  Homework,
  Exam,
  FeeItem,
  SchoolNotice,
  ParentTeacherMessage,
  Complaint,
  AdmissionInquiry,
  PushNotification,
  AuditLog,
  Language
} from '../types';
import {
  MOCK_USERS,
  MOCK_STUDENTS,
  MOCK_TEACHERS,
  MOCK_ATTENDANCE,
  MOCK_HOMEWORK,
  MOCK_EXAMS,
  MOCK_FEES,
  MOCK_NOTICES,
  MOCK_MESSAGES,
  MOCK_COMPLAINTS,
  MOCK_ADMISSIONS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  switchUser: (role: UserRole) => void;
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  currentStudent: Student;
  allStudents: Student[];
  allTeachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
  homeworkList: Homework[];
  examsList: Exam[];
  feesList: FeeItem[];
  noticesList: SchoolNotice[];
  messagesList: ParentTeacherMessage[];
  complaintsList: Complaint[];
  admissionsList: AdmissionInquiry[];
  notificationsList: PushNotification[];
  auditLogsList: AuditLog[];
  
  viewMode: 'mobile' | 'web';
  setViewMode: (mode: 'mobile' | 'web') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  
  // Quick Actions
  markAttendance: (record: AttendanceRecord) => void;
  sendAbsentNotice: (studentName: string, className: string) => void;
  createHomework: (hw: Omit<Homework, 'id' | 'submissionsCount' | 'totalStudents'>) => void;
  submitHomework: (homeworkId: string, notes: string) => void;
  gradeHomework: (homeworkId: string, marks: number, feedback: string) => void;
  payFee: (feeId: string, method: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer') => void;
  sendMessage: (text: string, receiverId: string, receiverName: string, studentName: string) => void;
  submitComplaint: (title: string, description: string, category: 'Academic' | 'Transport' | 'Facilities' | 'Fee' | 'General') => void;
  submitAdmission: (data: Omit<AdmissionInquiry, 'id' | 'submissionDate' | 'status'>) => void;
  markNotificationRead: (id: string) => void;
  addNotice: (notice: Omit<SchoolNotice, 'id' | 'date'>) => void;
  
  // UI Modals
  activeModal: string | null;
  openModal: (modal: string, data?: any) => void;
  closeModal: () => void;
  modalData: any;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Multilingual dictionary
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    schoolName: 'Peshawar Model School',
    campusName: 'Mardan Campus',
    dashboard: 'Dashboard',
    students: 'Students',
    teachers: 'Teachers',
    attendance: 'Attendance',
    homework: 'Homework',
    exams: 'Exams & Schedule',
    results: 'Results & Report Card',
    fees: 'Fee Management',
    timetable: 'Timetable',
    notices: 'Notice Board',
    events: 'Events & News',
    gallery: 'School Gallery',
    library: 'Library',
    transport: 'Transport',
    admissions: 'Admissions',
    messages: 'Parent-Teacher Messages',
    complaints: 'Complaints & Feedback',
    digitalId: 'Digital ID Card',
    switchRole: 'Switch Role',
    presentToday: 'Present Today',
    absentToday: 'Absent Today',
    pendingFees: 'Pending Fees',
    upcomingExams: 'Upcoming Exams',
    viewReportCard: 'View Report Card',
    downloadVoucher: 'Download Fee Voucher',
    payOnline: 'Pay Online',
    submitAssignment: 'Submit Homework',
    markAttendanceBtn: 'Mark Attendance',
    sendAbsentAlert: 'Notify Parents of Absentees',
    emergencyNotice: 'Emergency Notice',
    offlineModeNotice: 'Offline Mode Active · Serving Cached Data',
    viewAsMobile: 'Mobile App View',
    viewAsWeb: 'Web Portal View'
  },
  ur: {
    schoolName: 'پشاور ماڈل اسکول',
    campusName: 'مردان کیمپس',
    dashboard: 'ڈیش بورڈ',
    students: 'طلباء',
    teachers: 'اساتذہ کرام',
    attendance: 'حاضری کا نظام',
    homework: 'ہوم ورک اور اسائنمنٹس',
    exams: 'امتحانات اور ڈیٹ شیٹ',
    results: 'نتائج اور رپورٹ کارڈ',
    fees: 'فیس کا انتظام',
    timetable: 'ٹائم ٹیبل',
    notices: 'نوٹس بورڈ',
    events: 'تقریبات اور خبریں',
    gallery: 'اسکول گیلری',
    library: 'لائبریری',
    transport: 'اسکول ٹرانسپورٹ',
    admissions: 'داخلہ فارم',
    messages: 'والدین اور استاد کا رابطہ',
    complaints: 'شکایات اور آراء',
    digitalId: 'ڈیجیٹل اسٹوڈنٹ کارڈ',
    switchRole: 'کردار تبدیل کریں',
    presentToday: 'آج حاضر',
    absentToday: 'آج غیر حاضر',
    pendingFees: 'واجب الادا فیس',
    upcomingExams: 'آنے والے امتحانات',
    viewReportCard: 'رپورٹ کارڈ دیکھیں',
    downloadVoucher: 'فیس واؤچر ڈاؤن لوڈ',
    payOnline: 'آن لائن ادائیگی',
    submitAssignment: 'ہوم ورک جمع کروائیں',
    markAttendanceBtn: 'حاضری لگائیں',
    sendAbsentAlert: 'غیر حاضر بچوں کے والدین کو مطلع کریں',
    emergencyNotice: 'اہم ہنگامی اطلاع',
    offlineModeNotice: 'آف لائن موڈ فعال · محفوظ شدہ ڈیٹا دستیاب ہے',
    viewAsMobile: 'موبائل ایپ کا منظر',
    viewAsWeb: 'ویب پورٹل کا منظر'
  },
  ps: {
    schoolName: 'پیښور ماډل سکول',
    campusName: 'مردان کیمپس',
    dashboard: 'ډشبورډ',
    students: 'شاګردان',
    teachers: 'استاذان',
    attendance: 'حاضري سیسټم',
    homework: 'کورنۍ دنده (هوم ورک)',
    exams: 'امتحانونه او مهالویش',
    results: 'نتیجې او راپور کارډ',
    fees: 'د فیسونو انتظام',
    timetable: 'ټائم ټیبل',
    notices: 'د خبرتیاوو بورډ',
    events: 'پروګرامونه او خبرونه',
    gallery: 'د ښوونځي ګالري',
    library: 'کتابتون',
    transport: 'د ښوونځي ترانسپورت',
    admissions: 'نوي داخلې',
    messages: 'د والدینو او استاذانو رابطه',
    complaints: 'شکایتونه او نظرونه',
    digitalId: 'ډیجیټل پیژندپاڼه',
    switchRole: 'رول بدل کړئ',
    presentToday: 'نن حاضر',
    absentToday: 'نن غیر حاضر',
    pendingFees: 'باقي فیسونه',
    upcomingExams: 'راتلونکي امتحانونه',
    viewReportCard: 'راپور کارډ وګورئ',
    downloadVoucher: 'د فیس واؤچر',
    payOnline: 'آنلاین تادیه',
    submitAssignment: 'دنده وسپارئ',
    markAttendanceBtn: 'حاضري ولګوئ',
    sendAbsentAlert: 'والدینو ته خبر ورکړئ',
    emergencyNotice: 'مهم اضطراري خبرتیا',
    offlineModeNotice: 'افلاین موډ فعال دی',
    viewAsMobile: 'د موبایل بڼه',
    viewAsWeb: 'د کمپیوټر ویب بڼه'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('pms_user');
    return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Super Admin default
  });

  const [selectedChildId, setSelectedChildId] = useState<string>('student-ali-khan');
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('web');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active modal
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Data collections
  const [allStudents, setAllStudents] = useState<Student[]>(() => {
    const s = localStorage.getItem('pms_students');
    return s ? JSON.parse(s) : MOCK_STUDENTS;
  });

  const [allTeachers] = useState<Teacher[]>(MOCK_TEACHERS);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const s = localStorage.getItem('pms_attendance');
    return s ? JSON.parse(s) : MOCK_ATTENDANCE;
  });

  const [homeworkList, setHomeworkList] = useState<Homework[]>(() => {
    const s = localStorage.getItem('pms_homework');
    return s ? JSON.parse(s) : MOCK_HOMEWORK;
  });

  const [examsList] = useState<Exam[]>(MOCK_EXAMS);

  const [feesList, setFeesList] = useState<FeeItem[]>(() => {
    const s = localStorage.getItem('pms_fees');
    return s ? JSON.parse(s) : MOCK_FEES;
  });

  const [noticesList, setNoticesList] = useState<SchoolNotice[]>(() => {
    const s = localStorage.getItem('pms_notices');
    return s ? JSON.parse(s) : MOCK_NOTICES;
  });

  const [messagesList, setMessagesList] = useState<ParentTeacherMessage[]>(() => {
    const s = localStorage.getItem('pms_messages');
    return s ? JSON.parse(s) : MOCK_MESSAGES;
  });

  const [complaintsList, setComplaintsList] = useState<Complaint[]>(() => {
    const s = localStorage.getItem('pms_complaints');
    return s ? JSON.parse(s) : MOCK_COMPLAINTS;
  });

  const [admissionsList, setAdmissionsList] = useState<AdmissionInquiry[]>(() => {
    const s = localStorage.getItem('pms_admissions');
    return s ? JSON.parse(s) : MOCK_ADMISSIONS;
  });

  const [notificationsList, setNotificationsList] = useState<PushNotification[]>(() => {
    const s = localStorage.getItem('pms_notifications');
    return s ? JSON.parse(s) : MOCK_NOTIFICATIONS;
  });

  const [auditLogsList, setAuditLogsList] = useState<AuditLog[]>(() => {
    const s = localStorage.getItem('pms_audit_logs');
    return s ? JSON.parse(s) : MOCK_AUDIT_LOGS;
  });

  // Current student resolution
  const currentStudent = allStudents.find(s => s.id === (currentUser.role === 'parent' ? selectedChildId : (currentUser.studentId ? allStudents.find(st => st.studentId === currentUser.studentId)?.id : 'student-ali-khan'))) || allStudents[0];

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pms_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('pms_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('pms_homework', JSON.stringify(homeworkList));
  }, [homeworkList]);

  useEffect(() => {
    localStorage.setItem('pms_fees', JSON.stringify(feesList));
  }, [feesList]);

  useEffect(() => {
    localStorage.setItem('pms_notices', JSON.stringify(noticesList));
  }, [noticesList]);

  useEffect(() => {
    localStorage.setItem('pms_messages', JSON.stringify(messagesList));
  }, [messagesList]);

  useEffect(() => {
    localStorage.setItem('pms_complaints', JSON.stringify(complaintsList));
  }, [complaintsList]);

  useEffect(() => {
    localStorage.setItem('pms_admissions', JSON.stringify(admissionsList));
  }, [admissionsList]);

  useEffect(() => {
    localStorage.setItem('pms_notifications', JSON.stringify(notificationsList));
  }, [notificationsList]);

  // Set html direction
  useEffect(() => {
    document.documentElement.dir = language === 'ur' || language === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Log action
  const logAuditAction = (action: string, record: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser.name,
      role: currentUser.role,
      action,
      affectedRecord: record,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.45'
    };
    setAuditLogsList(prev => [newLog, ...prev]);
  };

  const switchUser = (role: UserRole) => {
    const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setCurrentUser(user);
    logAuditAction(`Switched session role to ${role}`, 'User Session');
  };

  const markAttendance = (record: AttendanceRecord) => {
    setAttendanceRecords(prev => {
      const idx = prev.findIndex(r => r.studentId === record.studentId && r.date === record.date);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = record;
        return copy;
      }
      return [record, ...prev];
    });

    // If absent, trigger notice
    if (record.status === 'absent') {
      sendAbsentNotice(record.studentName, `${record.className}-${record.section}`);
    }

    logAuditAction(`Updated attendance for ${record.studentName} as ${record.status.toUpperCase()}`, `Attendance / ${record.className}`);
  };

  const sendAbsentNotice = (studentName: string, className: string) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `Absent Alert: ${studentName}`,
      message: `Your child ${studentName} was marked absent today in ${className}. Please contact campus administration if this is an error.`,
      timestamp: 'Just now',
      type: 'attendance',
      read: false,
      targetRole: 'parent'
    };
    setNotificationsList(prev => [newNotif, ...prev]);
  };

  const createHomework = (hwData: Omit<Homework, 'id' | 'submissionsCount' | 'totalStudents'>) => {
    const newHw: Homework = {
      ...hwData,
      id: `hw-${Date.now()}`,
      submissionsCount: 0,
      totalStudents: 38
    };
    setHomeworkList(prev => [newHw, ...prev]);

    // Push notification to students & parents
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `New Homework: ${hwData.subject}`,
      message: `${hwData.assignedBy} uploaded "${hwData.title}". Due date: ${hwData.dueDate}.`,
      timestamp: 'Just now',
      type: 'homework',
      read: false
    };
    setNotificationsList(prev => [newNotif, ...prev]);
    logAuditAction(`Created homework "${hwData.title}" for ${hwData.className}`, `Homework / ${hwData.subject}`);
  };

  const submitHomework = (homeworkId: string, notes: string) => {
    setHomeworkList(prev =>
      prev.map(hw =>
        hw.id === homeworkId
          ? {
              ...hw,
              submitted: true,
              submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
              studentSubmissionText: notes,
              submissionsCount: (hw.submissionsCount || 0) + 1
            }
          : hw
      )
    );
    logAuditAction(`Submitted homework assignment #${homeworkId}`, 'Homework Submission');
  };

  const gradeHomework = (homeworkId: string, marks: number, feedback: string) => {
    setHomeworkList(prev =>
      prev.map(hw =>
        hw.id === homeworkId
          ? {
              ...hw,
              obtainedMarks: marks,
              feedback
            }
          : hw
      )
    );
    logAuditAction(`Graded homework #${homeworkId} with score ${marks}`, 'Homework Grading');
  };

  const payFee = (feeId: string, method: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer') => {
    const ref = `${method.substring(0, 2).toUpperCase()}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setFeesList(prev =>
      prev.map(fee =>
        fee.id === feeId
          ? {
              ...fee,
              status: 'Paid',
              paidAmount: fee.totalAmount,
              paidDate: new Date().toISOString().substring(0, 10),
              paymentMethod: method,
              transactionRef: ref
            }
          : fee
      )
    );

    const feeItem = feesList.find(f => f.id === feeId);
    if (feeItem) {
      const notif: PushNotification = {
        id: `notif-${Date.now()}`,
        title: 'Fee Payment Received',
        message: `PKR ${feeItem.totalAmount.toLocaleString()} paid successfully for ${feeItem.month} via ${method}. Ref: ${ref}`,
        timestamp: 'Just now',
        type: 'fee',
        read: false
      };
      setNotificationsList(prev => [notif, ...prev]);
      logAuditAction(`Settled fee voucher ${feeItem.voucherNo} via ${method}`, `Fee Collection / ${feeItem.studentName}`);
    }
  };

  const sendMessage = (text: string, receiverId: string, receiverName: string, studentName: string) => {
    const newMsg: ParentTeacherMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role === 'teacher' ? 'teacher' : 'parent',
      receiverId,
      receiverName,
      studentName,
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      category: 'General'
    };

    setMessagesList(prev => [...prev, newMsg]);
    logAuditAction(`Sent message to ${receiverName} regarding ${studentName}`, 'Parent-Teacher Messaging');
  };

  const submitComplaint = (title: string, description: string, category: 'Academic' | 'Transport' | 'Facilities' | 'Fee' | 'General') => {
    const newComp: Complaint = {
      id: `comp-${Date.now()}`,
      submittedBy: currentUser.name,
      submittedByRole: currentUser.role === 'student' ? 'student' : 'parent',
      title,
      description,
      category,
      status: 'Pending',
      date: new Date().toISOString().substring(0, 10)
    };
    setComplaintsList(prev => [newComp, ...prev]);
    logAuditAction(`Submitted ticket #${newComp.id}: "${title}"`, 'Complaints & Feedback');
  };

  const submitAdmission = (data: Omit<AdmissionInquiry, 'id' | 'submissionDate' | 'status'>) => {
    const newAdm: AdmissionInquiry = {
      ...data,
      id: `adm-${Date.now()}`,
      submissionDate: new Date().toISOString().substring(0, 10),
      status: 'New'
    };
    setAdmissionsList(prev => [newAdm, ...prev]);
    logAuditAction(`Registered new admission application for ${data.studentName}`, 'Admissions System');
  };

  const markNotificationRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotice = (notice: Omit<SchoolNotice, 'id' | 'date'>) => {
    const newNotice: SchoolNotice = {
      ...notice,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10)
    };
    setNoticesList(prev => [newNotice, ...prev]);

    // Push emergency notification if priority is Emergency or High
    if (notice.priority === 'Emergency' || notice.priority === 'High') {
      const notif: PushNotification = {
        id: `notif-${Date.now()}`,
        title: `URGENT NOTICE: ${notice.title}`,
        message: notice.description.substring(0, 120) + '...',
        timestamp: 'Just now',
        type: notice.priority === 'Emergency' ? 'emergency' : 'notice',
        read: false
      };
      setNotificationsList(prev => [notif, ...prev]);
    }
    logAuditAction(`Published school notice: "${notice.title}"`, 'School Notice Board');
  };

  const openModal = (modal: string, data?: any) => {
    setActiveModal(modal);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        selectedChildId,
        setSelectedChildId,
        currentStudent,
        allStudents,
        allTeachers,
        attendanceRecords,
        homeworkList,
        examsList,
        feesList,
        noticesList,
        messagesList,
        complaintsList,
        admissionsList,
        notificationsList,
        auditLogsList,
        viewMode,
        setViewMode,
        language,
        setLanguage,
        darkMode,
        setDarkMode,
        isOffline,
        setIsOffline,
        markAttendance,
        sendAbsentNotice,
        createHomework,
        submitHomework,
        gradeHomework,
        payFee,
        sendMessage,
        submitComplaint,
        submitAdmission,
        markNotificationRead,
        addNotice,
        activeModal,
        openModal,
        closeModal,
        modalData,
        searchQuery,
        setSearchQuery,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
