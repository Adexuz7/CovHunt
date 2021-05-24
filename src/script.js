// Creamos una array vacía para almacenar a los enemigos
var enemies = []

// Comprobamos que el click funciona en el canvas
document.getElementById('canvas').addEventListener('click', function () {
  console.log('canvas')
})

// Creamos enemigo en diferentes direcciones
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

  // Llamamos al objeto Enemy y creamos uno nuevo
  var enemy = new Enemy(position, direction)
  enemy.create(enemies.length)
  enemy.html = document.getElementById(enemies.length)
  // Evento click saca a enemigo
  enemy.html.addEventListener('click', killEnemy)
  enemies.push(enemy)
}

// 
function killEnemy (e) {
  // Esta línea mágica hace que al hacer click solo se seleccione el primer elemento
  e.stopPropagation()
  // Enemigo al que hacemos click es eliminado
  e.currentTarget.parentNode.removeChild(e.currentTarget)
  // Eliminar del array sólo el elemento su id correcta
  let enemyIndex = e.currentTarget.getAttribute('id')
  enemies.splice(enemyIndex, 1)
}

// Movimiento de enemigos
function moveEnemies () {
  var arrRemove = []

  enemies.forEach(function (enemy, index) {
    if (enemy.alive) enemy.move()
    if (enemy.left > 1000 || enemy.left < -200) {
      enemy.alive = false
      arrRemove.push(index)
    }
  })

  for (var i=0; i < arrRemove.length; i++) {
    enemies[i].die()
    console.log(enemies[i].alive)
    enemies.splice(i, 1)

    for (var j=0; j < arrRemove.length; j++) {
      arrRemove[j] = arrRemove[j]--
    }
  }
}

// MOVEMENT
gameId = setInterval(createEnemy, 2000)
timerId = setInterval(moveEnemies, 50)

// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()

