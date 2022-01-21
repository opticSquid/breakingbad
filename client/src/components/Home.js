import { useState, useEffect, Fragment } from "react";
import Appbar from "./Appbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import CharacterCard from "./Card";
import SearchBar from "./SearchBar";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useStateContext } from "../context/ContextProvider";
function Home(props) {
  const [page, setPage] = useState({ currentpage: 0, totalpages: 0 });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [{ BB, BCS }] = useStateContext();
  useEffect(() => {
    (async () => {
      let url;
      try {
        setLoading(true);
        if (BB) {
          url = `/api/characters/category/Breaking Bad/${page.currentpage}`;
          setTitle("Breaking Bad");
        } else if (BCS) {
          url = `/api/characters/category/Better Call Saul/${page.currentpage}`;
          setTitle("Better Call Saul");
        } else {
          url = `/api/characters/details/${page.currentpage}`;
          setTitle("All Characters");
        }
        const response = await axios.get(url);

        console.log("Server response", response.data);
        if (response.data.data !== null) {
          setLoading(false);
          setData(response.data.data);
          setPage({ ...page, totalpages: response.data.pages });
        } else {
          setLoading(false);
          setTitle("No Characters Found");
        }
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
        setTitle("No Characters Found");
      }
    })();
  }, [BB, BCS, page.currentpage]);
  const changePage = (event, value) => {
    setPage({ ...page, currentpage: value - 1 });
  };
  return (
    <Fragment>
      <Appbar />
      <Typography
        variant="h3"
        component="div"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <SearchBar />
      </Box>
      <Grid container spacing={2}>
        {(loading ? Array.from(new Array(10)) : data).map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            {item ? (
              <CharacterCard {...item} />
            ) : (
              <Skeleton variant="rectangular" animation="wave" height={300} />
            )}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        component="div"
      >
        <Pagination
          count={page.totalpages}
          page={page.currentpage + 1}
          defaultPage={1}
          onChange={changePage}
          color="primary"
        />
      </Box>
    </Fragment>
  );
}

export default Home;
