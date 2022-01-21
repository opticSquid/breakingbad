import { useEffect, useState, Fragment } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { DataGrid } from "@mui/x-data-grid";

import { Grid } from "@mui/material";
import Image from "material-ui-image";
function Details(props) {
  let char_id = useParams().id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      console.log("char_id", char_id);
      setLoading(true);
      try {
        let response = await axios.get(`/api/characters/id/${char_id}`);
        console.log("Server response", response.data);
        if (response.data.data !== null) {
          setLoading(false);
          setData(response.data.data);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error", err);
        setLoading(false);
      }
    })();
  }, [char_id]);
  const ArraytoStrings = (occupation) => {
    console.log(occupation);
    let occ = "";
    occupation.forEach((item) => {
      occ += item + ", ";
    });
    console.log(occ);
    return occ;
  };
  const columns = [
    { field: "attr", headerName: "Attribute", width: "40%" },
    { field: "value", headerName: "Value", width: "60%" },
  ];
  const rows = [
    {
      id: 1,
      Attribute: "Name",
      Value: data.name,
    },
    {
      id: 2,
      Attribute: "Birthday",
      Value: data.birthday,
    },
    {
      id: 3,
      Attribute: "Occupation",
      Value: ArraytoStrings(data.occupation),
    },
    {
      id: 4,
      Attribute: "Status",
      Value: data.status,
    },
    {
      id: 5,
      Attribute: "Portrayed",
      Value: data.portrayed,
    },
    {
      id: 6,
      Attribute: "Nickname",
      Value: data.nickname,
    },
    {
      id: 7,
      Attribute: "BB Seasons",
      Value: ArraytoStrings(data.appearance),
    },
    {
      id: 8,
      Attribute: "BCS Seasons",
      Value: ArraytoStrings(data.better_call_saul_appearance),
    },
  ];
  return (
    <Grid container spacing={2}>
      {!loading ? (
        <Fragment>
          <Grid item xs={12} md={6}>
            <Image
              src={data.img}
              alt={data.name}
              style={{ width: 200, height: 300 }}
              animationDuration={3000}
              color="black"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataGrid rows={rows} columns={columns} />
          </Grid>
        </Fragment>
      ) : null}
    </Grid>
  );
}

export default Details;
