export default function DropDown({
  options,
  dropdownType,
  type,
  setType,
  status,
  setStatus,
}) {
  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  return (
    <div
      className={`w-[350px] h-[34px] px-3 mt-2 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`}
    >
      <select
        id="dropdown"
        value={dropdownType === "type" ? type : status}
        onChange={
          dropdownType === "type" ? handleTypeChange : handleStatusChange
        }
        className="bg-transparent w-full h-full border-quaternary focus:bg-secondary focus:outline-none"
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
