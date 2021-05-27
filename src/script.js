/* Parámetros del juego */

// Punto de aparición y huida de los enemigos
const leftSpawn = -125
const rightSpawn = 815

// Vidas y puntuación iniciales
const startingLives = 4
const startingScore = 0

// Incremento en la puntuación cada vez que matamos a un enemigo
const scoreIncrement = 100

// Intervalos para el juego y la creación de enemigos
const gameInterval = 50
const enemiesInterval = 2000

/* --- */

const enemies = [] // Enemigos en pantalla
let lives = startingLives
let score = startingScore
let gameId, enemiesId

// Obtener elementos del DOM
const canvas = document.getElementById('canvas')
const audio = document.getElementsByTagName('audio')[0]
const cursor = document.getElementById('cursor')
const gameStart = document.getElementById('game-start')
const gameStartBtn = document.getElementById('btn-game-start')
const playAgainBtn = document.getElementById('btn-play-again')

// El jugador falla el disparo (click en el canvas)
canvas.addEventListener('click', function () {
  console.log('¡Has fallado!')
})

// Botón que inicia la partida
gameStartBtn.addEventListener('click', function () {
  startGame()
})

// Botón que reinicia la partida
playAgainBtn.addEventListener('click', function () {
  resetGame()
})

// Dibuja los corazones
function createHearts () {
  let position = 5 // Posición del primer corazón
  const spacing = 45 // Espacio entre cada corazón

  // Dibuja tantos corazones como vidas tengamos
  for (let i = 0; i < lives; i++) {
    const heart = new Heart(position, i)
    heart.create()
    position += spacing
  }
}

// Resta vida y elimina el corazón correspondiente
function loseLife () {
  lives--
  document.getElementById(`heart-${lives}`).remove()
}

// Creamos enemigos en diferentes direcciones
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

  height = random * 280 + 100
  speed = random * 5 + 10

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

// Matar a un enemigo
function killEnemy (e) {
  e.stopPropagation() // Detectar click únicamente sobre el enemigo

  const enemyIndex = parseInt(e.currentTarget.getAttribute('id'))

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].id === enemyIndex) {
      enemies[i].alive = false
      cursor.play()
      updateScore()
    }
  }
}

// Hacer que los enemigos se muevan
function moveEnemies () {
  enemies.forEach(function (enemy, index) {
    if (enemy.alive) enemy.move()
  })
}

// Limpiar los enemigos de la pantalla
function clearEnemies () {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].left > rightSpawn && enemies[i].direction === 1 ||
      enemies[i].left < leftSpawn && enemies[i].direction === -1 ||
      !enemies[i].alive) {

      if (enemies[i].alive) loseLife() // Si un enemigo vivo sale de la pantalla perdemos vida

      enemies[i].html.parentNode.removeChild(enemies[i].html) // Eliminar el enemigo (div) del html
      enemies.splice(i, 1) // Eliminar el enemigo del array de enemigos
      i--
    }
  }
}

// Eliminar todos los enemigos
function resetEnemies () {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].html.parentNode.removeChild(enemies[i].html)
    enemies.splice(i, 1)
    i--
  }
}

// Comprobar vidas
function checkLives () {
  if (lives <= 0) gameOver() // Si nos quedamos sin vidas acaba la partida
}

// Actualizar la puntuación
function updateScore () {
  score += scoreIncrement
  document.getElementById('score').innerText = 'Score: ' + score
}

function gameLoop () {
  moveEnemies()
  clearEnemies()
  checkLives()
}

// Iniciar la partida
function startGame () {
  canvas.style.display = 'initial' // Asegurar la visibilidad del canvas
  gameStart.style.display = 'none' // Ocultar portada del juego
  audio.play()
  createHearts()
  gameId = setInterval(gameLoop, gameInterval)
  enemiesId = setInterval(createEnemy, enemiesInterval)
}

// Reiniciar la partida
function resetGame () {
  lives = startingLives // Reiniciar vidas
  score = startingScore // Reiniciar puntuación
  resetEnemies() // Reiniciar enemigos
  startGame() // Empezar la partida
}

// Terminar la partida
function gameOver () {
  canvas.style.display = 'none'
  audio.pause()
  clearInterval(enemiesId)
  clearInterval(gameId)
}
