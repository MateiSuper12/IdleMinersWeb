const game = {
  coins: 0,
  coal: 0,

  xp: 0,
  level: 1,

  totalMined: 0,
  totalSold: 0,

  pickaxeLevel: 1,
  backpackLevel: 1
};
function saveGame() {
  localStorage.setItem(
    "idleMinerSave",
    JSON.stringify(game)
  );
}

function loadGame() {
  const save =
    localStorage.getItem("idleMinerSave");

  if (save) {
    Object.assign(
      game,
      JSON.parse(save)
    );
  }
}
function mine() {
  const amount = game.pickaxeLevel;

  game.coal += amount;
  game.xp += amount;

  game.totalMined += amount;

  updateLevel();

  updateUI();

  saveGame();
}
function updateLevel() {
  game.level =
  Math.floor(
    Math.sqrt(game.xp / 100)
  ) + 1;
}
function sellAll() {

  const coalPrice = 5;

  const income =
    game.coal * coalPrice;

  game.coins += income;

  game.totalSold += game.coal;

  game.coal = 0;

  updateUI();

  saveGame();
}
function updateUI() {

  document.getElementById(
    "coins"
  ).textContent = game.coins;

  document.getElementById(
    "coal"
  ).textContent = game.coal;

  document.getElementById(
    "xp"
  ).textContent = game.xp;

  document.getElementById(
    "level"
  ).textContent = game.level;
}
loadGame();
updateUI();

setInterval(
  saveGame,
  30000
);
