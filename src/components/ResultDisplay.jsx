import React, { useState } from "react";

const ResultDisplay = ({ result, error }) => {
  const [isExpanded, setIsExpanded] = useState(false); // control the visibility of the result
  const maxVisible = 10; // maxVisible 为 10

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
        <p className="font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (result) {
    const visibleResults = isExpanded ? result : result.slice(0, maxVisible);

    return (
      <div className="bg-green-100 text-green-700 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold">Result:</h3>
        <ul className="list-disc list-inside">
          {visibleResults.map((coin, index) => (
            <li key={index}>{coin}</li>
          ))}
        </ul>
        {result.length > maxVisible && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-500 hover:underline"
          >
            {isExpanded ? "Collapse" : "Expand"} ({result.length - maxVisible} more)
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ResultDisplay;
