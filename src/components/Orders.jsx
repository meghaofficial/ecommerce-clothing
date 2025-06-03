import { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const orders = [
    {
      id: "ORD1234",
      date: "2024-05-01",
      customer: "John Doe",
      amount: "Rs. 120.00",
      status: "Delivered",
    },
    {
      id: "ORD1235",
      date: "2024-05-03",
      customer: "Jane Smith",
      amount: "Rs. 75.00",
      status: "Pending",
    },
    {
      id: "ORD1236",
      date: "2024-05-05",
      customer: "Alice Brown",
      amount: "Rs. 200.00",
      status: "Cancelled",
    },
    {
      id: "ORD1237",
      date: "2024-05-08",
      customer: "Bob Martin",
      amount: "Rs. 95.00",
      status: "Delivered",
    },
    {
      id: "ORD1238",
      date: "2024-05-10",
      customer: "Charlie Evans",
      amount: "Rs. 150.00",
      status: "Shipped",
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true)
  );

  const getStatusTagClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 text-[0.9em]">
        <div className="flex items-center border px-3 py-2 w-full md:w-[300px]">
          <Search size={18} className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search customer"
            className="w-full outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 text-gray-700 w-full md:w-[200px] border"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 font-semibold">Order ID</th>
            <th className="p-3 font-semibold">Product ID</th>
            <th className="p-3 font-semibold">Product</th>
            <th className="p-3 font-semibold">Amount</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.date}</td>
              <td className="p-3">{order.customer}</td>
              <td className="p-3">{order.amount}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${getStatusTagClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
