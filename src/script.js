/* Parámetros del juego */

// Punto de inicio y márgenes de los enemigos
const leftSpawn = -100
const rightSpawn = 800

// Vidas y puntuación iniciales
const startingLives = 5
const startingScore = 0

// Intervalos para el juego y los enemigos
const gameInterval = 50
const enemiesInterval = 2000

/* --- */

// Creamos una array vacía para almacenar a los enemigos
const enemies = []
let gameId
let enemiesId

// Vida y puntuación
let lives = startingLives
let score = startingScore

// Elementos del DOM
const canvas = document.getElementById('canvas')
const gameStart = document.getElementById('game-start')
const gameStartBtn = document.getElementById('btn-game-start')
const playAgainBtn = document.getElementById('btn-play-again')

// Comprobamos que el click funciona en el canvas
canvas.addEventListener('click', function () {
  console.log('Has fallado!')
})

// El botón "Start the game" inicia la partida
gameStartBtn.addEventListener('click', function () {
  startGame()
})

// El botón "play again"
playAgainBtn.addEventListener('click', function () {
  resetGame()
})

// Función que crea los corazones
function createHearts () {
  let position = 5
  const spacing = 45

  for (let i = 0; i < lives; i++) {
    const heart = new Heart(position, i + 1)
    heart.create()
    position += spacing
  }
}

// Función que elimina los corazones
function removeHearts () {
  const heart = document.getElementById(`heart-${lives + 1}`)
  heart.remove()
}

// Creamos enemigo en diferentes direcciones
function createEnemy () {
  const random = Math.random()

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
  const enemy = new Enemy(position, direction, height, speed)
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
function killEnemy (e) {
  // Esta línea mágica hace que al hacer click solo se seleccione el primer elemento
  e.stopPropagation()
  // Eliminar del array sólo el elemento su id correcta
  const enemyIndex = parseInt(e.currentTarget.getAttribute('id'))
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].id === enemyIndex) {
      enemies[i].alive = false
      score += 100
    }
  }
}

// Movimiento de enemigos
function moveEnemies () {
  enemies.forEach(function (enemy, index) {
    if (enemy.alive) {
      enemy.move()
    }
  })
}

function clearEnemies () {
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

function updateScore () {
  document.getElementById('score').innerText = 'Score: ' + score
}

function checkLives () {
  if (lives <= 0) gameOver()
}

// GAME LOOP
function animate () {
  moveEnemies()
  clearEnemies()
  checkLives()
  updateScore()
}

function startGame () {
  canvas.style.display = 'initial' // Hace el canvas visible (necesario al reiniciar la partida)
  gameStart.style.display = 'none' // Oculta la portada del juego
  createHearts()
  gameId = setInterval(animate, gameInterval)
  enemiesId = setInterval(createEnemy, enemiesInterval)
}

// Función que reinicia el juego
function resetGame () {
  lives = startingLives // Reinia las vidas
  score = startingScore // Reinicia la puntuación
  // Limpia los enemigos que pudieran haber quedado en pantalla
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].html.parentNode.removeChild(enemies[i].html)
    enemies.splice(i, 1)
    i--
  }
  // Inica el juego
  startGame()
}

function gameOver () {
  canvas.style.display = 'none'
  clearInterval(gameId)
  clearInterval(enemiesId)
}
