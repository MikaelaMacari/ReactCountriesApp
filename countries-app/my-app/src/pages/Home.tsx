import CountryContainer from "../components/CountryContainer";
import Header from "../components/Header";
import { useState } from "react";

const styles = {
  dark: {
    backgroundColor: "#2b3743",
    color: "#fafafa",
  },
  darkBtn: {
    backgroundColor: "#2b3743",
    color: "#fafafa",
    "&:hover": {
      background: "none",
      color: "#fcd116",
    },
  },
};
const stylesBg = {
  darkBg: {
    backgroundColor: "#202d36",
  },
};
const Home = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Header
        dark={styles.dark}
        darkMode={darkMode}
        darkBtn={styles.darkBtn}
        changeDarkMode={changeDarkMode}
      />
      <CountryContainer
        darkBg={stylesBg.darkBg}
        darkForm={styles.dark}
        darkMode={darkMode}
        changeDarkMode={changeDarkMode}
      />
    </>
  );
};
export default Home;
