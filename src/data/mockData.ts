import {
  Student,
  Teacher,
  User,
  AttendanceRecord,
  Homework,
  Exam,
  ReportCard,
  FeeItem,
  DayTimetable,
  SchoolNotice,
  SchoolEvent,
  SchoolNews,
  GalleryAlbum,
  LibraryBook,
  TransportRoute,
  ParentTeacherMessage,
  Complaint,
  AdmissionInquiry,
  AuditLog,
  PushNotification
} from '../types';

export const SCHOOL_INFO = {
  name: 'Peshawar Model School',
  campus: 'Mardan Campus',
  tagline: 'Excellence in Education · Character, Knowledge, Discipline',
  established: 1979,
  affiliation: 'Board of Intermediate & Secondary Education (BISE) Mardan & Cambridge Assessment',
  address: 'Sector F, Phase 2, Sheikh Maltoon Town, Mardan, Khyber Pakhtunkhwa, Pakistan',
  phone: '+92 937 860124 / +92 333 9865412',
  email: 'mardan@peshawarmodelschools.edu.pk',
  website: 'https://pms.edu.pk',
  officeHours: 'Monday - Saturday: 7:30 AM – 3:30 PM (Friday: 7:30 AM – 1:00 PM)',
  coordinates: '34.2045° N, 72.0392° E',
  colors: {
    primaryOrange: '#F37021', // Vibrant Saffron / Orange
    primaryBlue: '#0A2540',   // Deep Royal Blue
    accentGold: '#EAA221',
    lightBg: '#F8FAFC',
    darkBg: '#091528'
  },
  images: {
    hero: '/src/assets/images/pms_mardan_campus_hero_1790747420148.jpg',
    logo: '/src/assets/images/pms_official_school_logo_1790747436823.jpg',
    science: '/src/assets/images/pms_science_exhibition_1790747452066.jpg',
    sports: '/src/assets/images/pms_sports_annual_day_1790747470090.jpg'
  }
};

