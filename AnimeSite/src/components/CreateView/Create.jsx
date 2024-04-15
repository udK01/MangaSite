import { useState } from "react";
import AddComic from "./AddComic";
import CreateTag from "./CreateTag";
import DeleteTag from "./DeleteTag";

export default function Create() {
  const [refresh, setRefresh] = useState(false);

  function customInputField(type, placeholder, value, func, mt = 0) {
    const commonProps = {
      placeholder: placeholder,
      value: value,
      onChange: (e) => func(e.target.value),
      onFocus: (e) => {
        if (e.target.value === placeholder) {
          func("");
        }
      },
      onBlur: (e) => {
        if (e.target.value === "") {
          func(placeholder);
        }
      },
      className: `w-[350px] min-h-[34px] px-4 mt-${mt} rounded-sm border-2 border-quaternary bg-secondary text-white hover:cursor-pointer hover:text-primary`,
    };

    return (
      <>
        {placeholder === "Description" ? (
          <textarea
            {...commonProps}
            style={{ height: "34px", maxHeight: "400px", lineHeight: "30px" }}
          />
        ) : (
          <input {...commonProps} type={type} />
        )}
      </>
    );
  }

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <section className="w-[826px] font-poppins">
      <AddComic customInputField={customInputField} />
      <CreateTag
        customInputField={customInputField}
        toggleRefresh={toggleRefresh}
      />
      <DeleteTag refresh={refresh} toggleRefresh={toggleRefresh} />
    </section>
  );
}
