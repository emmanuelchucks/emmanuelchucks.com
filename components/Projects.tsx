import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

function Projects() {
  return (
    <div id="projects">
      <h2 className="container px-4 mx-auto text-3xl font-bold lg:max-w-4xl">
        Projects
      </h2>
      <div className="container px-4 mx-auto lg:max-w-7xl">
        <div className="grid mt-16 gap-y-24 md:grid-cols-2 md:gap-x-8 xl:gap-x-16 xl:px-16">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <Image alt="" src={placeholder} />
              <h3 className="my-6 text-4xl font-extrabold text-gray-400">
                Project {i}
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                odio cupiditate ab atque odit nisi voluptas, ullam excepturi
                consectetur quaerat magnam molestias veritatis suscipit nostrum
                non impedit pariatur placeat praesentium.
              </p>
              <button className="px-4 py-2 mt-8 font-semibold text-gray-900 uppercase bg-gray-200 rounded-md">
                More info &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
