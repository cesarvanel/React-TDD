import { useEffect, useState } from "react";

export interface useDatePickerBehavior {
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  isInRange: (date: DayModel) => boolean;
  handleGetSelectedDate: (day: number) => boolean;
  handleDayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    day: number
  ) => void;
  isRangeStartSelected: (date: DayModel) => boolean;
  handleGetSelectedTodayDay: (date: DayModel) => boolean;
  calendarDays: DayModel[];
  handleDisabledWithOrMaxDate: (date: DayModel) => boolean, 
  isRangeEndSelected: (date: DayModel) => boolean, 
  handleChangeCurrentMonth: (month: number) => void, 
  currentMonth: number, 
  currentYear: number; 
  rangeStart: Date | null; 
  rangeEnd: Date | null
}

interface OwnProps {
  isOpen: boolean;
  rangeMode?: boolean;
  onDateSelect?: (date: Date | null) => void;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}
type DayModel = {
  day: number;
  isPrevDay: boolean;
  isNextDay: boolean;
  isMonthDay: boolean;
};

export const useDatePicker = ({
  maxDate,
  minDate,
  isOpen,
  onDateSelect,
  onRangeSelect,
  rangeMode,
}: OwnProps): useDatePickerBehavior => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();


  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInMonth = (month: number, year: number): number => {
    switch (month) {
      case 1: // February
        return isLeapYear(year) ? 29 : 28;
      case 3:
      case 5:
      case 8:
      case 10: // April, June, September, November
        return 30;
      default:
        return 31;
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
      return;
    }
    setCurrentMonth(0);
    setCurrentYear((prev) => prev + 1);
  };

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
      return;
    }
    setCurrentMonth(0);
    setCurrentYear((prev) => prev - 1);
  };

  const isInRange = (date: DayModel): boolean => {
    if (!rangeStart || !rangeEnd) return false;
    if (date.isNextDay || date.isPrevDay) return false;

    const currentDate = new Date(currentYear, currentMonth, date.day);
    return currentDate >= rangeStart && currentDate <= rangeEnd;
  };

  const handleDisabledWithOrMaxDate = (date: DayModel) => {
    const currentDate = new Date(currentYear, currentMonth, date.day);
    if (minDate && !maxDate) {
      return currentDate >= minDate;
    }
    if (maxDate && !minDate) {
      return currentDate <= maxDate;
    }

    if (maxDate && minDate) {
      return currentDate >= minDate && currentDate <= maxDate;
    }

    return true;
  };

  const handleDayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    day: number
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.preventDefault();
    e.preventDefault();

    const clickedDate = new Date(currentYear, currentMonth, day);

    if (rangeMode) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(clickedDate);
        setRangeEnd(null);
        onRangeSelect?.(clickedDate, null);
        return;
      }
      if (rangeStart && !rangeEnd) {
        if (clickedDate < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clickedDate);
          onRangeSelect?.(clickedDate, rangeStart);
          return;
        }
        setRangeEnd(clickedDate);
        onRangeSelect?.(rangeStart, clickedDate);
        return;
      }
    }
    setSelectedDate(new Date(currentYear, currentMonth, day));
    onDateSelect?.(clickedDate);
  };

  const handleGetSelectedDate = (day: number): boolean => {
    const isSelected =
      !!selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    return isSelected;
  };

  const handleGetSelectedTodayDay = (date: DayModel): boolean => {
    return date.day === todayDay && date.isMonthDay;
  };

  const isRangeStartSelected = (date: DayModel): boolean => {
    return (
      !!rangeStart &&
      rangeStart.getDate() === date.day &&
      date.isMonthDay &&
      rangeStart.getMonth() === currentMonth &&
      rangeStart.getFullYear() === currentYear
    );
  };

  const isRangeEndSelected = (date: DayModel): boolean => {
    return (
      !!rangeEnd &&
      rangeEnd.getDate() === date.day &&
      date.isMonthDay &&
      rangeEnd.getMonth() === currentMonth &&
      rangeEnd.getFullYear() === currentYear
    );
  };

  const handleChangeCurrentMonth = (month:number) =>{
    setCurrentMonth(month)
  }

  const handleCleanRange = () => {
    setRangeEnd(null);
    setRangeStart(null);
    setSelectedDate(null);
    setCurrentMonth(todayMonth)
    setCurrentYear(todayYear)
  };

  const getCalendarDays = (): DayModel[] => {
    const daysModels: DayModel[] = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = getFirstDayOfMonth(currentMonth, currentYear);
    const disabledDate = totalDays - startDay + 1;

    for (let day = disabledDate; day <= totalDays; day++) {
      const disabledDate: DayModel = {
        day: day,
        isNextDay: false,
        isPrevDay: true,
        isMonthDay: false,
      };
      daysModels.push(disabledDate);
    }

    for (let day = 1; day <= totalDays; day++) {
      const disabledDate: DayModel = {
        day: day,
        isNextDay: false,
        isPrevDay: false,
        isMonthDay: true,
      };
      daysModels.push(disabledDate);
    }

    const totalCells = startDay + totalDays;
    const nextMonthDays = 42 - totalCells;
    for (let day = 1; day <= nextMonthDays; day++) {
      const disabledDate: DayModel = {
        day: day,
        isNextDay: true,
        isPrevDay: false,
        isMonthDay: false,
      };
      daysModels.push(disabledDate);
    }

    return daysModels;
  };

  useEffect(() => {
    return () => {
      if (!isOpen) {
        handleCleanRange();
      }
    };
  }, [isOpen]);

  return {
    handleDayClick,
    handleGetSelectedDate,
    handleGetSelectedTodayDay,
    handleNextMonth,
    handlePrevMonth,
    isInRange,
    isRangeStartSelected,
    handleDisabledWithOrMaxDate, 
    isRangeEndSelected, 
    handleChangeCurrentMonth,
    calendarDays:getCalendarDays(), 
    currentMonth, 
    currentYear,
    rangeEnd,
    rangeStart

  };
};