export const MOCK_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Dr. Tariq Mahmood',
    email: 'principal.mardan@pms.edu.pk',
    role: 'super_admin',
    phone: '+92 300 9123456',
    designation: 'Principal & Executive Director'
  },
  {
    id: 'user-teacher-1',
    name: 'Sir Muhammad Ahmed',
    email: 'muhammad.ahmed@pms.edu.pk',
    role: 'teacher',
    phone: '+92 333 9876543',
    designation: 'Head of Mathematics & Class 9-A Incharge',
    classId: 'Class 9-A'
  },
  {
    id: 'user-parent-1',
    name: 'Mr. Tariq Khan',
    email: 'tariq.khan@gmail.com',
    role: 'parent',
    phone: '+92 345 5544332',
    designation: 'Parent / Guardian',
    childrenIds: ['student-ali-khan', 'student-fatima-noor']
  },
  {
    id: 'user-student-1',
    name: 'Ali Khan',
    email: 'ali.khan@student.pms.edu.pk',
    role: 'student',
    studentId: 'PMS-MDR-2024-0418',
    classId: 'Class 9',
    section: 'A',
    phone: '+92 312 9081234'
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student-ali-khan',
    studentId: 'PMS-MDR-2024-0418',
    registrationNo: 'PMS-24-9A-0418',
    name: 'Ali Khan',
    fatherName: 'Tariq Khan',
    className: 'Class 9',
    section: 'A',
    rollNo: 12,
    dob: '2010-04-14',
    gender: 'Male',
    contact: '+92 345 5544332',
    emergencyContact: '+92 300 9876543',
    address: 'House #42, Street 7, Sector C, Sheikh Maltoon Town, Mardan',
    admissionDate: '2018-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'B+',
    busRouteId: 'route-1',
    attendancePercentage: 96.5,
    currentTermGpa: '3.92 / 4.00',
    currentRank: '2nd in Class (out of 38)',
    parentId: 'user-parent-1'
  },
  {
    id: 'student-fatima-noor',
    studentId: 'PMS-MDR-2024-0582',
    registrationNo: 'PMS-24-6B-0582',
    name: 'Fatima Noor',
    fatherName: 'Tariq Khan',
    className: 'Class 6',
    section: 'B',
    rollNo: 5,
    dob: '2013-09-21',
    gender: 'Female',
    contact: '+92 345 5544332',
    emergencyContact: '+92 300 9876543',
    address: 'House #42, Street 7, Sector C, Sheikh Maltoon Town, Mardan',
    admissionDate: '2020-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'O+',
    busRouteId: 'route-1',
    attendancePercentage: 98.0,
    currentTermGpa: '3.98 / 4.00',
    currentRank: '1st in Class (out of 35)',
    parentId: 'user-parent-1'
  },
  {
    id: 'student-ahmad-shah',
    studentId: 'PMS-MDR-2023-0104',
    registrationNo: 'PMS-23-10A-0104',
    name: 'Ahmad Shah',
    fatherName: 'Shah Faisal',
    className: 'Class 10',
    section: 'A',
    rollNo: 3,
    dob: '2009-02-18',
    gender: 'Male',
    contact: '+92 333 1234567',
    emergencyContact: '+92 313 7654321',
    address: 'Canal Bank Road, Near Mardan Medical Complex, Mardan',
    admissionDate: '2016-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'A+',
    busRouteId: 'route-2',
    attendancePercentage: 88.5,
    currentTermGpa: '3.75 / 4.00',
    currentRank: '4th in Class',
    parentId: 'user-parent-2'
  },
  {
    id: 'student-ayesha-khan',
    studentId: 'PMS-MDR-2024-0719',
    registrationNo: 'PMS-24-8C-0719',
    name: 'Ayesha Khan',
    fatherName: 'Farhan Khan',
    className: 'Class 8',
    section: 'C',
    rollNo: 18,
    dob: '2011-11-05',
    gender: 'Female',
    contact: '+92 345 1122334',
    emergencyContact: '+92 321 4455667',
    address: 'Gulberg Colony, College Chowk, Mardan',
    admissionDate: '2019-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'AB+',
    busRouteId: 'route-3',
    attendancePercentage: 94.0,
    currentTermGpa: '3.80 / 4.00',
    currentRank: '5th in Class',
    parentId: 'user-parent-3'
  },
  {
    id: 'student-bilawal-khan',
    studentId: 'PMS-MDR-2024-0422',
    registrationNo: 'PMS-24-9A-0422',
    name: 'Bilawal Khan',
    fatherName: 'Javed Khan',
    className: 'Class 9',
    section: 'A',
    rollNo: 15,
    dob: '2010-06-19',
    gender: 'Male',
    contact: '+92 334 7788990',
    emergencyContact: '+92 300 1122334',
    address: 'Near Old Bus Stand, Baghdada, Mardan',
    admissionDate: '2018-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'O-',
    busRouteId: 'route-3',
    attendancePercentage: 91.2,
    currentTermGpa: '3.60 / 4.00',
    currentRank: '8th in Class',
    parentId: 'user-parent-4'
  },
  {
    id: 'student-zainab-bibi',
    studentId: 'PMS-MDR-2024-0435',
    registrationNo: 'PMS-24-9A-0435',
    name: 'Zainab Bibi',
    fatherName: 'Dr. Ihsan Ullah',
    className: 'Class 9',
    section: 'A',
    rollNo: 22,
    dob: '2010-08-30',
    gender: 'Female',
    contact: '+92 315 9988776',
    emergencyContact: '+92 333 4455667',
    address: 'Doctors Colony, Nowshera Road, Mardan',
    admissionDate: '2018-04-01',
    academicYear: '2025-2026',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    bloodGroup: 'B-',
    busRouteId: 'route-2',
    attendancePercentage: 97.4,
    currentTermGpa: '3.95 / 4.00',
    currentRank: '1st in Class',
    parentId: 'user-parent-5'
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Muhammad Ahmed',
    employeeId: 'EMP-MDR-104',
    qualification: 'M.Sc. Pure Mathematics (University of Peshawar)',
    subjects: ['Mathematics', 'Additional Mathematics'],
    assignedClasses: ['Class 9-A', 'Class 9-B', 'Class 10-A'],
    phone: '+92 333 9876543',
    email: 'muhammad.ahmed@pms.edu.pk',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    joiningDate: '2017-08-15'
  },
  {
    id: 'teacher-2',
    name: 'Sana Khan',
    employeeId: 'EMP-MDR-118',
    qualification: 'M.Phil. English Literature',
    subjects: ['English Language', 'English Literature'],
    assignedClasses: ['Class 9-A', 'Class 8-A', 'Class 8-B'],
    phone: '+92 345 8765432',
    email: 'sana.khan@pms.edu.pk',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    joiningDate: '2019-02-01'
  },
  {
    id: 'teacher-3',
    name: 'Engr. Tariq Aziz',
    employeeId: 'EMP-MDR-092',
    qualification: 'B.Sc Electrical Engineering / M.Sc Physics',
    subjects: ['Physics', 'Applied Electronics'],
    assignedClasses: ['Class 9-A', 'Class 10-A', 'Class 10-B'],
    phone: '+92 301 2345678',
    email: 'tariq.aziz@pms.edu.pk',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    joiningDate: '2015-09-01'
  },
  {
    id: 'teacher-4',
    name: 'Dr. Naila Parveen',
    employeeId: 'EMP-MDR-127',
    qualification: 'Ph.D. Organic Chemistry',
    subjects: ['Chemistry'],
    assignedClasses: ['Class 9-A', 'Class 9-B', 'Class 10-A'],
    phone: '+92 321 8901234',
    email: 'naila.parveen@pms.edu.pk',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    joiningDate: '2020-03-10'
  },
  {
    id: 'teacher-5',
    name: 'Usman Ali',
    employeeId: 'EMP-MDR-140',
    qualification: 'MS Computer Science (FAST-NUCES)',
    subjects: ['Computer Science', 'Robotics & AI'],
    assignedClasses: ['Class 9-A', 'Class 8-C', 'Class 10-A'],
    phone: '+92 313 5566778',
    email: 'usman.ali@pms.edu.pk',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    joiningDate: '2021-08-01'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'student-ali-khan', studentName: 'Ali Khan', rollNo: 12, className: 'Class 9', section: 'A', date: '2026-09-29', status: 'present' },
  { id: 'att-2', studentId: 'student-fatima-noor', studentName: 'Fatima Noor', rollNo: 5, className: 'Class 6', section: 'B', date: '2026-09-29', status: 'present' },
  { id: 'att-3', studentId: 'student-ahmad-shah', studentName: 'Ahmad Shah', rollNo: 3, className: 'Class 10', section: 'A', date: '2026-09-29', status: 'absent', remarks: 'Parent informed via SMS & App' },
  { id: 'att-4', studentId: 'student-ayesha-khan', studentName: 'Ayesha Khan', rollNo: 18, className: 'Class 8', section: 'C', date: '2026-09-29', status: 'present' },
  { id: 'att-5', studentId: 'student-bilawal-khan', studentName: 'Bilawal Khan', rollNo: 15, className: 'Class 9', section: 'A', date: '2026-09-29', status: 'late', remarks: 'Arrived at 8:20 AM' },
  { id: 'att-6', studentId: 'student-zainab-bibi', studentName: 'Zainab Bibi', rollNo: 22, className: 'Class 9', section: 'A', date: '2026-09-29', status: 'present' }
];

