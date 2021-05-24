// CANVAS Y ENEMIGO
var enemy = document.getElementsByClassName('enemy')[0]
enemyLeft = -200
enemyRight = 10
direction = 1

let enemyAlive = true


// ENEMY 2
let enemy2 = document.getElementsByClassName('enemy-2')[0]


//



console.log(document.getElementById('canvas'))
console.log(document.getElementsByClassName('enemy')[0])



// DETECTA Y ELIMINA AL ENEMIGO

document.getElementById('canvas').addEventListener('click',function(){
console.log('canvas')
})
document.getElementsByClassName('enemy')[0].addEventListener('click', 
function (e) {
 e.stopPropagation()
  enemy.parentNode.removeChild(enemy);
  console.log('enemy') })




let killEnemy = function (e) {
  e.stopPropagation()
  enemy.parentNode.removeChild(enemy);
  console.log('enemy')
}

  // MOVEMENT

const moveBox = function () {
    enemyLeft += 10 * direction;
    enemy.style.left = enemyLeft + 'px';
    if (enemyLeft > 1000 && enemyAlive) {
      enemy.parentNode.removeChild(enemy);
      enemyAlive = false
  }
}

timerId = setInterval(moveBox, 50);



