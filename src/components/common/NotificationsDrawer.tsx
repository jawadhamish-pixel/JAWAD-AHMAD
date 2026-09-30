import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Check, Trash2, ShieldAlert, BookOpen, Clock, CreditCard, Calendar } from 'lucide-react';
import { PushNotification } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const { notificationsList, markNotificationRead, openModal } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'emergency'>('all');

  if (!isOpen) return null;

  const filteredNotifs = notificationsList.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'emergency') return n.type === 'emergency';
    return true;
  });

  const getIcon = (type: PushNotification['type']) => {
    switch (type) {
      case 'emergency':
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'attendance':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'homework':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'fee':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'exam':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F37021]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications Inbox
              </h3>
              <p className="text-[11px] text-slate-500">
                Firebase Cloud Messaging (FCM) live feed
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

        {/* Filter Bar (Zero-pill compliant tabs) */}
        <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 flex items-center gap-1 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All ({notificationsList.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('emergency')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'emergency'
                ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-red-600'
            }`}
          >
            Emergency Alerts
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No notifications to display.
            </div>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 ${
                  !n.read
                    ? 'bg-orange-50/50 dark:bg-orange-950/20 hover:bg-orange-50 dark:hover:bg-orange-950/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#F37021] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {n.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
