export default function Chapter() {
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex items-center mx-3">
        <p className="w-1 h-1 rounded-full bg-red-500" />
        <p className="hover:text-primary hover:cursor-pointer ml-3 text-[14px]">
          Chapter 20
        </p>
      </div>
      <p className="text-dimWhite text-[14px]">4 days ago</p>
    </div>
  );
}
