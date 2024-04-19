import { Link } from "react-router-dom";

export default function Chapter({ chapter, mangaTitle }) {
  function getFormattedDate() {
    const savedDateTime = new Date(chapter.uploadDate);
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
  }

  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex items-center mx-3">
        <p className="w-1 h-1 rounded-full bg-red-500" />
        <Link
          to={`/${mangaTitle.replace(/\s+/g, "-")}/${chapter.chapterNumber}`}
          className="hover:text-primary hover:cursor-pointer ml-3 text-[14px] line-clamp-1 text-ellipsis"
        >
          Chapter {chapter.chapterNumber}{" "}
          {chapter.chapterTitle.length > 0 && `- ${chapter.chapterTitle}`}
        </Link>
      </div>
      <p className="text-dimWhite text-[11px] whitespace-nowrap">
        {getFormattedDate()}
      </p>
    </div>
  );
}
