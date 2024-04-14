export default function DropDown({ options, value, func, className = `` }) {
  return (
    <div
      className={`${
        className === ""
          ? "w-[350px] px-3 mt-2 rounded-sm border-2 border-quaternary"
          : className
      } h-[34px] bg-secondary text-white hover:cursor-pointer hover:text-primary`}
    >
      <select
        id="dropdown"
        value={value}
        onChange={(e) => func(e.target.value)}
        className={`w-full h-full bg-transparent border-quaternary focus:bg-secondary focus:outline-none hover:cursor-pointer`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
