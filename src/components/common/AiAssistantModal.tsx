import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Send, Bot, User as UserIcon, ShieldAlert } from 'lucide-react';
import { MOCK_EXAMS, MOCK_EVENTS } from '../../data/mockData';

interface AiAssistantModalProps {
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const { currentUser, currentStudent, homeworkList, feesList } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Assalam-o-Alaikum ${currentUser.name}! I am your Peshawar Model School Mardan AI Academic Assistant. How can I assist you with ${currentUser.role === 'parent' ? `${currentStudent.name}'s` : 'your'} academic schedule, homework, or campus events today?`,
      time: 'Just now'
    }
  ]);

  const quickQuestions = [
    'When is the next exam?',
    currentUser.role === 'parent' ? `What is ${currentStudent.name}'s attendance?` : 'What is my attendance rate?',
    'What homework is pending?',
    'When is Sports Week?',
    'How do I pay school fees?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Role-safe context query answering engine
    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('exam') || q.includes('datesheet') || q.includes('test')) {
        const upcomingExam = MOCK_EXAMS.find((e) => e.status === 'Upcoming') || MOCK_EXAMS[0];
        reply = `The upcoming examination is "${upcomingExam.name}" starting on ${upcomingExam.startDate} through ${upcomingExam.endDate}. The first paper is ${upcomingExam.schedule[0].subject} at ${upcomingExam.schedule[0].time} in ${upcomingExam.schedule[0].room}. You can view the full datesheet in the Academics tab.`;
      } else if (q.includes('attendance')) {
        reply = `${currentStudent.name}'s verified attendance rate is currently ${currentStudent.attendancePercentage}%. ${currentStudent.name} was marked present today at 07:48 AM via campus turnstile scan.`;
      } else if (q.includes('homework') || q.includes('assignment')) {
        const pending = homeworkList.filter((h) => !h.submitted);
        if (pending.length > 0) {
          reply = `There are ${pending.length} pending homework assignments: ${pending.map((p) => `"${p.title}" (${p.subject}, Due: ${p.dueDate})`).join(' and ')}.`;
        } else {
          reply = `All assigned homework for ${currentStudent.className}-${currentStudent.section} has been submitted on time!`;
        }
      } else if (q.includes('sport') || q.includes('sports week')) {
        reply = `Annual Sports Week & Track Champions League 2026 is scheduled from 4th November to 8th November 2026 at the PMS Mardan Athletic Complex and Cricket Pavilion.`;
      } else if (q.includes('fee') || q.includes('voucher') || q.includes('pay')) {
        const pendingFee = feesList.find((f) => f.studentId === currentStudent.id && f.status !== 'Paid');
        if (pendingFee) {
          reply = `You have a fee voucher #${pendingFee.voucherNo} for ${pendingFee.month} of PKR ${pendingFee.totalAmount.toLocaleString()} due on ${pendingFee.dueDate}. You can settle it immediately via EasyPaisa or JazzCash through the Fee Portal.`;
        } else {
          reply = `All current tuition fees for ${currentStudent.name} have been fully paid and verified!`;
        }
      } else if (q.includes('event')) {
        reply = `Upcoming major events at Mardan Campus include: 1) Khyber Pakhtunkhwa Regional Science Expo on 24th Oct 2026, 2) Parent-Teacher Consultative Conference on 28th Oct 2026, and 3) Annual Sports Week starting 4th Nov 2026.`;
      } else {
        reply = `Thank you for your inquiry. For specific administrative assistance regarding ${currentStudent.name} (${currentStudent.studentId}), you can also message the class incharge or contact the campus reception at +92 937 860124.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-[#F37021] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>PMS Academic Assistant</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300">
                  Secure AI
                </span>
              </h3>
              <p className="text-[10px] text-slate-500">
                Scoped to {currentUser.name} ({currentUser.role})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#0A2540] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <Bot className="w-4 h-4 text-orange-400" />
                </div>
              )}
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0A2540] text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[9px] text-slate-400 mt-1 block text-right">
                  {m.time}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#F37021] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto whitespace-nowrap flex items-center gap-1.5 scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-700 text-slate-700 dark:text-slate-300 transition-colors shrink-0 font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about exams, attendance, homework..."
              className="flex-1 h-10 px-3 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[#F37021] hover:bg-orange-600 disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
