import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createRequest } from "../../functions/createRequest";
import styles from "./BoardPage.module.css";
import { ITask } from "../../redux/types/types";

export const BoardPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksToDo, setTasksToDo] = useState<ITask[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<ITask[]>([]);
  const [tasksDone, setTasksIsDone] = useState<ITask[]>([]);

  const location = useLocation();
  const state = location.state as { name?: string };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const todo: ITask[] = [];
    const inprogress: ITask[] = [];
    const done: ITask[] = [];

    tasks.forEach((task) => {
      if (task.status === "Backlog") {
        todo.push(task);
      }

      if (task.status === "InProgress") {
        inprogress.push(task);
      }

      if (task.status === "Done") {
        done.push(task);
      }
    });
    setTasksToDo(todo);
    setTasksInProgress(inprogress);
    setTasksIsDone(done);
  }, [tasks]);

  const request = async () => {
    const response = await createRequest("/boards/" + id, {});
    if (response && response.ok) {
      const result = await response.json();
      setTasks(result.data);
    }
  };

  return (
    <div className={styles.board}>
      <h1>{state.name}</h1>
      <div className={styles.table}>
        <div className={styles.column}>
          <div className={styles.title}>To Do</div>
          {tasksToDo.map((item) => (
            <div className={styles.task} key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <div className={styles.title}>InProgress</div>
          {tasksInProgress.map((item) => (
            <div className={styles.task} key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <div className={styles.title}>Done</div>
          {tasksDone.map((item) => (
            <div className={styles.task} key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
