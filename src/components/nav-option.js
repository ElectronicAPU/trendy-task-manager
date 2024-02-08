import { navAdminArray, navArray } from "@/array/navArray";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavOption = () => {
  const { user } = useAppContext();
  const pathname = usePathname();
  return (
    <>
      {user?.isAdmin ? (
        <>
          {navAdminArray.map((nav, id) => (
            <Link
              href={nav.route}
              key={id}
              className={`font-semibold hover:underline hover:text-indigo-700 tracking-wide text-sm ${
                pathname == nav.route ? "text-indigo-500 underline" : ""
              }`}
            >
              {nav.title}
            </Link>
          ))}
        </>
      ) : (
        <>
          {navArray.map((nav, id) => (
            <Link
              href={nav.route}
              key={id}
              className={`font-semibold hover:underline hover:text-indigo-700 tracking-wide text-sm ${
                pathname == nav.route ? "text-indigo-500 underline" : ""
              }`}
            >
              {nav.title}
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default NavOption;
