import { useEffect } from "react";
import styles from "./Issues.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTasks } from "../../redux/slices/tasksSlice";
import { Task } from "../Task/Task";
import { openModal } from "../../redux/slices/modalSlice";
import { ModalBox } from "../ModalBox/ModalBox";
import { IssuesSort } from "./IssuesSort/IssuesSort";
import { Button } from "@mui/material";

export const Issues = () => {
  const { search, status, boardId } = useAppSelector((state) => state.sort);

  const dispatch = useAppDispatch();

  const { tasks, tasksLoading, tasksErr } = useAppSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const onModalClick = () => {
    dispatch(openModal({ isOpen: true, isNewTask: true }));
  };

  // const filteredTasks = search
  //   ? tasks.filter((task) => {
  //       const searchLower = search.toLowerCase();
  //       const titleMatch = task.title?.toLowerCase().includes(searchLower);
  //       const assigneeMatch = task.assignee?.fullName
  //         ?.toLowerCase()
  //         .includes(searchLower);
  //       return titleMatch || assigneeMatch;
  //     })
  //   : tasks;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = !search
      || task.title?.toLowerCase().includes(search.toLowerCase())
      || task.assignee?.fullName?.toLowerCase().includes(search.toLowerCase());
  
    const matchesStatus = status === "All" || task.status === status;
    const matchesBoard = boardId === null || task.boardId === boardId;
  
    return matchesSearch && matchesStatus && matchesBoard;
  });

  return (
    <div className={styles.issues}>
      <IssuesSort />
      <div className={styles.content}>
        <div className={styles.tasks}>
          {tasksLoading && <div>Загрузка...</div>}
          {!tasksLoading && tasks.length === 0 && <div>Задачи не найдены</div>}
          {!tasksLoading &&
            filteredTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                assignee={task.assignee.fullName}
              />
            ))}
          {tasksErr && <p style={{ color: "red" }}>{tasksErr}</p>}
        </div>
        <Button
          className={styles.button}
          variant="contained"
          onClick={onModalClick}
        >
          Создать задачу
        </Button>
      </div>
      <ModalBox />
    </div>
  );
};
