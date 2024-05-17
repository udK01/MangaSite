import { Link } from "react-router-dom";
import formatter from "../DateFormatter";

export default function Chapter({ manga, chapter }) {
  return (
    <div className="flex items-center justify-between md:mt-3 2xs:mt-4 hover:text-primary pr-3">
      <div className="flex items-center mx-3">
        <p className="min-w-[3px] max-w-[3px] h-8 rounded-full bg-red-500" />
        <Link
          to={`/inspect/chapters?manga=${manga.mangaID}&chapter=${chapter.chapterNumber}`}
          className="hover:text-primary hover:cursor-pointer ml-3 md:text-[14px] 2xs:text-[20px] line-clamp-1 text-ellipsis"
        >
          Chapter {chapter.chapterNumber}{" "}
          {chapter.chapterTitle.length > 0 && `- ${chapter.chapterTitle}`}
        </Link>
      </div>
      <p className="text-dimWhite md:text-[11px] 2xs:text-[17px] whitespace-nowrap">
        {formatter.getFormattedDate(chapter.uploadDate)}
      </p>
    </div>
  );
}
