import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorSelector({ colors, setColors }) {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [manualColor, setManualColor] = useState("");

  const addColor = (e) => {
    e.preventDefault();
    const colorToAdd = manualColor || selectedColor;

    if (!/^#([0-9A-F]{3}){1,2}$/i.test(colorToAdd)) {
      alert("Please enter a valid hex color code.");
      return;
    }

    if (!colors.includes(colorToAdd)) {
      setColors((prev) => [...prev, colorToAdd]);
      setManualColor("");
    }
  };

  const removeColor = (color) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 md:flex-row flex-col">
        <div>
          <p className="text-sm font-medium mb-1">Pick a color:</p>
          <div className="small-picker">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
        </div>

        {/* for lg screen */}
        <div className="md:flex hidden flex-col gap-2">
          <label className="text-sm font-medium">Or type color code:</label>
          <input
            type="text"
            value={manualColor}
            onChange={(e) => setManualColor(e.target.value)}
            placeholder="#FF0000"
            className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
          />
          <button
            onClick={addColor}
            className="bg-[#2a85ff] text-white px-4 py-1 text-[0.9em] hover:bg-blue-600 cursor-pointer"
          >
            Add Color
          </button>
        </div>

        {/* for sm screen */}
        <div className="flex flex-col gap-2 md:hidden">
          <label className="text-sm font-medium">Or type color code:</label>
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              value={manualColor}
              onChange={(e) => setManualColor(e.target.value)}
              placeholder="#FF0000"
              className="bg-[#f5f5f5] py-2 px-4 text-[0.8em] outline-none w-full"
            />
            <button
              onClick={addColor}
              className="bg-[#2a85ff] text-nowrap text-white px-4 py-1.5 text-[0.85em] hover:bg-blue-600 cursor-pointer"
            >
              Add Color
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-sm">Selected Colors:</p>
        <div className="flex flex-wrap gap-4 mt-2 text-[0.8em]">
          {colors.map((color, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-5 h-5" style={{ backgroundColor: color }} />
              <span className="text-sm">{color}</span>
              <button
                onClick={() => removeColor(color)}
                className="text-red-500 cursor-pointer text-sm"
              >
                ❌
              </button>
            </div>
          ))}
          {colors.length === 0 && (
            <p className="text-gray-500">No colors added.</p>
          )}
        </div>
      </div>
    </div>
  );
}
