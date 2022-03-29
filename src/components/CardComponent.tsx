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
    <Card sx={{backgroundColor: "var(--secondary-bg)"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={150}
          image={props.imgUrl}
          alt={props.name}
        />
        <CardContent sx={{ color: "var(--primary-text)"}}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ fontWeight: "bold",}}
            component="div"
          >
            {props.name}
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Population:
            <Typography  sx={{ display: "inline", pl: 1 }}>
              {props.population}
            </Typography>
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Region:
            <Typography  sx={{ display: "inline", pl: 1  }}>
              {props.region}
            </Typography>
          </Typography>
          <Typography gutterBottom sx={{ fontWeight: "bold" }} component="div">
            Capital:
            <Typography  sx={{ display: "inline", pl: 1  }}>
              {props.capital}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CardComponent;