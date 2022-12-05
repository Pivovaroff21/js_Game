const btnNew = document.querySelector("#btn-new");
const btnLoad = document.querySelector("#btn-load");
const menu = document.querySelector(".menu");
const playground = document.querySelector(".playground");
const enemy = document.querySelector(".enemy");
const pokemon = document.querySelector(".pokemon");
const btnFind = document.querySelector("#btn-find");
const countdownDiv = document.querySelector(".countdown");
const control = document.querySelector(".control");
const btnKick = document.querySelector("#btn-kick");
const catchScreen = document.querySelector(".catch_screen");
let currentLvl = 0;  
let timer;
let savedHp;
const player =[
    { lvl: 1, img: "pikachu.png", name: "Pikachu", hp: 100 },
]
const enemies = [
  { lvl: 1, img: "charmander.png", name: "Charmander", hp: 100 },
  { lvl: 2, img: "charmander.png", name: "Charmander", hp: 150 },
  { lvl: 3, img: "charmander.png", name: "Charmander", hp: 200 },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function renderPlayer(){
    const playerTemplate = ` 
            <span class="lvl">Lv.${player[0].lvl}</span>

            <img src="./assets/${player[0].img}" class="sprite">

            <div class="details">
                <h2 class="name" id="name-enemy">
                    ${player[0].name}
                </h2>
                <div class="hp">
                    <div class="bar">
                        <div class="health" id="progressbar-player" style="width: 100%;"></div>
                    </div>
                    <span class="text" id="health-player">${player[0].hp} / ${player[0].hp}</span>
                </div>
            </div>`;
    pokemon.insertAdjacentHTML("afterbegin", playerTemplate);
}

function getDamage(playerNewHp) {
    const playerHP = document.querySelector("#health-player");
    const playerHpBar = document.querySelector("#progressbar-player");
    if(currentLvl >0){
        const savedData = JSON.parse(localStorage.getItem("savings"));
        playerNewHp = savedData.savedHp 
    }
    timer = setInterval(() => {
      if (playerNewHp > 0) {
        playerNewHp -= getRandomInt(20);
        
        playerHpBar.style.width = `${playerNewHp}%`;
        playerHP.textContent = `${playerNewHp}/100`;
        player[0].hp = playerNewHp;
        savedHp = playerNewHp;
      } else {
        alert("You died");
        clearInterval(timer);
      }
    }, 1000);
  
}
function doDamageWrap(){
    doDamage(currentEnemy);
}
function doDamage(){
      const enemyHP = document.querySelector("#health-enemy");
      const enemyHpBar = document.querySelector("#progressbar-enemy");
      const currentEnemy = enemies[currentLvl]; 
      if (currentEnemy.hp > 0) {
        currentEnemy.hp -= getRandomInt(20);
        enemyHpBar.style.width = `${currentEnemy.hp}%`;
        enemyHP.textContent = `${currentEnemy.hp}/100`;
        console.log(currentEnemy.hp);
      } else {
        
        alert("Victory");
        clearInterval(timer);
        enemy.textContent = "";
        currentLvl++;
        btnFind.classList.remove("d_none");
        btnFind.textContent = "Next";
        localStorage.setItem(
          "savings",
          JSON.stringify({ currentLvl, savedHp })
        );
        btnKick.classList.add("d_none");
      }
}


function generateGame(enemies) {
  let currentEnemy;
  switch (currentLvl) {
    case 0:
      currentEnemy = enemies[0];
      break;
    case 1:
      currentEnemy = enemies[1];
      break;
    case 2:
      currentEnemy = enemies[2];
      break;
  }
  console.log(currentEnemy);
  const enemyTemplate = ` 
            <span class="lvl">Lv.${currentEnemy.lvl}</span>

            <img src="./assets/${currentEnemy.img}" class="sprite">

            <div class="details">
                <h2 class="name" id="name-enemy">
                    ${currentEnemy.name}
                </h2>
                <div class="hp">
                    <div class="bar">
                        <div class="health" id="progressbar-enemy" style="width: 100%;"></div>
                    </div>
                    <span class="text" id="health-enemy">${currentEnemy.hp} / ${currentEnemy.hp}</span>
                </div>
            </div>`;
    
  enemy.insertAdjacentHTML("beforeend", enemyTemplate);
  btnKick.addEventListener("click",doDamage,false)
  
  
  

}
function changePic(url) {
  countdownDiv.insertAdjacentHTML(
    "afterbegin",
    `<img class="count_img" src = "./assets/${url}">`
  );
  setTimeout(() => (countdownDiv.textContent = ""), 900);
}
function countdown() {
    if(currentLvl === enemies.length){
        playground.classList.add("d_none");
        catchScreen.classList.remove("d_none");
        menu.classList.remove("d_none");
    }else{
        btnFind.classList.add("d_none");
        changePic("3.png");
        setTimeout(changePic, 2000, "2.png");
        setTimeout(changePic, 3500, "figth.png");
        setTimeout(() => {
          btnKick.classList.remove("d_none");
          getDamage(player[0].hp);
        }, 4500);
        setTimeout(generateGame, 4500, enemies);
    }
    
  }
  

btnFind.addEventListener("click", countdown);

btnNew.addEventListener("click", () => {
  menu.classList.add("d_none");
  playground.classList.remove("d_none");
  renderPlayer();
});

btnLoad.addEventListener("click", () => {
  if (localStorage.getItem("savings")) {
    menu.classList.add("d_none");
    playground.classList.remove("d_none");
  } else {
    alert("У вас нет побежденных противников");
  }
});
