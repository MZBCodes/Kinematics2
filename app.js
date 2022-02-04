class Particle {
    constructor(x, y, element, id) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
        this.acc = new Vector(0,0);
        let rand = 10 + Math.random() * 20;
        this.r = rand;
        this.mass = rand * 3;
        this.element = element;
        this.id = id;
        console.log(id);
        this.draw();
    }
    checkEdge(width, height) {
        if (this.pos.x - this.r <= 0){//check left edge
            this.vel.invertX()
        }
        if (this.pos.x + this.r >= width){//check left edge
            this.vel.invertX()
        }
        if (this.pos.y - this.r <= 0){//check left edge
            this.vel.invertY()
        }
        if (this.pos.y + this.r >= height){//check left edge
            this.vel.invertY()
        }
    }

    checkCollision(balls){
        let v1n, v1t, v2n, v2t;
        let v1n1, v1t1, v2n1, v2t1;
        let v1, v2;
        let un, ut;
        for (let i = 0; i < balls.length ; i++){
            let b2 = balls[i]
            if (b2.id == this.id) continue;

            if (b2.pos.copy().subtract(this.pos.copy()).length > (b2.r/2 + this.r/2)){
                continue
            } 
            active.add(this.id, b2.id)
            console.log("COLLIDE");
            un = this.pos.normal(b2.pos.copy()).normalize();
            ut = this.pos.tangent(b2.pos.copy()).normalize();
            v1n = un.dot(this.vel);
            v1t = ut.dot(this.vel);
            v2n = un.dot(b2.vel);
            v2t = ut.dot(b2.vel);
            console.log("un", un, "ut", ut, v1n, v1t, v2n, v2t)
            v1t1 = v1t;
            v2t1 = v2t;
            v1n1 = calculateCollisionVelocity(v1n, v2n, this.mass, b2.mass)
            v2n1 = calculateCollisionVelocity(v2n, v1n, b2.mass, this.mass)
            console.log(v1n1, v1t1, v2n1, v2t1)
            console.log(un, ut);
            v1n1 = un.copy().scalarMult(v1n1);
            v1t1 = ut.copy().scalarMult(v1t1);
            v2n1 = un.copy().scalarMult(v2n1);
            v2t1 = ut.copy().scalarMult(v2t1);
            v1 = v1n1.add(v1t1);
            v2 = v2n1.add(v2t1);
            console.log(this.id, v1, b2.id, v2);
            this.vel = v1;
            balls[i].vel = v2;
            console.log("V2: ", balls[i].vel)
            console.log("P2: ", balls[i].pos)
        }
    }
    
    updateVelocity(dt) {
        this.vel.add(this.acc.copy().scalarMult(dt))
    }
    
    updatePosition(dt) {
        this.pos.add(this.vel.copy().scalarMult(dt))
    }

    draw() {
        this.element.style.position = "absolute";
        this.element.style.top = this.pos.y.toString() + "px";
        this.element.style.left = this.pos.x.toString() + "px";
        this.element.style.width = this.r.toString()  + "px";
        this.element.style.height = this.r.toString()  + "px";
        this.element.style.backgroundColor = "white";
        this.element.style.borderRadius = "50%";
        this.element.style.textAlign = "center";
        this.element.style.lineHeight = this.r.toString() + "px";
        this.element.innerText = this.id;
    }
}




class Box {
    constructor(width, height, element){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.element = element;
        this.draw();
    }

    draw() {
        this.element.style.position = "absolute";
        this.element.style.top = this.y.toString() + "px";
        this.element.style.left = this.x.toString() + "px";
        this.element.style.width = this.width.toString()  + "px";
        this.element.style.height = this.height.toString()  + "px";
        this.element.style.border = "2px solid white";

    }
}



const update = (box, dt) => {
    active.clear();
    for (let i = 0; i < particles.length ; i++){
        if (!active.has(particles[i].id)){
            particles[i].checkCollision(particles);
        }
        particles[i].updateVelocity(dt);
        particles[i].updatePosition(dt);
        particles[i].checkEdge(box.width, box.height);
        particles[i].draw();
    }
}

const calculateCollisionVelocity = (v1, v2, m1, m2) => {
    return (v1 * (m1 - m2) + (2 * m2 * v2)) / (m1 + m2)

}

const spawnBall = (event) => {
    if (event.clientX > 10 && event.clientX < WIDTH - 10 && event.clientY > 10 && event.clientY < WIDTH - 10){
        let element = document.createElement("div")
        boxElement.appendChild(element);
        particles.push(new Particle(event.clientX, event.clientY, element, counter++))
    }
}

const WIDTH = 1000;
const HEIGHT = 1000;
const boxElement = document.getElementById('box');
const boundingBox = new Box(WIDTH,HEIGHT, boxElement);
const particles = [];
let counter = 0;
let FPS = 60;
let active = new Set();

boxElement.addEventListener('click', spawnBall)

setInterval(() => {
    update(boundingBox, 60 / FPS);
}, 1000 / FPS)

