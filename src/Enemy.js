function Enemy(left, direction){
  this.left = left
  this.direction = direction
  this.html = 0
  this.alive = true

  this.create = function(){
    var canvas = document.getElementById('canvas')
    var enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.style.left= this.left
    canvas.appendChild(enemy)

  }
}