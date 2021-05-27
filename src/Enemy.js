// Creamos un objeto con la plantilla base de Enemy
function Enemy (left, direction, height, speed) {
  var self = this

  // Properties (propiedades)
  this.left = left
  this.top = height
  this.topMax = height - 100
  this.topMin = height + 100
  this.speed = speed
  this.direction = direction
  this.verticalDirection = 1
  this.html = 0
  this.id = -1
  this.alive = true

  // Función que crea un nuevo enemigo y lo añade al DOM
  this.create = function (lastId) {
    let canvas = document.getElementById('canvas')
    let enemy = document.createElement('div')
    enemy.classList.add('enemy')
    self.id = parseInt(lastId) + 1
    enemy.setAttribute('id', self.id)
    enemy.style.left = self.left + 'px'
    canvas.appendChild(enemy)
    self.html = document.getElementById(self.id)
  }

  this.move = function () {
    self.left += self.speed * self.direction
    self.html.style.left = self.left + 'px' // Distancia de la izquierda
    self.html.style.top = self.top + 'px' // Distancia del margen superior
    self.top += self.speed * self.verticalDirection
    if(self.top <= self.topMax || self.top >= self.topMin) {
      self.verticalDirection *= -1
    }
  }

  this.die = function () {
    self.html.parentNode.removeChild(self.html)
  }
}
