import Container from "@mui/material/Container";
import { Box, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CountryInfo } from "../types";
import Header from "../components/Header";

interface CProps {
  changeDarkMode: () => void;
}
export const Country: FC<CProps> = ({ changeDarkMode }) => {
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

  console.log(countryInfo);
  return (
    <>
      <Header changeDarkMode={changeDarkMode} />
      <Container>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "var(--primary-text)",
            padding: "5px 30px",
            textTransform: "capitalize",
            boxShadow: 2,
            border: "none",
            backgroundColor: "var(--secondary-bg)",
            "&:hover": {
              border: "none",
            },
          }}
          onClick={() => navigate(-1)}
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
                  sx={{ fontWeight: "bold", color: "var(--primary-text)" }}
                  component="div"
                >
                  {countryInfo.name}
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                sx={{ display: "flex", color: "var(--primary-text)" }}
              >
                <Grid item lg={6} xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Native Name:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.nativeName} `}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Population:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.population} `}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Region:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.region} `}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Sub Region:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.subregion} `}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Capital:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.capital} `}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Top Level Domain:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {` ${countryInfo.topLevelDomain} `}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Currencies:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {countryInfo.currencies.map((item) => ` ${item.name} `)}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    Languages:
                    <Typography sx={{ display: "inline", pl: 1 }}>
                      {countryInfo.languages.map((item) => ` ${item.name} `)}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={12} mt={5}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "var(--primary-text)" }}
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
                                color: "var(--primary-text)",
                                padding: "5px 15px",
                                textTransform: "capitalize",
                                backgroundColor: "var(--secondary-bg)",
                                boxShadow: 1,
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
    </>
  );
};
