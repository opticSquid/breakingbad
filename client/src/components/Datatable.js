import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
function Datatable({ data }) {
  console.table(data);
  //function to covert elemets of an array to a comma seperated string
  function arrayToString(array) {
    return array.join(", ");
  }
  function createData(name, value) {
    return { name, value };
  }
  const rows = [
    createData("Name", data.name),
    createData("DOB", data.birthday ? data.birthday : "--"),
    createData("Occupation", arrayToString(data.occupation)),
    createData("Status", data.status),
    createData("Nickname", data.nickname ? data.nickname : "--"),
    createData("Portrayed By", data.portrayed),
    createData("BB Seasons", arrayToString(data.appearance)),
    createData("BCS Series", arrayToString(data.better_call_saul_appearance)),
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "95%", p: 2, m: 1, borderRadius: 2 }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5" component="div">
          Details
        </Typography>
      </Box>
      <Table sx={{ m: 1 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" color="primary">
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="secondary">
                  {row.value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Datatable;
