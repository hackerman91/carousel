"use client";

import { useEffect, useState } from "react";

interface CarouselProps {
  items: string[];
  interval: number;
}

interface CarouselState {
  index: number;
  isPaused: boolean;
}

const items = ["0", "1", "2"];
const interval = 3000;

export default function Home() {
  const [state, setState] = useState<CarouselState>({
    index: 0,
    isPaused: false,
  });

  const prev = () => {
    setState((prevState) => ({
      ...prevState,
      index: (prevState.index - 1) % items.length,
    }));
  };

  const next = () => {
    setState((prevState) => ({
      ...prevState,
      index: (prevState.index + 1) % items.length,
    }));
  };

  const toggle = () => {
    setState((prevState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  };

  useEffect(() => {
    if (state.isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [state.isPaused, interval]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div
        className="flex w-80 h-40 relative overflow-hidden"
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        {items.map((item, index) => {
          const positionClass =
            index === state.index
              ? "translate-x-0"
              : index < state.index
              ? "-translate-x-full"
              : "translate-x-full";
          return (
            <div
              key={index}
              className={`absolute top-0 h-full w-80 justify-center flex items-center text-2xl font-bold bg-slate-500 transform transition-transform duration-300 ${positionClass}`}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div
        className="p-4 bottom-0 z-10 items-center flex justify-between w-80"
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        <button onClick={prev}>prev</button>
        <button onClick={toggle}>paused</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
}
