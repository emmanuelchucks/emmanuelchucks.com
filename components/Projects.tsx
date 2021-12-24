import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

function Projects() {
  return (
    <div id="projects">
      <h2 className="px-4 mx-auto text-3xl font-bold lg:max-w-4xl">Projects</h2>
      <div className="flex px-4 space-x-4 lg:space-x-8 snap-x lg:px-16 xl:px-52 2xl:px-96 projectList">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="my-16 snap-center w-[min(85vw,_560px)] shrink-0"
          >
            <Image alt="" src={placeholder} />
            <h3 className="my-6 text-5xl font-extrabold opacity-20">
              Project {i}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              odio cupiditate ab atque odit nisi voluptas, ullam excepturi
              consectetur quaerat magnam molestias veritatis suscipit nostrum
              non impedit pariatur placeat praesentium.
            </p>
            <button className="px-2 py-1 mt-8 uppercase">More info →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
