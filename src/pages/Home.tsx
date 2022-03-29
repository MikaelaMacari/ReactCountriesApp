import CountryContainer from "../components/CountryContainer";
import Header from "../components/Header";
import { FC } from "react";
interface HProps {
  changeDarkMode: () => void;
}
const Home: FC<HProps> = ({ changeDarkMode }) => {
  return (
    <>
      <Header changeDarkMode={changeDarkMode} />
      <CountryContainer />
    </>
  );
};
export default Home;
