import type { MouseEvent } from 'react';
import { useState } from 'react';
import styles from './index.module.css';

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
  //bombMap 0 -> ボム無し 1 -> ボム有り
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
  const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
  //bombMap 0 -> ボム無し 1 -> ボム有り
  //bombMapは直接useStateに入れる事は出来ない。newBombMapを挟んでからuseStateに入れることができる。
  //: number[][]は入れなくてもいい
  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
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
  //初期値は上記に乗っ取り-1
  //0 -> 石無し表示なし
  //1~8 ->  周りのbombの数
  //9 -> 石 + ?
  //10 -> 石 + flag
  //11 -> bomb
  let gameState = 0;
  // [GameState]
  // | 0 : スタート前
  // | 1 : ゲーム中
  // | 2 : ゲーム終了(クリア)
  // | 3 : ゲーム終了(爆発)

  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  if (isPlaying) gameState = 1;
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  if (isFailure) {
    gameState = 3;
    console.log('爆破');
  }

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

  const checkClear = () => {
    let stoneCount = 0;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (board[y][x] === -1 || board[y][x] === 9 || board[y][x] === 10) stoneCount++;
      }
    }
    if (stoneCount === 10) {
      gameState = 2;
      console.log('クリア');
    }
  };

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const setBomb = (x: number, y: number) => {
    const r1 = getRandomInt(0, 9);
    const r2 = getRandomInt(0, 9);
    if (r1 === x && r2 === y) {
      setBomb(x, y);
    } else if (newBombMap[r1][r2] === 0) {
      newBombMap[r1][r2] = 1;
    } else {
      setBomb(x, y);
    }
  };
  //115-125行目で再起関数が利用されている。
  const checkAround = (x: number, y: number) => {
    let bombs = 0;
    for (const [dy, dx] of directions) {
      if (
        bombMap[y + dy] !== undefined &&
        bombMap[y + dy][x + dx] !== undefined &&
        bombMap[y + dy][x + dx] === 1
      ) {
        bombs++;
      }
    }
    board[y][x] = bombs;
    if (bombs === 0) {
      for (const [dy, dx] of directions) {
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          (board[y + dy][x + dx] === -1 ||
            board[y + dy][x + dx] === 9 ||
            board[y + dy][x + dx] === 10)
        ) {
          checkAround(x + dx, y + dy);
        }
      }
    }
  };
  const onRightClick = (x: number, y: number, event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    switch (userInputs[y][x]) {
      case 0:
        newUserInputs[y][x] = 2;
        board[y][x] = 9;
        break;
      case 2:
        newUserInputs[y][x] = 3;
        board[y][x] = 10;
        break;
      case 3:
        newUserInputs[y][x] = 0;
        board[y][x] = -1;
        break;
    }
    setUserInputs(newUserInputs);
  };
  const onLeftClick = (x: number, y: number) => {
    if (gameState <= 1) {
      if (!isPlaying) {
        for (let i = 0; i < bombCount; i++) {
          setBomb(x, y);
        }
        setBombMap(newBombMap);
      }
      if (userInputs[y][x] === 0) {
        newUserInputs[y][x] = 1;
        setUserInputs(newUserInputs);
      }
    }
  };
  const makeBoard = () => {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (userInputs[x][y] === 1) {
          if (bombMap[x][y] === 0) {
            checkAround(y, x);
          } else {
            board[x][y] = 11;
          }
        } else if (userInputs[x][y] === 2) {
          board[x][y] = 9;
        } else if (userInputs[x][y] === 3) {
          board[x][y] = 10;
        } else if (isFailure && bombMap[x][y] === 1) {
          board[x][y] = 11;
        }
      }
    }
  };
  makeBoard();
  checkClear();
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
