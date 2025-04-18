import { ChangeEvent, useState, useEffect } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./Issues.module.css";
import { IssuesPriority } from "./types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTasks } from "../../redux/slices/tasksSlice";
import { Task } from "../Task/Task";
import { openModal } from "../../redux/slices/modalSlice";
import { SearchInput } from "../SearchInput/SearchInput";
import { ModalBox } from "../ModalBox/ModalBox";

export const Issues = () => {
  const [priority, setPriority] = useState();
  const { search } = useAppSelector((state) => state.search);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // setPriority(e.target.value) as string
  };

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

  const filteredTasks = search
    ? tasks.filter((task) => {
        const searchLower = search.toLowerCase();
        const titleMatch = task.title?.toLowerCase().includes(searchLower);
        const assigneeMatch = task.assignee?.fullName
          ?.toLowerCase()
          .includes(searchLower);
        return titleMatch || assigneeMatch;
      })
    : tasks;

  return (
    <div className={styles.issues}>
      <div className={styles.sort}>
        <SearchInput />
        <FormControl fullWidth size="small">
          <InputLabel id="filter-priority">Фильтры</InputLabel>
          <Select
            labelId="filter-priority"
            value={priority}
            label="Приоритет"
            defaultValue=""
            // onChange={handleFilterChange(e.target)}
          >
            <MenuItem value={IssuesPriority.All}>Все</MenuItem>
            <MenuItem value={IssuesPriority.Low}>Низкий</MenuItem>
            <MenuItem value={IssuesPriority.Medium}>Средний</MenuItem>
            <MenuItem value={IssuesPriority.High}>Высокий</MenuItem>
          </Select>
        </FormControl>
      </div>
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
