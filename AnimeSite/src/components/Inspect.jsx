import { Link } from "react-router-dom";

export default function Inspect({ manga }) {
  return (
    <section className="w-[826px] h-auto font-poppins">
      <div className="flex text-[14px] w-full bg-quaternary rounded-sm text-white p-2">
        <Link
          to={"/"}
          className="hover:text-primary mr-2 transition-colors duration-300"
        >
          Home
        </Link>
        <p className="transition-colors duration-300">&gt;</p>
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="hover:text-primary mx-2 transition-colors duration-300"
        >
          {manga.mangaTitle}
        </Link>
      </div>
    </section>
  );
}
