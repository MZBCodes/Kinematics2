class Vector {
    constructor(x, y, vec){
        if (!vec){
            this.x = x;
            this.y = y;
            this.length = Math.sqrt(this.x * this.x + this.y * this.y)
            this.angle = Math.atan(this.y / this.x)
        } else {
            this.x = vec.x;
            this.y = vec.y;
            this.length = vec.length;
            this.angle = vec.angle;
        }
    }

    calcLength() {
        this.length = Math.sqrt(this.x * this.x + this.y * this.y)
    }

    calcAngle() {
        this.angle = Math.atan(this.y / this.x)
    }

    updateVec() {
        this.calcLength();
        this.calcAngle();
    }

    copy() {
        return new Vector(this.x, this.y, this);
    }
    addX(v2) {
        this.x += v2.x
        this.updateVec()
        return this;
    }

    addY(v2) {
        this.y += v2.y
        this.updateVec()
        return this;
    }

    add(v2){
        this.x += v2.x
        this.y += v2.y
        this.updateVec()
        return this;
    }

    subtractX(v2){
        this.x -= v2.x
        this.updateVec()
        return this
    }

    subtractY(v2){
        this.y -= v2.y
        this.updateVec()
        return this

    }

    subtract(v2){
        this.x -= v2.x;
        this.y -= v2.y;
        this.updateVec()
        return this
    }

    invertX(){
        this.x *= -1;
        this.updateVec()
        return this.x;
    }

    invertY(){
        this.y *= -1;
        this.updateVec()
        return this.x;
    }

    linInter(v2, t){
        let ratioX = v2.x - v1.x;
        let ratioY = v2.y - v1.y;
        this.x = v1.x + (ratioX * t);
        this.y = v1.y + (ratioY * t);
        this.updateVec()
        return this
    }

    scalarMult(s){
        this.x *= s;
        this.y *= s;
        this.updateVec()
        return this;
    }

    scalarDiv(s){
        if (s == 0){
            return null
        }
        this.x /= s;
        this.y /= s;
        this.updateVec()
        return this;
    }

    normalize() {
        if (this.length == 0){
            this.x = 0;
            this.y = 0;
        }
        this.scalarDiv(this.length);
        this.updateVec()
        return this;
    }

    normal(v2) {
        return v2.subtract(this);
    }

    tangent(v2) {
        let norm = this.copy().normal(v2.copy())
        let test = norm.x;
        norm.x = -norm.y;
        norm.y = test;
        return norm;
    }

    rotate(deg, option){
        const toRadians = Math.PI / 180;
        let x = this.x;
        let y = this.y;
        if (option.toUpperCase() == "DEG"){
            this.x = (Math.cos(deg * toRadians) * x) - (Math.sin(deg * toRadians) * y)
            this.y = (Math.sin(deg * toRadians) * x) + (Math.cos(deg * toRadians) * y)
            this.updateVec()
            return this;
        } else if (option.toUpperCase() == "RAD"){
            this.x = (Math.cos(deg) * x) - (Math.sin(deg) * y)
            this.y = (Math.sin(deg) * x) + (Math.cos(deg) * y)
            this.updateVec()
            return this;
        } else {
            console.error("Option paramater MUST be either 'DEG' or 'RAD' ")
            return null;
        }
    }

    dot(v2){
        return this.x * v2.x + this.y * v2.y
    }   
}

const copyVector = (vec) => {
    return new Vector(vec.x, vec.y, vec);
}
