// Creamos un objeto con la plantilla base de Lives
function Heart() {
  var self = this

  // Properties (propiedades)
  this.num = 0
  this.html = 0

  this.alive = true

  // Función que crea un nueva vida y lo añade al DOM
  this.create = function () {
    let lives = document.getElementById('lives')
    let heart = document.createElement('div')
    heart.classList.add('heart')
    // heart.style.left = self.left + 'px'
    lives.appendChild(heart)
    self.html = document.getElementsByClassName('heart')[0]
  }


  

  this.die = function () {
    self.html.parentNode.removeChild(self.html)
  }
}