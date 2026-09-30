import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  User,
  CheckCheck,
  Paperclip,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { ParentTeacherMessage } from '../../types';

export const ParentTeacherChat: React.FC = () => {
  const { currentUser, messagesList, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [activeRecipient, setActiveRecipient] = useState({
    id: currentUser.role === 'teacher' ? 'user-parent-1' : 'user-teacher-1',
    name: currentUser.role === 'teacher' ? 'Mr. Tariq Khan (Father of Ali Khan)' : 'Sir Muhammad Ahmed (Head of Mathematics)',
    role: currentUser.role === 'teacher' ? 'parent' : 'teacher',
    studentName: 'Ali Khan (Class 9-A)'
  });

  const quickPrompts = [
    'Inquiry about Mid-Term exam syllabus & preparations',
    'Application for medical leave for 2 days',
    'Follow-up regarding today’s mathematics homework',
    'Request for parent-teacher consultative meeting'
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(
      inputText,
      activeRecipient.id,
      activeRecipient.name,
      activeRecipient.studentName
    );

    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Security Safeguarding Callout */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F37021]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Safeguarded Portal · Admin Moderation Active</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Parent-Teacher Communication Hub
          </h2>
          <p className="text-xs text-slate-500">
            Direct, instant, and documented communication between registered parents and assigned educators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden md:inline">
            Official Hours: 7:30 AM – 4:00 PM
          </span>
          <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Teacher Online</span>
          </div>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[620px]">
        {/* Left Column: Conversations & Teachers List */}
        <div className="border-r border-slate-100 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/20">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assigned Faculty & Incharges
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1">
            {[
              {
                id: 'user-teacher-1',
                name: 'Sir Muhammad Ahmed',
                title: 'Head of Mathematics · Class Incharge 9-A',
                student: 'Ali Khan',
                active: true,
                unread: 0
              },
              {
                id: 'user-teacher-2',
                name: 'Ms. Sana Khan',
                title: 'Senior English Language Lecturer',
                student: 'Ali Khan',
                active: false,
                unread: 1
              },
              {
                id: 'user-teacher-3',
                name: 'Engr. Tariq Aziz',
                title: 'Physics & STEM Lead',
                student: 'Ali Khan',
                active: false,
                unread: 0
              }
            ].map((contact) => (
              <button
                key={contact.id}
                onClick={() =>
                  setActiveRecipient({
                    id: contact.id,
                    name: contact.name,
                    role: 'teacher',
                    studentName: `${contact.student} (Class 9-A)`
                  })
                }
                className={`w-full p-3 rounded-2xl text-left transition-all flex items-center gap-3 ${
                  activeRecipient.id === contact.id
                    ? 'bg-white dark:bg-slate-800 shadow-sm ring-1 ring-orange-500/40 text-slate-900 dark:text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {contact.name.split(' ')[1]?.charAt(0) || 'T'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-xs truncate">{contact.name}</span>
                    {contact.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#F37021] text-white text-[9px] font-bold flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{contact.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Active Conversation Feed */}
        <div className="md:col-span-2 flex flex-col h-full bg-white dark:bg-slate-900">
          {/* Active Contact Bar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">
                {activeRecipient.name.split(' ')[1]?.charAt(0) || 'P'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {activeRecipient.name}
                </h4>
                <p className="text-[10px] text-slate-500">
                  Regarding: <strong className="text-slate-700 dark:text-slate-300">{activeRecipient.studentName}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Verified PMS Portal ID
              </span>
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30 dark:bg-slate-950/20">
            {messagesList.map((msg) => {
              const isMe = msg.senderId === currentUser.id || msg.senderRole === currentUser.role;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#0A2540] text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-80 border-b border-white/10 pb-1">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.category || 'Academic'}</span>
                    </div>
                    <p>{msg.message}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] opacity-75">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-sky-400" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Suggestions */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">
              Quick Inquiries:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(p)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to the class incharge..."
                className="flex-1 h-10 px-3.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="h-10 px-4 rounded-xl bg-[#F37021] hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
