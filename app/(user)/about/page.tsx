import { groq } from "next-sanity";
import { client } from "lib/sanity.client";

import Card from "@/components/Card";
import Header from "@/components/Header";

import mySelfie from "public/me.jpeg";

import Image from "next/image";

// framer motion wrapper
import FramerMotionWrapper from "@/components/FramerMotionWrapper";

const QUERY = groq`
*[_type == 'post' && references(categories, *[title == 'about']._id)] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc)`;

export default async function About() {
  const posts = await client.fetch(QUERY);

  const aws_posts = posts.filter((post) => {
    return post.slug.current.includes("blue");
  });
  const path_posts = posts.filter((post) => {
    return post.slug.current.includes("pathfinder");
  });
  const rndc_posts = posts.filter((post) => {
    return post.slug.current.includes("rndc");
  });

  return (
    <FramerMotionWrapper>
      <Header title="About me" />
      <div className="flex flex-col lg:relative text-white">
        <div className="relative mb-4 lg:mb-12 lg:ml-auto lg:mr-10 w-44 h-44 lg:w-72 lg:h-72">
          <Image
            className="object-cover object-center rounded-full border-4 border-white"
            src={mySelfie}
            alt="Me"
            priority
            sizes="25vw"
            fill
          />
        </div>

        <div className="lg:absolute lg:top-0 3xl:ml-10">
          <h1 className="text-2xl">Hi 👋 My name is Serge</h1>
          <br />
          <ul>
            <li>🌍 I'm based in Chicago</li>
            <li>✉️ You can contact me at sergiupod@outlook.com</li>
            <li>
              🔭 I’m currently working on building web apps using TypeScript,
              Next, and Tailwind css
            </li>
            <li>🧠 I'm hoping to learn more Vim and Rust</li>
          </ul>
          <br />
          <h1 className="text-xl">What I'm Good At</h1>
          <div className="flex flex-row gap-2">
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg"
                width="36"
                height="36"
                alt="TypeScript"
              />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg"
                width="36"
                height="36"
                alt="JavaScript"
              />
            </a>
            <a href="https://www.python.org/" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg"
                width="36"
                height="36"
                alt="Python"
              />
            </a>
            <a
              href="https://www.rust-lang.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/rust-colored-dark.svg"
                width="36"
                height="36"
                alt="Rust"
              />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg"
                width="36"
                height="36"
                alt="HTML5"
              />
            </a>
            <a
              href="https://www.w3.org/TR/CSS/#css"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg"
                width="36"
                height="36"
                alt="CSS3"
              />
            </a>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg"
                width="36"
                height="36"
                alt="React"
              />
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg"
                width="36"
                height="36"
                alt="TailwindCSS"
              />
            </a>
            <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg"
                width="36"
                height="36"
                alt="NodeJS"
              />
            </a>
            <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored-dark.svg"
                width="36"
                height="36"
                alt="Express"
              />
            </a>
            <a
              href="https://firebase.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/firebase-colored.svg"
                width="36"
                height="36"
                alt="Firebase"
              />
            </a>
          </div>
          <br />
          <h1 className="text-xl">Cool Stuff</h1>
          <div className="flex flex-row gap-2">
            <a href="https://github.com/OfficialSerge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-full"
              >
                <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sergiupod/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-full"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-flow-row-dense gap-5 grid-cols-1 md:grid-cols-2 my-20 md:my-10 mx-auto w-full">
          <Card link="LINK" posts={aws_posts} />
          <h1 className="text-center text-2xl md:my-4 3xl:w-10/12">A Blue/Green Deployment</h1>
          <p className="text-center mx-4 lg:text-xl md:mb-20 3xl:w-10/12">
            An AWS CloudFront distribution serving two versions of a static
            website. My intent was to utilize the edge caching capabilities of CloudFront in such a way
            that would allow for a low latency, blue/green deployment experience. The combination of a
            custom session cookie and Lambda Edge functions allows CloudFront to route traffic between
            main and test versions of a website while ensuring sticky user sessions.
          </p>
        </div>

        <div className="grid grid-flow-row-dense gap-5 grid-cols-1 md:grid-cols-2 my-20 md:my-10 w-full">
          <Card link="LINK" posts={path_posts} />
          <h1 className="text-center text-2xl md:my-4 3xl:w-10/12">Navigate Cities and Mazes</h1>
          <p className="text-center mx-4 lg:text-xl md:mb-24 3xl:w-10/12">
            This project was something I did soon after I learned how graph algorithms worked. I wanted to
            do a little more than just make another pathfinder, so I learned how to generate Perlin Noise
            and was able to use it to simulate traffic. Users can toggle on and off traffic, select a layout
            and one of 5 different graph algorithms to better visualize how they navigate mazes and cities.
          </p>
        </div>


        <div className="grid grid-flow-row-dense gap-5 grid-cols-1 md:grid-cols-2 my-20 md:my-10 w-full">
          <Card link="LINK" posts={rndc_posts} />
          <h1 className="text-center text-2xl md:my-4 3xl:w-10/12">Small Business Website</h1>
          <p className="text-center mx-4 lg:text-xl md:mb-24 3xl:w-10/12">
            Working with a local small business, I designed a fun, interactive commercial website using React
            and Three.js. The project required me to step out of my comfort zone and learn how to program
            vertex and fragment shaders with Three.js as well as intermediate between the small business
            owners and a graphic designer to properly develop and animate 3D assets for the website.
            The resulting experience was engaging and helped the business stand out.
          </p>
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
