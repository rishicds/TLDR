import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const BasicFAQ = () => {
  return (
    <div className="px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold">
          Frequently asked questions
        </h3>
        <Question title="Why should I buy TL;DR Premium?" defaultOpen>
          <p>
            So that I can buy a plate of chowmein every month
          </p>
        </Question>
        <Question title="Will Aditi get a cut from subscriptions?">
          <p>
            No
          </p>
        </Question>
        <Question title="How many licks does it take to get to the center of a tootsie pop?">
          <p>
            Lemme know
          </p>
        </Question>
        <Question title="Is CSE dead?">
          <p>
            Yes
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: JSX.Element;
  defaultOpen?: boolean;
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className=""
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(255, 255, 255, 1)",
            },
            closed: {
              color: "rgba(255, 255, 255, 1)",
            },
          }}
          className="text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "rgb(255, 255, 255)",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden"
      >
        <p ref={ref}>{children}</p>
      </motion.div>
    </motion.div>
  );
};

export default BasicFAQ;