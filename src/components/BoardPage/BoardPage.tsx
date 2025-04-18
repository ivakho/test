import React, {useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { createRequest } from '../../functions/createRequest'
import styles from './BoardPage.module.css'

export const BoardPage = () => {
    const { id } = useParams()

    const location = useLocation();
    const state = location.state as { name?: string; };


  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    const response = await createRequest("/boards/" + id, {});
    if (response && response.ok) {
      const result = await response.json();
      console.log(result.data);
    }
  };

  return (
    <div className={styles.board}>
        <h1>{state.name}</h1>
        <div className={styles.table}>
        </div>
    </div>
  )
}
