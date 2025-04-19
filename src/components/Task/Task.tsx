import { useAppDispatch } from "../../hooks/hooks";
import { openModal } from "../../redux/slices/modalSlice";
import { getTask } from "../../redux/slices/taskSlice";
import styles from "./Task.module.css";
import { ITaskProps } from "./types/types";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

export const Task = ({ id, title, boardId, status, assignee }: ITaskProps) => {
  const dispatch = useAppDispatch();

  const onTaskClick = () => {
    dispatch(
      openModal({
        isOpen: true,
        isNewTask: false,
        isIssues: true,
        boardId: boardId,
      })
    );
    dispatch(getTask(id));
  };

  const statusClassName = () => {
    if (status === "Backlog") return styles.backlog;
    if (status === "InProgress") return styles.inProgress;
    if (status === "Done") return styles.done;
    return "";
  };

  return (
    <div className={styles.task} onClick={onTaskClick}>
      <PanoramaFishEyeIcon className={statusClassName()} />
      <div>{title}</div>
      <div className={styles.assignee}>{assignee}</div>
    </div>
  );
};
