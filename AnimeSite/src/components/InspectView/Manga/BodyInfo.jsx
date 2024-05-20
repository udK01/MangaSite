export default function BodyInfo({
  lLabel,
  lValue,
  rLabel,
  rValue,
  editable = true,
  editing,
}) {
  return (
    <div className="w-full flex text-[14px] mt-4">
      <div className="flex flex-col flex-1 flex-grow">
        <div>{lLabel}</div>
        {editable && editing ? (
          <input
            id={lLabel}
            placeholder={lValue}
            className="md:w-[250px] 2xs:w-full min-h-[34px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary"
          />
        ) : (
          <div className="text-dimWhite">{lValue}</div>
        )}
      </div>
      <div className="flex flex-col flex-1 flex-grow">
        <div>{rLabel}</div>
        {rValue.length > 0 && editable && editing ? (
          <input
            id={rLabel}
            placeholder={rValue}
            className="md:w-[250px] 2xs:w-full min-h-[34px] px-4 mt-${mt} rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary"
          />
        ) : (
          <div className="text-dimWhite">{rValue}</div>
        )}
      </div>
    </div>
  );
}
