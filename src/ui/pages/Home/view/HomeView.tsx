import { useState } from "react";
import { useHome } from "./useHome";
import { DatePicker } from "../../../components/date-picker/date-picker";
import styles from "./HomeView.module.scss";

const HomeView = () => {
  const { timeline } = useHome();
 
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  return (
    <div className={styles["HomeView"]}>
      {timeline.timeline.type}

      <div>
        <button
          style={{ padding: "10px" }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          show date
        </button>
      </div>

      <DatePicker
        rangeMode
        onDateSelect={handleDateSelect}
        onRangeSelect={handleRangeSelect}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />

      <div style={{ height: 1500 }}></div>
    </div>
  );
};

export default HomeView;
