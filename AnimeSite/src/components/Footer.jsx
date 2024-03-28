import { footer_text } from "../constants";
import { logo } from "../assets";

export default function Footer() {
  return (
    <section className="flex flex-col w-full mt-10 text-white">
      <div className="flex w-full justify-center items-center font-poppins bg-primary">
        {footer_text.map((footT, i) => (
          <p
            key={footT.id}
            className={`${
              i !== footT.length - 1 ? "ml-5" : ""
            } hover:bg-secondary hover:cursor-pointer p-2 transition-all duration-300`}
          >
            {footT.title}
          </p>
        ))}
      </div>
      <div className="h-[100px] flex justify-center items-center bg-quaternary">
        <img src={logo} className="w-[50px] h-[50px] object-contain" />
      </div>
    </section>
  );
}
