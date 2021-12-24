function Projects() {
  return (
    <div id="projects">
      <h2 className="px-4 mx-auto text-3xl font-bold lg:max-w-4xl">Projects</h2>
      <div
        className="flex px-4 my-16 space-x-4 snap-x lg:px-96"
        id="projectList"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-gray-200 min-w-[20rem] h-96 snap-center"
          >
            Project {i}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
