import { useEffect, useState } from "react";
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

const CountryContainer = ({}) => {
  const [data, setData] = useState<[CountryData] | null>(null);
  const [filteredData, setFilteredData] = useState<Array<CountryData> | null>(
    null
  );
  const [filterWord, setFilterWord] = useState("");
  const [continent, setContinent] = useState("");

  async function getData() {
    const response = await fetch("https://restcountries.com/v2/all");
    const finalResponse = await response.json();
    setData(finalResponse);
    setFilteredData(finalResponse);
  }

  const searchCountry = (filterString: string) => {
    const filteredItems =
      data &&
      data.filter((item) =>
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
      data &&
      data.filter((item) =>
        item.region.toLowerCase().includes(filterString.toLowerCase())
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
    <Container>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ lg: 12, md: 15, sm: 20 }}
        sx={{ mb: 6 }}
      >
        <Grid item lg={9} md={8} sm={6} xs={12}>
          <TextField
            fullWidth
            focused={false}
            style={{ color: "var(--secondary-text)" }}
            placeholder="Search for a country..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "var(--secondary-text)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              color: "var(--secondary-text)",
              backgroundColor: "var(--secondary-bg)",
              "&:focus-visible": {
                outline: "none",
                border: "none",
              },
              "&:focused": {
                border: "none",
                outline: "none",
              },
              "&:hover": {
                border: "none",
                outline: "none",
              },
            }}
            value={filterWord}
            onChange={(e) => {
              setFilterWord(e.target.value);
              searchCountry(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <FormControl
            focused={false}
            sx={{
              width: 220,
              backgroundColor: "var(--secondary-bg)",
              color: "var(--primary-text)",
            }}
          >
            <InputLabel sx={{ color: "var(--primary-text)" }}>
              Filter by Region
            </InputLabel>
            <Select
              value={continent}
              label="Filter by Region"
              onChange={({ target: { value } }) => {
                searchByRegion(value);
                setContinent(value);
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
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        {filteredData ? (
          filteredData.map((country, i) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12} key={i}>
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
