import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useStateContext } from "../context/ContextProvider";
function SearchBar() {
  const [{ searchTerm }, dispatch] = useStateContext();
  const [value, setValue] = useState("");
  const handleInput = (e) => {
    setValue(e.target.value);
    dispatch({ type: "Set_SearchTerm", data: e.target.value });
  };
  return (
    <FormControl fullWidth sx={{ m: 1, width: "90%" }} variant="outlined">
      <OutlinedInput
        id="standard-adornment-amount"
        value={value}
        placeholder="Search"
        onChange={handleInput}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default SearchBar;
