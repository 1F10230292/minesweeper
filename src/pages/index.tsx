// import type { MouseEvent } from 'react';
// import { useState } from 'react';
// import styles from './index.module.css';

// const Home = () => {
//   //計算値(board 画面)= 状態(userInputs) + 状態(bomb Map)
//   //bombSet=Ture ;userInputs =false ; setFlag = false
//   //userInput
//   // 0 -> 未入力
//   // 1 -> 左クリック
//   // 2 -> 旗を立てる
//   // 3 -> 未知の為?を設置
//   // (0 | 1 | 2 | 3)はTypeScriptのユニオン型である。つまり、与えられた文脈では、
//   // 配列の各値は0、1、2、3のいずれかでなければならない。それ以外の数値や型は認められない。
//   // これは、値がこれら4つの数値のいずれかに制限されることを意味する。
//   // - [][]は、useStateフックで処理される状態が2次元配列であることを意味する。
//   // まとめると、useState<(0 | 1 | 2 | 3)[][]>式は、Reactの関数型コンポーネントでステート変数を宣言することを意味します： 0、1、2、または3です。
//   const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   ]);
//   const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
//   // [userInputs]
//   // | 0 = 未クリック
//   // | 1 = 左クリック
//   // | 2 = 旗
//   // | 3 = はてな
//   // コードの要素を分解してみよう：
//   // newUserInputs: (0 | 1 | 2 | 3)[][] - これはTypeScriptの型宣言である。
//   // ここでは、配列の配列である変数newUserInputsを宣言しており、各内部配列には0、1、2、3型でなければならない要素が含まれている。
//   // これらの型はTypeScriptではUnion型とも呼ばれる。つまり、変数はこれら4つの値のいずれかを格納できる。
//   // JSON.parse(JSON.stringify(userInputs)) - JavaScriptのJSON.stringify()メソッドは、JavaScriptのオブジェクトや値をJSON文字列に変換する。
//   // JSON.parse()メソッドは、JSON文字列を解析し、文字列によって記述されたJavaScriptの値またはオブジェクトを構築します。
//   // ここでは、userInputsオブジェクトのディープコピーを作成しています。
//   // 要約すると、このコードではまず、元のデータの変異の問題を回避するために userInputs のディープ コピーを作成し、
//   // それを newUserInputs 変数に代入しています。変数newUserInputsは2次元配列で、許容値は0、1、2、3である。

//   //bombMap 0 -> ボム無し 1 -> ボム有り
//   const bombCount = 10;
//   const [bombMap, setBombMap] = useState([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   ]);
//   // このスニペットは、人気のあるウェブ開発ライブラリ、Reactを使ってJavaScriptで書かれている。
//   // ReactのuseStateフックを使って、bombCountというconst変数とbombMapというステート変数を定義している。
//   // 1. const bombCount = 10；
//   // 値を10に設定したbombCountという名前の定数を定義している。この値は、マインスイーパゲームのようなゲームやアプリケーションで爆弾の数を設定または追跡するために使用される可能性が高い。
//   // 2. const [bombMap, setBombMap] = useState([...])；
//   // useStateは、関数コンポーネントに状態を追加するためのHookだ。ここでいうステートとはJavaScriptの変数のようなものだが、Reactが変更を追跡し、必要に応じてコンポーネントを再レンダリングするための特別な機能がついている。
//   // useStateフックは1つの引数、初期状態を受け取ります。この場合、配列の配列（9x9）で、すべてゼロで初期化される。
//   // useStateフックは2つの要素を持つ配列を返す。最初の要素（bombMap）は現在の状態値である。2番目の要素（setBombMap）は、状態を更新するための関数です。
//   // bombMapの状態は、マインスイーパゲームのゲーム盤を表すことができる。これは9x9のグリッドで、0は爆弾のない安全な場所を表すかもしれない。
//   // setBombMapは、bombMapの値を変更したいときに使う関数です。例えば、ゲーム中に爆弾が仕掛けられた場合、対応するbombMapの位置を0から1に更新することができる。
//   // ここで重要なのは、Reactでステートを更新するには常にsetState関数（ここではsetBombMap）を使用することである。ステートを直接操作すること（例えば、bombMap[1][1] = 1）は、コンポーネントの再レンダリングを保証しないため、Reactではバッドプラクティスとみなされる。
//   // 状態を使用する理由は、状態が更新されるたびにコンポーネントが再レンダリングされ、UIが常に最新の状態を反映するようになるからです。

