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
        <div className="min-h-screen h-full">{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
