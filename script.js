//Enemy health variables
let enemyInitialHealth = 100; //HP
let enemyCurrentHealth = enemyInitialHealth;
let enemyFullHealthBarWidth = 300; // (px)
let enemyCurrentHealthBarWidth = enemyFullHealthBarWidth;

//Defense boolean to reduce damage
let defenceStance = false;

//Button selectors
let begin = document.querySelector("#begin"); //Initiates battle
let attack = document.querySelector("#attack"); //Attack enemy
let defend = document.querySelector("#defend"); //Guard stance to reduce damage
let next = document.querySelector("#next"); //Prompts enemy to attack

//Animations [0, 1]
let animation = document.querySelectorAll("img");

//Animation change functions
////////////////////////////////////////////
function playerAttackAnimation() {
  animation[0].src = "img/playerattack.png";
}

function fightingStanceAnimation() {
  animation[0].src = "img/playerstance.png";
  animation[1].src = "img/enemystance.png";
}

function enemyWeakenedAnimation() {
  animation[1].src = "img/enemyweakened.png";
}

function enemyLowHealthAnimation() {
  animation[1].src = "img/enemylowhealth.png";
}

function enemyDefeatedAnimation() {
  animation[1].src = "img/enemydefeated.png";
}
//////////////////////////////////////////////

function enemyReceiveDamage() {
  let damage = 20;
  enemyCurrentHealth -= damage;
  enemyCurrentHealthBarWidth -= (damage / 100) * enemyFullHealthBarWidth;
  let enemyHealth = document.querySelector("#enemy-health");
  enemyHealth.style.width = enemyCurrentHealthBarWidth + "px";
  enemyHealth.innerText = enemyCurrentHealth + "HP";
  if (enemyCurrentHealth < 70) {
    enemyHealth.style.backgroundColor = "darkorange";
    enemyWeakenedAnimation();
    if (enemyCurrentHealth < 50) {
      enemyHealth.style.backgroundColor = "darkred";
      enemyLowHealthAnimation();
      if (enemyCurrentHealth <= 0) {
        enemyDefeatedAnimation();
      }
    }
  }
}

attack.addEventListener("click", function () {
  playerAttackAnimation();
  let enemySpeech = document.querySelector("#enemy-speech");
  enemySpeech.innerText = "AGH";
  let announcer = document.querySelector("#announcer");
  announcer.innerText = "20 hit points dealt!!";
  enemyReceiveDamage();
  next.removeAttribute("hidden");
  attack.setAttribute("hidden", true);
  defend.setAttribute("hidden", true);
});

begin.addEventListener("click", function () {
  let playerSpeech = document.querySelector("#player-speech");
  playerSpeech.setAttribute("hidden", true);
  attack.removeAttribute("hidden");
  defend.removeAttribute("hidden");
  begin.setAttribute("hidden", true);
  fightingStanceAnimation();
});

