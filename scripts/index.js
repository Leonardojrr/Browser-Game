// Player variables

let tank = document.getElementById("tank");
tank.style.left = window.innerWidth / 2 + "px";
tank.style.top = window.innerHeight / 2 + "px";
tank.positionX = window.innerWidth / 2;
tank.positionY = window.innerHeight / 2;
tank.rotationDeg = 0;
tank.style.transform = "rotate(" + tank.rotationDeg + "deg)";

let bulletCreateDiv = document.createElement("div");
bulletCreateDiv.classList = "bullet";
const bullet = bulletCreateDiv;

let viewX = 0;
let viewY = 0;

let game = document.getElementById("game");
let velocity = 4;

let obstacule0 = document.getElementById("obstacule0");
let obstacule1 = document.getElementById("obstacule1");
let obstacule2 = document.getElementById("obstacule2");

//Controls

tank.controls = {
  foward: 0,
  back: 0,
  rotateLeft: 0,
  rotateRight: 0
};

window.addEventListener("keydown", e => {
  switch (e.key) {
    //Rotate to the left

    case "a":
      tank.controls.rotateLeft = 1;
      break;

    //Rotate to the right

    case "d":
      tank.controls.rotateRight = 1;
      break;

    //Go back

    case "s":
      tank.controls.back = 1;
      break;

    //Go foward

    case "w":
      tank.controls.foward = 1;
      break;
  }
});

window.addEventListener("keyup", e => {
  switch (e.key) {
    //Rotate to the left

    case "a":
      tank.controls.rotateLeft = 0;
      break;

    //Rotate to the right

    case "d":
      tank.controls.rotateRight = 0;
      break;

    //Go back

    case "s":
      tank.controls.back = 0;
      break;

    //Go foward

    case "w":
      tank.controls.foward = 0;

      break;
  }
});

function moveTank(controls) {
  // Rotate

  tank.rotationDeg -=
    velocity * controls.rotateLeft * (controls.foward + controls.back);
  tank.rotationDeg +=
    velocity * controls.rotateRight * (controls.foward + controls.back);
  tank.style.transform = "rotate(" + tank.rotationDeg + "deg)";

  // Back

  //Mueve el tanque para atras

  tank.positionX +=
    -Math.sin((tank.rotationDeg * Math.PI) / 180) * velocity * controls.back;

  tank.positionY +=
    Math.cos((-tank.rotationDeg * Math.PI) / 180) * velocity * controls.back;

  tank.style.top = tank.positionY + "px";
  tank.style.left = tank.positionX + "px";

  //Mueve la pantalla

  viewX +=
    -Math.sin((tank.rotationDeg * Math.PI) / 180) * velocity * controls.back;
  viewY +=
    Math.cos((-tank.rotationDeg * Math.PI) / 180) * velocity * controls.back;
  window.scroll(viewX, viewY);

  //Foward

  //Mueve el tanque para adelante

  tank.positionX +=
    Math.sin((tank.rotationDeg * Math.PI) / 180) * velocity * controls.foward;
  tank.positionY +=
    -Math.cos((tank.rotationDeg * Math.PI) / 180) * velocity * controls.foward;
  tank.style.top = tank.positionY + "px";
  tank.style.left = tank.positionX + "px";

  //Mueve la pantalla

  viewX +=
    Math.sin((tank.rotationDeg * Math.PI) / 180) * velocity * controls.foward;
  viewY +=
    -Math.cos((tank.rotationDeg * Math.PI) / 180) * velocity * controls.foward;
  window.scroll(viewX, viewY);
}

function shoot() {
  tank.appendChild(bullet);
}

function setCoordenates() {}

setInterval(() => {
  if (Object.values(tank.controls).includes(1) === true) {
    moveTank(tank.controls);
  }
}, 20);
