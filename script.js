let initialHealth = 100;
let currentHealth = initialHealth;
let fullHealthBarWidth = 300; // (px)
let currentHealthBarWidth = fullHealthBarWidth;
let defenceStance = false;

function playerAttackAnimation() {
  let animation = document.querySelectorAll("img");
  animation[0].src = "img/playerattack.png";
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
    if (currentHealth < 50) {
      health.style.backgroundColor = "darkred";
    }
  }
}

let attack = document.querySelector("#attack");
attack.addEventListener("click", function () {
  playerAttackAnimation();
  let speech = document.querySelector("#speech");
  speech.innerText = "AGH";
  enemyReceiveDamage();
});

let begin = document.querySelector("#begin");
begin.addEventListener("click", function () {});
