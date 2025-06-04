import { Eye, Image, Trash2 } from "lucide-react";

const ImageUploadBox = ({ selectedFile, setSelectedFile, previewUrl, setPreviewUrl }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleView = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl ? (
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-64 mb-4 rounded object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleView}
                className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <Eye className="w-6 h-6" />
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <Image />
        )}

        {selectedFile ? (
          <p className="text-gray-700">Selected file: {selectedFile.name}</p>
        ) : (
          <>
            <p>Drop your image here, or</p>
            <label className="text-blue-500 hover:underline cursor-pointer">
              Click to browse
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploadBox;
