import Separator from "../Separator";
import Card from "./Card";

export default function LatestUpdate({ comics }) {
  return (
    <section className="w-full bg-quaternary p-2 rounded-sm text-white font-poppins">
      <div className="flex justify-between">
        <p className="ml-1 mt-1">Latest Update</p>
        <button className="bg-primary text-[8px] px-2">VIEW ALL</button>
      </div>
      <Separator />
      <ul>
        {comics
          ? comics.map((manga, index) =>
              index % 2 === 0 ? (
                <li key={manga.mangaID} className="flex flex-col">
                  <div className="flex justify-between">
                    <Card manga={manga} />
                    {comics.length > index + 1 ? (
                      <Card manga={comics[index + 1]} />
                    ) : null}
                  </div>
                  {comics.length > index + 1 ? <Separator /> : null}
                </li>
              ) : null
            )
          : null}
      </ul>
      <div className="flex justify-center items-center">
        <button className=" px-6 py-1 mb-2 bg-primary">Next &gt;</button>
      </div>
    </section>
  );
}
