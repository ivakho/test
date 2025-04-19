import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createRequest } from "../../functions/createRequest";
import styles from "./BoardPage.module.css";
import { ITask } from "../../redux/types/types";
import { useAppDispatch } from "../../hooks/hooks";
import { openModal } from "../../redux/slices/modalSlice";
import { getTask } from "../../redux/slices/taskSlice";

export const BoardPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const location = useLocation();
  const state = location.state as { name?: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTasks();
  }, [id]);

  const getTasks = async () => {
    const response = await createRequest("/boards/" + id, {});
    if (response.ok) {
      const result = await response.json();
      setTasks(result.data);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const onTaskClick = (id: number) => {
    dispatch(openModal({ isOpen: true, isNewTask: false }));
    dispatch(getTask(id));
  };

  return (
    <div className={styles.board}>
      <h1>{state?.name || "Проект"}</h1>
      <div className={styles.table}>
        <div className={styles.column}>
          <div className={styles.title}>To Do</div>
          <div className={styles.content}>
            {getTasksByStatus("Backlog").map((item) => (
              <div
                className={styles.task}
                key={item.id}
                onClick={() => onTaskClick(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.title}>In progress</div>
          <div className={styles.content}>
            {getTasksByStatus("InProgress").map((item) => (
              <div
                className={styles.task}
                key={item.id}
                onClick={() => onTaskClick(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.title}>Done</div>
          <div className={styles.content}>
            {getTasksByStatus("Done").map((item) => (
              <div
                className={styles.task}
                key={item.id}
                onClick={() => onTaskClick(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
