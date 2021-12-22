function Projects() {
  return (
    <div id="projects">
      <h2 className="px-4 mx-auto text-3xl font-bold lg:max-w-4xl">Projects</h2>
      <div className="flex my-16 space-x-4 overflow-x-auto snap-x scroll-pl-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-center space-y-4 bg-gray-200 min-w-[20rem] h-96 snap-start"
          >
            Project {i}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
