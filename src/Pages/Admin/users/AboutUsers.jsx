import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, Ban, LayoutGrid, List } from "lucide-react";
import Pagination from "../../../components/Pagination";
import Select from "react-select";
import { customStyles } from "../../../utils/customStyle";
import UsersList from "./UsersList";
import CreateUserForm from "./CreateUserForm";
import UsersTable from "./UsersTable";
import axiosPrivate from "../../../axiosPrivate";

const AboutUsers = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [viewMode, setViewMode] = useState("list_view");
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "all", label: "All" },
    { value: "users", label: "Users" },
    { value: "admin", label: "Admin" },
  ];

  useEffect(() => {
    setSelectedOption({ value: "all", label: "All" });
  }, []);

  return (
    <div className="w-full overflow-y-auto h-[88vh] urbanist">
      <h2 className="text-[1.3em] font-semibold ps-5 mt-5 mb-2 pb-2 border-b border-b-gray-300">
        About Users
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-6 px-5 pt-3">
        <button
          className={`pb-0.5 urbanist font-semibold text-[0.9em] cursor-pointer outline-none ${
            activeTab === "list"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Users List
        </button>
        <button
          className={`pb-0.5 urbanist text-lg font-semibold text-[0.9em] cursor-pointer outline-none ${
            activeTab === "create"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create User
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "list" && (
          <>
            {/* search */}
            <div className="flex items-center justify-between px-6 mb-5 text-[0.9em]">
              <div className="">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  isSearchable={false}
                  className="w-[200px]"
                  styles={customStyles}
                />
              </div>
              <div className="flex gap-2">
                <div
                  className={`bg-gray-100 flex items-center justify-center p-2 cursor-pointer group`}
                  onClick={() => setViewMode("list_view")}
                >
                  <List
                    size={15}
                    className={`group-hover:text-black ${
                      viewMode === "list_view" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>
                <div
                  className={`bg-gray-100 flex items-center justify-center p-2 cursor-pointer group`}
                  onClick={() => setViewMode("grid_view")}
                >
                  <LayoutGrid
                    size={15}
                    className={`group-hover:text-black ${
                      viewMode === "grid_view" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
            {viewMode === "grid_view" ? (
              <UsersList selectedOption={selectedOption} />
            ) : (
              <UsersTable selectedOption={selectedOption} />
            )}
          </>
        )}
      </div>
      {activeTab === "create" && (
        <div className="flex  justify-center h-auto">
          <CreateUserForm />
        </div>
      )}
    </div>
  );
};

export default AboutUsers;
