import React, { useState } from "react";

import styles from "./date-picker.module.scss";
import { classNameModule } from "../../../utils/class-name/classNameModule";
import LeftIcon from "../icons/LeftIcon";
import RightIcon from "../icons/RightIcon";
import RectangleIcon from "../icons/RectangleIcon";

const className = classNameModule(styles);

interface OwnProps {
  isOpen: boolean;
  rangeMode?: boolean;
  onDateSelect?: (date: Date | null) => void;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
}

const monthsArray: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysNameArray: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker: React.FC<OwnProps> = ({
  isOpen,
  rangeMode,
  onClose,
  onDateSelect,
  onRangeSelect,
}) => {
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

  const isInRange = (day: number): boolean => {
    if (!rangeStart || !rangeEnd) return false;

    const date = new Date(currentYear, currentMonth, day);
    return date >= rangeStart && date <= rangeEnd;
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

  const handleGetSelectedTodayDay = (day: number): boolean => {
    return day === todayDay;
  };

  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = getFirstDayOfMonth(currentMonth, currentYear);

    const disabledDate = totalDays - startDay + 1;

    for (let i = disabledDate; i <= totalDays; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          {...className("day-value", { "disabled-date": true })}
        >
          {i}
        </div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelectedDay = handleGetSelectedDate(day);

      const isToday = handleGetSelectedTodayDay(day);
      days.push(
        <div
          key={day}
          onClick={(e) => handleDayClick(e, day)}
          {...className("day-value", {
            active: isSelectedDay,
            today: isToday,
            "in-range": isInRange(day),
          })}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div {...className("DatePicker", { show: isOpen })}>
      <div role="button" {...className("content")}>
        <div className={styles["grid-one"]}>
          <button onClick={handlePrevMonth} className={styles["icon"]}>
            <LeftIcon />
          </button>

          <div className={styles["middle"]}>
            <div className={styles["item"]}>
              <div>
                <span>{monthsArray[currentMonth]}</span>
                <RectangleIcon />
              </div>
            </div>

            <div className={styles["item"]}>
              <div>
                <span>{currentYear}</span>
                <RectangleIcon />
              </div>
            </div>
          </div>

          <button onClick={handleNextMonth} className={styles["icon"]}>
            <RightIcon />
          </button>
        </div>

        <div className={styles["grid-two"]}>
          <div className={styles["container-name"]}>
            {daysNameArray.map((day) => {
              return (
                <div className={styles["day-name"]} key={day}>
                  {day}
                </div>
              );
            })}
          </div>

          <div className={styles["container-day"]}>{renderDays()}</div>
        </div>
      </div>
    </div>
  );
};
