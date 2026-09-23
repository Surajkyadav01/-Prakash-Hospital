import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface CustomDatePickerProps {
  id?: string;
  value: string; // 'YYYY-MM-DD'
  onChange: (date: string) => void;
  min?: string; // 'YYYY-MM-DD'
  max?: string; // 'YYYY-MM-DD'
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dropUp?: boolean;
  align?: 'left' | 'right';
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Helper to format YYYY-MM-DD
function formatDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to format display date e.g. "23 Sep 2026 (Wed)"
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (isNaN(dateObj.getTime())) return dateStr;
    const dayStr = String(d).padStart(2, '0');
    const monthShort = MONTH_SHORT[m - 1] || '';
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
    return `${dayStr} ${monthShort} ${y} (${dayName})`;
  } catch {
    return dateStr;
  }
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  placeholder = 'Select date...',
  className = '',
  disabled = false,
  dropUp = false,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active view month and year
  const initialDate = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(
    isNaN(initialDate.getTime()) ? new Date().getFullYear() : initialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    isNaN(initialDate.getTime()) ? new Date().getMonth() : initialDate.getMonth()
  );

  // Sync view month/year when value changes
  useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Navigate months
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Quick select presets
  const selectQuickDay = (daysOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const str = formatDateString(d);
    onChange(str);
    setIsOpen(false);
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const daysList: Array<{
    dayNum: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isDisabled: boolean;
    isToday: boolean;
    isSelected: boolean;
  }> = [];

  const todayStr = formatDateString(new Date());

  // Padding days before first of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysList.push({
      dayNum: 0,
      dateStr: '',
      isCurrentMonth: false,
      isDisabled: true,
      isToday: false,
      isSelected: false,
    });
  }

  // Days in month
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateObj = new Date(viewYear, viewMonth, d);
    const str = formatDateString(dateObj);
    const isPast = min ? str < min : str < todayStr;
    const isFuture = max ? str > max : false;
    const isDisabled = isPast || isFuture;
    const isToday = str === todayStr;
    const isSelected = str === value;

    daysList.push({
      dayNum: d,
      dateStr: str,
      isCurrentMonth: true,
      isDisabled,
      isToday,
      isSelected,
    });
  }

  return (
    <div ref={containerRef} className="relative w-full text-left" id={id ? `${id}-container` : undefined}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-900 transition-all cursor-pointer select-none outline-none ${
          isOpen
            ? 'ring-2 ring-sky-500 border-sky-500 shadow-xs'
            : 'hover:border-slate-300 focus:ring-2 focus:ring-sky-500'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''} ${className}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate min-w-0 flex-1">
          <CalendarIcon className="w-4 h-4 text-sky-600 shrink-0" />
          <span className={`truncate ${value ? 'text-slate-900 font-semibold' : 'text-slate-400 font-normal'}`}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
        </div>

        <span className="text-[10px] text-sky-700 bg-sky-50 font-bold px-2 py-0.5 rounded-md border border-sky-200 shrink-0">
          Pick
        </span>
      </button>

      {/* In-Place Calendar Popover (Zero lag, zero top-page jump, opens right at button) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Calendar Date Picker"
          className={`absolute z-50 ${
            dropUp ? 'bottom-full mb-1.5 origin-bottom' : 'top-full mt-1.5 origin-top'
          } ${
            align === 'right' ? 'right-0' : 'left-0'
          } w-[260px] max-w-[calc(100vw-32px)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-2.5 text-slate-800 select-none animate-in fade-in duration-100`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sleek Quick Presets */}
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => selectQuickDay(0)}
              className="flex-1 py-1 px-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => selectQuickDay(1)}
              className="flex-1 py-1 px-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => selectQuickDay(2)}
              className="flex-1 py-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
            >
              +2 Days
            </button>
          </div>

          {/* Month & Year Navigation */}
          <div className="flex items-center justify-between mb-2 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-extrabold text-slate-900 tracking-tight">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
            {DAY_LABELS.map((day, idx) => (
              <div
                key={day}
                className={`text-[10px] font-bold py-0.5 ${
                  idx === 0 ? 'text-rose-500' : 'text-slate-400'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid (Compact & Responsive) */}
          <div className="grid grid-cols-7 gap-0.5">
            {daysList.map((item, idx) => {
              if (!item.isCurrentMonth) {
                return <div key={`pad-${idx}`} className="w-7 h-7" />;
              }

              return (
                <button
                  key={item.dateStr}
                  type="button"
                  disabled={item.isDisabled}
                  onClick={() => {
                    onChange(item.dateStr);
                    setIsOpen(false);
                  }}
                  className={`w-7 h-7 mx-auto rounded-lg text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    item.isSelected
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : item.isDisabled
                      ? 'text-slate-300 opacity-40 cursor-not-allowed bg-transparent'
                      : item.isToday
                      ? 'border border-sky-400 text-sky-700 font-bold bg-sky-50/70 hover:bg-sky-100'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                >
                  {item.dayNum}
                </button>
              );
            })}
          </div>

          {/* Compact Status Indicator */}
          {value && (
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Date:</span>
              <span className="font-bold text-sky-800 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                {value}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
