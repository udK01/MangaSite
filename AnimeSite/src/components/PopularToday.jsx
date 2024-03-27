import PopularTodayCard from "./PopularTodayCard";
import Separator from "./Separator";

export default function PopularToday() {
  return (
    <section>
      <div className="w-[832px] h-[336px] flex flex-col bg-quaternary p-2 rounded-md mt-10">
        <p className="font-poppins text-white ml-1 mt-1">Popular Today</p>
        <Separator />
        <div className="flex w-full justify-evenly">
          <PopularTodayCard />
          <PopularTodayCard />
          <PopularTodayCard />
          <PopularTodayCard />
          <PopularTodayCard />
        </div>
      </div>
    </section>
  );
}
