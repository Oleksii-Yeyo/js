const cargoBoat = [2,8,1,16,5,16,4,3,2,1,0,8,2,8,0,1,2,3,4,5,5,2,];

function loadGrain(levels) {
  const cutOffTheHighestWall = (walls) => {
    const sortedWalls = [...walls].sort((a, b) => b - a);
    const theFirstHighestWall = sortedWalls[0];
    const theSecondHighestWall = sortedWalls[1];

    const clippedBoat = walls.map((wall) =>
      wall === theFirstHighestWall ? (wall = theSecondHighestWall) : wall
    );

    return clippedBoat;
  };

  levels = cutOffTheHighestWall(levels);

  const arrayWithLayers = [];

  while (!levels.every((wall) => !wall)) {
    const layer = levels.map((wall) => (wall ? (wall = 1) : 0));
    arrayWithLayers.push(layer);

    levels = levels.map((wall) => (wall ? wall - 1 : 0));
  }

  const arrayForDrawing = [];

  const createArrayForDrawing = (layer) => {
    layer = layer.join("").split("");
    for (let i = 0; i < layer.length; i++) {
      if (layer[i] === "0") {
        layer[i] = "*";
      } else {
        break;
      }
    }

    for (let i = layer.length - 1; i > 0; i--) {
      if (layer[i] === "0") {
        layer[i] = "*";
      } else {
        break;
      }
    }
    arrayForDrawing.unshift(layer);
  };

  arrayWithLayers.map((layer) => createArrayForDrawing(layer));

  const calculateCapacityOfLayer = (layer) => {
    layer = layer.join("").split("1");
    layer.pop();
    layer.shift();
    const capacityOfLayer = layer.join("").length;

    return capacityOfLayer;
  };

  let capacityOfBoat = 0;

  arrayWithLayers.map((layer) => {
    capacityOfBoat += calculateCapacityOfLayer(layer);
  });

  return [arrayForDrawing, capacityOfBoat];
}

// console.log(loadGrain(cargoBoat)[0]);

//---
const boatData = loadGrain(cargoBoat);
const board = boatData[0];

const capacity_output = document.getElementById('capacity-output');
capacity_output.innerHTML = 'grain: ' + boatData[1];


const boardSize = {
  rows: board.length,
  cols: board[0].length
};

const chessboard = document.getElementById("chessboard");

for (let i = 0; i < boardSize.rows; i++) {
  const layer = document.createElement("div");
  layer.classList.add("layer");

  for (let j = 0; j < boardSize.cols; j++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if (board[i][j] === "1") {
      square.classList.add("gray");
    } else if (board[i][j] === "0") {
      square.classList.add("orange");
    } else {
      square.classList.add("white");
    }
    layer.appendChild(square);
    chessboard.appendChild(layer);
  }

}
