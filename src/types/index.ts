export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'parent' | 'student';

export type Language = 'en' | 'ur' | 'ps';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  designation?: string;
  // Specific to students & parents
  studentId?: string;
  classId?: string;
  section?: string;
  childrenIds?: string[];
}

export interface Student {
  id: string;
  studentId: string; // e.g. PMS-MDR-2024-0418
  registrationNo: string;
  name: string;
  fatherName: string;
  className: string;
  section: string;
  rollNo: number;
  dob: string;
  gender: 'Male' | 'Female';
  contact: string;
  emergencyContact: string;
  address: string;
  admissionDate: string;
  academicYear: string;
  photo: string;
  bloodGroup: string;
  busRouteId?: string;
  attendancePercentage: number;
  currentTermGpa: string;
  currentRank: string;
  parentId: string;
}

export interface Teacher {
  id: string;
  name: string;
  employeeId: string;
  qualification: string;
  subjects: string[];
  assignedClasses: string[];
  phone: string;
  email: string;
  avatar: string;
  joiningDate: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: number;
  className: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  className: string;
  section: string;
  assignedDate: string;
  dueDate: string;
  assignedBy: string;
  description: string;
  totalMarks: number;
  attachments?: string[];
  submissionsCount?: number;
  totalStudents?: number;
  // Student view
  submitted?: boolean;
  submissionDate?: string;
  studentSubmissionText?: string;
  obtainedMarks?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  name: string; // Mid-Term Exam 2026, Monthly Test - March
  type: 'Monthly Test' | 'Mid-Term Exam' | 'Final Exam' | 'Class Test';
  startDate: string;
  endDate: string;
  className: string;
  academicYear: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  schedule: {
    subject: string;
    date: string;
    time: string;
    room: string;
    maxMarks: number;
    syllabus: string;
  }[];
}

export interface SubjectResult {
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  remarks: string;
}

export interface ReportCard {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: number;
  className: string;
  section: string;
  examName: string;
  academicYear: string;
  term: string;
  results: SubjectResult[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  position: string;
  attendancePercentage: number;
  teacherRemarks: string;
  principalRemarks: string;
  issueDate: string;
}

export type FeeStatus = 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid';

export interface FeeItem {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  voucherNo: string;
  month: string;
  academicYear: string;
  tuitionFee: number;
  admissionFee?: number;
  examFee?: number;
  transportFee?: number;
  labCharges?: number;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: FeeStatus;
  paidDate?: string;
  paymentMethod?: 'Cash' | 'Bank Transfer' | 'EasyPaisa' | 'JazzCash';
  transactionRef?: string;
}

export interface TimetablePeriod {
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isBreak?: boolean;
}

export interface DayTimetable {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periods: TimetablePeriod[];
}

export interface SchoolNotice {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'General' | 'Academic' | 'Holiday' | 'Fee' | 'Emergency';
  priority: 'Normal' | 'High' | 'Emergency';
  author: string;
  attachment?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Sports' | 'Academic' | 'Cultural' | 'Meeting' | 'Celebration';
  image: string;
}

export interface SchoolNews {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  featuredImage: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  photosCount: number;
  images: string[];
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  issuedTo?: {
    studentId: string;
    studentName: string;
    issueDate: string;
    dueDate: string;
  }[];
}

export interface TransportRoute {
  id: string;
  busNumber: string;
  routeTitle: string;
  driverName: string;
  driverPhone: string;
  vehicleCapacity: number;
  stops: {
    name: string;
    pickupTime: string;
    dropTime: string;
  }[];
}

export interface ParentTeacherMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'parent' | 'teacher';
  receiverId: string;
  receiverName: string;
  studentName: string;
  message: string;
  timestamp: string;
  read: boolean;
  category?: 'General' | 'Homework' | 'Attendance' | 'Behavior' | 'Academic';
}

export interface Complaint {
  id: string;
  submittedBy: string;
  submittedByRole: 'parent' | 'student';
  title: string;
  description: string;
  category: 'Academic' | 'Transport' | 'Facilities' | 'Fee' | 'General';
  status: 'Pending' | 'In Review' | 'Resolved' | 'Closed';
  date: string;
  adminResponse?: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  fatherName: string;
  dob: string;
  desiredClass: string;
  previousSchool: string;
  contactNumber: string;
  email: string;
  address: string;
  submissionDate: string;
  status: 'New' | 'Under Review' | 'Interview' | 'Accepted' | 'Rejected';
  notes?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  affectedRecord: string;
  timestamp: string;
  ipAddress?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'attendance' | 'homework' | 'exam' | 'fee' | 'notice' | 'emergency';
  read: boolean;
  targetRole?: UserRole | 'all';
}
