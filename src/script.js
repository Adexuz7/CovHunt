// CANVAS Y ENEMIGO

// var enemy = document.getElementsByClassName('enemy')[0]
// enemyLeft = -200
// direction = 1

// let enemyAlive = true

var enemy = new Enemy(-200,1)
enemy.create()
enemy.html = document.getElementsByClassName('enemy')[0]
// // ENEMY 2
// enemyRight = 1100
// direction2 = -1
// let enemy2 = document.getElementsByClassName('enemy-2')[0]
// let enemy2Alive = true
// //
document.getElementById('canvas').addEventListener('click', function () {
  console.log('canvas')
})

// DETECTA Y ELIMINA AL ENEMIGO
function killEnemy (e) {
  e.stopPropagation()
  e.currentTarget.parentNode.removeChild(e.currentTarget)
  console.log('Enemy killed')
}

enemy.html.addEventListener('click', killEnemy)


// MOVEMENT

const moveBox = function () {
    enemy.left += 10 * enemy.direction;
    enemy.html.style.left = enemy.left + 'px';
  
    //enemyRight += 10 * - 1 // Cambiar direccion enemy2
   // enemy2.style.left = enemyRight + 'px' // Move enemy 2

    if (enemy.left > 1000 && !enemy.alive) {
      
      enemy.html.parentNode.removeChild(enemy.html);
      enemy.alive = false
      console.log('enemigo azul ha desaparecido')

  }

  // Check if enemy 2 shoud be destroyed
  // if (enemyRight < -300 && enemy2Alive) {
  //   enemy2.parentNode.removeChild(enemy2)
  //   enemy2Alive = false
  //   console.log('enemigo amarillo ha desaparecido')
  // }
}

timerId = setInterval(moveBox, 50);



