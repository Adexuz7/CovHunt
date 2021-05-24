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
  // 
  console.log(enemies)
  enemies.forEach(function (enemy, index) {
    if (enemy.alive) enemy.move()
    if (enemy.left > 1000 || enemy.left < -200) {
      // enemy.alive = false
      enemy.die()
      enemies.splice(index, 1)
    }
  })
}

// MOVEMENT
timerId = setInterval(moveEnemies, 50)

//gameId = setInterval(createEnemy, 2000)
createEnemy()
createEnemy()
createEnemy()

