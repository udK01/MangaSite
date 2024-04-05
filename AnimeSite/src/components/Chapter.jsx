import { Link } from "react-router-dom";

export default function Chapter({ chapter, mangaTitle }) {
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
      <p className="text-dimWhite text-[14px] whitespace-nowrap">4 days ago</p>
    </div>
  );
}
