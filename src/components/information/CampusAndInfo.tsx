import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCHOOL_INFO, MOCK_ROUTES, MOCK_BOOKS } from '../../data/mockData';
import {
  Bell,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  BookOpen,
  Bus,
  FileQuestion,
  Info,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Send,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';

export const CampusAndInfo: React.FC = () => {
  const {
    noticesList,
    complaintsList,
    submitComplaint,
    admissionsList,
    submitAdmission,
    currentUser,
    openModal
  } = useApp();

  const [activeSub, setActiveSub] = useState<
    'notices' | 'events' | 'gallery' | 'transport' | 'library' | 'admissions' | 'complaints' | 'about'
  >('notices');

  // Complaint state
  const [compTitle, setCompTitle] = useState('');
  const [compDesc, setCompDesc] = useState('');
  const [compCategory, setCompCategory] = useState<'Academic' | 'Transport' | 'Facilities' | 'Fee' | 'General'>('Academic');
  const [compSubmitted, setCompSubmitted] = useState(false);

  // Admission form state
  const [admStudentName, setAdmStudentName] = useState('');
  const [admFatherName, setAdmFatherName] = useState('');
  const [admDob, setAdmDob] = useState('2014-05-12');
  const [admClass, setAdmClass] = useState('Class 7');
  const [admPhone, setAdmPhone] = useState('+92 333 1234567');
  const [admEmail, setAdmEmail] = useState('parent@gmail.com');
  const [admAddress, setAdmAddress] = useState('Sheikh Maltoon Town, Mardan');
  const [admSuccess, setAdmSuccess] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compTitle.trim() || !compDesc.trim()) return;
    submitComplaint(compTitle, compDesc, compCategory);
    setCompTitle('');
    setCompDesc('');
    setCompSubmitted(true);
    setTimeout(() => setCompSubmitted(false), 3000);
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admStudentName.trim() || !admFatherName.trim()) return;
    submitAdmission({
      studentName: admStudentName,
      fatherName: admFatherName,
      dob: admDob,
      desiredClass: admClass,
      previousSchool: 'Previous School / College',
      contactNumber: admPhone,
      email: admEmail,
      address: admAddress
    });
    setAdmSuccess(true);
    setTimeout(() => setAdmSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-none text-xs font-semibold">
        {[
          { id: 'notices', label: 'Notices & Alerts', icon: Bell },
          { id: 'events', label: 'School Events', icon: Calendar },
          { id: 'gallery', label: 'Campus Gallery', icon: ImageIcon },
          { id: 'transport', label: 'School Transport', icon: Bus },
          { id: 'library', label: 'Library Catalog', icon: BookOpen },
          { id: 'admissions', label: 'Admissions Desk', icon: FileQuestion },
          { id: 'complaints', label: 'Feedback / Complaints', icon: Send },
          { id: 'about', label: 'About & Contact', icon: Info }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSub(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${
              activeSub === tab.id
                ? 'bg-[#0A2540] text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* NOTICES TAB */}
      {activeSub === 'notices' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Official School Notice Board
            </h3>
            <span className="text-xs text-slate-400">{noticesList.length} Announcements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {noticesList.map((n) => (
              <div
                key={n.id}
                className={`p-5 rounded-2xl border shadow-xs flex flex-col justify-between space-y-3 ${
                  n.priority === 'Emergency'
                    ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-900/60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        n.priority === 'Emergency'
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {n.priority} · {n.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{n.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {n.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {n.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                  <span>Author: {n.author}</span>
                  <span className="font-semibold text-[#F37021]">Official Circular</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENTS TAB */}
      {activeSub === 'events' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Annual Sports Week & Track Championship',
                date: '04 - 08 Nov 2026',
                time: '08:30 AM - 02:30 PM',
                location: 'Athletic Sports Complex, PMS Mardan',
                category: 'Sports & Athletics',
                image: SCHOOL_INFO.images.sports,
                desc: 'Five days of inter-house cricket, football, athletic sprints, and gymnastics trophies.'
              },
              {
                title: 'Khyber Pakhtunkhwa Regional STEM & Science Fair',
                date: '24 Oct 2026',
                time: '09:00 AM - 03:00 PM',
                location: 'Sir Syed Auditorium',
                category: 'Academic & Innovation',
                image: SCHOOL_INFO.images.science,
                desc: 'Showcasing student robotics, renewable energy and biotechnology models.'
              },
              {
                title: 'Parent-Teacher Consultative Conference (Term 1)',
                date: '28 Oct 2026',
                time: '08:30 AM - 01:30 PM',
                location: 'Classrooms 201-220',
                category: 'Consultation',
                image: SCHOOL_INFO.images.hero,
                desc: '1-on-1 parent reviews with subject teachers to examine first-term report cards.'
              }
            ].map((ev, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A2540] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    {ev.category}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F37021]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date} · {ev.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{ev.desc}</p>
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GALLERY TAB */}
      {activeSub === 'gallery' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Modern Campus Architecture', img: SCHOOL_INFO.images.hero, tag: 'Campus Life' },
              { title: 'STEM & Robotics Laboratory', img: SCHOOL_INFO.images.science, tag: 'Academic Innovation' },
              { title: 'Athletic Track & Sports Day', img: SCHOOL_INFO.images.sports, tag: 'Sports Champions' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-[#F37021] tracking-wider">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-bold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRANSPORT TAB */}
      {activeSub === 'transport' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Fleet Routes & Pickup Times
            </h3>
            <span className="text-xs font-mono text-emerald-600 font-bold">All 3 Routes Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_ROUTES.map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0A2540] dark:text-blue-400">
                    {r.busNumber}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{r.vehicleCapacity} Seats</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{r.routeTitle}</h4>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Stops:</span>
                  {r.stops.map((s, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300">
                      <span>{s.name}</span>
                      <span className="font-mono text-[#F37021]">{s.pickupTime}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Driver: {r.driverName}</span>
                  <a href={`tel:${r.driverPhone}`} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIBRARY TAB */}
      {activeSub === 'library' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Central Campus Library Catalog
            </h3>
            <span className="text-xs text-slate-400">5,000+ Books Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_BOOKS.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs"
              >
                <span className="text-[10px] font-bold text-[#F37021] uppercase tracking-wider block">
                  {b.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h4>
                <p className="text-slate-500 text-[11px]">Author: {b.author}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-mono">ISBN: {b.isbn}</span>
                  <span className="font-bold text-emerald-600">{b.availableCopies} Copies In Stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMISSIONS DESK TAB */}
      {activeSub === 'admissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#F37021] tracking-wider">
                Session 2026-2027 Inquiries
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Online Admission Inquiry Form
              </h3>
              <p className="text-xs text-slate-500">
                Submit candidate details for entrance screening and scholarship evaluation
              </p>
            </div>

            {admSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Application submitted successfully! Admissions office will contact you for entrance test slot.</span>
              </div>
            )}

            <form onSubmit={handleAdmissionSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={admStudentName}
                    onChange={(e) => setAdmStudentName(e.target.value)}
                    placeholder="e.g. Daniyal Khan"
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Father / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={admFatherName}
                    onChange={(e) => setAdmFatherName(e.target.value)}
                    placeholder="e.g. Tariq Khan"
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Desired Class
                  </label>
                  <select
                    value={admClass}
                    onChange={(e) => setAdmClass(e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 6">Class 6 (Middle)</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9 (Pre-Medical / Pre-Engineering)</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={admPhone}
                    onChange={(e) => setAdmPhone(e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Residential Address in Mardan
                </label>
                <input
                  type="text"
                  value={admAddress}
                  onChange={(e) => setAdmAddress(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                Submit Admission Inquiry
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admission Pipeline Status
            </h3>
            <div className="space-y-2 text-xs">
              {admissionsList.slice(0, 3).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>{a.studentName}</span>
                    <span className="text-[#F37021]">{a.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Applying for {a.desiredClass} · {a.submissionDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COMPLAINTS & FEEDBACK TAB */}
      {activeSub === 'complaints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#F37021] tracking-wider">
                Quality Assurance & Grievances
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Submit Feedback or Concern
              </h3>
              <p className="text-xs text-slate-500">
                Directly tracked by Principal Secretariat & Academic Coordinators
              </p>
            </div>

            {compSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ticket logged. An administrative response will be issued within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Ticket Subject
                  </label>
                  <input
                    type="text"
                    value={compTitle}
                    onChange={(e) => setCompTitle(e.target.value)}
                    placeholder="e.g. Transport Bus Delay near Sector F"
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={compCategory}
                    onChange={(e) => setCompCategory(e.target.value as any)}
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Transport">Transport</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Fee">Fee Accounts</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Description of Issue or Recommendation
                </label>
                <textarea
                  rows={3}
                  value={compDesc}
                  onChange={(e) => setCompDesc(e.target.value)}
                  placeholder="Provide precise details..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-800 text-white font-bold text-xs"
              >
                Submit Formal Ticket
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recent Feedback Status
            </h3>
            <div className="space-y-2 text-xs">
              {complaintsList.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="truncate">{c.title}</span>
                    <span className="text-emerald-600 shrink-0 ml-2">{c.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{c.description}</p>
                  {c.adminResponse && (
                    <div className="text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-700 mt-1 italic">
                      Admin: "{c.adminResponse}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT SCHOOL & CONTACT US TAB */}
      {activeSub === 'about' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#F37021] tracking-wider">
                Institutional Profile
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Peshawar Model School · Mardan Campus
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Founded in 1979, Peshawar Model Schools stands as Khyber Pakhtunkhwa's most celebrated premier educational network. The Mardan Campus delivers world-class academic rigor combining BISE Mardan board distinction with STEM innovation, Islamic moral tarbiyah, and modern athletic facilities.
              </p>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${SCHOOL_INFO.phone.split('/')[0].trim()}`}
                className="p-4 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F37021]" />
                <span>Call School Office</span>
              </a>

              <a
                href={`mailto:${SCHOOL_INFO.email}`}
                className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 border border-orange-200 dark:border-orange-800 flex items-center justify-center gap-2 text-xs font-bold hover:bg-orange-100 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F37021]" />
                <span>Email Admissions</span>
              </a>

              <a
                href="https://maps.google.com/?q=Peshawar+Model+School+Sheikh+Maltoon+Mardan"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Open Location Map</span>
              </a>
            </div>

            {/* Detailed Campus Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Campus Address:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{SCHOOL_INFO.address}</p>
                <p className="text-slate-500">Coordinates: {SCHOOL_INFO.coordinates}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Office Hours:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{SCHOOL_INFO.officeHours}</p>
                <p className="text-slate-500">Affiliation: {SCHOOL_INFO.affiliation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
