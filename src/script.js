/* Parámetros del juego */

// Punto de aparición y huida de los enemigos
const leftSpawn = -125
const rightSpawn = 815

// Vidas y puntuación iniciales
const startingLives = 5
const startingScore = 0

// Velocidad de los enemigos
const startingEnemySpeed = 5

// Incremento en la puntuación cada vez que matamos a un enemigo
const scoreIncrement = 100

// Intervalos para el juego y la creación de enemigos
const gameInterval = 50
const enemiesInterval = 1200

/* --- */

const enemies = [] // Enemigos en pantalla
let lives = startingLives
let score = startingScore
let enemySpeed = startingEnemySpeed
let gameId, enemiesId
let level = 1

// Obtener elementos del DOM
const canvas = document.getElementById('canvas')
const audio = document.getElementsByTagName('audio')[0]
const cursor = document.getElementById('cursor')
const life = document.getElementById('life')
const button = document.getElementById('button')
const gameStart = document.getElementById('game-start')
const gameStartBtn = document.getElementById('btn-game-start')
const gameOverScore = document.getElementById('game-over-score')
const playAgainBtn = document.getElementById('btn-play-again')

// PAUSA (BUG)
// let pause = false
// window.addEventListener('keydown', function (e) {
//   if (e.code === 'KeyP' && !pause) {
//     console.log(pause)
//     pause = true
//     clearInterval(enemiesId)
//     clearInterval(gameId)
//   } else if (e.code === 'KeyP' && pause) {
//     console.log(pause)
//     pause = false
//     gameId = setInterval(gameLoop, gameInterval)
//     enemiesId = setInterval(createEnemy, enemiesInterval)
//   }
// })

// El jugador falla el disparo (click en el canvas)
canvas.addEventListener('click', function () {
  console.log('¡Has fallado!')
})

// Botón que inicia la partida
gameStartBtn.addEventListener('click', function () {
  button.play()
  gameStartBtn.setAttribute('disabled', 'disabled')
  setTimeout(startGame, 600)
})

// Botón que reinicia la partida
playAgainBtn.addEventListener('click', function () {
  button.play()
  playAgainBtn.setAttribute('disabled', 'disabled')
  setTimeout(resetGame, 600)
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
  life.play()
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
  // speed = random * 5 + 10
  speed = random * enemySpeed + 10

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
  document.getElementById('level').innerText = 'Level: ' + level

  // ¿Alguien dijo niveles? :D
  switch (score) {
    case 600:
      level = 2
      enemySpeed = 6
      break
    case 1800:
      level = 3
      enemySpeed = 10
      break
    case 3000:
      level = 4
      enemySpeed = 15
  }

  console.log('LEVEL:', level)
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
  playAgainBtn.removeAttribute('disabled')
  lives = startingLives // Reiniciar vidas
  score = startingScore // Reiniciar la puntuación
  enemySpeed = startingEnemySpeed // Reiniciar la velocidad de los enemigos
  document.getElementById('score').innerText = 'Score: ' + score
  resetEnemies()
  startGame()
}

// Terminar la partida
function gameOver () {
  canvas.style.display = 'none'
  audio.pause()
  clearInterval(enemiesId)
  clearInterval(gameId)
  gameOverScore.innerText = 'Score: ' + score
}