//   const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
//   //   このコード行は、bombMapのディープコピーを作成し、newBombMapという新しい変数に代入している。わかりやすいように、各部分を分解してみよう：
//   // 1. bombMap： 1.bombMap：これはおそらく、数値の配列の配列（数値の2次元配列、または「行列」）である。
//   // これはゲームに役立つ情報や、このような構造化が必要なその他のデータを表すことができる。
//   // 2. JSON.stringify(bombMap)： この部分は、bombMapをJSON文字列に変換します。JSON.stringify()は、JavaScriptの値をJSON文字列に変換する関数です。この場合は、bombMapの配列を文字列に変換しています。この関数は、単なる参照ではなく、オブジェクトのディープコピーを作成することも重要です。
//   // 3. JSON.parse(...)： この関数はJSON文字列を受け取り、JavaScriptの値に変換します。ここでは、文字列化されたBombMapを2D配列に戻しています。ただし、時間をかけて文字列化し、再度解析したため、newBombMapという名前の新しい配列は、元のbombMapとは完全に別のコピーになっています。これを「ディープコピー」といいます。この新しい配列の値を変更しても、元のbombMapには影響しません。
//   // 4. const newBombMap： この部分は、newBombMapという名前の新しい定数変数を宣言し、そこにディープコピーした配列を代入しています。constを使って変数を宣言しているので、コードの後半で再代入することはできません。
//   // 要約すると、この行の目的は、bombMapのディープコピーを保持する新しい変数を作成することである。この新しい変数を使えば、元のbombMap変数の内容を変更することなく、そのデータを変更したり操作したりすることができる。これは、一時的な目的のためにデータを操作したいが、将来の使用のために元のデータも保持したい場合など、多くの状況で非常に便利です。
//   //bombMap 0 -> ボム無し 1 -> ボム有り
//   //bombMapは直接useStateに入れる事は出来ない。newBombMapを挟んでからuseStateに入れることができる。
//   //: number[][]は入れなくてもいい
//   const board: number[][] = [
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//   ];
//   // // const bombMapCount = newbombMap.flat().filter(Boolean).length;
//   // // const onClick = (x: number, y: number) => {
//   // //   if (!bombMapCount) {
//   // //   }
//   // // };
//   //初期値は上記に乗っ取り-1
//   //0 -> 石無し表示なし
//   //1~8 ->  周りのbombの数
//   //9 -> 石 + ?
//   //10 -> 石 + flag
//   //11 -> bomb
//   let gameState = 0;
//   // [GameState]
//   // | 0 : スタート前
//   // | 1 : ゲーム中
//   // | 2 : ゲーム終了(クリア)
//   // | 3 : ゲーム終了(爆発)

//   const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
//   if (isPlaying) gameState = 1;
//   const isFailure = userInputs.some((row, y) =>
//     row.some((input, x) => input === 1 && bombMap[y][x] === 1)
//   );
//   if (isFailure) {
//     gameState = 3;
//     console.log('爆破');
//   }

//   const directions = [
//     [1, -1],
//     [0, -1],
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, 1],
//     [1, 1],
//     [1, 0],
//   ];

