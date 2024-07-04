"use client"
import { FiFile, FiMonitor, FiPaperclip, FiSave, FiSearch } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

const TabsFeatures = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="p-4">
      <div className="mx-auto max-w-5xl">
        <Tabs selected={selected} setSelected={setSelected} />

        <AnimatePresence mode="wait">
          {FEATURES.map((tab, index) => {
            return selected === index ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={index}
              >
                <tab.Feature />
              </motion.div>
            ) : undefined;
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface TabsProps {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const Tabs = ({ selected, setSelected }: TabsProps) => {
  return (
    <div className="flex overflow-x-scroll">
      {FEATURES.map((tab, index) => {
        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            Icon={tab.Icon}
            title={tab.title}
            tabNum={index}
          />
        );
      })}
    </div>
  );
};

interface TabProps {
  selected: boolean;
  Icon: IconType;
  title: string;
  setSelected: Function;
  tabNum: number;
}

const Tab = ({ selected, Icon, title, setSelected, tabNum }: TabProps) => {
  return (
    <div className="relative w-full">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full flex-row items-center justify-center gap-4 border-b-4 border-slate-200 bg-white p-6 transition-colors hover:bg-slate-100 md:flex-col"
      >
        <span
          className={`rounded-lg bg-gradient-to-br from-indigo-700 from-10% to-indigo-500 p-3 text-2xl text-white shadow-indigo-400 transition-all duration-300 ${
            selected
              ? "scale-100 opacity-100 shadow-lg"
              : "scale-90 opacity-50 shadow"
          }`}
        >
          <Icon />
        </span>
        <span
          className={`min-w-[150px] max-w-[200px] text-start text-xs text-slate-600 transition-opacity md:text-center ${
            selected ? "opacity-100" : "opacity-50"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="tabs-features-underline"
          className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-indigo-600"
        />
      )}
    </div>
  );
};

interface ExampleFeatureProps {
  imageUrl: string;
}

const ExampleFeature = ({ imageUrl }: ExampleFeatureProps) => (
  <div className="w-full px-0 py-8 md:px-8">
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl overflow-hidden">
      <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="relative h-full w-full">
        <Image
          src={imageUrl}
          alt="Feature demonstration"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  </div>
);

export default TabsFeatures;

const FEATURES = [
  {
    title: "Upload your Document",
    Icon: FiFile,
    Feature: () => <ExampleFeature imageUrl="https://res.cloudinary.com/dff97ky68/image/upload/v1720081412/Screenshot_2024-07-04_134930_akrgv7.png" />,
  },
  {
    title: "View your Document",
    Icon: FiPaperclip,
    Feature: () => <ExampleFeature imageUrl="https://res.cloudinary.com/dff97ky68/image/upload/v1720081411/Screenshot_2024-07-04_134956_iqkjge.png" />,
  },
  {
    title: "Ask Your Questions",
    Icon: FiSave,
    Feature: () => <ExampleFeature imageUrl="https://res.cloudinary.com/dff97ky68/image/upload/v1720081411/Screenshot_2024-07-04_135154_sfq3gx.png" />,
  },
];