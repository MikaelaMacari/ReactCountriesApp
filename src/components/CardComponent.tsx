import {FC} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface CardComponentProps {
  imgUrl: string
  name: string
  capital: string
  region: string
  population: number
}

const CardComponent : FC<CardComponentProps> = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={150}
          image={props.imgUrl}
          alt={props.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ fontWeight: "bold" }}
            component="div"
          >
            {props.name}
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Population:
            <Typography color="text.secondary" sx={{ display: "inline" }}>
              {props.population}
            </Typography>
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Region:
            <Typography color="text.secondary" sx={{ display: "inline" }}>
              {props.region}
            </Typography>
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Capital:
            <Typography color="text.secondary" sx={{ display: "inline" }}>
              {props.capital}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CardComponent;