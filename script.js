////////////////////////////////////////////////////////////
//Variables
///////////////////////////////////////////////////////////

//Enemy health
let enemyInitialHealth = 100; //HP
let enemyCurrentHealth = enemyInitialHealth;
let enemyFullHealthBarWidth = 300; // (px)
let enemyCurrentHealthBarWidth = enemyFullHealthBarWidth;

//Player health
let playerInitialHealth = 100; //HP
let playerCurrentHealth = playerInitialHealth;
let playerFullHealthBarWidth = 300; // (px)
let playerCurrentHealthBarWidth = playerFullHealthBarWidth;

//Defense boolean to reduce damage
let defenseStance = false;

//////////////////////////////////////////////////////////
//Selectors
//////////////////////////////////////////////////////////

//Buttons
let begin = document.querySelector("#begin"); //Initiates battle
let attack = document.querySelector("#attack"); //Attack enemy
let defend = document.querySelector("#defend"); //Guard stance to reduce damage
let spell = document.querySelector("#spell"); //Open spell menu
let heal = document.querySelector("#heal"); //Heal
let next = document.querySelector("#next"); //Prompts enemy to attack
let retry = document.querySelector("#retry"); //Game over button
let ending = document.querySelector("#continue"); //Initiates ending sequence
let musictoggle = document.querySelector("#musictoggle"); //Toggle to play/mute music
let credits = document.querySelector("#credits");

//Speech bubbles
let enemySpeech = document.querySelector("#enemy-speech");
let playerSpeech = document.querySelector("#player-speech");
let announcerSpeech = document.querySelector("#announcer-speech");

//Health bar
let playerHealth = document.querySelector("#player-health");

//Music
let music = document.querySelector("#music");

