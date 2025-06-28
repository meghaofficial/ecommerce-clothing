import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { CloudDownload } from "lucide-react";

const ExportButton = ({ data, fileName = "data.xlsx" }) => {
  const handleExport = () => {
    // Format array fields into comma-separated strings
    const formattedData = data.map((item) => ({
      ...item,
      size: Array.isArray(item.size) ? item.size.join(", ") : item.size,
      colors: Array.isArray(item.colors) ? item.colors.join(", ") : item.colors,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer border border-gray-300 px-4 py-2 text-gray-600"
      onClick={handleExport}
    >
      <CloudDownload size={18} />
      <span className="font-semibold text-[0.9em]">Export</span>
    </div>
  );
};

export default ExportButton;
