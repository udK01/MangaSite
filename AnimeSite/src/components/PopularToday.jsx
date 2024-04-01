import PopularTodayCard from "./PopularTodayCard";
import Separator from "./Separator";

export default function PopularToday({ comics }) {
  return (
    <section className="h-[450px]">
      <div className="w-[832px] h-[396px] flex flex-col bg-quaternary p-2 rounded-sm mt-10">
        <p className="font-poppins text-white ml-1 mt-1">Popular Today</p>
        <Separator />
        <div className="flex w-full justify-evenly">
          {comics
            ? comics.map((manga) => (
                <PopularTodayCard key={manga.mangaID} manga={manga} />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
