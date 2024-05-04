import Separator from "../Separator";

export default function Comments() {
  return (
    <section className="w-full bg-quaternary h-auto mt-10 p-4 font-poppins text-white">
      <div>Comments</div>
      <Separator />
      <textarea
        placeholder="Share your thoughts..."
        className="w-full min-h-[50px] max-h-[300px] border-2 border-primary rounded-md bg-secondary p-[10px]"
      />
      <div className="w-full flex justify-end">
        <button className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md">
          Post
        </button>
      </div>
    </section>
  );
}
