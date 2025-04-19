import React, { ChangeEvent, useEffect } from "react";
import styles from "./IssuesSort.module.css";
import { SearchInput } from "../../SearchInput/SearchInput";
import { MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getBoards } from "../../../redux/slices/boardsSlice";
import { changeBoardId, changeStatus } from "../../../redux/slices/sortSlice";

export const IssuesSort = () => {
  const { boards } = useAppSelector((state) => state.boards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "status") {
      dispatch(changeStatus(value));
    }

    if (name === "board") {
      const id = value === "All" ? null : Number(value);
      dispatch(changeBoardId(id));
    }
  };

  return (
    <div className={styles.sort}>
      <SearchInput />
      <TextField
        select
        label="По статусу"
        size="small"
        fullWidth
        name="status"
        onChange={onChangeValue}
      >
        <MenuItem value="All">Все</MenuItem>
        <MenuItem value="Backlog">To do</MenuItem>
        <MenuItem value="InProgress">In progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>
      <TextField
        select
        label="По доске"
        size="small"
        fullWidth
        name="board"
        onChange={onChangeValue}
      >
        <MenuItem value='All'>Все</MenuItem>
        {boards.map((board) => (
          <MenuItem key={board.id} value={board.id}>
            {board.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
