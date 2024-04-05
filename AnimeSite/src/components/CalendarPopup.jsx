import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CalendarPopup({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    return (
      <div className="flex justify-between px-4 py-2 border border-none bg-secondary text-white font-poppins">
        <button onClick={decreaseMonth} className="text-white">
          &lt;
        </button>
        <span>
          {date.toLocaleDateString("en-UK", { month: "long", year: "numeric" })}
        </span>
        <button onClick={increaseMonth} className="text-white">
          &gt;
        </button>
      </div>
    );
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
      className={`w-[350px] min-h-[34px] px-4 mt-2 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`}
      calendarClassName="bg-quaternary border border-primary "
      dayClassName={(date) =>
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
          ? "text-white bg-red-500 hover:bg-primary rounded-md"
          : "text-white hover:bg-primary"
      }
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <CustomHeader
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
    />
  );
}

export default CalendarPopup;
