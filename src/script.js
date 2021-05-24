// CANVAS Y ENEMIGO
var enemy = document.getElementsByClassName('enemy')[0]
enemyLeft = -200
enemyRight = 1100
direction = 1

let enemyAlive = true


// ENEMY 2
let enemy2 = document.getElementsByClassName('enemy-2')[0]
let enemy2Alive = true
//



console.log(document.getElementById('canvas'))
console.log(document.getElementsByClassName('enemy')[0])

document.getElementById('canvas').addEventListener('click', function () {
  console.log('canvas')
})

// DETECTA Y ELIMINA AL ENEMIGO
function killEnemy (e) {
  e.stopPropagation()
  e.currentTarget.parentNode.removeChild(e.currentTarget)
  console.log('Enemy killed')
}

enemy.addEventListener('click', killEnemy)
enemy2.addEventListener('click', killEnemy)

// MOVEMENT

const moveBox = function () {
    enemyLeft += 10 * direction;
    enemy.style.left = enemyLeft + 'px';
  
    enemyRight += 10 * - 1 // Cambiar direccion enemy2
    enemy2.style.left = enemyRight + 'px' // Move enemy 2

    if (enemyLeft > 1000 && enemyAlive) {
      enemy.parentNode.removeChild(enemy);
      enemyAlive = false
  }

  // Check if enemy 2 shoud be destroyed
  if (enemyLeft > 1000 && enemy2Alive) {
    enemy2.parentNode.removeChild(enemy2)
    enemy2Alive = false
  }
}

timerId = setInterval(moveBox, 50);



