import { useEffect, useState } from "react";
import americanExpressLogo from "./assets/american-express.svg";
import visaLogo from "./assets/visa.svg";
import mastercardLogo from "./assets/mastercard.svg";
import discoverLogo from "./assets/discover.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API}/some-data`);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">
          Hello, Tailwind CSS!
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <a href="https://react.dev" target="_blank">
          <img src={americanExpressLogo} alt="American Express logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={visaLogo} alt="Visa logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={mastercardLogo} alt="Mastercard logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={discoverLogo} alt="Discover logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
