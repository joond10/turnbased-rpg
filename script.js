let attack = document.querySelector("#attack");
attack.addEventListener("click", function () {
  let animation = document.querySelectorAll("img");
  animation[0].src = "img/playerattack.png";
  let speech = document.querySelector("#speech");
  speech.innerText = "AGH";
});
