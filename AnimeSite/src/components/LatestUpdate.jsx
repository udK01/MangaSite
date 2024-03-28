import Separator from "./Separator";
import Card from "./Card";

export default function LatestUpdate() {
  return (
    <section className="w-full mt-5 bg-quaternary p-2 rounded-sm text-white font-poppins">
      <div className="flex justify-between">
        <p className="ml-1 mt-1">Latest Update</p>
        <button className="bg-primary text-[8px] px-2">VIEW ALL</button>
      </div>
      <Separator />
      <ul>
        {[...Array(25).keys()].map((_, i) => (
          <li key={i} className="flex flex-col">
            <div className="flex justify-between">
              <Card />
              <Card />
            </div>
            <Separator />
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <button className=" px-6 py-1 mb-2 bg-primary">Next &gt;</button>
      </div>
    </section>
  );
}
