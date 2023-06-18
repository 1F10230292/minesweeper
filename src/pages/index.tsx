import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [cellState, setCellState] = useState(1); //0~4 isTap

  //{bomb:True,isTap:False,Flag:False}
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 0, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0],
  ]);
  const directions = [
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  const;
  return (
    <div className={styles.container}>
      <div className={styles.picture} />
    </div>
  );
};

export default Home;
