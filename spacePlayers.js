/**
 * I have separated the classes into it's own file for readability
 */
class Player {
    constructor() {    
      this.velocity = {
        x: 0,
        y: 0,
      }
      this.rotation = 0
      this.opacity = 1
      const image = new Image();
      image.src ='./img/spaceship.png';
      image.onload = () => {
        const scale = 0.15
        this.image = image
        this.width = image.width*scale
        this.height = image.height*scale
        this.position = {
          x: canvas.width / 2 - this.width / 2,
          y: canvas.height - this.height - 20       
        }      
      }    
    }//end of construct
    rotateImage() { // separating math functionally so it's easier to read
      c.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2
      )
      c.rotate(this.rotation)
      c.translate(
        -player.position.x - player.width / 2, 
        -player.position.y - player.height / 2)
    }
    draw() {
      //c.fillStyle = "red";
      //c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.save()
      c.globalAlpha = this.opacity
      this.rotateImage()
      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y,
        this.width,
        this.height)  
      c.restore()    
    }  
    updateLocation() {
      if(this.image){
      this.draw()
      this.position.x += this.velocity.x
      }    
    }
  }//End of player class
  class Particle {
    constructor({position, velocity, radius, color, fades}) {
      this.position = position
      this.velocity = velocity
      this.radius = radius
      this.color = color
      this.opacity = 1
      this.fades = fades
    }
    draw() {
      c.save()
      c.globalAlpha = this.opacity
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
      c.restore()    
    }
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      if(this.fades)
      this.opacity -= 0.01
    }
  }//end of projectile class
  class projectile{
    constructor({position, velocity}) {
      this.position = position
      this.velocity = velocity
      this.radius = 4
    }
    draw() {
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = 'red'
      c.fill()
      c.closePath()    
    }
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }//end of projectile class
  
  class invaderProjectile{
    constructor({position, velocity}) {
      this.position = position
      this.velocity = velocity
      this.width = 3
      this.height = 10
    }
    draw() {
      c.fillStyle = 'orange'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)  
       
    }
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }//end of invaderProjectile class
  /*
  This is the start of the Invader class.
  */
  class Invader {
    constructor({position}) {    
      this.velocity = {
        x: 0,
        y: 0,
      }
      this.rotation = 0
      const image = new Image();
      image.src ='./img/invader.png';
      image.onload = () => {
        const scale = 1
        this.image = image
        this.width = image.width*scale
        this.height = image.height*scale
        this.position = {
          x: position.x,
          y: position.y       
        }      
      }    
    }//end of construct
    rotateImage() { // separating math functionally so it's easier to read
      c.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2
      )
      c.rotate(this.rotation)
      c.translate(
        -player.position.x - player.width / 2, 
        -player.position.y - player.height / 2)
    }
    draw() {
      //c.fillStyle = "red";
      //c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.save()
      this.rotateImage()
      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y,
        this.width,
        this.height)  
      c.restore()    
    }  
    updateLocation({velocity}) {
      if(this.image){
      this.draw()
      this.position.x += velocity.x,
      this.position.y += velocity.y
      }    
    }
    shoot(invaderProjectiles) {
      invaderProjectiles.push(
        new invaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height
        }, 
        velocity: {
          x: 0,
          y: 5        
        }
      }))    
    }
  }//End of invader class
  /*
Start of the grid class
this grid defines the space in which the invaders form together
*/
class Grid {
    constructor(){
      this.position = {
        x:0,
        y:0
      }    
      this.velocity = {
        x:3,
        y:0
      } 
      this.invaders = []
      const columns = Math.floor((Math.random() * 10) + 5)
      const rows = Math.floor((Math.random() * 5) + 2)
      //variable helps bounce grid to left side
      this.width = columns * 30
      for(let x=0; x<columns;x++){
        for(let y=0;y<rows;y++) {
          this.invaders.push(new Invader({position: {
            x: x*30,
            y: y*30
          }        
          }))        
        }
      }
      console.log('this.invaders:=>',this.invaders)
    } 
    updateLocation() {
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.velocity.y = 0
      if (
        this.position.x + this.width >= canvas.width ||
        this.position.x <= 0) { //<= bounces grid back right
        this.velocity.x = -this.velocity.x
        this.velocity.y = 30 //brings grid down by 1 increment every bounce
      }
    }
  }//end of grid class