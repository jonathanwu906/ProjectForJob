import "./App.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div className="flex">
        <div className="font-sans items-center inline-flex">
          <Input
            className="border border-gray-300 h-10 w-56 rounded-md text-gray-600"
            placeholder="Search for projects or jobs"
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />
          <div className="flex text-gray-600 text-base font-normal box-border cursor-pointer">
            <div className="ml-32">
              <a className="font-normal">Projects</a>
            </div>
            <div className="ml-32">
              <a className="font-normal">Jobs</a>
            </div>
            <div className="ml-32">
              <a className="font-normal">About</a>
            </div>
          </div>
          <div className="ml-32 items-center flex-row flex box-border font-sans justify-end">
            <div>
              <a className="font-normal text-base line-height-24 text-pink-600 cursor-pointer">
                How to post a project?
              </a>
            </div>
            <div>
              <div className="font-normal text-base line-height-24 text-gray-600 block ml-32 cursor-pointer">
                Sign in
              </div>
            </div>
            <div>
              <button className="bg-red-600 rounded-md text-white text-sm font-semibold py-2 px-4 relative cursor-pointer border-transparent font-sans ml-32">
                <div className="">Sign up</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
