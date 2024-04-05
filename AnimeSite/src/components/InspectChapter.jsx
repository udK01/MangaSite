export default function InspectChapter({ chapter }) {
  return (
    <section className="w-[100px] h-[100px] bg-primary text-white">
      {chapter.chapterID} - {chapter.chapterTitle}
    </section>
  );
}
