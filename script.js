let initialHealth = 100;
let currentHealth = initialHealth;
let fullHealthBarWidth = 300; // (px)
let currentHealthBarWidth = fullHealthBarWidth;
let defenceStance = false;
let attack = document.querySelector("#attack");
let begin = document.querySelector("#begin");
let defend = document.querySelector("#defend");
let animation = document.querySelectorAll("img");

function playerAttackAnimation() {
  animation[0].src = "img/playerattack.png";
}

function fightingStanceAnimation() {
  animation[0].src = "img/playerfightingstance.png";
  animation[1].src = "img/enemyfightingstance.png";
}

function enemyReceiveDamage() {
  let damage = 20;
  currentHealth -= damage;
  currentHealthBarWidth -= (damage / 100) * fullHealthBarWidth;
  let health = document.querySelector("#enemy-health");
  health.style.width = currentHealthBarWidth + "px";
  health.innerText = currentHealth + "HP";
  if (currentHealth < 70) {
    health.style.backgroundColor = "darkorange";
    //tiredanimation()
    if (currentHealth < 50) {
      health.style.backgroundColor = "darkred";
      //weakanimation()
    }
  }
}

attack.addEventListener("click", function () {
  playerAttackAnimation();
  let enemyspeech = document.querySelector("#enemy-speech");
  enemyspeech.innerText = "AGH";
  enemyReceiveDamage();
});

begin.addEventListener("click", function () {
  let playerspeech = document.querySelector("#player-speech");
  playerspeech.setAttribute("hidden", true);
  attack.removeAttribute("hidden");
  defend.removeAttribute("hidden");
  begin.setAttribute("hidden", true);
  fightingStanceAnimation();
});
