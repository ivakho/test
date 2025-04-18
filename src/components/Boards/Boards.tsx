import { useEffect } from "react";
import styles from "./Boards.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Board } from "../Board/Board";
import { getBoards } from "../../redux/slices/boardsSlice";


// не забудь удалить

const sample = [
  {
    description: "safsafasfd",
    id: 1,
    name: "sadasdadasdasf",
    taskCount: 123,
  },
  {
    description: "safsafasfd",
    id: 2,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 3,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 4,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 5,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 6,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 7,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 8,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 9,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 10,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 11,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 12,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 13,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 14,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 15,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 16,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 17,
    name: "sadasdadasdasf",
    taskCount: 123,
  },  {
    description: "safsafasfd",
    id: 18,
    name: "sadasdadasdasf",
    taskCount: 123,
  },
];

export const Boards = () => {
  const dispatch = useAppDispatch();

  const { boards, boardsLoading, boardsErr } = useAppSelector(
    (state) => state.boards
  );

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <div className={styles.boards}>
      {boardsLoading && <div>Загрузка...</div>}
      {!boardsLoading && boards.length === 0 && <div>Проекты не найдены</div>}
      {!boardsLoading &&
        boards.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            name={board.name}
            description={board.description}
            taskCount={board.taskCount}
          />
        ))}
      {boardsErr && <p style={{ color: "red" }}>{boardsErr}</p>}
    </div>
  );
};
