import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchInput.module.css";
import { useAppDispatch } from "../../hooks/hooks";
import { changeSearch } from "../../redux/slices/searchSlice";

export const SearchInput = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (e.target.value === "") {
      dispatch(changeSearch(""));
    }
  };

  const onSearchClick = () => {
    dispatch(changeSearch(input));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <TextField
      placeholder="Поиск..."
      variant="outlined"
      size="small"
      fullWidth
      value={input}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              className={styles.search}
              position="end"
              onClick={onSearchClick}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
