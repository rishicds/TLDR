"use client"
import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export const CountUpStats = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-24">
      <h2 className="mb-8 text-center text-base text-white sm:text-lg md:mb-16">
        TAKE YOUR UNDERSTANDING TO THE NEXT LEVEL WITH
        <span className="text-red-500 font-bold"> TL;DR</span>
      </h2>

      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={95}
          suffix="%"
          subheading="Accuracy in understanding documents"
        />
        <div className="h-[1px] w-12 bg-indigo-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={700}
          decimals={1}
          suffix="+"
          subheading="Documents scanned"
        />
        <div className="h-[1px] w-12 bg-indigo-100 sm:h-12 sm:w-[1px]" />
        <Stat
          num={7}
          suffix="B+"
          subheading="parameters in our cutting edge model"
        />
      </div>
    </div>
  );
};

interface Props {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading }: Props) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-7xl text-white font-semibold sm:text-6xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-48 text-center text-white">{subheading}</p>
    </div>
  );
};