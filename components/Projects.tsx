function Projects() {
  return (
    <div id="projects">
      <h2 className="px-4 mx-auto text-3xl font-bold lg:max-w-4xl">Projects</h2>
      <div className="flex px-4 py-16 space-x-4 lg:space-x-8 snap-x lg:px-96 projectList">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-8 bg-gray-50 snap-center shrink-0">
            <div className="bg-red-200 h-96 aspect-video" />
            <h3 className="my-6 text-4xl font-extrabold opacity-20">
              Project {i}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              odio cupiditate ab atque odit nisi voluptas, ullam excepturi
              consectetur quaerat magnam molestias veritatis suscipit nostrum
              non impedit pariatur placeat praesentium.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
