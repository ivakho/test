import React from "react";
import { IBoardProps } from "./types/types";
import styles from "./Board.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Board = ({ id, name, description, taskCount }: IBoardProps) => {
  const navigate = useNavigate();

  const onBoardPageOpen = () => {
    navigate(`/boards/${id}`, {
      state: { name },
    });
  };

  return (
    <div className={styles.board}>
      <div>{name}</div>
      <Button onClick={onBoardPageOpen}>Перейти к доске</Button>
    </div>
  );
};
