import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

const Orders = () => {
  return (
    <div className="p-10 w-full border border-gray-300 mt-10 me-10 overflow-y-hidden h-[75vh]">
      <div className="w-full flex justify-between items-center mb-3 mt-1 text-[0.9em]">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Order History (4)
          </h3>
        </div>
        {/* <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border"
                placeholder="Search for invoice..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <div className="relative flex flex-col w-full h-fit text-gray-700 bg-white border bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none">
                  Product ID
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none">
                  Title
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none">
                  Amount
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none">
                  Ordered On
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none">
                  Visit
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1001
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Shirt</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Rs. 4500</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-01</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500 cursor-pointer hover:text-black"><SquareArrowOutUpRight size={14} /></p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1002
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">T-shirt</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Rs. 4200</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-05</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500 cursor-pointer hover:text-black"><SquareArrowOutUpRight size={14} /></p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1003
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Jeans</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Rs. 3000</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-07</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500 cursor-pointer hover:text-black"><SquareArrowOutUpRight size={14} /></p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-slate-500">
            Showing <b>1-5</b> of 45
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Prev
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
              1
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              2
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              3
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
