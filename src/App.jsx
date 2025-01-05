import React, { useState } from "react";
import CoinForm from "./components/CoinForm";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    setError(null);
  };

  const handleError = (err) => {
    setError(err);
    setResult(null);
  };

  const handleClear = () => {
    // clear the form and call the onClear callback
    setResult(null);
    setError(null);

    console.log("Result cleared:", result, "Error cleared:", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <CoinForm onResult={handleResult} onError={handleError} onClear={handleClear} />
        <ResultDisplay result={result} error={error} />
      </div>
    </div>
  );
};

export default App;
