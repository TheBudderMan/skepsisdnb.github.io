const scoreCounter = document.querySelector('#scoreCounter')
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
//Player class to be made for 
//abstraction purposes
//keep function titles simple so they make sense in usage
//Example: Player.draw() as you know it will obviously draw the player
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

/*
This is where we initiate the new objects
for the animate functions to use
*/
const player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []
//defines the keys for input
const keys = {
  a: {pressed:false},  
  d: {pressed:false},  
  space: {pressed:false}} 


function enemyShoot(grid) {
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if(invaderProjectile.position.y + 
      invaderProjectile.height >= 
      canvas.height) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1)
      },0)
    } else{
      invaderProjectile.update()
    }    
    if(
      invaderProjectile.position.y + 
      invaderProjectile.height >=
      player.position.y &&
      invaderProjectile.position.x +
      invaderProjectile.width >=
      player.position.x &&
      invaderProjectile.position.x <= player.position.x +
      player.width
      ) {
        setTimeout(() => {
          invaderProjectiles.splice(index, 1)
          player.opacity = 0
          game.over = true
        },0)
        setTimeout(() => {          
          game.active = false
        },2000)
        createParticles({
          object: player,
          color: 'white',
          fades:true
        })
        console.log('youloselol')}    
  })
  if (frames % 100 === 0 && grid.invaders.length > 0) {
    grid.invaders[
                  Math.floor(Math.random() * grid.invaders.length
                  )].shoot(invaderProjectiles)
  }  
}//end of enemy shoot
function animateInvaderGrid() {  
  grids.forEach((grid, gridIndex) => {
    grid.updateLocation()         
    //enemie projectiles
    enemyShoot(grid)
    projectileAnimation()
    // I imagine enemy collision detection is next    
    grid.invaders.forEach((invader, i) => {
      //updates the invaders location in a grid across screen
      invader.updateLocation({velocity: grid.velocity})      
      //tracking projectile for collision detection      
      projectiles.forEach((projectile, j) => {
        if (
          //if top side of projectile touches an invaders top 
          projectile.position.y - projectile.radius <= 
          invader.position.y + invader.height && 
          //and the right side touches 
          projectile.position.x + projectile.radius >= 
          invader.position.x - invader.height&& 
          //and the left side touches 
          projectile.position.x - projectile.radius <= 
          invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= 
          invader.position.y
          ){          
          //this whole thing is the collision detection
            setTimeout(() => {
              const invaderFound = grid.invaders.find(
                invaderLocated => 
                {return invaderLocated === invader})
              const projectileFound = projectiles.find(
                projectileLocated => projectileLocated === projectile)                
              if (invaderFound && projectileFound){
                //add the store here as well
                score += 100;
                console.log('Score:   =>',score)
                scoreCounter.innerHTML = score
                //calling the animation for explosions here
                createParticles({
                  object: invader,
                  fades:true
                })
                grid.invaders.splice(i, 1)
                projectiles.splice(j,1)
                if (grid.invaders.length > 0) {
                  const firstInvader = grid.invaders[0]
                  const lastInvader = grid.invaders[
                    grid.invaders.length - 1]
                  grid.width = 
                  lastInvader.position.x - 
                  firstInvader.position.x +
                  lastInvader.width
                  grid.position.x = firstInvader.position.x
                }
              } else  {
                //grids.splice(gridIndex, 1)
              }             
            }, 0)//end setTimeout
        }
      })
    })
  })
}
//messes with it if these aren't global
let frames = 0
let randomIntervals = Math.floor((Math.random() * 500) + 500)
let game = {
  over:false,
  active: true
}
let score = 0
function spawnEnemy() {
  //if statement contained as function for readability  
  if (frames % randomIntervals ===0) {
    //console.log("randomIntervals=", randomIntervals)
    grids.push(new Grid())    
    randomIntervals = Math.floor(((Math.random() * 500) + 500))
    console.log('Random Intervals=>',randomIntervals)
    frames = 0
  }  
}
function createParticles({object,color, fades}) {
  for (let i=0;i<15;i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2
        },
        velocity: {
          x: ((Math.random() - 0.5)*2),
          y: ((Math.random() - 0.5)*2)
        },
        radius: Math.random() * 3,
        color: color || '#BAA0DE',
        fades
      })
    )
  }   
}
function animateStars() {
  for (let i=0;i<100;i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        },
        velocity: {
          x: 0,
          y: 0.3
        },
        radius: Math.random() * 3,
        color:'white'
      })
    )
    setTimeout(() => {
      particles.splice(i,1)        
    }, 0); 
  }     
}
function animateParticles() {
  particles.forEach(((particle, i) => {
    if(particle.position.y - particle.radius >=
      canvas.height){
        particle.position.x = Math.random() * canvas.width
        particle.position.y = -particle.radius
      }
    if(particle.opacity <= 0){
      setTimeout(() => {
        particles.splice(i,1)        
      }, 0);      
    }else {
      particle.update()
    }    
  }))
}
//animates the player sprite
function animate() {
  if(!game.active) return
  //initiate canvas  
  requestAnimationFrame(animate);
  c.fillStyle = 'black'
  c.fillRect(0,0, canvas.width, canvas.height)  
  //functions for gameplay 
  player.updateLocation()  
  animateInvaderGrid()
  animateParticles()     
  moveLeftOrRight() 
  spawnEnemy()  
  frames++
}
//runs the game
animate();
animateStars()
/**
 * Event listeners used for keyboard inputs
 */
addEventListener('keydown', ({key}) => {
  if (game.over) return
  switch (key) {    
    case 'a': //left
    keys.a.pressed = true
    console.log('leftdown')
      break;     
    case 'd': //right
      keys.d.pressed = true  
      console.log('rightdown')
      break;     
    case ' ':  //space     
    keys.space.pressed = true
    console.log('spacedown')
    projectiles.push(
      new projectile({
        position: {
          x:player.position.x + player.width/2,
          y:player.position.y
        },
        velocity: {
          x:0,
          y:-10
        }
      })
    )
      break;      
  }}) 
addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'a': //left
    keys.a.pressed = false
      break;      
    case 'd': //right
      keys.d.pressed = false   
      break;     
    case ' ':  //space  
    keys.space.pressed = false    
      break;      
  }})
  //if statement that allows user to move player left or right
function moveLeftOrRight() {
  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -7 
    player.rotation = -0.15
  }
  else if (
    keys.d.pressed && 
    player.position.x +player.width <= canvas.width
  ) {
    player.velocity.x = 7 
    player.rotation = 0.15
  }
  else {player.velocity.x = 0, player.rotation = 0}
}
//refreshes the player projectile sprite so it moves across the screen
function projectileAnimation() {  
  projectiles.forEach((projectile, index) => {
    if(projectile.position.y + projectile.radius <= 0){
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)      
    } else {
      projectile.update()
    }    
  })
}//end of projectileAnimation