export const MOCK_HOMEWORK: Homework[] = [
  {
    id: 'hw-1',
    title: 'Quadratic Equations & Discriminant Problems',
    subject: 'Mathematics',
    className: 'Class 9',
    section: 'A',
    assignedDate: '2026-09-28',
    dueDate: '2026-09-30',
    assignedBy: 'Sir Muhammad Ahmed',
    description: 'Solve Exercise 2.1 questions 4 to 12 in neat homework notebooks. Pay close attention to roots determination using discriminant b² - 4ac formula.',
    totalMarks: 20,
    submissionsCount: 32,
    totalStudents: 38,
    submitted: true,
    submissionDate: '2026-09-29 04:30 PM',
    studentSubmissionText: 'All 8 equations solved step-by-step with graphical nature of roots noted.',
    obtainedMarks: 19,
    feedback: 'Excellent work Ali. Neat handwriting and correct discriminant proofs.'
  },
  {
    id: 'hw-2',
    title: 'Newton\'s Laws of Motion - Numerical Sheet 3',
    subject: 'Physics',
    className: 'Class 9',
    section: 'A',
    assignedDate: '2026-09-29',
    dueDate: '2026-10-02',
    assignedBy: 'Engr. Tariq Aziz',
    description: 'Complete physics numerical problems 3.1 to 3.8 based on momentum conservation and Newton third law of action-reaction.',
    totalMarks: 25,
    submissionsCount: 14,
    totalStudents: 38,
    submitted: false
  },
  {
    id: 'hw-3',
    title: 'Essay: The Role of Youth in Digital Pakistan',
    subject: 'English',
    className: 'Class 9',
    section: 'A',
    assignedDate: '2026-09-27',
    dueDate: '2026-10-01',
    assignedBy: 'Ms. Sana Khan',
    description: 'Write an argumentative essay of 250-300 words discussing modern technological literacy and positive contribution to national development.',
    totalMarks: 15,
    submissionsCount: 28,
    totalStudents: 38,
    submitted: true,
    submissionDate: '2026-09-28 07:15 PM',
    studentSubmissionText: 'Draft essay attached focusing on software exports, freelancing and scientific education.',
    obtainedMarks: 14,
    feedback: 'Strong vocabulary and well-structured body paragraphs.'
  },
  {
    id: 'hw-4',
    title: 'Chemical Bonding & Ionic Crystals Model',
    subject: 'Chemistry',
    className: 'Class 9',
    section: 'A',
    assignedDate: '2026-09-26',
    dueDate: '2026-09-29',
    assignedBy: 'Dr. Naila Parveen',
    description: 'Draw the electron dot and cross structures for NaCl, MgO and CaCl2 in practical notebooks.',
    totalMarks: 20,
    submissionsCount: 37,
    totalStudents: 38,
    submitted: true,
    submissionDate: '2026-09-28 02:40 PM',
    obtainedMarks: 18,
    feedback: 'Well illustrated octet rule fulfillment.'
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-midterm-2026',
    name: 'Mid-Term Examinations 2026',
    type: 'Mid-Term Exam',
    startDate: '2026-10-12',
    endDate: '2026-10-22',
    className: 'Class 9',
    academicYear: '2025-2026',
    status: 'Upcoming',
    schedule: [
      { subject: 'Mathematics', date: '2026-10-12', time: '09:00 AM - 12:00 PM', room: 'Hall A (Ground Floor)', maxMarks: 75, syllabus: 'Unit 1 to Unit 4 (Matrices, Real Numbers, Logarithms, Algebraic Expressions)' },
      { subject: 'English', date: '2026-10-14', time: '09:00 AM - 12:00 PM', room: 'Hall A (Ground Floor)', maxMarks: 75, syllabus: 'Lessons 1-5, Grammar (Tenses, Direct/Indirect), Composition' },
      { subject: 'Physics', date: '2026-10-16', time: '09:00 AM - 12:00 PM', room: 'Physics Lab Hall', maxMarks: 65, syllabus: 'Chapters 1 to 3 (Physical Quantities, Kinematics, Dynamics)' },
      { subject: 'Chemistry', date: '2026-10-18', time: '09:00 AM - 12:00 PM', room: 'Chemistry Lab Hall', maxMarks: 65, syllabus: 'Chapters 1 to 4 (Fundamentals, Atomic Structure, Periodic Table, Bonding)' },
      { subject: 'Computer Science', date: '2026-10-20', time: '09:00 AM - 12:00 PM', room: 'Computer Lab 1', maxMarks: 50, syllabus: 'Units 1-3 (Problem Solving, Computer Systems, Office Productivity Tools)' },
      { subject: 'Islamiyat / Pak Studies', date: '2026-10-22', time: '09:00 AM - 11:30 AM', room: 'Hall A', maxMarks: 50, syllabus: 'Prescribed BISE Mardan Curriculum Term 1' }
    ]
  },
  {
    id: 'exam-monthly-sep',
    name: 'Monthly Progress Evaluation - September',
    type: 'Monthly Test',
    startDate: '2026-09-15',
    endDate: '2026-09-20',
    className: 'Class 9',
    academicYear: '2025-2026',
    status: 'Completed',
    schedule: [
      { subject: 'Mathematics', date: '2026-09-15', time: '08:30 AM - 09:30 AM', room: 'Room 204', maxMarks: 25, syllabus: 'Algebraic Formulas and Factorization' },
      { subject: 'Physics', date: '2026-09-16', time: '08:30 AM - 09:30 AM', room: 'Room 204', maxMarks: 25, syllabus: 'Kinematics and Equations of Motion' }
    ]
  }
];

