"use client";

import Carousel from "@/components/Carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselProps {
  index: number;
}

export default function Home() {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (left) {
      setCurrentIndex((prev) => {
        if (prev <= 0) {
          return 2;
        }

        return prev - 1;
      });
    }

    if (right) {
      setCurrentIndex((prev) => {
        if (prev >= 2) {
          return 0;
        }

        return prev + 1;
      });
    }

    return () => {
      setLeft(false);
      setRight(false);
    };
  }, [left, right, currentIndex]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex w-80 h-40 relative overflow-hidden">
        {[0, 1, 2].map((index) => {
          const positionClass =
            index === currentIndex
              ? "translate-x-0"
              : index < currentIndex
              ? "-translate-x-full"
              : "translate-x-full";

          return (
            <div
              key={index}
              className={`item absolute top-0 h-full w-full transform transition-transform bg-slate-500 duration-300 ${positionClass}`}
            >
              <span className="w-full h-full flex items-center justify-center text-2xl font-bold">
                {index}
              </span>
            </div>
          );
        })}
      </div>
      <div className="absolute z-10 top-1/2 items-center flex justify-between w-80">
        <button onClick={() => setLeft(true)}>prev</button>
        <button onClick={() => setRight(true)}>next</button>
      </div>
    </div>
  );
}
