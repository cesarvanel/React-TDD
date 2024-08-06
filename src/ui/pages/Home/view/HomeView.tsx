import { useState } from "react";
import { useHome } from "./useHome";
import { DatePicker } from "../../../components/date-picker/date-picker";
import styles from "./HomeView.module.scss";
import { PopOver } from "../../../components/pop-over/PopOver";

const HomeView = () => {
  const { timeline } = useHome();

  const [showPopOver, setShowPopOver] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleRangeSelect = (start: Date | null, end: Date | null) => {
    setRangeStart(start);
    setRangeEnd(end);
  };

  const handleClosePopOver = () => {
    setShowPopOver(false);
    setRangeEnd(null);
    setRangeStart(null);
    setSelectedDate(null);
  };

  return (
    <div className={styles["HomeView"]}>
      <div>{timeline.timeline.type}</div>

      <button
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowPopOver(!showPopOver);
        }}
        style={{
          marginTop: 50,
          padding: 10,
          pointerEvents: showPopOver ? "none" : undefined,
        }}
      >
        Show PopOver
      </button>

      <PopOver isOpen={showPopOver} onClose={handleClosePopOver}>
        <div className={styles["date-piker"]}>
          <DatePicker
            isOpen={showPopOver}
            rangeMode
            onDateSelect={handleDateSelect}
            onRangeSelect={handleRangeSelect}
          />
        </div>
      </PopOver>
    </div>
  );
};

export default HomeView;