export const MOCK_REPORT_CARD: ReportCard = {
  id: 'rep-ali-khan-term1',
  studentId: 'PMS-MDR-2024-0418',
  studentName: 'Ali Khan',
  rollNo: 12,
  className: 'Class 9',
  section: 'A',
  examName: 'First Term Summative Assessment 2026',
  academicYear: '2025-2026',
  term: 'Term 1',
  results: [
    { subject: 'Mathematics', totalMarks: 100, obtainedMarks: 96, grade: 'A1', remarks: 'Exceptional problem-solving abilities and mathematical clarity.' },
    { subject: 'Physics (Theory + Practical)', totalMarks: 100, obtainedMarks: 91, grade: 'A1', remarks: 'Strong grasp of concepts and practical laboratory verification.' },
    { subject: 'Chemistry (Theory + Practical)', totalMarks: 100, obtainedMarks: 89, grade: 'A1', remarks: 'Very thorough understanding of chemical reactions and stoichiometry.' },
    { subject: 'Computer Science', totalMarks: 100, obtainedMarks: 95, grade: 'A1', remarks: 'High aptitude for programming, algorithms, and logic building.' },
    { subject: 'English (Language & Comp.)', totalMarks: 100, obtainedMarks: 88, grade: 'A1', remarks: 'Articulate writing, strong comprehension and public speaking.' },
    { subject: 'Urdu', totalMarks: 100, obtainedMarks: 85, grade: 'A', remarks: 'Good grasp of prose, poetry analysis and creative writing.' },
    { subject: 'Pakistan Studies', totalMarks: 50, obtainedMarks: 46, grade: 'A1', remarks: 'In-depth historical context and analytical essay responses.' },
    { subject: 'Islamiyat', totalMarks: 50, obtainedMarks: 48, grade: 'A1', remarks: 'Exemplary moral character and Quranic memorization recitation.' }
  ],
  totalMarks: 700,
  obtainedMarks: 638,
  percentage: 91.14,
  grade: 'A1 (Outstanding)',
  position: '2nd Position in Class 9-A',
  attendancePercentage: 96.5,
  teacherRemarks: 'Ali is an exemplary, intellectually curious, and disciplined student who leads class discussions with humility. Consistently displays leadership in both academics and science projects.',
  principalRemarks: 'Superb academic achievement. Keep striving for top honors in BISE Mardan Board Examinations. Approved for Academic Merit Scholarship.',
  issueDate: '2026-09-10'
};

export const MOCK_FEES: FeeItem[] = [
  {
    id: 'fee-ali-sep-2026',
    studentId: 'student-ali-khan',
    studentName: 'Ali Khan',
    className: 'Class 9-A',
    voucherNo: 'PMS-V-2026-09-1042',
    month: 'September 2026',
    academicYear: '2025-2026',
    tuitionFee: 9500,
    examFee: 1000,
    transportFee: 2500,
    labCharges: 800,
    totalAmount: 13800,
    paidAmount: 13800,
    dueDate: '2026-09-15',
    status: 'Paid',
    paidDate: '2026-09-12',
    paymentMethod: 'EasyPaisa',
    transactionRef: 'EP-9948210348'
  },
  {
    id: 'fee-ali-oct-2026',
    studentId: 'student-ali-khan',
    studentName: 'Ali Khan',
    className: 'Class 9-A',
    voucherNo: 'PMS-V-2026-10-1042',
    month: 'October 2026',
    academicYear: '2025-2026',
    tuitionFee: 9500,
    transportFee: 2500,
    labCharges: 800,
    totalAmount: 12800,
    paidAmount: 0,
    dueDate: '2026-10-10',
    status: 'Pending'
  },
  {
    id: 'fee-fatima-sep-2026',
    studentId: 'student-fatima-noor',
    studentName: 'Fatima Noor',
    className: 'Class 6-B',
    voucherNo: 'PMS-V-2026-09-2081',
    month: 'September 2026',
    academicYear: '2025-2026',
    tuitionFee: 8500,
    transportFee: 2500,
    labCharges: 500,
    totalAmount: 11500,
    paidAmount: 11500,
    dueDate: '2026-09-15',
    status: 'Paid',
    paidDate: '2026-09-12',
    paymentMethod: 'Bank Transfer',
    transactionRef: 'HBL-0049281729'
  },
  {
    id: 'fee-fatima-oct-2026',
    studentId: 'student-fatima-noor',
    studentName: 'Fatima Noor',
    className: 'Class 6-B',
    voucherNo: 'PMS-V-2026-10-2081',
    month: 'October 2026',
    academicYear: '2025-2026',
    tuitionFee: 8500,
    transportFee: 2500,
    labCharges: 500,
    totalAmount: 11500,
    paidAmount: 0,
    dueDate: '2026-10-10',
    status: 'Pending'
  }
];

