import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

function QuotesTable({ name }) {
  console.log("Name: ", name);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({ currentpage: 0, totalpages: 0 });
  useEffect(() => {
    console.log("Use effect");
    (async () => {
      let url = `/api/quotes/${name}/${page.currentpage}`;
      console.info("Request URL: ", url);
      try {
        setLoading(true);
        const resp = await axios.get(url);
        console.log("Server response", resp.data);
        if (resp.data.data !== null) {
          setLoading(false);
          setData(resp.data.data);
          setPage({ ...page, totalpages: resp.data.pages });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    })();
  }, [name, page.currentpage]);
  const changePage = (event, value) => {
    setPage({ ...page, currentpage: value - 1 });
  };
  return (
    <Box
      component={Paper}
      sx={{
        width: "95%",
        p: 2,
        m: 1,
        borderRadius: 2,
        height: "60%",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5" component="div">
          Quotes
        </Typography>
      </Box>
      <List>
        {data.map((item, index) => (
          <Fragment>
            <ListItem key={item.quote}>
              <Typography
                variant="title1"
                textAlign="center"
                component="div"
                color="secondary"
              >
                {item.quote}
              </Typography>
            </ListItem>
            <ListItem key={item.series}>
              <Typography
                variant="subtitle1"
                textAlign="right"
                component="div"
                color="primary"
              >
                <i> ~ {item.series}</i>
              </Typography>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
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
    </Box>
  );
}

export default QuotesTable;
