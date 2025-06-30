import { useState } from "react";

const TILES = [
  ...Array.from({ length: 4 }, () => [
    ..."123456789".split("").map(n => `${n}筒`),
    ..."123456789".split("").map(n => `${n}索`),
    "東", "南", "西", "北", "中", "發", "白",
  ]).flat(),
  "春", "夏", "秋", "冬", "梅", "蘭", "竹", "菊"
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MahjongDemo() {
  const [wall, setWall] = useState(shuffle(TILES));
  const [hands, setHands] = useState([[], [], []]);
  const [dealt, setDealt] = useState(false);

  const deal = () => {
    const newWall = [...wall];
    const newHands = [[], [], []];
    for (let i = 0; i < 16; i++) {
      for (let p = 0; p < 3; p++) {
        newHands[p].push(newWall.pop());
      }
    }
    newHands[0].push(newWall.pop()); // 莊家多一張
    setWall(newWall);
    setHands(newHands);
    setDealt(true);
  };

  const drawTile = (playerIndex) => {
    if (wall.length === 0) return;
    const newWall = [...wall];
    const newHands = [...hands];
    newHands[playerIndex] = [...newHands[playerIndex], newWall.pop()];
    setWall(newWall);
    setHands(newHands);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">三人麻將 DEMO</h1>
      {!dealt && <button onClick={deal} className="px-4 py-2 bg-blue-500 text-white rounded">發牌</button>}
      {dealt && (
        <div className="space-y-4">
          {hands.map((hand, i) => (
            <div key={i}>
              <h2 className="font-semibold">玩家 {i + 1}</h2>
              <div className="flex flex-wrap gap-1">
                {hand.map((tile, idx) => (
                  <div key={idx} className="border rounded p-1 bg-white">{tile}</div>
                ))}
              </div>
              <button onClick={() => drawTile(i)} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
                玩家 {i + 1} 摸牌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
