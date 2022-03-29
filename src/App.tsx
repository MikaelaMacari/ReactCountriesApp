import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Country } from "./pages/Country";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const changeDarkMode = () => {
    localStorage.setItem("user-theme", !darkMode ? "light" : "dark");
    document.body.setAttribute("data-theme", !darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const darkTheme = localStorage.getItem("user-theme") !== "dark";
    document.body.setAttribute("data-theme", darkTheme ? "light" : "dark");
    setDarkMode(darkTheme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home changeDarkMode={changeDarkMode} />} />
        <Route
          path="/country/:countryName"
          element={<Country changeDarkMode={changeDarkMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
