import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-300 p-2 flex flex-row items-center justify-evenly">
      <Image src={"/timewave_clock.jpeg"} width={50} height={50} alt="clock" />

      <h1 className="font-mono font-bold">TimeWave</h1>
      <Image src={"/time_logo.png"} width={50} height={50} alt="time" />
    </header>
  );
};

export default Header;
