import React from "react";
import Header from "../header";
import Footer from "../footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className=" min-h-screen">
        <div>
          <Header />
        </div>
        <div className="min-h-screen h-full px-4 sm:px-8 xl:px-44 py-8">{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
