import Link from "next/link";
import React from "react";

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <>
      <div className="py-16 px-4 sm:px-14">
        <div className="flex justify-evenly text-sm font-semibold">
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
        </div>
        <div className="w-full text-center py-2 text-sm text-gray-500">
          &#xa9;{fullYear} Trending Task Manager Pvt. Ltd.
        </div>
      </div>
    </>
  );
};

export default Footer;