export const MOCK_TIMETABLE: DayTimetable[] = [
  {
    day: 'Monday',
    periods: [
      { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 2, time: '08:45 - 09:30 AM', subject: 'English', teacher: 'Ms. Sana Khan', room: 'Room 204' },
      { period: 3, time: '09:30 - 10:15 AM', subject: 'Physics', teacher: 'Engr. Tariq Aziz', room: 'Physics Lab' },
      { period: 4, time: '10:15 - 10:45 AM', subject: 'Break & Refreshment', teacher: 'Duty Staff', room: 'School Cafeteria / Ground', isBreak: true },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Computer Science', teacher: 'Sir Usman Ali', room: 'Computer Lab 1' },
      { period: 6, time: '11:30 - 12:15 PM', subject: 'Chemistry', teacher: 'Dr. Naila Parveen', room: 'Room 204' },
      { period: 7, time: '12:15 - 01:00 PM', subject: 'Pakistan Studies', teacher: 'Sir Zahid Khan', room: 'Room 204' },
      { period: 8, time: '01:00 - 01:45 PM', subject: 'Islamiyat & Ethics', teacher: 'Qari Abdul Rauf', room: 'Room 204' }
    ]
  },
  {
    day: 'Tuesday',
    periods: [
      { period: 1, time: '08:00 - 08:45 AM', subject: 'Physics Practical', teacher: 'Engr. Tariq Aziz', room: 'Physics Lab' },
      { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 3, time: '09:30 - 10:15 AM', subject: 'Chemistry', teacher: 'Dr. Naila Parveen', room: 'Room 204' },
      { period: 4, time: '10:15 - 10:45 AM', subject: 'Break & Refreshment', teacher: 'Duty Staff', room: 'School Cafeteria', isBreak: true },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'English Literature', teacher: 'Ms. Sana Khan', room: 'Room 204' },
      { period: 6, time: '11:30 - 12:15 PM', subject: 'Urdu', teacher: 'Sir Farmanullah', room: 'Room 204' },
      { period: 7, time: '12:15 - 01:00 PM', subject: 'Robotics & STEM', teacher: 'Sir Usman Ali', room: 'Innovation Lab' }
    ]
  },
  {
    day: 'Wednesday',
    periods: [
      { period: 1, time: '08:00 - 08:45 AM', subject: 'Chemistry Lab', teacher: 'Dr. Naila Parveen', room: 'Chemistry Lab' },
      { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 3, time: '09:30 - 10:15 AM', subject: 'English Grammar', teacher: 'Ms. Sana Khan', room: 'Room 204' },
      { period: 4, time: '10:15 - 10:45 AM', subject: 'Break', teacher: 'Duty Staff', room: 'Ground', isBreak: true },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Physics', teacher: 'Engr. Tariq Aziz', room: 'Room 204' },
      { period: 6, time: '11:30 - 12:15 PM', subject: 'Library / Reading', teacher: 'Librarian', room: 'Central Library' },
      { period: 7, time: '12:15 - 01:00 PM', subject: 'Physical Education / Sports', teacher: 'Coach Imtiaz', room: 'Sports Complex' }
    ]
  },
  {
    day: 'Thursday',
    periods: [
      { period: 1, time: '08:00 - 08:45 AM', subject: 'Mathematics', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 2, time: '08:45 - 09:30 AM', subject: 'Computer Coding', teacher: 'Sir Usman Ali', room: 'Computer Lab 1' },
      { period: 3, time: '09:30 - 10:15 AM', subject: 'Physics', teacher: 'Engr. Tariq Aziz', room: 'Room 204' },
      { period: 4, time: '10:15 - 10:45 AM', subject: 'Break', teacher: 'Duty Staff', room: 'Ground', isBreak: true },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Islamiyat', teacher: 'Qari Abdul Rauf', room: 'Room 204' },
      { period: 6, time: '11:30 - 12:15 PM', subject: 'Urdu Insha', teacher: 'Sir Farmanullah', room: 'Room 204' },
      { period: 7, time: '12:15 - 01:00 PM', subject: 'English Speech & Debate', teacher: 'Ms. Sana Khan', room: 'Auditorium' }
    ]
  },
  {
    day: 'Friday',
    periods: [
      { period: 1, time: '08:00 - 08:45 AM', subject: 'Weekly Assessment', teacher: 'Examination Wing', room: 'Room 204' },
      { period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics Tutorial', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 3, time: '09:30 - 10:15 AM', subject: 'General Science Seminar', teacher: 'Dr. Naila Parveen', room: 'Audio Visual Hall' },
      { period: 4, time: '10:15 - 10:45 AM', subject: 'Short Break', teacher: 'Duty Staff', room: 'Ground', isBreak: true },
      { period: 5, time: '10:45 - 11:30 AM', subject: 'Moral Guidance & Tarbiyah', teacher: 'Vice Principal', room: 'Main Mosque / Hall' },
      { period: 6, time: '11:30 - 12:30 PM', subject: 'Jummah Preparations & Departure', teacher: 'All Staff', room: 'Campus Gates' }
    ]
  },
  {
    day: 'Saturday',
    periods: [
      { period: 1, time: '08:00 - 09:00 AM', subject: 'Co-Curricular Clubs', teacher: 'Club Incharges', room: 'Various Venues' },
      { period: 2, time: '09:00 - 10:00 AM', subject: 'Mathematics Olympiad Practice', teacher: 'Sir Muhammad Ahmed', room: 'Room 204' },
      { period: 3, time: '10:00 - 10:30 AM', subject: 'Break', teacher: 'Duty Staff', room: 'Cafeteria', isBreak: true },
      { period: 4, time: '10:30 - 12:00 PM', subject: 'Project Work & Robotics', teacher: 'Sir Usman Ali', room: 'Innovation Lab' }
    ]
  }
];

