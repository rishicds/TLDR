import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Team = () => {
  return (
    <div className="px-4 py-24 bg-black mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-2 py-8 mb-2 text-xl font-semibold tracking-wider text-teal-300 uppercase rounded-full bg-teal-accent-400">
            Core Team
          </p>
        </div>
        <h2 className="max-w-lg mb-4 font-sans text-3xl font-bold leading-none tracking-tight text-gray-300 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="1d4040f3-9f3e-4ac7-b117-7d4009658ced"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Meet</span>
          </span>{' '}
          the team of unprofessionals
        </h2>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://media.licdn.com/dms/image/D5603AQFcc8_vrp3w-Q/profile-displayphoto-shrink_800_800/0/1714159671557?e=1725494400&v=beta&t=dLUd-g0ov1Qoqh8QjZsklxDMCh7974KEw8eOL_TSUc4"
              alt="Person"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-1 text-lg font-bold text-gray-100">
                Rishi Paul
              </p>
              <p className="mb-4 text-xs text-gray-100">Professional Procastinator</p>
              <p className="mb-4 text-xs tracking-wide text-gray-400">
                Life is pain highness. Anyone who says differently is selling something.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <a
                  href="https://github.com/rishicds"
                  className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rishi-paul04/"
                  className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://res.cloudinary.com/dff97ky68/image/upload/v1714333558/WhatsApp_Image_2024-04-29_at_12.31.12_AM_ohouce.jpg"
              alt="Person"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-1 text-lg font-bold text-gray-100">
                Aditi Ghosh
              </p>
              <p className="mb-4 text-xs text-gray-100">Amar Pet Kharap</p>
              <p className="mb-4 text-xs tracking-wide text-gray-400">
                Good singer
              </p>
              <div className="flex items-center justify-center space-x-3">
                <a
                  href="https://github.com/GhoshAditi"
                  className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aditighosh2005/"
                  className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
