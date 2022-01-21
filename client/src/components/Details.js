import { useEffect, useState, Fragment } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";
import Datatable from "./Datatable";
import DetailsImage from "./DetailsImage";
import QuotesTable from "./QuotesTable";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import SubAppBar from "./SubAppbar";
function Details() {
  const char_id = useParams().id;
  const matches = useMediaQuery("(min-width:600px)");
  console.log("Id: ", char_id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("Use effect");
    (async () => {
      let url = `/api/characters/id/${char_id}`;
      console.info("Request URL: ", url);
      try {
        setLoading(true);
        const resp = await axios.get(url);
        console.log("Server response", resp.data);
        if (resp.data.data !== null) {
          setLoading(false);
          setData(resp.data.data);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    })();
  }, [char_id]);
  return (
    <div>
      <SubAppBar />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h3" component="div">
          Character Details
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
          <Fragment>
            {item ? (
              <Fragment>
                <Grid item xs={12} md={4} key={item.img}>
                  <DetailsImage url={item.img} alt={item.name} />
                </Grid>
                <Grid item xs={12} md={4} key={item.name}>
                  <Datatable data={item} />
                </Grid>
                <Grid item xs={12} md={4} key={item.nickname}>
                  <QuotesTable name={item.name} />
                </Grid>
              </Fragment>
            ) : (
              <Grid item xs={12} md={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={
                    matches
                      ? {
                          m: 1,
                          width: window.innerWidth / 3,
                          height: (90 * window.innerHeight) / 100,
                        }
                      : { m: 1, height: window.innerHeight / 3 }
                  }
                />
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
    </div>
  );
}

export default Details;
