import { useState } from 'react';
import styles from './index.module.css';

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

const Home = () => {
  //計算値(board 画面)= 状態(userInputs) + 状態(bomb Map)
  //bombSet=Ture ;userInputs =false ; setFlag = false
  //userInput
  // 0 -> 未入力
  // 1 -> 左クリック
  // 2 -> 旗を立てる
  // 3 -> 未知の為?を設置
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
  // [userInputs]
  // | 0 = 未クリック
  // | 1 = 左クリック
  // | 2 = 旗
  // | 3 = はてな
  //bombMap 0 -> 無し 1 -> 有り
  const bombCount = 10;
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newBombMap = JSON.parse(JSON.stringify(bombMap));
  //初期値は上記に乗っ取り-1
  //0~8 ->  周りのbombの数
  //9 -> 石 + ?
  //10 -> 石 + flag
  //11 -> bomb
  const board = [
    [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  // // const bombMapCount = newbombMap.flat().filter(Boolean).length;
  // // const onClick = (x: number, y: number) => {
  // //   if (!bombMapCount) {
  // //   }
  // // };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((type, x) => (
              <div
                className={styles.image}
                key={`${x}-${y}`}
                // onClick={() => onClick(x, y)}
                style={{
                  borderStyle: type === -1 || type > 8 ? 'outset' : 'solid',
                  borderWidth: type === -1 || type > 8 ? 5 : 1,
                  backgroundPosition: 30 - 30 * type,
                }}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};
export default Home;
