export default function SideInfo({ label, value, isHoverable = false }) {
  return (
    <div
      className={`flex justify-between items-center w-full bg-quinary p-1 px-2 rounded-md text-dimWhite mt-2`}
    >
      <div>{label}</div>
      <div
        className={
          isHoverable
            ? "text-white hover:text-primary hover:cursor-pointer"
            : ""
        }
      >
        {value}
      </div>
    </div>
  );
}
