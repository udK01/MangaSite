import { Link } from "react-router-dom";

export default function Chapter({ chapter, mangaTitle }) {
  function getFormattedDate() {
    const savedDateTime = new Date(chapter.uploadDate);
    const currentDateTime = new Date();

    const timeDifference = currentDateTime.getTime() - savedDateTime.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(timeDifference / 3600000);
    const days = Math.floor(timeDifference / 86400000);
    const month = Math.floor(days / 31);
    const year = Math.floor(month / 12);

    // Return highest available option.

    if (year !== 0) {
      return `${year} year${year > 1 ? "s" : ""} ago`;
    } else if (month !== 0) {
      return `${month} month${month > 1 ? "s" : ""} ago`;
    } else if (days !== 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours !== 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes !== 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex items-center mx-3">
        <p className="w-1 h-1 rounded-full bg-red-500" />
        <Link
          to={`/${mangaTitle.replace(/\s+/g, "-")}/${chapter.chapterNumber}`}
          className="hover:text-primary hover:cursor-pointer ml-3 text-[14px] line-clamp-1 text-ellipsis"
        >
          Chapter {chapter.chapterNumber} - {chapter.chapterTitle}
        </Link>
      </div>
      <p className="text-dimWhite text-[11px] whitespace-nowrap">
        {getFormattedDate()}
      </p>
    </div>
  );
}
