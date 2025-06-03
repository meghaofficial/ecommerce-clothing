import { useEffect, useState } from "react";
import axiosPrivate from "../../../axiosPrivate";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { showSuccessToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const EditUserModal = ({ showModal, setShowModal, selectedUser }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axiosPrivate.put("/admin/update-authority", {
        id: selectedUser?._id,
        makeAdmin: isChecked,
      });
      const { data } = response;
      if (data.success) {
        showSuccessToast(data?.message);
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setIsChecked(selectedUser.role === 1001);
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col items-center justify-center z-[9999]">
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white px-6 pt-6 rounded-lg shadow-lg w-[35%] h-[60%] overflow-y-auto"
            >
              <div className="flex flex-col">
                {/* cross */}
                <div className="flex items-center justify-end">
                  <button
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex items-start justify-center flex-col mx-3">
                  <p className="my-1">{selectedUser?.fullname}</p>
                  <p className="my-1">{selectedUser?.email}</p>
                  {/* <p className="my-1">
                    {selectedUser?.address || "No Address"}
                  </p> */}
                  <p className="my-1">
                    {selectedUser?.phone || "+91-XXXXXXXXXX"}
                  </p>
                  <div className="flex items-center gap-2 mt-20">
                    <label>
                      {selectedUser?.role === 1001
                        ? "Remove from admin"
                        : "Make admin"}
                    </label>
                    <input
                      type="checkbox"
                      onChange={(e) => setIsChecked(e.target.checked)}
                      checked={isChecked}
                    />
                  </div>
                  <button
                    className="cursor-pointer bg-black text-white p-2 w-full mt-2"
                    onClick={handleClick}
                  >
                    Update
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default EditUserModal;