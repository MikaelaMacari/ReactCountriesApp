import { FC, useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { CountryData } from "../types";

interface CountryProps {
  darkBg: {
    backgroundColor: string;
  };
  darkForm: {
    backgroundColor: string;
    color: string;
  };
  darkMode: boolean;
  changeDarkMode: () => void;
}
const CountryContainer: FC<CountryProps> = ({
  darkBg,
  darkMode,
  darkForm,
  changeDarkMode,
}) => {
  const [data, setData] = useState<[CountryData] | null>(null);
  const [filteredData, setFilteredData] = useState<Array<CountryData> | null>(
    null
  );
  const [filterWord, setFilterWord] = useState();
  const [continent, setContinent] = useState("");

  async function getData() {
    const response = await fetch("https://restcountries.com/v2/all");
    const finalResponse = await response.json();
    setData(finalResponse);
    setFilteredData(finalResponse);
  }

  const searchCountry = (filterString: string) => {
    const filteredItems =
      filteredData &&
      filteredData.filter((item) =>
        item.name.toLowerCase().includes(filterString.toLowerCase())
      );
    if (filterString) {
      setFilteredData(filteredItems);
    } else {
      setFilteredData(data);
    }
  };
  const searchByRegion = (filterString: string) => {
    const filteredByRegion =
      filteredData &&
      filteredData.filter((item) =>
        item.region.toLowerCase().includes(filterString.toLocaleLowerCase())
      );
    console.log(filteredByRegion);
    if (filterString) {
      setFilteredData(filteredByRegion);
    } else {
      setFilteredData(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ mt: 5, ...(darkMode && darkBg) }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 5, mb: 5 }}
      >
        <TextField
          fullWidth
          placeholder="Search for a country..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ ...(darkMode && darkForm) }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 450,
            ...(darkMode && darkForm),
            "&:focus-visible": {
              outline: "none",
            },
          }}
          value={filterWord}
          onChange={(e) => {
            setTimeout(() => searchCountry(e.target.value), 3000);
          }}
        />
        <FormControl sx={{ width: 220, ...(darkMode && darkForm) }}>
          <InputLabel sx={{ ...(darkMode && darkForm) }}>
            Filter by Region
          </InputLabel>
          <Select
            value={continent}
            label="Filter by Region"
            onChange={({ target: { value } }) => {
              searchByRegion(value);
            }}
          >
            <MenuItem
              value=""
              onClick={() => {
                setFilteredData(data);
              }}
            >
              All
            </MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="America">America</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={6}>
        {filteredData ? (
          filteredData.map((country, i) => {
            return (
              <Grid item lg={3} key={i}>
                <Link
                  to={`country/${country.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardComponent
                    name={country.name}
                    imgUrl={country.flags.svg}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                </Link>
              </Grid>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Container>
  );
};
export default CountryContainer;
