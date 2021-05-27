// Creamos un objeto con la plantilla base de Enemy
function Enemy (left, direction, height, speed) {
  const self = this

  // Properties (propiedades)
  this.left = left
  this.direction = direction
  this.top = height
  this.speed = speed
  this.id = 0
  this.html = 0
  this.alive = true

  // Función que crea un nuevo enemigo y lo añade al DOM
  this.create = function (lastId) {
    const canvas = document.getElementById('canvas')
    const enemy = document.createElement('div')
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
  }

  this.die = function () {
    self.html.parentNode.removeChild(self.html)
  }
}
