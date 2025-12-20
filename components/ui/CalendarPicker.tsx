import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Time slots configuration
  const getTimeSlots = (date: Date): string[] => {
    const dayOfWeek = date.getDay();
    
    // Sunday = 0, Saturday = 6
    if (dayOfWeek === 0) {
      return []; // No Sunday options
    } else if (dayOfWeek === 6) {
      return ['9:00 AM', '2:00 PM', '6:00 PM']; // Saturday
    } else {
      return ['11:00 AM', '4:00 PM']; // Weekdays (Mon-Fri)
    }
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // Can't select past dates
    if (checkDate < today) return false;
    
    // Can't select Sundays
    if (date.getDay() === 0) return false;
    
    return true;
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const availableTimeSlots = selectedDate ? getTimeSlots(selectedDate) : [];

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="bg-white rounded-xl border border-[#362b24]/10 p-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-[#362b24]/5 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-[#362b24]" />
          </button>
          <h3 className="font-serif text-lg text-[#362b24]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-[#362b24]/5 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-[#362b24]" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-[#85756b] py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const selectable = isDateSelectable(date);
            const selected = isSelected(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => selectable && onDateSelect(date)}
                disabled={!selectable}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all
                  ${selected
                    ? 'bg-[#c06e46] text-white'
                    : selectable
                    ? 'hover:bg-[#362b24]/10 text-[#362b24]'
                    : 'text-[#85756b]/30 cursor-not-allowed'
                  }
                  ${date.getDay() === 0 ? 'opacity-30' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && availableTimeSlots.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-[#362b24] uppercase tracking-wide mb-2">
            Select Time <span className="text-[#c06e46]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => onTimeSelect(time)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedTime === time
                    ? 'bg-[#c06e46] text-white'
                    : 'bg-white border border-[#362b24]/10 text-[#362b24] hover:border-[#c06e46] hover:bg-[#c06e46]/5'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && availableTimeSlots.length === 0 && (
        <p className="text-sm text-[#85756b]">No time slots available for Sundays.</p>
      )}
    </div>
  );
};

export default CalendarPicker;

