const cargoBoat = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 5, 5, 3, 3, 2, 2, 1, 1, 0, 0,
]; // ==> 1

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

  return capacityOfBoat;
}

console.log(loadGrain(cargoBoat));
