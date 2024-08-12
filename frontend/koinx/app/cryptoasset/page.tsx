"use client";
import { useState } from "react";
import axios from "axios";

export default function AssetBalanceSummary() {
  const [date, setDate] = useState("");
  const [remainingAsset, setRemainingAsset] = useState(null);

  const handleButtonClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/asset/balencesummary",
        { timestamp: date }
      );
      setRemainingAsset(res.data.memainingasset);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching asset balance summary:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Asset Balance Summary</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Date and Time:
        </label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md"
      >
        Click Me
      </button>

      {remainingAsset && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2  text-black">
            Remaining Assets:
          </h3>
          <ul className="list-disc list-inside">
            {Object.entries(remainingAsset).map(([key, value]) => (
              <li key={key} className="text-black-800 text-black">
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
