// CANVAS Y ENEMIGO

// var enemy = document.getElementsByClassName('enemy')[0]
// enemyLeft = -200
// direction = 1

// let enemyAlive = true
var enemies = []

// // ENEMY 2
// enemyRight = 1100
// direction2 = -1
// let enemy2 = document.getElementsByClassName('enemy-2')[0]
// let enemy2Alive = true
// //
document.getElementById('canvas').addEventListener('click', function () {
  console.log('canvas')
})

function createEnemy () {
  var direction = 0
  var position = 0

  if (Math.random() > 0.5) {
    direction = 1
    position = -200
  } else {
    direction = -1
    position = 1000
  }

  var enemy = new Enemy(position, direction)
  enemy.create(enemies.length)
  enemy.html = document.getElementById(`enemy${enemies.length}`)
  enemy.html.addEventListener('click', killEnemy)
  enemies.push(enemy)
}

// DETECTA Y ELIMINA AL ENEMIGO
function killEnemy (e) {
  e.stopPropagation()
  e.currentTarget.parentNode.removeChild(e.currentTarget)
  console.log('Enemy killed')
  // Eliminar del array sólo el elemento su id correcta

  clearInterval(timerId)
}

function moveEnemies() {
  enemies.forEach(function (enemy) {
    enemy.move()
    if (enemy.left > 1000 || enemy.left < -200) {
      // sacar del array sólo el elemento con la id correcta
      enemies.pop()
      enemy.die()
    }
  })
}

// MOVEMENT
timerId = setInterval(moveEnemies, 50)

gameId = setInterval(createEnemy, 1000)
