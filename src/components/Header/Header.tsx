import { ModalBox } from "../ModalBox/ModalBox";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { createRequest } from "../../functions/createRequest";
import { useAppDispatch } from "../../hooks/hooks";
import { openModal } from "../../redux/slices/modalSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const onModalClick = () => {
    dispatch(openModal({ isOpen: true, isNewTask: true }));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Все задачи
        </NavLink>
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Проекты
        </NavLink>
      </nav>
      <Button variant="contained" onClick={onModalClick}>
        Создать задачу
      </Button>
      <ModalBox />
    </header>
  );
};
