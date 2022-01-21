import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
function DetailsImage({ url, alt }) {
  return (
    <Paper sx={{ p: 2, m: 1, borderRadius: 2 }}>
      <Image
        src={url}
        alt={alt}
        style={{ width: "inherit", borderRadius: "2px" }}
        animationDuration={3000}
        color="black"
      />
    </Paper>
  );
}

export default DetailsImage;
