import { Ban, Pencil, Trash2 } from "lucide-react";
import Pagination from "../../../components/Pagination";
import { useEffect, useState } from "react";
import axiosPrivate from "../../../axiosPrivate";
import Loader from "../../../components/Loader";
import EditUserModal from "./EditUserModal";
import { showErrorToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const UsersTable = ({ selectedOption }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [indices, setIndices] = useState({
    start: 0,
    end: 2,
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);

  // pagination

  const ITEMS_PER_PAGE = 10;

  const prevPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.max(prev - 1, 0);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, users?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  const nextPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages - 1);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, users?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  useEffect(() => {
    const total_pages = Math.ceil(users?.length / ITEMS_PER_PAGE);
    setTotalPages(total_pages);

    // Reset pagination on product list update
    if (users?.length > 0) {
      const start = 0;
      const end = Math.min(ITEMS_PER_PAGE, users.length) - 1;
      setIndices({ start, end });
      setCurrPage(0);
    }
  }, [users]);

  // get users

  const handleGetUsers = async (api) => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(api);
      const { data } = response;
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (selectedOption?.label) {
      case "Admin":
        handleGetUsers("/admin/admins");
        break;
      case "Users":
        handleGetUsers("/admin/users");
        break;
      default:
        handleGetUsers("/admin/all-users");
        break;
    }
  }, [selectedOption?.label]);

  // delete user

  const handleDeleteUser = async (email) => {
    const flag = confirm(`Are you sure you want to remove the user ${email} ?`);
    if (!flag) return;
    try {
      const response = await axiosPrivate.delete("/admin/delete-user", {
        data: { email },
      });
      const { data } = response;
      if (data.success) {
        await handleGetUsers("/admin/all-users");
        return toastSuccess(data.message);
      }
      return toastError(data.message);
    } catch (error) {
      console.log(error);
      showErrorToast("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
        setFilteredUsers(users.slice(indices.start, indices.end));
  }, [indices])

  return (
    <div className="px-6 text-[0.9em] flex flex-col justify-between">
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md">
        <div className="max-h-[275px] overflow-y-auto scrollbar-hidden">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-700 uppercase">
                  Name
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700 uppercase">
                  Email
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700 uppercase">
                  Phone
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700 uppercase text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>
                    <div className="flex items-center justify-center h-[40vh]">
                      <p>Loading...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers?.map((user, idx) => (
                  <tr
                    key={user?._id}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    <td className="p-4 text-sm text-gray-900">
                      {user?.fullname}
                    </td>
                    <td className="p-4 text-sm text-gray-900">{user?.email}</td>
                    <td className="p-4 text-sm text-gray-900">
                      {user?.phone || "Phone"}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 cursor-pointer"
                          onClick={() => {
                            setShowModal(true);
                            setSelectedUser(user);
                          }}
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200" onClick={() => handleDeleteUser(user?.email)}>
                          <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedUser={selectedUser}
      />

      {!isLoading && (
        <div className="mb-4">
          <Pagination
            totalPages={totalPages}
            currPage={currPage}
            prevPage={prevPage}
            nextPage={nextPage}
            totalEntries={users?.length}
            indices={indices}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UsersTable;
