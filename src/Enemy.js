// Creamos un objeto con la plantilla base de Enemy
function Enemy (left, direction) {
  var self = this

  // Properties (propiedades)
  this.left = left
  this.direction = direction
  this.html = 0
  this.id = ''
  this.alive = true

  // Función que crea un nuevo enemigo y lo añade al DOM
  this.create = function (length) {
    let canvas = document.getElementById('canvas')
    let enemy = document.createElement('div')
    enemy.classList.add('enemy')
    this.id = `${length}`
    enemy.setAttribute('id', this.id)
    enemy.style.left = this.left
    canvas.appendChild(enemy)
  }

  this.move = function () {
    self.left += 10 * self.direction
    self.html.style.left = self.left + 'px'
  }

  this.die = function () {
    self.html.parentNode.removeChild(self.html)
  }
}
