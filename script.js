//Enemy health variables
let enemyInitialHealth = 100; //HP
let enemyCurrentHealth = enemyInitialHealth;
let enemyFullHealthBarWidth = 300; // (px)
let enemyCurrentHealthBarWidth = enemyFullHealthBarWidth;

//Player
let playerInitialHealth = 100; //HP
let playerCurrentHealth = playerInitialHealth;
let playerFullHealthBarWidth = 300; // (px)
let playerCurrentHealthBarWidth = playerFullHealthBarWidth;

//Defense boolean to reduce damage
let defenseStance = false;

//Selectors
//Buttons
let begin = document.querySelector("#begin"); //Initiates battle
let attack = document.querySelector("#attack"); //Attack enemy
let defend = document.querySelector("#defend"); //Guard stance to reduce damage
let next = document.querySelector("#next"); //Prompts enemy to attack
let retry = document.querySelector("#retry"); //Game over button
//Speech bubbles
let enemySpeech = document.querySelector("#enemy-speech");
let playerSpeech = document.querySelector("#player-speech");
let announcerSpeech = document.querySelector("#announcer-speech");

//Music
let music = document.querySelector("#music");

//Animations [0, 1]
let animation = document.querySelectorAll("img");

//Animation change functions
////////////////////////////////////////////
function playerAttackAnimation() {
  animation[0].src = "img/playerstance.png";
  setTimeout(function () {
    animation[0].src = "img/playerattack.png";
  }, 100);
}
function enemyAttackAnimation() {
  animation[1].src = "img/enemystance.png";
  setTimeout(function () {
    animation[1].src = "img/enemyattack.png";
  }, 100);
}
function playerDefendAnimation() {
  animation[0].src = "img/playerdefend.png";
}
function playerFightingStanceAnimation() {
  animation[0].src = "img/playerstance.png";
}
function enemyFightingStanceAnimation() {
  animation[1].src = "img/enemystance.png";
}
function playerWeakenedAnimation() {
  animation[0].src = "img/playerweakened.png";
}
function enemyWeakenedAnimation() {
  animation[1].src = "img/enemyweakened.png";
}
function playerLowHealthAnimation() {
  animation[0].src = "img/playerlowhealth.png";
}
function enemyLowHealthAnimation() {
  animation[1].src = "img/enemylowhealth.png";
}
function playerDefeatedAnimation() {
  animation[0].src = "img/playerdefeated.png";
}
function enemyDefeatedAnimation() {
  animation[1].src = "img/enemydefeated.png";
}
//Animation for when player used defend and guards next attack?
//////////////////////////////////////////////

function enemyReceiveDamage() {
  enemyWeakenedAnimation();
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
      if (enemyCurrentHealth == 0) {
        enemyDefeatedAnimation();
        enemyHealth.remove();
      }
    }
  }
}

function playerReceiveDamage(defense) {
  playerWeakenedAnimation();
  let damage = defense === true ? 10 : 30;
  playerCurrentHealth -= damage;
  playerCurrentHealthBarWidth -= (damage / 100) * playerFullHealthBarWidth;
  //Turn defense back off
  defenseStance = false;
  let playerHealth = document.querySelector("#player-health");
  playerHealth.style.width = playerCurrentHealthBarWidth + "px";
  playerHealth.innerText = playerCurrentHealth + "HP";
  if (playerCurrentHealth < 70) {
    playerHealth.style.backgroundColor = "darkorange";
    //player weakened animation
    if (playerCurrentHealth < 50) {
      playerHealth.style.backgroundColor = "darkred";
      playerLowHealthAnimation();
      if (playerCurrentHealth <= 0) {
        playerDefeatedAnimation();
        playerHealth.remove();
        music.src =
          "https://fi.zophar.net/soundfiles/playstation-psf/final-fantasy-vii/215%20Continue.mp3";
        gameOver();
      }
    }
  }
}

function showActionMenu() {
  attack.removeAttribute("hidden");
  defend.removeAttribute("hidden");
}

function hideActionMenu() {
  attack.setAttribute("hidden", true);
  defend.setAttribute("hidden", true);
}

//Initiates battle sequence
begin.addEventListener("click", function () {
  playerSpeech.setAttribute("hidden", true);
  showActionMenu();
  begin.setAttribute("hidden", true);
  playerFightingStanceAnimation();
  enemyFightingStanceAnimation();
  music.src =
    "https://fi.zophar.net/soundfiles/nintendo-snes-spc/final-fantasy-iv/13%20Fight%202.mp3";
});

//Player attacks and deals damage to enemy
attack.addEventListener("click", function () {
  playerAttackAnimation();
  enemySpeech.innerText = `"AGH!"`;
  announcerSpeech.innerText = "20 hit points dealt!!";
  enemyReceiveDamage();
  next.removeAttribute("hidden");
  hideActionMenu();
});

//Enemy attacks and deals damage to player
next.addEventListener("click", function () {
  enemyAttackAnimation();
  enemySpeech.innerText = `"TAKE THIS!"`;
  if (defenseStance === true) {
    announcerSpeech.innerText = "10 damage received!!";
  } else {
    announcerSpeech.innerText = "30 damage received!!";
  }
  next.setAttribute("hidden", true);
  showActionMenu();
  playerReceiveDamage(defenseStance);
});

//Game over function
function gameOver() {
  hideActionMenu();
  setTimeout(function () {
    animation[1].src = "img/enemywinner.png";
  }, 2000); // 2000 milliseconds = 2 seconds

  playerSpeech.removeAttribute("hidden");
  playerSpeech.innerText = `"This can't be..."`;
  enemySpeech.innerText = `"You disappoint me."`;
  announcerSpeech.innerText = "Game over.";
  retry.removeAttribute("hidden");
}

//Retry button
retry.addEventListener("click", function () {
  location.reload();
});

defend.addEventListener("click", function () {
  playerDefendAnimation();
  announcerSpeech.innerText = "Next attack damage reduced by half!!";
  hideActionMenu();
  next.removeAttribute("hidden");
  defenseStance = true;
});
