import Image from "next/image";
import React from "react";

interface IMinMax {
  token: string;
  max: number;
  min: number;
  avg: string;
  src: string;
}

const MinMax = ({ token, max, min, avg, src }: IMinMax) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <Image width={50} height={50} src={src} alt={`${token} image`} />
      <div>{`$${token} Max: $${max}`}</div>
      <div>{`$${token} Min: $${min}`}</div>
      <div>{`$${token} Average: $${avg}`}</div>
    </div>
  );
};

export default MinMax;