//   const checkClear = () => {
//     let stoneCount = 0;
//     for (let x = 0; x < 9; x++) {
//       for (let y = 0; y < 9; y++) {
//         if (board[y][x] === -1 || board[y][x] === 9 || board[y][x] === 10) stoneCount++;
//       }
//     }
//     if (stoneCount === 10) {
//       gameState = 2;
//       console.log('クリア');
//     }
//   };


//   const getRandomInt = (min: number, max: number) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
//   };
//   const setBomb = (x: number, y: number) => {
//     const r1 = getRandomInt(0, 9);
//     const r2 = getRandomInt(0, 9);

//     if (r2 === x && r1 === y) {
//       setBomb(x, y);
//     } else if (newBombMap[r1][r2] === 0) {
//       newBombMap[r1][r2] = 1;
//     } else {
//       setBomb(x, y);
//     }
//   };
//   //115-125行目で再起関数が利用されている。
//   const checkAround = (x: number, y: number) => {
//     let bombs = 0;
//     for (const [dy, dx] of directions) {
//       if (
//         bombMap[y + dy] !== undefined &&
//         bombMap[y + dy][x + dx] !== undefined &&
//         bombMap[y + dy][x + dx] === 1
//       ) {
//         bombs++;
//       }
//     }
//     board[y][x] = bombs;
//     if (bombs === 0) {
//       for (const [dy, dx] of directions) {
//         if (
//           board[y + dy] !== undefined &&
//           board[y + dy][x + dx] !== undefined &&
//           (board[y + dy][x + dx] === -1 ||
//             board[y + dy][x + dx] === 9 ||
//             board[y + dy][x + dx] === 10)
//         ) {
//           checkAround(x + dx, y + dy);
//         }
//       }
//     }
//   };
//   const onRightClick = (x: number, y: number, event: MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     switch (userInputs[y][x]) {
//       case 0:
//         newUserInputs[y][x] = 2;
//         board[y][x] = 9;
//         break;
//       case 2:
//         newUserInputs[y][x] = 3;
//         board[y][x] = 10;
//         break;
//       case 3:
//         newUserInputs[y][x] = 0;
//         board[y][x] = -1;
//         break;
//     }
//     setUserInputs(newUserInputs);
//   };
//   const onLeftClick = (x: number, y: number) => {
//     if (gameState <= 1) {
//       if (!isPlaying) {
//         for (let i = 0; i < bombCount; i++) {
//           setBomb(x, y);
//         }
//         setBombMap(newBombMap);
//       }
//       if (userInputs[y][x] === 0) {
//         newUserInputs[y][x] = 1;
//         setUserInputs(newUserInputs);
//       }
//     }
//   };
//   const makeBoard = () => {
//     for (let x = 0; x < 9; x++) {
//       for (let y = 0; y < 9; y++) {
//         if (userInputs[x][y] === 1) {
//           if (bombMap[x][y] === 0) {
//             checkAround(y, x);
//           } else {
//             board[x][y] = 11;
//           }
//         } else if (userInputs[x][y] === 2) {
//           board[x][y] = 9;
//         } else if (userInputs[x][y] === 3) {
//           board[x][y] = 10;
//         } else if (isFailure && bombMap[x][y] === 1) {
//           board[x][y] = 11;
//         }
//       }
//     }
//   };
//   makeBoard();
//   checkClear();
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <div className={styles.icon} style={{ backgroundPosition: -300 - 30 * gameState }} />
//       </div>
//       <div className={styles.board}>
//         {board.map((row, y) =>
//           row.map((state, x) => (
//             <div
//               className={styles.cell}
//               key={`${x}-${y}`}
//               onContextMenu={(event) => onRightClick(x, y, event)}
//               onClick={() => onLeftClick(x, y)}
//             >
//               {state === -1 && <div className={styles.stone} />}

//               <div className={styles.icon} style={{ backgroundPosition: 30 - 30 * state }} />
//               <div className={styles.stone}>
//                 <div className={styles.icon} style={{ backgroundPosition: 540 - 30 * state }} />
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };
// export default Home;
