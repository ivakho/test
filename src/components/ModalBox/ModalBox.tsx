import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box
} from "@mui/material";
import { IModalBoxFormInputs } from "./types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUsers } from "../../redux/slices/usersSlice";
import { closeModal } from "../../redux/slices/modalSlice";
import { Controller } from "react-hook-form";
import { clearTask } from "../../redux/slices/taskSlice";
import { getBoards } from "../../redux/slices/boardsSlice";

export const ModalBox = () => {
  const { users, usersLoading, usersErr } = useAppSelector(
    (state) => state.users
  );
  const { boards, boardsLoading, boardsErr } = useAppSelector(
    (state) => state.boards
  );
  const { isOpen, isNewTask } = useAppSelector((state) => state.modal.modal);
  const { task } = useAppSelector((state) => state.task);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<IModalBoxFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      boardId: 0,
      priority: "",
      status: "",
      assigneeId: 0,
    },
  });

  const onSubmit: SubmitHandler<IModalBoxFormInputs> = (data) =>
    console.log(data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers());
      dispatch(getBoards());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isNewTask && task) {
      const defaultValues = {
        title: task.title,
        description: task.description,
        boardId: task.boardId,
        priority: task.priority,
        status: task.status,
        assigneeId: task.assignee.id,
      };
      reset(defaultValues);
    } else {
      reset({
        title: "",
        description: "",
        boardId: 0,
        priority: "",
        status: "",
        assigneeId: 0,
      });
    }
  }, [isNewTask, task]);

  const closeDispatch = () => {
    dispatch(closeModal());
    dispatch(clearTask());
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeDispatch} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isNewTask ? "Создание" : "Редактирование"} задачи
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ width: "100%" }}
            >
              <TextField
                autoFocus
                margin="dense"
                label="Название"
                fullWidth
                {...register("title")}
              />
              <TextField
                label="Описание"
                multiline
                rows={4}
                fullWidth
                {...register("description")}
              />
              {task.boardName && (
                <TextField
                  label="Проект"
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  value={task.boardName}
                />
              )}
              {!task.boardName && (
                <>
                  <Controller
                    control={control}
                    name="boardId"
                    render={({ field }) => (
                      <TextField select label="Проект" fullWidth {...field}>
                        {boardsLoading && (
                          <MenuItem disabled>Загрузка...</MenuItem>
                        )}
                        {!boardsLoading && boards.length === 0 && (
                          <MenuItem disabled>Пользователи не найдены</MenuItem>
                        )}
                        {!boardsLoading &&
                          boards.map((board) => (
                            <MenuItem key={board.id} value={board.id}>
                              {board.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                  {boardsErr && <p style={{ color: "red" }}>{boardsErr}</p>}
                </>
              )}
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <TextField select label="Приоритет" fullWidth {...field}>
                    <MenuItem value="High">Высокий</MenuItem>
                    <MenuItem value="Medium">Средний</MenuItem>
                    <MenuItem value="Low">Низкий</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <TextField select label="Статус" fullWidth {...field}>
                    <MenuItem value="Backlog">To do</MenuItem>
                    <MenuItem value="InProgress">In progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                control={control}
                name="assigneeId"
                render={({ field }) => (
                  <TextField select label="Исполнитель" fullWidth {...field}>
                    {usersLoading && <MenuItem disabled>Загрузка...</MenuItem>}
                    {!usersLoading && users.length === 0 && (
                      <MenuItem disabled>Пользователи не найдены</MenuItem>
                    )}
                    {!usersLoading &&
                      users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.fullName}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
              {usersErr && <p style={{ color: "red" }}>{usersErr}</p>}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" type="submit">
              {isNewTask ? "Создать" : "Обновить"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
