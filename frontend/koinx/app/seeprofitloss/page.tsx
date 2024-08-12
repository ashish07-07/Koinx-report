"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfitLossCalculator() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await axios.get(
          "http://localhost:3000/profitlosscalculatot/costbasis"
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getDetails();
  }, []);

  return (
    <div>
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Profit and Loss Calculator
        </h2>
        <div className="mb-4">
          <div className="text-lg font-medium text-gray-800">Net Profit:</div>
          <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-600">
            {/* {JSON.stringify(data, null, 2)} */}
            {JSON.stringify(data)}
          </pre>
        </div>
      </div>
    </div>
  );
}
