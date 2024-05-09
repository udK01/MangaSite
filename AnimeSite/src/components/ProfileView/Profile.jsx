import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";
import Separator from "../Separator";
import axios from "axios";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [profileOwner, setProfileOwner] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("user");
    axios
      .get(`/api/users/${username}`)
      .then((response) => setProfileOwner(response.data))
      .catch((error) => console.error(`Failed to get user:`, error));
  }, [location.search]);

  return (
    <section className="w-[826px] h-aut rounded-sm font-poppins text-white">
      <div className="flex justify-between text-[14px] w-full bg-quaternary rounded-sm text-white p-2">
        <div className="flex">
          <Link
            to={"/"}
            className="hover:text-primary mr-2 transition-colors duration-300"
          >
            Home
          </Link>
          <p className="transition-colors duration-300">&gt;</p>
          <Link
            to={`/profile`}
            className="hover:text-primary mx-2 transition-colors duration-300"
          >
            {profileOwner && profileOwner[0].username}
          </Link>
        </div>
      </div>
    </section>
  );
}
