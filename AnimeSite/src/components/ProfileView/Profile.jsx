import { useContext } from "react";

import UserContext from "../UserContext";
import Separator from "../Separator";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <section className="p-4 w-[826px] h-auto bg-quaternary rounded-sm font-poppins text-white">
      <div>Profile</div>
    </section>
  );
}
