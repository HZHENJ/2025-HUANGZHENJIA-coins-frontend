import React, { useState } from "react";
import axios from "axios";

const CoinForm = ({ onResult, onError, onClear }) => {
  const [targetAmount, setTargetAmount] = useState("");
  const [coinDenominations, setCoinDenominations] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coins = coinDenominations
      .split(",")
      .map((coin) => parseFloat(coin.trim()));

    try {
      // using axios to make a POST request to the backend
      const response = await axios.post("http://localhost:8080/api/minimum-coins", {
        targetAmount: parseFloat(targetAmount),
        coinDenominations: coins,
      });

      // successful response, call onResult callback
      onResult(response.data.coins);

      // expand the result display
      setIsExpanded(true); 
    } catch (err) {
      if (err.response) {
        onError(err.response.data.error || "An error occurred");
      } else {
        onError("Failed to connect to the server");
      }
    }
  };

  const handleClear = () => {
    // clear the form and call the onClear callback
    setTargetAmount("");
    setCoinDenominations("");

    onClear();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Coin Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetAmount" className="block text-l font-medium text-gray-700">
            Target Amount (e.g., 7.03):
          </label>
          <input
            id="targetAmount"
            type="text"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            placeholder="Enter target amount"
            className="border border-gray-300 mt-1 block w-full py-2 px-3 shadow-sm rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="coinDenominations" className="block text-l font-medium text-gray-700">
            Coin Denominations (comma-separated, e.g., 0.01,0.5,1,5):
          </label>
          <input
            id="coinDenominations"
            type="text"
            value={coinDenominations}
            onChange={(e) => setCoinDenominations(e.target.value)}
            required
            placeholder="Enter coin denominations"
            className="border border-gray-300 mt-1 block w-full border-gray-300 py-2 px-3 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoinForm;