export const MOCK_NOTICES: SchoolNotice[] = [
  {
    id: 'not-1',
    title: 'Mid-Term Examination Datesheet 2026 Announced',
    description: 'The formal date sheet for Mid-Term examinations 2026 has been published for Classes 1 to 10. Exams will commence from Monday, 12th October 2026. Hall tickets and room allocations are available on the portal.',
    date: '2026-09-28',
    category: 'Academic',
    priority: 'High',
    author: 'Controller of Examinations, PMS Mardan'
  },
  {
    id: 'not-2',
    title: 'IMPORTANT: Traffic Route Advisory for Sheikh Maltoon Sector F Gate',
    description: 'Due to road carpeting near Sector F roundabout, parent drop-offs between 7:15 AM and 8:00 AM must utilize the North Entrance Gate #2. School transport buses will continue through Gate #1 as scheduled.',
    date: '2026-09-29',
    category: 'General',
    priority: 'Normal',
    author: 'Campus Administration'
  },
  {
    id: 'not-3',
    title: 'EMERGENCY WEATHER UPDATE: Heavy Rain Alert & Safe Transportation',
    description: 'In light of the weather advisory from KP Disaster Management, our campus fleet of air-conditioned buses has verified safe pickup protocols. Please monitor the portal for real-time announcements. School timing remains standard.',
    date: '2026-09-25',
    category: 'Emergency',
    priority: 'Emergency',
    author: 'Principal Secretariat'
  },
  {
    id: 'not-4',
    title: 'Annual Science & Robotics Exhibition: Registrations Open',
    description: 'PMS Mardan Campus is hosting the Inter-School Science Fair on 24th October 2026. Students from Classes 6 to 10 are encouraged to submit project abstracts in Renewable Energy, Artificial Intelligence, and Medical Biotech to Sir Usman Ali by 5th October.',
    date: '2026-09-24',
    category: 'Academic',
    priority: 'Normal',
    author: 'Department of Science & Innovation'
  },
  {
    id: 'not-5',
    title: 'Monthly Fee Due Date Notice - October 2026',
    description: 'Respected parents are kindly requested to clear tuition and transport dues for October by 10th October 2026 to avoid late surcharge. Fee vouchers can be downloaded or settled via EasyPaisa and JazzCash directly through the parent portal.',
    date: '2026-09-26',
    category: 'Fee',
    priority: 'High',
    author: 'Accounts & Finance Wing'
  }
];

export const MOCK_EVENTS: SchoolEvent[] = [
  {
    id: 'event-1',
    title: 'Annual Sports Week & Track Champions League 2026',
    date: '2026-11-04 to 2026-11-08',
    time: '08:30 AM - 02:30 PM Daily',
    location: 'PMS Mardan Main Athletic Complex & Cricket Pavilion',
    description: 'Five days of inter-house athletic contests including 100m sprint, cricket tournament, badminton championship, football finals, and martial arts demonstrations.',
    category: 'Sports',
    image: SCHOOL_INFO.images.sports
  },
  {
    id: 'event-2',
    title: 'Khyber Pakhtunkhwa Regional Science & STEM Expo',
    date: '2026-10-24',
    time: '09:00 AM - 03:00 PM',
    location: 'Sir Syed Central Auditorium, PMS Mardan Campus',
    description: 'Showcasing over 75 innovative student projects evaluated by university professors from UET Peshawar and Abdul Wali Khan University Mardan.',
    category: 'Academic',
    image: SCHOOL_INFO.images.science
  },
  {
    id: 'event-3',
    title: 'Parent-Teacher Consultative Conference (Term 1)',
    date: '2026-10-28',
    time: '08:30 AM - 01:30 PM',
    location: 'Respective Classrooms & Conference Halls',
    description: 'Comprehensive 1-on-1 dialogue between parents and subject educators to review academic progress, homework habits, and personality development.',
    category: 'Meeting',
    image: SCHOOL_INFO.images.hero
  },
  {
    id: 'event-4',
    title: 'Seerat-un-Nabi (S.A.W) Inter-Campus Qirat & Naat Mehfil',
    date: '2026-10-05',
    time: '09:30 AM - 01:00 PM',
    location: 'Main Campus Assembly Ground',
    description: 'Soulful recitation of the Holy Quran and Naat competition celebrating the exemplary life and teachings of the Holy Prophet Muhammad (PBUH).',
    category: 'Cultural',
    image: SCHOOL_INFO.images.hero
  }
];

export const MOCK_NEWS: SchoolNews[] = [
  {
    id: 'news-1',
    title: 'PMS Mardan Secures Top 3 Positions in BISE Mardan SSC Board Examinations',
    description: 'Peshawar Model School Mardan Campus once again establishes historic academic dominance with our matriculation students clinching overall 1st and 3rd positions in Science group across the entire BISE Mardan division.',
    date: '2026-09-18',
    category: 'Academic Achievement',
    author: 'Public Relations Directorate',
    featuredImage: SCHOOL_INFO.images.hero
  },
  {
    id: 'news-2',
    title: 'State-of-the-Art Artificial Intelligence & Robotics Lab Inaugurated',
    description: 'Equipped with 40 high-performance workstations, 3D printers, and Arduino robotic kits, the newly inaugurated lab empowers PMS students to pioneer computational thinking from Class 6 onwards.',
    date: '2026-09-12',
    category: 'Campus Facilities',
    author: 'Head of STEM & Innovation',
    featuredImage: SCHOOL_INFO.images.science
  },
  {
    id: 'news-3',
    title: 'Green Campus Initiative: 1,000 Saplings Planted with Forestry Department',
    description: 'Student environmental ambassadors and eco-club members successfully planted native pine, chinar, and olive trees across the expansive campus perimeter.',
    date: '2026-09-08',
    category: 'Community & Environment',
    author: 'Student Council PMS Mardan',
    featuredImage: SCHOOL_INFO.images.sports
  }
];

export const MOCK_GALLERY: GalleryAlbum[] = [
  {
    id: 'album-1',
    title: 'Science & Robotics Exhibition Highlights',
    category: 'Academic Activities',
    date: 'September 2026',
    coverImage: SCHOOL_INFO.images.science,
    photosCount: 24,
    images: [
      SCHOOL_INFO.images.science,
      SCHOOL_INFO.images.hero,
      SCHOOL_INFO.images.sports
    ]
  },
  {
    id: 'album-2',
    title: 'Annual Sports Day & Championship Trophies',
    category: 'Sports & Athletics',
    date: 'August 2026',
    coverImage: SCHOOL_INFO.images.sports,
    photosCount: 36,
    images: [
      SCHOOL_INFO.images.sports,
      SCHOOL_INFO.images.hero,
      SCHOOL_INFO.images.science
    ]
  },
  {
    id: 'album-3',
    title: 'Campus Architecture & Smart Classrooms',
    category: 'Campus Tour',
    date: '2026',
    coverImage: SCHOOL_INFO.images.hero,
    photosCount: 18,
    images: [
      SCHOOL_INFO.images.hero,
      SCHOOL_INFO.images.science,
      SCHOOL_INFO.images.sports
    ]
  }
];

