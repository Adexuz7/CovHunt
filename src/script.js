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
  enemy.html = document.getElementById(`enemy${enemies.length}`)
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
  console.log('Enemy killed')
  // Eliminar del array sólo el elemento su id correcta
  //console.log('AAAAAA', e.currentTarget.alive)

  // Para el setInterval
  clearInterval(timerId)
}

// Movimiento de enemigos
function moveEnemies () {
  enemies.forEach(function (enemy, index) {
    if (enemy.alive) enemy.move()
    
    if (enemy.left > 1000 || enemy.left < -200) {
      // enemy.alive = false
      enemy.die()
      enemies.splice(index, 1)
    }
  })

/*
  // Recorremos cada elemento de la array
  enemies.forEach(function (enemy) {
    if (enemy.alive) enemy.move() // si está alive

    if (enemy.left > 1000 || enemy.left < -200) {
      console.log('Alive:', enemy.alive)
      enemy.alive = false
      // enemies.pop() <- eliminar enemigo del array
      //enemy.die()
      // poner alive a false
    }
  })


 
  // recorrer todo el array y eliminar alive false
  enemies.forEach(function (enemy) {
    if (!enemy.alive) enemy.die() // si está alive
  })

  */
}

// MOVEMENT
timerId = setInterval(moveEnemies, 50)

//gameId = setInterval(createEnemy, 2000)
createEnemy()
