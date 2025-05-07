import { ChevronRight, Eye, EyeOff, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [currTab, setCurrTab] = useState(0);

  return (
    <div className="mt-16 flex">
      {/* left */}
      <div className="p-10 w-1/3">
        <div className="border border-gray-300 w-fit">
          <div
            className={`${
              currTab === 0 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-fit ps-4 py-4 pe-2 cursor-pointer`}
            onClick={() => setCurrTab(0)}
          >
            <span className="me-6 tracking-widest">PERSONAL INFORMATION</span>
            <ChevronRight />
          </div>
          {/* <div
            className={`${
              currTab === 1 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
            onClick={() => setCurrTab(1)}
          >
            <span className="me-6 tracking-widest">ADDRESS BOOK</span>
            <ChevronRight />
          </div> */}
          <div
            className={`${
              currTab === 2 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
            onClick={() => setCurrTab(2)}
          >
            <span className="me-6 tracking-widest">ORDERS</span>
            <ChevronRight />
          </div>
          <div
            className={`${
              currTab === 3 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
            onClick={() => setCurrTab(3)}
          >
            <span className="me-6 tracking-widest">WISHLIST</span>
            <ChevronRight />
          </div>
          <div
            className={`border border-gray-300 hover:bg-red-700 hover:text-white flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
          >
            <span className="me-6 tracking-widest">LOGOUT</span>
            <ChevronRight className="hidden" />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="p-10 w-full border border-gray-300 mt-10 me-10 overflow-y-auto h-[75vh]">
        {currTab === 0 && <PersonalInformation />}
        {/* {currTab === 1 && <Addressbook />} */}
        {currTab === 2 && <Orders />}
        {currTab === 3 && <Wishlist />}
      </div>
    </div>
  );
};

const PersonalInformation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [displayPwd, setDisplayPwd] = useState(false);
  return (
    <div>
      {!isEdit ? (
        <div className="tracking-wider">
          <div className="flex items-center justify-end cursor-pointer">
            <Pencil size={18} onClick={() => setIsEdit(true)} />
          </div>
          <p className="text-[1.2em]" title="Full Name">
            MEGHA SHARMA
          </p>
          <p className="text-[1em] my-2" title="Email">
            megha@gmail.com
          </p>
          <p className="text-[1em] my-2" title="Phone">
            +91 7983713011
          </p>
          <p className="text-[1em] my-2" title="Address">
            2/277, Begum Bagh, Aligarh, Uttar Pradesh, 202001
          </p>
        </div>
      ) : (
        <>
          {/* personal info */}
          <form className="flex flex-col gap-4 text-[0.9em]">
            <div className="flex items-center justify-end cursor-pointer">
              <X size={18} onClick={() => setIsEdit(false)} />
            </div>
            <div className="flex w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE PERSONAL INFORMATION</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 w-[70%]"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-3 w-[70%]"
            />
            <input
              type="text"
              placeholder="Street No./Area/LandMark"
              className="border p-3 w-[70%]"
            />
            <div className="flex items-center w-[70%] gap-2">
              <select className="border p-3 w-full tracking-wider">
                <option value="">SELECT DISTRICT/CITY</option>
                <option value="Aligarh">ALIGARH</option>
                <option value="Mathura">MATHURA</option>
                <option value="Agra">AGRA</option>
              </select>
              <select className="border p-3 w-full tracking-wider">
                <option value="">SELECT STATE</option>
                <option value="uttar pradesh">UTTAR PRADESH</option>
                <option value="haryana">HARYANA</option>
                <option value="punjab">PUNJAB</option>
              </select>
              <select className="border p-3 w-full tracking-wider">
                <option value="">SELECT COUNTRY</option>
                <option value="india">INDIA</option>
                <option value="russia">RUSSIA</option>
                <option value="america">AMERICA</option>
              </select>
            </div>
            <input
              type="submit"
              value="SUBMIT"
              className="bg-black text-white w-[70%] p-3 cursor-pointer"
            />
          </form>
          {/* email */}
          <form className="flex flex-col gap-4 mt-[70px] text-[0.9em]">
            <div className="flex w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE EMAIL</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="border p-3 w-[70%]"
            />
            <input
              type="submit"
              value="SUBMIT"
              className="bg-black text-white w-[70%] p-3 cursor-pointer"
            />
          </form>
          {/* password */}
          <form className="flex flex-col gap-4 mt-[70px] text-[0.9em]">
            <div className="flex w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE PASSWORD</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <div className="relative w-[70%]">
              <input
                type={displayPwd ? "text" : "password"}
                placeholder="Password"
                className="border p-3 w-full"
              />
              {displayPwd ? (
                <EyeOff
                  onClick={() => setDisplayPwd(false)}
                  className="cursor-pointer absolute top-1/3 right-2 bg-white"
                  size={18}
                  style={{ strokeWidth: 1 }}
                />
              ) : (
                <Eye
                  onClick={() => setDisplayPwd(true)}
                  className="cursor-pointer absolute top-1/3 right-2 bg-white"
                  size={18}
                  style={{ strokeWidth: 1 }}
                />
              )}
            </div>
            <input
              type="submit"
              value="SUBMIT"
              className="bg-black text-white w-[70%] p-3 cursor-pointer"
            />
          </form>
        </>
      )}
    </div>
  );
};

const Addressbook = () => {
  return <p>address book</p>;
};
const Orders = () => {
  return <p>orders</p>;
};
const Wishlist = () => {
  return <p>wishlist</p>;
};

export default ProfilePage;
