import axios from "axios";

const jobs = await axios
  .get("http://18.180.45.13:3000/api/allJobs")
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    return error;
  });


const JobsList = () => (
  <div className="mt-24  justify-center items-center">
    <div className="mx-24 p-6 space-y-4">
      {jobs.map((item, index) => (
        <div
          key={index}
          className="flex bg-white rounded-lg hover:bg-gray-100 overflow-hidden"
        >
          <div className="ml-2 flex items-center">
            <img
              className="w-16 h-16 object-cover"
              src={item.companyLogo}
              alt="Logo"
            />
          </div>
          <div className="flex-grow p-4">
            <div className="text-gray-600">{item.company}</div>
            <div className="font-bold text-gray-600 pb-1">{item.title}</div>
            <div className="text-gray-600">{item.location}</div>
          </div>
          <div className="p-4 flex items-center">
            <a
              href={item.postlink}
              className="bg-red-400 hover:bg-red-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              Apply
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default JobsList;