export const MOCK_BOOKS: LibraryBook[] = [
  {
    id: 'book-1',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '978-0553380163',
    category: 'Physics & Astronomy',
    totalCopies: 8,
    availableCopies: 5,
    issuedTo: [
      { studentId: 'PMS-MDR-2024-0418', studentName: 'Ali Khan', issueDate: '2026-09-22', dueDate: '2026-10-06' }
    ]
  },
  {
    id: 'book-2',
    title: 'Fundamentals of Physics (Extended Edition)',
    author: 'Halliday, Resnick & Walker',
    isbn: '978-1118230725',
    category: 'Reference Textbook',
    totalCopies: 15,
    availableCopies: 11
  },
  {
    id: 'book-3',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    category: 'Computer Science',
    totalCopies: 6,
    availableCopies: 4
  },
  {
    id: 'book-4',
    title: 'Bal-e-Jibril (Gabriel\'s Wing)',
    author: 'Allama Muhammad Iqbal',
    isbn: '978-9694160414',
    category: 'Urdu Literature & Philosophy',
    totalCopies: 12,
    availableCopies: 9
  },
  {
    id: 'book-5',
    title: 'The Road to Mecca',
    author: 'Muhammad Asad',
    isbn: '978-1887752374',
    category: 'Biography & Islamic History',
    totalCopies: 7,
    availableCopies: 6
  }
];

export const MOCK_ROUTES: TransportRoute[] = [
  {
    id: 'route-1',
    busNumber: 'PMS-MDR Bus #07 (Coaster A/C)',
    routeTitle: 'Sheikh Maltoon Town Sectors A, B, C, D, E',
    driverName: 'Jan Sher Khan',
    driverPhone: '+92 333 9128475',
    vehicleCapacity: 32,
    stops: [
      { name: 'Sector A Main Commercial Chowk', pickupTime: '07:15 AM', dropTime: '02:15 PM' },
      { name: 'Sector C Family Park', pickupTime: '07:25 AM', dropTime: '02:05 PM' },
      { name: 'Sector E Green Avenue Gate', pickupTime: '07:35 AM', dropTime: '01:55 PM' },
      { name: 'Arrival at PMS Mardan Campus', pickupTime: '07:45 AM', dropTime: '01:45 PM' }
    ]
  },
  {
    id: 'route-2',
    busNumber: 'PMS-MDR Bus #12 (Saloon Bus)',
    routeTitle: 'Nowshera Road, Cantt & Doctors Colony',
    driverName: 'Gulzar Ahmad',
    driverPhone: '+92 301 8472910',
    vehicleCapacity: 45,
    stops: [
      { name: 'Mardan Cantonment Railway Crossing', pickupTime: '07:05 AM', dropTime: '02:30 PM' },
      { name: 'Doctors Colony Main Gate', pickupTime: '07:18 AM', dropTime: '02:15 PM' },
      { name: 'Nowshera Road General Hospital Stop', pickupTime: '07:30 AM', dropTime: '02:00 PM' },
      { name: 'Arrival at PMS Mardan Campus', pickupTime: '07:45 AM', dropTime: '01:45 PM' }
    ]
  },
  {
    id: 'route-3',
    busNumber: 'PMS-MDR Bus #04 (Coaster A/C)',
    routeTitle: 'Baghdada, College Chowk & Canal Road',
    driverName: 'Noor Muhammad',
    driverPhone: '+92 345 9283741',
    vehicleCapacity: 32,
    stops: [
      { name: 'Baghdada Bazaar Police Post', pickupTime: '07:10 AM', dropTime: '02:25 PM' },
      { name: 'College Chowk Mardan', pickupTime: '07:22 AM', dropTime: '02:10 PM' },
      { name: 'Canal Road PSO Station', pickupTime: '07:32 AM', dropTime: '02:00 PM' },
      { name: 'Arrival at PMS Mardan Campus', pickupTime: '07:45 AM', dropTime: '01:45 PM' }
    ]
  }
];