//Animations
let animation = document.querySelectorAll("img");
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//Animation change functions
//////////////////////////////////////////////////////////
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
function playerHealAnimation() {
  animation[0].src = "img/playerdefault.png";
  setTimeout(function () {
    animation[0].src = "img/playerhealspell.png";
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
function spritesThankingAnimation() {
  animation[0].src = "img/playerthanks.png";
  animation[1].src = "img/enemythanks.png";
}
function enemyProudAnimation() {
  animation[1].src = "img/enemyproud.png";
}
//Animation for when player used defend and guards next attack?
//////////////////////////////////////////////

//Initiate game function
begin.addEventListener("click", function () {
  playerSpeech.setAttribute("hidden", true);
  showActionMenu();
  begin.setAttribute("hidden", true);
  playerFightingStanceAnimation();
  enemyFightingStanceAnimation();
  music.src =
    "https://fi.zophar.net/soundfiles/nintendo-snes-spc/final-fantasy-iv/13%20Fight%202.mp3";
});

//Action menu event handlers
attack.addEventListener("click", function () {
  playerAttackAnimation();
  enemySpeech.innerText = `"AGH!"`;
  announcerSpeech.innerText = "20 damage dealt!!";
  next.removeAttribute("hidden");
  enemyReceiveDamage();
  hideActionMenu();
});

defend.addEventListener("click", function () {
  playerDefendAnimation();
  announcerSpeech.innerText = "67% damage reduction on next attack!!";
  enemySpeech.innerText = "A shield?!";
  hideActionMenu();
  next.removeAttribute("hidden");
  defenseStance = true;
});

spell.addEventListener("click", function () {
  hideActionMenu();
  heal.removeAttribute("hidden");
});

heal.addEventListener("click", function () {
  playerHealAnimation();
  heal.setAttribute("hidden", true);
  next.removeAttribute("hidden");
  enemySpeech.innerText = `"WHAT?! IMPOSSIBLE! Where did you learn such sorcery?!"`;
  playerCurrentHealth += 50;
  if (playerCurrentHealth > 100) {
    announcerSpeech.innerText = "Full health!!";
    playerCurrentHealth = playerInitialHealth;
    playerCurrentHealthBarWidth = playerFullHealthBarWidth;
  } else {
    announcerSpeech.innerText = "50 HP restored!!";
    playerCurrentHealthBarWidth += (50 / 100) * playerFullHealthBarWidth;
  }
  playerHealth.style.width = playerCurrentHealthBarWidth + "px";
  playerHealth.innerText = playerCurrentHealth + "HP";
  if (playerCurrentHealth > 70) {
    playerHealth.style.background =
      "linear-gradient(to right, darkgreen, lightgreen)";
  } else if (playerCurrentHealth < 70 && playerCurrentHealth > 40) {
    playerHealth.style.background =
      "linear-gradient(to right, darkred, orange)";
  }
});

//Prompts enemy attack
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

//Health bar functions upon damage dealing
function enemyReceiveDamage() {
  enemyWeakenedAnimation();
  let damage = 20;
  enemyCurrentHealth -= damage;
  enemyCurrentHealthBarWidth -= (damage / 100) * enemyFullHealthBarWidth;
  let enemyHealth = document.querySelector("#enemy-health");
  enemyHealth.style.width = enemyCurrentHealthBarWidth + "px";
  enemyHealth.innerText = enemyCurrentHealth + "HP";
  if (enemyCurrentHealth < 70) {
    enemyHealth.style.background = "linear-gradient(to left, darkred, orange)";
    if (enemyCurrentHealth < 50) {
      enemyHealth.style.background = "linear-gradient(to left, darkred, red)";
      enemyLowHealthAnimation();
      if (enemyCurrentHealth <= 0) {
        enemyDefeatedAnimation();
        enemyHealth.remove();
        victory();
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
  playerHealth.style.width = playerCurrentHealthBarWidth + "px";
  playerHealth.innerText =
    playerCurrentHealth === 10
      ? playerCurrentHealth
      : playerCurrentHealth + "HP";
  if (playerCurrentHealth < 70) {
    playerHealth.style.background =
      "linear-gradient(to right, darkred, orange)";
    if (playerCurrentHealth < 50) {
      playerHealth.style.background = "linear-gradient(to right, darkred, red)";
      playerLowHealthAnimation();
      if (playerCurrentHealth <= 0) {
        playerDefeatedAnimation();
        playerHealth.remove();
        gameOver();
      }
    }
  }
}

//Helper functions
function showActionMenu() {
  attack.removeAttribute("hidden");
  defend.removeAttribute("hidden");
  spell.removeAttribute("hidden");
}

function hideActionMenu() {
  attack.setAttribute("hidden", true);
  defend.setAttribute("hidden", true);
  spell.setAttribute("hidden", true);
}

//Game over sequence functions
function gameOver() {
  music.src =
    "https://fi.zophar.net/soundfiles/playstation-psf/final-fantasy-vii/215%20Continue.mp3";
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

retry.addEventListener("click", function () {
  location.reload();
});

//Victory sequence functions
function victory() {
  music.src =
    "https://fi.zophar.net/soundfiles/playstation-psf/final-fantasy-vii/111%20Fanfare.mp3";
  next.setAttribute("hidden", true);
  ending.removeAttribute("hidden");
  enemySpeech.innerText = `"Argh..."`;
  announcerSpeech.innerText = "Victory!";
}

ending.addEventListener("click", function () {
  playerHealth.remove();
  playerSpeech.innerText = `"I did it... I DID IT!"`;
  retry.innerHTML = "Play again?";
  animation[0].src = "img/playerdefault.png";
  ending.setAttribute("hidden", true);
  playerSpeech.removeAttribute("hidden");
  enemyLowHealthAnimation();
  setTimeout(function () {
    enemyWeakenedAnimation();
  }, 5000);
  setTimeout(function () {
    enemySpeech.innerText = `"You've grown strong, brother."`;
  }, 5000);
  setTimeout(function () {
    animation[1].src = "img/enemydefault.png";
  }, 8000);
  setTimeout(function () {
    enemyProudAnimation();
    enemySpeech.innerText = `"I'm proud of you."`;
  }, 13000);
  setTimeout(function () {
    playerSpeech.innerText = `"Thanks for playing!"`;
    enemySpeech.innerText = `"Thanks for playing!`;
    spritesThankingAnimation();
    retry.removeAttribute("hidden");
    credits.removeAttribute("hidden");
  }, 15000);
});

//Music toggle
musictoggle.addEventListener("click", function () {
  music.muted = !music.muted;
  let span = musictoggle.querySelector("span");
  span.innerText = music.muted ? " Toggle music on" : " Toggle music off";
});

//Credits button
credits.addEventListener("click", function () {});
