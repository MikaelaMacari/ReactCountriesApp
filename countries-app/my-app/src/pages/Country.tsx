import Container from "@mui/material/Container";
import { Box, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CountryInfo } from "../types";

export default function Country() {
  const { countryName } = useParams();
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [countryBorders, setCountryBorders] =
    useState<Array<CountryInfo> | null>(null);
  const navigate = useNavigate();

  const getCountryCode = async (countryData: CountryInfo) => {
    const codes = countryData.borders.join(",");
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes}`
    );
    const finalResponse = await response.json();
    const borders = finalResponse.map(
      (country: { name: { common: string } }) => country.name.common
    );
    setCountryBorders(borders);
  };
  const getCountryInfo = async (): Promise<void> =>
    await fetch(`https://restcountries.com/v2/name/${countryName}`)
      .then((r) => r.json())
      .then(([r]) => {
        setCountryInfo(r);
        getCountryCode(r);
      });

  useEffect(() => {
    getCountryInfo();
  }, [countryName]);

  function handleClick() {
    navigate("/");
  }

  console.log(countryInfo);
  return (
    <Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          mt: 10,
          color: "black",
          padding: "5px 30px",
          textTransform: "capitalize",
          boxShadow: 2,
          border: "none",
          "&:hover": {
            backgroundColor: "#fcfcfc",
            border: "none",
            boxShadow: 3,
          },
        }}
        onClick={handleClick}
      >
        Back
      </Button>
      {countryInfo ? (
        <Grid container spacing={2} mt={5}>
          <Grid item lg={4}>
            <img width="100%" src={countryInfo.flag} alt="Belgium" />
          </Grid>
          <Grid item lg={7} ml={5}>
            <Grid item lg={12} mb={5}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontWeight: "bold" }}
                component="div"
              >
                {countryInfo.name}
              </Typography>
            </Grid>
            <Grid item lg={12} sx={{ display: "flex" }}>
              <Grid item lg={6}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Native Name:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.nativeName} `}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Population:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.population} `}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Region:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.region} `}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Sub Region:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.subregion} `}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Capital:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.capital} `}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Top Level Domain:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {` ${countryInfo.topLevelDomain} `}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Currencies:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {countryInfo.currencies.map((item) => ` ${item.name} `)}
                  </Typography>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  Languages:
                  <Typography color="text.secondary" sx={{ display: "inline" }}>
                    {countryInfo.languages.map((item) => ` ${item.name} `)}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={12} mt={5}>
              <Typography
                gutterBottom
                sx={{ fontWeight: "bold" }}
                component="div"
              >
                Border Countries:
                {countryBorders
                  ? countryBorders.map((item, index) => {
                      return (
                        <Link
                          key={item.name}
                          to={`/country/${item}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            key={index}
                            sx={{
                              mb: 1,
                              ml: 2,
                              color: "black",
                              padding: "5px 15px",
                              textTransform: "capitalize",
                              boxShadow: 1,
                              "&:hover": {
                                backgroundColor: "#fcfcfc",
                                boxShadow: 2,
                              },
                            }}
                          >
                            {item}
                          </Button>
                        </Link>
                      );
                    })
                  : " No Borders"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
    </Container>
  );
}