export const MOCK_MESSAGES: ParentTeacherMessage[] = [
  {
    id: 'msg-1',
    senderId: 'user-parent-1',
    senderName: 'Mr. Tariq Khan (Father)',
    senderRole: 'parent',
    receiverId: 'user-teacher-1',
    receiverName: 'Sir Muhammad Ahmed',
    studentName: 'Ali Khan (Class 9-A)',
    message: 'Assalam-o-Alaikum Sir, I wanted to inquire regarding the upcoming Mid-Term Math syllabus. Will logarithms proofs be included in the subjective portion?',
    timestamp: '2026-09-28 06:15 PM',
    read: true,
    category: 'Academic'
  },
  {
    id: 'msg-2',
    senderId: 'user-teacher-1',
    senderName: 'Sir Muhammad Ahmed (Mathematics)',
    senderRole: 'teacher',
    receiverId: 'user-parent-1',
    receiverName: 'Mr. Tariq Khan',
    studentName: 'Ali Khan (Class 9-A)',
    message: 'Wa Alaikum Assalam respected Mr. Tariq Khan. Yes, logarithmic identity proofs (Laws 1, 2, and 3) carry 4 marks in Section B. Ali has shown complete mastery in class tests. He is very well prepared.',
    timestamp: '2026-09-28 07:30 PM',
    read: true,
    category: 'Academic'
  },
  {
    id: 'msg-3',
    senderId: 'user-parent-1',
    senderName: 'Mr. Tariq Khan (Father)',
    senderRole: 'parent',
    receiverId: 'user-teacher-1',
    receiverName: 'Sir Muhammad Ahmed',
    studentName: 'Ali Khan (Class 9-A)',
    message: 'JazakAllah Khair Sir for the prompt response and continuous dedication towards students.',
    timestamp: '2026-09-28 07:45 PM',
    read: true,
    category: 'General'
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-1',
    submittedBy: 'Mr. Tariq Khan',
    submittedByRole: 'parent',
    title: 'Bus Route 1 Drop-off Time Consistency',
    description: 'During road maintenance near Sector F on Wednesday, the drop-off delayed by 15 minutes without real-time SMS. Kindly ensure drivers trigger quick app alert in future.',
    category: 'Transport',
    status: 'Resolved',
    date: '2026-09-24',
    adminResponse: 'Transport Supervisor has instructed all route in-charges to broadcast automated push alerts whenever transit exceeds 7 minutes delay. Thank you for your feedback.'
  },
  {
    id: 'comp-2',
    submittedBy: 'Mr. Shah Faisal',
    submittedByRole: 'parent',
    title: 'Request for Extra Physics Practical Class for Class 10',
    description: 'Due to upcoming board practical exams, students would benefit from an additional 1-hour laboratory session on Saturdays.',
    category: 'Academic',
    status: 'In Review',
    date: '2026-09-27',
    adminResponse: 'Under review by Academic Coordinator and Engr. Tariq Aziz. Saturday slot being arranged.'
  }
];

export const MOCK_ADMISSIONS: AdmissionInquiry[] = [
  {
    id: 'adm-101',
    studentName: 'Daniyal Khan',
    fatherName: 'Mustafa Khan',
    dob: '2012-05-14',
    desiredClass: 'Class 7',
    previousSchool: 'Army Public School Mardan',
    contactNumber: '+92 333 4567890',
    email: 'mustafa.k@yahoo.com',
    address: 'Sector B, Sheikh Maltoon Town, Mardan',
    submissionDate: '2026-09-26',
    status: 'Interview',
    notes: 'Written entrance assessment cleared with 88% marks. Scheduled for Principal interview on Friday.'
  },
  {
    id: 'adm-102',
    studentName: 'Hafsa Farooq',
    fatherName: 'Dr. Farooq Shah',
    dob: '2016-08-20',
    desiredClass: 'Class 3',
    previousSchool: 'The City School Mardan',
    contactNumber: '+92 345 6789012',
    email: 'dr.farooq@gmail.com',
    address: 'Near Old Passport Office, Mardan Cantt',
    submissionDate: '2026-09-28',
    status: 'Under Review'
  },
  {
    id: 'adm-103',
    studentName: 'Zubair Ahmad',
    fatherName: 'Naseer Ahmad',
    dob: '2010-03-12',
    desiredClass: 'Class 9 (Pre-Medical)',
    previousSchool: 'Beaconhouse School System',
    contactNumber: '+92 300 1239874',
    email: 'naseer.ahmad@gmail.com',
    address: 'Charsadda Road, Near Mardan Toll Plaza',
    submissionDate: '2026-09-22',
    status: 'Accepted',
    notes: 'Merit list #4. Fee voucher issued.'
  }
];

export const MOCK_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'Attendance Confirmed: Ali Khan',
    message: 'Your child Ali Khan was marked PRESENT at 07:48 AM today in Class 9-A.',
    timestamp: 'Today, 07:50 AM',
    type: 'attendance',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Homework Assigned: Mathematics',
    message: 'Sir Muhammad Ahmed assigned "Quadratic Equations Exercise 2.1". Due date: 30th Sep 2026.',
    timestamp: 'Yesterday, 02:15 PM',
    type: 'homework',
    read: true
  },
  {
    id: 'notif-3',
    title: 'Official Datesheet: Mid-Term Exams 2026',
    message: 'Mid-Term Examinations will begin on 12th October 2026. View full schedule.',
    timestamp: '2 days ago',
    type: 'exam',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Fee Status Notification',
    message: 'September 2026 tuition voucher paid successfully via EasyPaisa. Thank you.',
    timestamp: '15 Sep 2026',
    type: 'fee',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Emergency Safety Broadcast',
    message: 'Advisory on monsoon season travel safety for all school bus routes.',
    timestamp: '20 Sep 2026',
    type: 'emergency',
    read: true
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Dr. Tariq Mahmood (Principal)',
    role: 'super_admin',
    action: 'Approved Mid-Term Examination Datesheet 2026',
    affectedRecord: 'Exams Module / Classes 1-10',
    timestamp: '2026-09-28 11:20:15',
    ipAddress: '192.168.1.10'
  },
  {
    id: 'log-2',
    user: 'Sir Muhammad Ahmed',
    role: 'teacher',
    action: 'Marked daily attendance for Class 9-A (36 Present, 1 Late, 1 Absent)',
    affectedRecord: 'Attendance / Class 9-A',
    timestamp: '2026-09-29 08:10:42',
    ipAddress: '192.168.1.84'
  },
  {
    id: 'log-3',
    user: 'Accounts Department (Mr. Imran)',
    role: 'accountant',
    action: 'Verified online fee payment PKR 13,800 for Voucher PMS-V-2026-09-1042',
    affectedRecord: 'Fee Collection / Ali Khan',
    timestamp: '2026-09-12 14:35:10',
    ipAddress: '192.168.1.22'
  },
  {
    id: 'log-4',
    user: 'Campus Administration',
    role: 'admin',
    action: 'Broadcasted traffic route advisory for Sector F Entrance',
    affectedRecord: 'Notices / Emergency Push',
    timestamp: '2026-09-29 07:10:00',
    ipAddress: '192.168.1.15'
  }
];
