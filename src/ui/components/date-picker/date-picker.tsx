import React, {useState } from "react";

import styles from "./date-picker.module.scss";
import { classNameModule } from "../../../utils/class-name/classNameModule";
import LeftIcon from "../icons/LeftIcon";
import RightIcon from "../icons/RightIcon";
import RectangleIcon from "../icons/RectangleIcon";
import { useDatePicker } from "./use-date-picker";
import useClickOutside from "../../../hook/use-onclick-outside";

const className = classNameModule(styles);

interface OwnProps {
  isOpen: boolean;
  rangeMode?: boolean;
  onDateSelect?: (date: Date | null) => void;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
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

export const DatePicker: React.FC<OwnProps> = (props) => {
  const {
    handleNextMonth,
    handleDayClick,
    handleDisabledWithOrMaxDate,
    handleGetSelectedDate,
    handleGetSelectedTodayDay,
    handlePrevMonth,
    isInRange,
    isRangeEndSelected,
    isRangeStartSelected,
    handleChangeCurrentMonth,
    calendarDays,
    currentMonth,
    currentYear,
  } = useDatePicker(props);
  const [dropDownIsOpen, setDropDownIsOpen] = useState<boolean>(false);

  const handleSelectMonth = (month: number) => {
    setDropDownIsOpen(false);
    handleChangeCurrentMonth(month);
  };

  const handleCloseDropDown = () => {
    setDropDownIsOpen(false);
  };

  const ref = useClickOutside<HTMLDivElement>(() =>handleCloseDropDown() );
  return (
    <div {...className("DatePicker")}>
      <div role="button" {...className("content")}>
        <div className={styles["grid-one"]}>
          <button onClick={handlePrevMonth} className={styles["icon"]}>
            <LeftIcon />
          </button>

          <div className={styles["middle"]}>
            <div
              role="button"
              onClick={(e) => setDropDownIsOpen(!dropDownIsOpen)}
              className={styles["item"]}
            >
              <span>{monthsArray[currentMonth]}</span>
              <RectangleIcon />

              {dropDownIsOpen && (
                <div ref={ref} className={styles["pop-over"]}>
                  <div className={styles["drop-down"]}>
                    <div className={styles["container"]}>
                      {monthsArray.map((month, index) => {
                        return (
                          <div
                            {...className("every-month", {
                              "selected-month": index === currentMonth,
                            })}
                            key={month}
                            role="button"
                            onClick={() => {
                              handleSelectMonth(index);
                            }}
                          >
                            {month}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles["item"]}>
              <span>{currentYear}</span>
              <RectangleIcon />
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

          <div className={styles["container-day"]}>
            {calendarDays.map((date, key) => {
              const isToday = handleGetSelectedTodayDay(date);
              return (
                <div
                  {...className("day-content", {
                    "active-range": isInRange(date),
                  })}
                  key={date.day.toString() + key}
                >
                  <div
                    onClick={(e) => handleDayClick(e, date)}
                    {...className("day-value", {
                      "prev-month": date.isPrevDay,
                      "next-month": date.isNextDay,
                      "active-day": handleGetSelectedDate(date),
                      "today-day": isToday,
                      "in-range": isInRange(date),
                      "is-range-or-end-selected":
                        isRangeStartSelected(date) || isRangeEndSelected(date),
                      "is-min-or-max-day": !handleDisabledWithOrMaxDate(date),
                    })}
                  >
                    {date.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
