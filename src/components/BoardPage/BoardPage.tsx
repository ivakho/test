import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./BoardPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { openModal } from "../../redux/slices/modalSlice";
import { getTask } from "../../redux/slices/taskSlice";
import { getBoardTasks } from "../../redux/slices/boardTasksSlice";

export const BoardPage = () => {
  const { id } = useParams();
  const { boardTasks } = useAppSelector((state) => state.boardTasks);

  const location = useLocation();
  const state = location.state as { name?: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardTasks(Number(id)));
  }, [id]);

  const getTasksByStatus = (status: string) => {
    return boardTasks.filter((task) => task.status === status);
  };

  const onTaskClick = (taskId: number) => {
    dispatch(
      openModal({
        isOpen: true,
        isNewTask: false,
        isIssues: false,
        boardId: Number(id),
      })
    );
    dispatch(getTask(taskId));
  };

  return (
    <div className={styles.board}>
      <h1>{state?.name || "Проект"}</h1>
      <div className={styles.table}>
        <div className={styles.column}>
          <div className={styles.title}>To do</div>
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
