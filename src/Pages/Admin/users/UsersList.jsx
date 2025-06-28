import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { Ban, Pencil, Trash2 } from "lucide-react";
import axiosPrivate from "../../../axiosPrivate";
import EditUserModal from "./EditUserModal";
import { UserCardSkeleton } from "../../../components/Skeletons/UserCardSkeleton";

const UsersList = ({ selectedOption }) => {
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

  const ITEMS_PER_PAGE = 7;

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
        // re-fetch only the current tab's data
        if (selectedOption?.label === "Admin") {
          await handleGetUsers("/admin/admins");
        } else if (selectedOption?.label === "Users") {
          await handleGetUsers("/admin/users");
        } else {
          await handleGetUsers("/admin/all-users");
        }

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
  }, [indices]);

  return (
    <div className="relative md:pb-0 pb-16">
    {console.log("selectedOption?.label", selectedOption?.label)}
      <div className="flex items-center flex-wrap gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full px-6">
        {isLoading ? (
          <div className="flex flex-col gap-4 items-center justify-center md:h-[50vh] h-[80vh] w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-[90%]">
                <UserCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          filteredUsers?.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow border border-gray-300 p-4 md:w-[30%] w-full"
            >
              <h3 className="text-[1em] font-semibold mb-1">
                {user?.fullname}
              </h3>
              <p className="text-sm text-gray-600 mb-1">Email: {user?.email}</p>
              <p className="text-sm text-gray-600 mb-3">
                Phone: {user.phone || "Phone"}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="flex cursor-pointer items-center gap-1 text-sm p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                  title="Edit"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedUser(user);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  className="flex cursor-pointer items-center gap-1 text-sm p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  title="Delete account"
                  onClick={() => handleDeleteUser(user?.email)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <EditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedUser={selectedUser}
      />
      {!isLoading && (
        <div className="px-6 absolute w-full pb-4">
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
    </div>
  );
};

export default UsersList;
