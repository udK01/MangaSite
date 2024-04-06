export default function DropDown({
  options,
  dropdownType,
  type,
  setType,
  status,
  setStatus,
  className = ``,
}) {
  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

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
        value={dropdownType === "type" ? type : status}
        onChange={
          dropdownType === "type" ? handleTypeChange : handleStatusChange
        }
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
