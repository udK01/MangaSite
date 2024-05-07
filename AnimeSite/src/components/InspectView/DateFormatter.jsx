const DateFormatter = {
  getFormattedDate: (uploadDate) => {
    const savedDateTime = new Date(uploadDate);
    const currentDateTime = new Date();

    const timeDifference = (currentDateTime - savedDateTime) / 1000; // Difference in seconds

    const units = [
      { value: Math.floor(timeDifference / 31536000), label: "year" },
      { value: Math.floor(timeDifference / 2592000), label: "month" },
      { value: Math.floor(timeDifference / 86400), label: "day" },
      { value: Math.floor(timeDifference / 3600), label: "hour" },
      { value: Math.floor(timeDifference / 60), label: "minute" },
      { value: Math.floor(timeDifference), label: "second" },
    ];

    for (const { value, label } of units) {
      if (value !== 0) {
        return `${value} ${label}${value > 1 ? "s" : ""} ago`;
      }
    }
  },
};

export default DateFormatter;
