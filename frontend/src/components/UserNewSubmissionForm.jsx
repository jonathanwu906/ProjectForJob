import { useState } from "react";
import axios from "axios";
import "../styles/formStyle.css";

const UserNewSubmissionForm = () => {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    URL: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    await axios.post("http://18.180.45.13:3000/api/posts", data)

  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  return (
    <div className="mt-12 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Tell us more about this project
          </h2>
          <div>
            <div>
              <label className="text-xl block text-gray-700  font-bold mb-4">
                Logo
              </label>
              <input
                className="mb-4 form-input block w-full rounded-none rounded-t-md"
                type="file"
                name="logo"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-4">
                Name of the project
              </label>
              <input
                className="mb-4 form-input block w-full rounded-none rounded-t-md"
                type="text"
                name="name"
                placeholder="Simply the name of the project"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-4">
                Link to the project
              </label>
              <input
                className="mb-4 form-input block w-full rounded-none rounded-t-md"
                type="url"
                name="URL"
                placeholder="https://example.com"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-4">
                Description of the project
              </label>
              <textarea
                className="mb-4 form-textarea block w-full rounded-none rounded-b-md"
                name="description"
                placeholder="Short description of the project"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-4">
                Tags
              </label>
              <textarea
                className="mb-4 form-textarea block w-full rounded-none rounded-b-md"
                name="keyword"
                placeholder="e.g. React, Node, Express"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 mt-2 ml-2 rounded cursor-pointer float-right"
              onClick={() => window.location.assign("http://18.180.45.13")}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserNewSubmissionForm;
