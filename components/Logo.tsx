import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="hidden lg:flex">
      <Image
        src={"/cloud.png"}
        alt="logo"
        width={52}
        height={52}
        className=""
      />
      <span className=" p-4 w-full">
        CLOUDUP
      </span>
    </div>
  );
};

export default Logo;
