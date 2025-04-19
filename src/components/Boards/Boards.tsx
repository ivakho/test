import { useEffect } from "react";
import styles from "./Boards.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Board } from "../Board/Board";
import { getBoards } from "../../redux/slices/boardsSlice";

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
          <Board key={board.id} id={board.id} name={board.name} />
        ))}
      {boardsErr && <p style={{ color: "red" }}>{boardsErr}</p>}
    </div>
  );
};
