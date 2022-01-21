import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "material-ui-image";
import CakeIcon from "@mui/icons-material/Cake";
import BoyIcon from "@mui/icons-material/Boy";
import WorkIcon from "@mui/icons-material/Work";
function CharacterCard({ name, occupation, birthday, status, img }) {
  return (
    <Card sx={{ display: "flex", m: 2 }}>
      <CardMedia sx={{ width: 200, height: 300 }}>
        <Image
          src={img}
          alt={name}
          style={{ width: 200, height: 300 }}
          animationDuration={3000}
          color="black"
        />
      </CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4">
            {name}
          </Typography>
          <Typography
            component="div"
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CakeIcon fontSize="medium" color="secondary" sx={{ mr: 1 }} />
            {birthday}
          </Typography>
          <Typography
            component="div"
            variant="title1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <BoyIcon fontSize="medium" color="secondary" sx={{ mr: 1 }} />
            {status === "Deceased" || status === "Presumed dead" ? (
              <Box component="span" sx={{ color: "gray" }}>
                <i>{status}</i>
              </Box>
            ) : (
              <span>{status}</span>
            )}
          </Typography>
          <Typography
            component="div"
            variant="title2"
            sx={{ display: "flex", alignItems: "center", my: 1 }}
          >
            <strong>Occupation</strong>
          </Typography>
          {occupation.map((work, index) => (
            <Typography
              component="div"
              variant="body2"
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <WorkIcon fontSize="medium" color="secondary" sx={{ mr: 1 }} />
              {work}
            </Typography>
          ))}
        </CardContent>
      </Box>
    </Card>
  );
}

export default CharacterCard;
