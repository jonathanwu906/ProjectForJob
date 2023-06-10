import axios from "axios";

const projects = await axios
  .get("http://localhost:3000/api/projects")
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    return error;
  });



const ProjectList = () => (
  <div className="mt-24  justify-center items-center">
    <div className="mx-24 p-6 space-y-4">
      {projects.map((item, index) => (
        <div
          key={index}
          className="flex bg-white rounded-lg hover:bg-gray-100 overflow-hidden"
        >
          <div className="ml-2 flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src={item.logoURL}
              alt="Logo"
            />
          </div>
          <div className="flex-grow p-4">
            <div className="flex justify-between">
              <a className="font-bold" href={item.link}>
                {item.name}
              </a>
            </div>
            <div className="text-gray-600">{item.description}</div>
            <div className="text-gray-600">{item.keyword}</div>
          </div>
          <div className="p-4 flex items-center">
            <a
              href={item.link}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Explore
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectList;
