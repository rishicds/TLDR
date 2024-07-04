"use client"
import { motion } from "framer-motion";
import Link from 'next/link';

const SquishyPricing = () => {
  return (
    <section className="">
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-4">
      <Card
          label="Trial"
          monthlyPrice="Free"
          description="Use our platform for free and get access to basic features"
          cta="Sign up"
          ctaLink="/sign-up"
          background="bg-purple-500"
          BGComponent={BackgroundB}
        />
        <Card
          label="Student"
          monthlyPrice="59/Month"
          description="For people who want to pass the exam and get access to upcoming premium features"
          cta="Purchase"
          ctaLink="https://rzp.io/i/ajEXoHJmzH"
          background="bg-indigo-500"
          BGComponent={BackgroundA}
        />
       
        <Card
          label="Enterprise"
          monthlyPrice="XXX/Month"
          description="For large enterprises looking to outsource their conversion rate optimization"
          cta="Coming Soon"
          ctaLink="/book-call"
          background="bg-pink-500"
          BGComponent={BackgroundC}
        />
      </div>
    </section>
  );
};

interface CardProps {
  label: string;
  monthlyPrice: string;
  description: string;
  cta: string;
  ctaLink: string;
  background: string;
  BGComponent: () => JSX.Element;
}

const Card = ({
  label,
  monthlyPrice,
  description,
  cta,
  ctaLink,
  background,
  BGComponent,
}: CardProps) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className={`relative h-96 w-80 shrink-0 overflow-hidden rounded-xl p-8 ${background}`}
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white backdrop-blur">
          {label}
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
        >
          ₹{monthlyPrice}
          <br />
        </motion.span>
        <p className="text-lg">{description}</p>
      </div>
      <Link href={ctaLink} className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
        {cta}
      </Link>
      <BGComponent />
    </motion.div>
  );
};

const BackgroundA = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

const BackgroundB = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <motion.rect
        x="14"
        width="153"
        height="153"
        rx="15"
        fill="#262626"
        variants={{
          hover: {
            y: 219,
            rotate: "90deg",
            scaleX: 2,
          },
        }}
        style={{ y: 12 }}
        transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
      />
      <motion.rect
        x="155"
        width="153"
        height="153"
        rx="15"
        fill="#262626"
        variants={{
          hover: {
            y: 12,
            rotate: "90deg",
            scaleX: 2,
          },
        }}
        style={{ y: 219 }}
        transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
      />
    </motion.svg>
  );
};

const BackgroundC = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={{
        hover: {
          scale: 1.25,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <motion.path
        variants={{
          hover: {
            y: -50,
          },
        }}
        transition={{ delay: 0.3, duration: 1, ease: "backInOut" }}
        d="M148.893 157.531C154.751 151.673 164.249 151.673 170.107 157.531L267.393 254.818C273.251 260.676 273.251 270.173 267.393 276.031L218.75 324.674C186.027 357.397 132.973 357.397 100.25 324.674L51.6068 276.031C45.7489 270.173 45.7489 260.676 51.6068 254.818L148.893 157.531Z"
        fill="#262626"
      />
      <motion.path
        variants={{
          hover: {
            y: -50,
          },
        }}
        transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
        d="M148.893 99.069C154.751 93.2111 164.249 93.2111 170.107 99.069L267.393 196.356C273.251 202.213 273.251 211.711 267.393 217.569L218.75 266.212C186.027 298.935 132.973 298.935 100.25 266.212L51.6068 217.569C45.7489 211.711 45.7489 202.213 51.6068 196.356L148.893 99.069Z"
        fill="#262626"
      />
      <motion.path
        variants={{
          hover: {
            y: -50,
          },
        }}
        transition={{ delay: 0.1, duration: 1, ease: "backInOut" }}
        d="M148.893 40.6066C154.751 34.7487 164.249 34.7487 170.107 40.6066L267.393 137.893C273.251 143.751 273.251 153.249 267.393 159.106L218.75 207.75C186.027 240.473 132.973 240.473 100.25 207.75L51.6068 159.106C45.7489 153.249 45.7489 143.751 51.6068 137.893L148.893 40.6066Z"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default SquishyPricing;