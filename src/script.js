// Creamos una array vacía para almacenar a los enemigos
let enemies = []
let gameId
let enemiesId

// Vida
let lives = 5

// Puntuacion
let score = 0

// Punto de inicio y márgenes de los enemigos
let leftSpawn = -100
let rightSpawn = 800

// Comprobamos que el click funciona en el canvas
document.getElementById('canvas').addEventListener('click', function () {
  console.log('canvas')
})

// Función que crea los corazones
function createHearts () {
  let position = 5
  for (let i = 0; i < lives; i++) { // Posible error cuando cambia el valor de lives ???
    let heart = new Heart(position, i + 1)
    heart.create()
    position += 45
  }
}

createHearts()

// Función que elimina los corazones
function removeHearts () {
  let heart = document.getElementById(`heart-${lives + 1}`)
  heart.remove()
}

// Creamos enemigo en diferentes direcciones
function createEnemy () {
  let random = Math.random()

  let direction = 0
  let position = 0
  let height = 0
  let speed = 0

  if (random > 0.5) {
    direction = 1
    position = leftSpawn
  } else {
    direction = -1
    position = rightSpawn
  }

  height = random * 400 + 50
  speed = random * 10 + 10

  // Llamamos al objeto Enemy y creamos uno nuevo
  let enemy = new Enemy(position, direction, height, speed)
  if (enemies.length === 0) {
    enemy.create(-1)
  } else {
    enemy.create(enemies[enemies.length - 1].html.getAttribute('id'))
  }
  // Evento click saca a enemigo
  enemy.html.addEventListener('click', killEnemy)
  enemies.push(enemy)
}

//
function killEnemy(e) {
  // Esta línea mágica hace que al hacer click solo se seleccione el primer elemento
  e.stopPropagation()
  // Eliminar del array sólo el elemento su id correcta
  let enemyIndex = parseInt(e.currentTarget.getAttribute('id'))
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].id === enemyIndex) {
      enemies[i].alive = false
      score += 100
    }
  }
}

// Movimiento de enemigos
function moveEnemies() {
  enemies.forEach(function (enemy, index) {
    if (enemy.alive) {
      enemy.move()
    }
  })
}

function clearEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].left > rightSpawn && enemies[i].direction === 1 ||
      enemies[i].left < leftSpawn && enemies[i].direction === -1 ||
      !enemies[i].alive) {

      if (enemies[i].alive) {
        lives--
        removeHearts()
        console.log('Lives:', lives)
      }

      enemies[i].html.parentNode.removeChild(enemies[i].html)
      enemies.splice(i, 1)
      i--
    }
  }
}

function updateScore() {
  document.getElementById('score').innerText = score
}

function checkLives() {
  if (lives <= 0) {
    clearInterval(gameId)
    clearInterval(enemiesId)
    // window.alert('Game Over')
  }
}

// GAME LOOP
function animate() {
  moveEnemies()
  clearEnemies()
  checkLives()
  updateScore()
}

function startGame() {
  gameId = setInterval(animate, 50)
  enemiesId = setInterval(createEnemy, 2000)
}

startGame()
