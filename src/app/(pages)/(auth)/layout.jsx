import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full min-h-screen h-full flex justify-center items-center p-4">
        {children}
      </div>
    </>
  );
};

export default Layout;
