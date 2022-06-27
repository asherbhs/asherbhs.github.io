//Variables

//canvas and context
let canvas = document.getElementById("gameCanvas");
let width = canvas.width = 1280;
let height = canvas.height = 720;
let centre = [Math.round(width/2), Math.round(height/2)];
let ctx = canvas.getContext("2d");

//timings
let timestamp;
let starttime;
let elapsed;
let prevtime = 0;

//assets
let assetCount = 16;
let assetsLoaded = 0;

let normalForward = new Image();
normalForward.onload = function() {
    assetsLoaded++;
}
normalForward.src = "assets/normal-forward.png";
let normalSouth = new Image();
normalSouth.onload = function() {
    assetsLoaded++;
}
normalSouth.src = "assets/normal-south.png";
let normalWest = new Image();
normalWest.onload = function() {
    assetsLoaded++;
}
normalWest.src = "assets/normal-west.png";
let normalEast = new Image();
normalEast.onload = function() {
    assetsLoaded++;
}
normalEast.src = "assets/normal-east.png";
let normalSouthwest = new Image();
normalSouthwest.onload = function() {
    assetsLoaded++;
}
normalSouthwest.src = "assets/normal-southwest.png";
let normalSoutheast = new Image();
normalSoutheast.onload = function() {
    assetsLoaded++;
}
normalSoutheast.src = "assets/normal-southeast.png";
let normalBlank = new Image();
normalBlank.onload = function() {
    assetsLoaded++;
}
normalBlank.src = "assets/normal-blank.png";

let chargedForward = new Image();
chargedForward.onload = function() {
    assetsLoaded++;
}
chargedForward.src = "assets/charged-forward.png";
let chargedSouth = new Image();
chargedSouth.onload = function() {
    assetsLoaded++;
}
chargedSouth.src = "assets/charged-south.png";
let chargedWest = new Image();
chargedWest.onload = function() {
    assetsLoaded++;
}
chargedWest.src = "assets/charged-west.png";
let chargedEast = new Image();
chargedEast.onload = function() {
    assetsLoaded++;
}
chargedEast.src = "assets/charged-east.png";
let chargedSouthwest = new Image();
chargedSouthwest.onload = function() {
    assetsLoaded++;
}
chargedSouthwest.src = "assets/charged-southwest.png";
let chargedSoutheast = new Image();
chargedSoutheast.onload = function() {
    assetsLoaded++;
}
chargedSoutheast.src = "assets/charged-southeast.png";
let chargedBlank = new Image();
chargedBlank.onload = function() {
    assetsLoaded++;
}
chargedBlank.src = "assets/charged-blank.png";

let forwardImage = normalForward;
let southImage = normalSouth;
let westImage = normalWest;
let eastImage = normalEast;
let southwestImage = normalSouthwest;
let southeastImage = normalSoutheast;
let blankImage = normalBlank;

let music = new Audio()
music.src = "assets/music.wav"

let musicLoaded = false;

let brass = new Image();
brass.onload = function() {
    assetsLoaded++
}
brass.src = "assets/brass.png"
let blueVertical = new Image();
blueVertical.onload = function() {
    assetsLoaded++
}
blueVertical.src = "assets/blue-vertical.png"
let blueHorizontal = new Image();
blueHorizontal.onload = function() {
    assetsLoaded++
}
blueHorizontal.src = "assets/blue-horizontal.png"
let redVertical = new Image();
redVertical.onload = function() {
    assetsLoaded++
}
redVertical.src = "assets/red-vertical.png"
let redHorizontal = new Image();
redHorizontal.onload = function() {
    assetsLoaded++
}
redHorizontal.src = "assets/red-horizontal.png"

let bg0 = new Image();
bg0.onload = function() {
    assetsLoaded++
}
bg0.src = "assets/dark-sky.png"
let bg1 = new Image();
bg1.onload = function() {
    assetsLoaded++
}
bg1.src = "assets/bg1.png"
let bg2 = new Image();
bg2.onload = function() {
    assetsLoaded++
}
bg2.src = "assets/bg2.png"
let bg3 = new Image();
bg3.onload = function() {
    assetsLoaded++
}
bg3.src = "assets/bg3.png"
let bg4 = new Image();
bg4.onload = function() {
    assetsLoaded++
}
bg4.src = "assets/bg4.png"
let bg5 = new Image();
bg5.onload = function() {
    assetsLoaded++
}
bg5.src = "assets/bg5.png"
let bg6 = new Image();
bg6.onload = function() {
    assetsLoaded++
}
bg6.src = "assets/bg6.png"
let bg7 = new Image();
bg7.onload = function() {
    assetsLoaded++
}
bg7.src = "assets/bg7.png"
let bg8 = new Image();
bg8.onload = function() {
    assetsLoaded++
}
bg8.src = "assets/bg8.png"
let bg9 = new Image();
bg9.onload = function() {
    assetsLoaded++
}
bg9.src = "assets/bg9.png"

let bg1red = new Image();
bg1red.onload = function() {
    assetsLoaded++
}
bg1red.src = "assets/bg1red.png"
let bg2red = new Image();
bg2red.onload = function() {
    assetsLoaded++
}
bg2red.src = "assets/bg2red.png"
let bg3red = new Image();
bg3red.onload = function() {
    assetsLoaded++
}
bg3red.src = "assets/bg3red.png"
let bg4red = new Image();
bg4red.onload = function() {
    assetsLoaded++
}
bg4red.src = "assets/bg4red.png"
let bg5red = new Image();
bg5red.onload = function() {
    assetsLoaded++
}
bg5red.src = "assets/bg5red.png"
let bg6red = new Image();
bg6red.onload = function() {
    assetsLoaded++
}
bg6red.src = "assets/bg6red.png"
let bg7red = new Image();
bg7red.onload = function() {
    assetsLoaded++
}
bg7red.src = "assets/bg7red.png"
let bg8red = new Image();
bg8red.onload = function() {
    assetsLoaded++
}
bg8red.src = "assets/bg8red.png"
let bg9red = new Image();
bg9red.onload = function() {
    assetsLoaded++
}
bg9red.src = "assets/bg9red.png"

let mousePos = [0, 0];
let posArrMax = 4;
let mousePosArr = []; //array of the previous positions of the mouse relative to the canvas origin
let playerPosArr = []; //array of the previous positions of the player relative to the game world origin
for (let i = 0; i < posArrMax; i++) {
    mousePosArr.push([0, 0]);
    playerPosArr.push([0, 0]);
}
let mouseDown = false;
let charged = false;
let chargeCountdownMax = 60; //number of loops chargeCountdown will be set to upon a click
let chargeCountdown = 0; //number of loops remaining until charge is set back to false
let clickCount = 0; //incremented each time the mouse is clicked down

let playerImage = forwardImage;
let playerSize = [80, 80];
let trailColour;
let playerRect = [0, 0, playerSize[0], playerSize[0]]; //rect of the player in the game world
let playerCirc = [0, 0, 39] //the circle defining the player for collisions [x, y, radius]

let pan = [0, 0]; //vector from true origin to view origin
let panScale = 0.1;
let panAmount = 10;
//let panMin = [-1500, -1500]
//let panMax = [1500 - width, 1500 - height]
let panDirection;
let panCentre;
let keysPressed = [];

for (let i = 0; i < 192; i++) {
    keysPressed.push(false);
}
let keysFirstPressed = Array.from(keysPressed);

let debugVal = "";

let level = -1;
let levels = [level0, level1, level2, level3, level4, level5, level6, level7, level8, level9]
let levelData;
let startPoint;
let endPoint;
let failed = false;
let failTime = 0;
let failBuffer = 1500;
let moteRad = 45;

//Event listeners

canvas.addEventListener("mousemove", function(e) { //whenever the mouse is moved on the canvas
    mousePos = [e.offsetX, e.offsetY]
});

canvas.addEventListener("mousedown", function(e) { //whenever the mouse is clicked down
    mouseDown = true;
    charged = true;
    chargeCountdown = chargeCountdownMax;
    clickCount++;
});

canvas.addEventListener("mouseup", function(e) { //whenever the mouse is unclicked
    mouseDown = false;
    charged = false;
    chargeCountdown = 0;
});

document.addEventListener("keydown", function(e) {
    if (keysPressed[e.keyCode]){
        keysFirstPressed[e.keyCode] = false;
    } else {
        keysFirstPressed[e.keyCode] = true;
    }
    keysPressed[e.keyCode] = true;

})

document.addEventListener("keyup", function(e) {
    keysPressed[e.keyCode] = false;
})

music.addEventListener("canplaythrough", function(e) {
    musicLoaded = true
    console.log("canplaythrough")
});

//Classes
class interactText {
    constructor(text = "Hello, World!", x = 0, y = 0, fill = true, colour = "black", font = "100px sans-serif", linewidth = 1, align = "start", baseline = "top", oncharge = function() {console.log("charged")}) {
        this.text = text;
        this.x = x
        this.y = y
        this.fill = fill
        this.colour = colour
        this.font = font
        this.linewidth = linewidth
        this.align = align
        this.baseline = baseline
        this.rect = []
        this.oncharge = oncharge
        this.click;
    }

    draw() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
        let metrics;
        ctx.font = this.font;
        ctx.linewidth = this.linewidth;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseline;
        
        // if (this.rect.length !== 0) {
        //     ctx.fillStyle = "red"
        //     ctx.fillRect(this.rect[0] - pan[0], this.rect[1] - pan[1], this.rect[2], this.rect[3])
        // }
        
        if (this.fill) {
            ctx.fillStyle = this.colour;
            ctx.fillText(this.text, this.x - pan[0], this.y - pan[1]);
        } else {
            ctx.strokeStyle = this.colour;
            ctx.lineWidth = this.linewidth;
            ctx.strokeText(this.text, this.x - pan[0], this.y - pan[1]);
        }

        if (this.rect.length === 0) {
            metrics = ctx.measureText(this.text)
            this.rect = [this.x - metrics.actualBoundingBoxLeft, this.y - metrics.actualBoundingBoxAscent, metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent]
        }
    }

    charge() {
        if (this.click !== clickCount) {
            this.oncharge()
            this.click = clickCount;
        }
    }
    
}

class wall {
    constructor(rect, drawFunction = function() {ctx.fillStyle = "grey"; ctx.fillRect(this.rect[0], this.rect[1], this.rect[2], this.rect[3])}) {
        this.rect = rect
        this.drawFunction = drawFunction
    }

    draw() {
        this.drawFunction()
    }
}

//Objects

let walls = [];
//functions

function pass(){
    console.log("pass")
}

function vMag(v){ //returns the magnitude of a vector
    let sqsum = 0;
    for (let i = 0; i < v.length; i++) {
        sqsum += v[i]**2;
    }
    return Math.sqrt(sqsum);
}

function vNormalise(v){ //returns the normalised form of a vector (same direction, magnitude of 1), if input vector is a 0 vector then the same zero vector is returned
    let mag = vMag(v);
    if (mag !== 0){
        for (let i = 0; i < v.length; i++) {
            v[i] /= mag;
        }
    }
    return v;
}

function vDiff(a, b){ //returns the vector to travel from a to b, both vectors must have the same number of elements
    let v = [];
    for (let i = 0; i < a.length; i++) {
        v.push(b[i] - a[i]);
    }
    return v;
}

function vSum(a, b){ //returns the sum of vectors a and b, vectors must be the same length
    let v = [];
    for (let i = 0; i < a.length; i++) {
        v.push(a[i] + b[i]);
    }
    return v;
}

function vScale(v, s){ //multiplies vector v by scalar s
    for (let i = 0; i < v.length; i++) {
        v[i] *= s;
    }
    return v;
}

function vDot(a, b){ //returns the dot product of vectors a and b
    let dot = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i]*b[i]
    } 
    return dot;
}

function mean(l){ //returns the mean of a list of numbers
    let sum = 0;
    for (let i = 0; i < l.length; i++) {
        sum += l[i];
    }
    return sum/l.length
}

function max(a) { //finds the maximum value of an array
    let m = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] > m) {
            m = a[i];
        }
    }
    return m
}

function min(a) { //finds the maximum value of an array
    let m = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] < m) {
            m = a[i];
        }
    }
    return m
}

function drawLine(points, colour = "red", thickness = 5, fill = false){
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    if (fill) {
        ctx.fillStyle = colour;
        ctx.fill();
    } else {
        ctx.strokeStyle = colour;
        ctx.stroke();
    }
    ctx.closePath();
}

function drawChar() { //draws teh character image and tail
    if (charged){ //if the player is charged, show the charged image and the charged colour trail, else show the normal image
        trailColour = "rgb(0, 200, 255)"
        forwardImage = chargedForward
        southImage = chargedSouth
        westImage = chargedWest
        eastImage = chargedEast
        southwestImage = chargedSouthwest
        southeastImage = chargedSoutheast
        blankImage = chargedBlank
    } else {
        trailColour = "rgb(255, 200, 0)"
        forwardImage = normalForward
        southImage = normalSouth
        westImage = normalWest
        eastImage = normalEast
        southwestImage = normalSouthwest
        southeastImage = normalSoutheast
        blankImage = normalBlank
    }

    drawTrail(playerPosArr, trailColour, 80)

    //set the correct image depending on the direction of movement
    let v = vDiff(playerPosArr[0], playerPosArr[playerPosArr.length - 1]) //vector for previous mouse motion
    if ((vMag(v) === 0)||(vMag(v) < 2)){ //if the previous mouse movement was small or 0, keep the forward animations
        playerImage = forwardImage
    } else {
        vNormalise(v)
        let angle = Math.acos(vDot([0, -1], v)); //angle from -y to the previous movement vector
        if (angle < Math.PI*3/8){
            playerImage = blankImage
        } else if (angle < Math.PI*5/8){
            if (v[0] < 0) {
                playerImage = westImage
            } else {
                playerImage = eastImage
            }
        } else if (angle < Math.PI*7/8){
            if (v[0] < 0) {
                playerImage = southwestImage
            } else {
                playerImage = southeastImage
            }
        } else {
            playerImage = southImage
        }
    }
    ctx.drawImage(playerImage, mousePosArr[mousePosArr.length - 1][0] - playerRect[2]/2, mousePosArr[mousePosArr.length - 1][1] - playerRect[3]/2); //draw the player sprite, shifted by 40 in the negative direction as the sprite is an 80px square
    //ctx.fillRect(playerRect[0] - pan[0], playerRect[1] - pan[1], playerRect[2], playerRect[3])
}

function drawTrail(points, colour = "white", thick = 80) { //points is a list of points [[x1, y1], [x2, y3]...] where the first point is the skinny end of the trail
    thickness = thick/2
    let trailArr = Array.from(points);
    let p = vScale(Array.from(pan), -1);
    for (let i = 0; i < trailArr.length; i++) {
        trailArr[i] = vSum(trailArr[i], p);
    }

    let line1 = [trailArr[0]]; //adds the first points, line1 starts at the tail end of the tail and ends at the player, line2 is in reverse, this makes drawing the trail simpler
    let line2 = [trailArr[0]];
    let v;
    let v1;
    let v2;
    let len = trailArr.length;

    for (let i = 1; i < len - 1; i++) { //deals with all but the first and last points
        v1 = vNormalise(vDiff(trailArr[i], trailArr[i+1])); //normal vector for the next edge
        v2 = vNormalise(vDiff(trailArr[i-1], trailArr[i])); //normal vector for the previous edge

        v = vScale(vNormalise(vDiff(v1, v2)), thickness*i/len); //vector to move to the control point from the point
        
        if (vMag(v) > 0) {
            if (v1[0]*v2[1] - v1[1]*v2[0] > 0) { //flip the direction of the vector if necessary to ensure all points on line1 or line2 fall on the same side of the mousepoint history line
                v = vScale(v, -1);
            }
            line1.push(vSum(trailArr[i], v)); //add points
            line2.unshift(vSum(trailArr[i], vScale(v, -1)));
        } else {
            v = vScale([v2[1], -v2[0]], thickness*i/len);
            line1.push(vSum(trailArr[i], v));
            line2.unshift(vSum(trailArr[i], vScale(v, -1)));
        }
    }
        
    v = vDiff(trailArr[len - 2], trailArr[len - 1]) //vector for the previous mouse movement
    vNormalise(v)
    vScale(v, thickness);
    v = [v[1], -v[0]];

    line1.push(vSum(trailArr[len - 1], v)); //add the last points
    line2.unshift(vSum(trailArr[len - 1], vScale(v, -1)));
    
    ctx.beginPath() //draw the tail
    ctx.lineWidth = thickness;
    let cpoint1 = line1[Math.round((line1.length-1)*0.25)] //control points are at the quartiles
    let cpoint2 = line1[Math.round((line1.length-1)*0.75)]
    ctx.moveTo(trailArr[0][0], trailArr[0][1])
    ctx.bezierCurveTo(cpoint1[0], cpoint1[1], cpoint2[0], cpoint2[1], line1[line1.length-1][0], line1[line1.length-1][1])
    ctx.lineTo(line2[0][0], line2[0][1])
    cpoint1 = line2[Math.round((line1.length-1)*0.25)]
    cpoint2 = line2[Math.round((line1.length-1)*0.75)]
    ctx.bezierCurveTo(cpoint1[0], cpoint1[1], cpoint2[0], cpoint2[1], line2[line2.length-1][0], line2[line2.length-1][1])
    ctx.fillStyle = colour;
    ctx.fill();
}

function inRange(v, l, u) { //returns true if l < v < u (non inclusive because collisions)
    if (l < u) {
        if (l < v && v < u) {
            return true;
        } else {
            return false;
        }
    } else {
        if (u <= v && v <= l) {
            return true;
        } else {
            return false;
        }
    }

    
}

function checkRectCollide(r1, r2) { //returns true if two rects overlap, rects in form [x, y, width, height]
    if ((inRange(r1[0], r2[0], r2[0] + r2[2]) || inRange(r2[0], r1[0], r1[0] + r1[2])) && (inRange(r1[1], r2[1], r2[1] + r2[3]) || inRange(r2[1], r1[1], r1[1] + r1[3]))) {
        return true;
    } else {
        return false;
    }
}

function checkCircRectCollide(c, r) { //returns true if a circle [x, y, radius] and rect [x, y, width, height]
    if (checkPointInRect([c[0], c[1]], r)) { //centre of circle inside square
        return true
    } else if (checkSegCircCollide([r[0], r[1]], [r[0] + r[2], r[1]], c) || checkSegCircCollide([r[0], r[1]], [r[0], r[1] + r[3]], c) || checkSegCircCollide([r[0], r[1] + r[3]], [r[0] + r[2], r[1] + r[3]], c) || checkSegCircCollide([r[0] + r[2], r[1]], [r[0] + r[2], r[1] + r[3]], c)) { //any side of rect intersects circle
        return true
    } else { 
        return false
    }
}

function checkSegCircCollide(a, b, c) { //checks if the line segment between the points a and b [x, y] collides with the circle c [x, y, r]
    if (a[0] == b[0]) {
        let A = 1;
        let B = -2*c[1]
        let C = c[1]**2 + (a[0] - c[0])**2 - c[2]**2
        let det = B**2 - 4*A*C
        if (det < 0) {
            return false
        } else {
            let y1 = (-B + Math.sqrt(det))/(2*A)
            let y2 = (-B - Math.sqrt(det))/(2*A)
            if (inRange(y1, a[1], b[1]) || inRange(y2, a[1], b[1])) {
                return true
            } else {
                return false
            }
        }
    } else {
        let gradient = (b[1] - a[1])/(b[0] - a[0])
        let yInt = a[1] - gradient*[a[0]]
        let A = gradient**2 + 1
        let B = -2*c[0] + 2*gradient*(yInt - c[1])
        let C = c[0]**2 + c[1]**2 + yInt**2 - 2*c[1]*yInt - c[2]**2
        let det = B**2 - 4*A*C
        if (det < 0) {
            return false
        } else {
            let x1 = (-B + Math.sqrt(det))/(2*A)
            let x2 = (-B - Math.sqrt(det))/(2*A)
            let y1 = gradient*x1 + yInt
            let y2 = gradient*x2 + yInt
            if (checkPointInRect([x1, y1], [a[0], a[1], b[0] - a[0], b[1] - a[1]]) || checkPointInRect([x2, y2], [a[0], a[1], b[0] - a[0], b[1] - a[1]])) {
                return true
            } else {
                return false
            }
        }
    }
}

function checkPointInRect(p, r) { //checks if a point p [x, y] lies within the rect r [x, y, width, height]
    if (inRange(p[0], r[0], r[0] + r[2]) && inRange(p[1], r[1], r[1] + r[3])) {
        return true
    } else {
        return false
    }
}

function checkCircCollide(c1, c2) {
    if (vMag(vDiff([c1[0], c1[1]], [c2[0], c2[1]])) < c1[2] + c2[2]) {
        return true
    } else {
        return false
    }
}

function drawText(text = "Hello, World!", x = 0, y = 0, fill = true, colour = "black", font = "100px sans-serif", linewidth = 1, align = "start", baseline = "top") {
    //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
    ctx.font = font;
    ctx.linewidth = linewidth;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    if (fill) {
        ctx.fillStyle = colour;
        ctx.fillText(text, x, y);
    } else {
        ctx.strokeStyle = colour;
        ctx.lineWidth = linewidth;
        ctx.strokeText(text, x, y);
    }
}

function handleStuff() {
    // //handle keys only pressed since last loop
    // if (keysFirstPressed[32]){
    //     panCentre = Array.from(mousePos);
    //     keysFirstPressed[32] = false;
    // }
    
    if (keysFirstPressed[27]) {
        if (bubble === pauseBubble) {
            bubble = mainBubble
        } else {
            bubble = pauseBubble
        }
        keysFirstPressed[27] = false;
    }        

    // //handle keys currently being held
    // if (keysPressed[37]||keysPressed[65]){
    //     pan[0] -= panAmount;
    // }

    // if (keysPressed[38]||keysPressed[87]){
    //     pan[1] -= panAmount;
    // }

    // if (keysPressed[39]||keysPressed[68]){
    //     pan[0] += panAmount;
    // }

    // if (keysPressed[40]||keysPressed[83]){
    //     pan[1] += panAmount;
    // }

    // //handle pan due to mouse pos
    // if (keysPressed[32]) {
    //     panDirection = vDiff(panCentre, mousePos);
    //     pan = vSum(pan, vScale(Array.from(panDirection), panScale));
    // }

    // //limit pan to min and max
    // if (pan[0] < panMin[0]) {
    //     pan[0] = panMin[0]
    // } else if (pan[0] > panMax[0]) {
    //     pan[0] = panMax[0]
    // }

    // if (pan[1] < panMin[1]) {
    //     pan[1] = panMin[1]
    // } else if (pan[1] > panMax[1]) {
    //     pan[1] = panMax[1]
    // }
    

    //update the array for the previous mouse positions (including pan)
    mousePosArr.push(Array.from(mousePos));
    playerPosArr.push(vSum(mousePos, pan))
    mousePosArr.shift()
    playerPosArr.shift()

    //update the player rect
    playerRect[0] = playerPosArr[playerPosArr.length - 1][0] - playerRect[2]/2;
    playerRect[1] = playerPosArr[playerPosArr.length - 1][1] - playerRect[3]/2;

    playerCirc[0] = playerPosArr[playerPosArr.length - 1][0]
    playerCirc[1] = playerPosArr[playerPosArr.length - 1][1]
}

function drawCircle(x, y, r, colour = "red", fill = true, linewidth = 5) {
    if (fill) {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fill()
    }

}

function mainBubble() {
    handleStuff()
    if (level <= 9) {
        if (failed) {
            if (elapsed < failTime + failBuffer) {
                switch (level) {
                    case 1:
                        ctx.drawImage(bg1red, 0, 0);
                        break;
                    case 2:
                        ctx.drawImage(bg2red, 0, 0);
                        break;
                    case 3:
                        ctx.drawImage(bg3red, 0, 0);
                        break;
                    case 4:
                        ctx.drawImage(bg4red, 0, 0);
                        break;
                    case 5:
                        ctx.drawImage(bg5red, 0, 0);
                        break;
                    case 6:
                        ctx.drawImage(bg6red, 0, 0);
                        break;
                    case 7:
                        ctx.drawImage(bg7red, 0, 0);
                        break;
                    case 8:
                        ctx.drawImage(bg8red, 0, 0);
                        break;
                    case 9:
                        ctx.drawImage(bg9red, 0, 0);
                        break;
                }
            } else {
                ctx.drawImage(bg0, 0, 0);
            }
        } else {
            switch (level) {
                case 0:
                    ctx.drawImage(bg0, 0, 0);
                    drawText("go click that circle to progress to the next level", width/2, 10, true, "white", "50px sans-serif", 5, "center", "top")
                    drawText("don't touch the blue walls!", width/2, 70, true, "white", "50px sans-serif", 5, "center", "top")
                    break;
                case 1:
                    ctx.drawImage(bg1, 0, 0);
                    break;
                case 2:
                    ctx.drawImage(bg2, 0, 0);
                    break;
                case 3:
                    ctx.drawImage(bg3, 0, 0);
                    break;
                case 4:
                    ctx.drawImage(bg4, 0, 0);
                    break;
                case 5:
                    ctx.drawImage(bg5, 0, 0);
                    break;
                case 6:
                    ctx.drawImage(bg6, 0, 0);
                    break;
                case 7:
                    ctx.drawImage(bg7, 0, 0);
                    break;
                case 8:
                    ctx.drawImage(bg8, 0, 0);
                    break;
                case 9:
                    ctx.drawImage(bg9, 0, 0);
                    break;
            }
        }


        if (failed) {
            //draw restart mote
            if (elapsed >= failTime + failBuffer) {
                if (vMag(vDiff(startPoint, [playerCirc[0], playerCirc[1]])) <= 10) {
                    drawCircle(startPoint[0], startPoint[1], moteRad*1.5, "red")
                    if (charged) {
                        failed = false
                    }
                } else {
                    drawCircle(startPoint[0], startPoint[1], moteRad, "turquoise")
                }
                drawText((elapsed/1000).toFixed(2) + "s", startPoint[0], startPoint[1], true, "white", "20px sans serif", 5, "center", "middle")
            }
        } else {
            //draw walls and end mote
            for (let i = 0; i < walls.length; i++) {
                //walls[i].draw();
                if (checkCircRectCollide(playerCirc, walls[i].rect)) {
                    failed = true
                    failTime = elapsed
                }
            }
            if (vMag(vDiff(endPoint, [playerCirc[0], playerCirc[1]])) <= 10) {
                drawCircle(endPoint[0], endPoint[1], moteRad*1.5, "red")
                if (charged) {
                    nextLevel()
                }
            } else {
                drawCircle(endPoint[0], endPoint[1], moteRad, "lime")
            }
            drawText((elapsed/1000).toFixed(2) + "s", endPoint[0], endPoint[1], true, "white", "20px sans serif", 5, "center", "middle")
        }
    } else {
        ctx.drawImage(bg0, 0, 0);
        drawText("well done!", width/2, height/2, true, "white", "50px sans-serif", 5, "center", "middle")
    }
    drawChar()
}

function decodeLevel(json) { //decodes the Pyxel Edit JSON tile data into objects 
    levelData = JSON.parse(json)
    walls = []
    let tile;
    if (levelData.tileheight === 16) { //80x80 tiles
        for (let i = 0; i < levelData.layers[0].tiles.length; i++) {
            tile = levelData.layers[0].tiles[i]
            if (tile.tile === 1) {
                endPoint = [tile.x*16*5 + 40, tile.y*16*5 + 40]
            } else if (tile.tile === 2) {
                startPoint = [tile.x*16*5 + 40, tile.y*16*5 + 40]
            } else if (tile.tile === 4) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5 + 40, 80, 40]))
            } else if (tile.tile === 5) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 40, 80]))
            } else if (tile.tile === 6) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 80, 40]))
            } else if (tile.tile === 7) {
                walls.push(new wall([tile.x*16*5 + 40, tile.y*16*5, 40, 80]))
            } else if (tile.tile === 8) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5 + 40, 40, 40]))
            } else if (tile.tile === 9) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 40, 40]))
            } else if (tile.tile === 10) {
                walls.push(new wall([tile.x*16*5 + 40, tile.y*16*5, 40, 40]))
            } else if (tile.tile === 11) {
                walls.push(new wall([tile.x*16*5 + 40, tile.y*16*5 + 40, 40, 40]))
            } else if (tile.tile === 12) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5 + 40, 80, 40]))
                walls.push(new wall([tile.x*16*5 + 40, tile.y*16*5, 40, 40]))
            } else if (tile.tile === 13) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5 + 40, 80, 40]))
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 40, 40]))
            } else if (tile.tile === 14) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 80, 40]))
                walls.push(new wall([tile.x*16*5 + 40, tile.y*16*5 + 40, 40, 40]))
            } else if (tile.tile === 15) {
                walls.push(new wall([tile.x*16*5, tile.y*16*5, 80, 40]))
                walls.push(new wall([tile.x*16*5, tile.y*16*5 + 40, 40, 40]))
            }
        }
    } else if (levelData.tileheight === 8) { //40x40 tiles
        for (let i = 0; i < levelData.layers[0].tiles.length; i++) {
            tile = levelData.layers[0].tiles[i]
            if (tile.tile === 1) {
                endPoint = [tile.x*8*5, tile.y*8*5]
            } else if (tile.tile === 2) {
                startPoint = [tile.x*8*5, tile.y*8*5]
            } else if (tile.tile === 4) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5 + 20, 40, 20]))
            } else if (tile.tile === 5) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 20, 40]))
            } else if (tile.tile === 6) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 40, 20]))
            } else if (tile.tile === 7) {
                walls.push(new wall([tile.x*8*5 + 20, tile.y*8*5, 20, 40]))
            } else if (tile.tile === 8) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5 + 20, 20, 20]))
            } else if (tile.tile === 9) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 20, 20]))
            } else if (tile.tile === 10) {
                walls.push(new wall([tile.x*8*5 + 20, tile.y*8*5, 20, 20]))
            } else if (tile.tile === 11) {
                walls.push(new wall([tile.x*8*5 + 20, tile.y*8*5 + 20, 20, 20]))
            } else if (tile.tile === 12) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5 + 20, 40, 20]))
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 20, 20]))
            } else if (tile.tile === 13) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 40, 20]))
                walls.push(new wall([tile.x*8*5, tile.y*8*5 + 20, 20, 20]))
            } else if (tile.tile === 14) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5, 40, 20]))
                walls.push(new wall([tile.x*8*5 + 20, tile.y*8*5 + 20, 20, 20]))
            } else if (tile.tile === 15) {
                walls.push(new wall([tile.x*8*5, tile.y*8*5 + 20, 40, 20]))
                walls.push(new wall([tile.x*8*5 + 20, tile.y*8*5, 20, 20]))
            }
        }
    } else if (levelData.tileheight === 4) { //20x20 tiles
        for (let i = 0; i < levelData.layers[0].tiles.length; i++) {
            tile = levelData.layers[0].tiles[i]
            if (tile.tile === 1) {
                endPoint = [tile.x*4*5, tile.y*4*5]
            } else if (tile.tile === 2) {
                startPoint = [tile.x*4*5, tile.y*4*5]
            } else if (tile.tile === 4) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5 + 10, 20, 10], function() {ctx.drawImage(blueHorizontal, this.rect[0], this.rect[1])}))
            } else if (tile.tile === 5) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 10, 20]))
            } else if (tile.tile === 6) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 20, 10]))
            } else if (tile.tile === 7) {
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5, 10, 20]))
            } else if (tile.tile === 8) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5 + 10, 10, 10]))
            } else if (tile.tile === 9) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 10, 10]))
            } else if (tile.tile === 10) {
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5, 10, 10]))
            } else if (tile.tile === 11) {
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5 + 10, 10, 10]))
            } else if (tile.tile === 12) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 10, 20]))
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5 + 10, 10, 10]))
            } else if (tile.tile === 13) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 20, 10]))
                walls.push(new wall([tile.x*4*5, tile.y*4*5 + 10, 10, 10]))
            } else if (tile.tile === 14) {
                walls.push(new wall([tile.x*4*5, tile.y*4*5, 20, 10]))
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5 + 10, 10, 10]))
            } else if (tile.tile === 15) {
                walls.push(new wall([tile.x*4*5 + 10, tile.y*4*5, 10, 20]))
                walls.push(new wall([tile.x*4*5, tile.y*4*5 + 10, 10, 10]))
            }
        }
    }
}

function nextLevel() {
    // startPoint = [100, height/2]
    // endPoint = [width - 100, height/2]
    // walls = [new wall([300, 400, 100, 200])]
    level++
    if (level < levels.length) {
        decodeLevel(levels[level])

        // levelData = JSON.parse(levels[level])
        // startPoint = levelData.start
        // endPoint = levelData.end
        // walls = []
        // for (let i = 0; i < levelData.walls.length; i++) {
        //     walls.push(new wall(levelData.walls[i].rect))
        // }
    } else {
        walls = []
    }
    
}

function pauseBubble() {
    handleStuff()

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height)

    drawText("paused", width/2, height/2, true, "white", "50px sans-serif", 5, "center", "middle")
    drawChar()
}

let bubble = mainBubble

function mainloop(t) {
    timestamp = t
    if (charged){
        chargeCountdown -= 1;
        if (chargeCountdown === 0) {
            charged = false;
        }
    }
    
    if (starttime === undefined) { //if this is the first time the function is called, starttime will be undefined
        starttime = timestamp; //so the start time is the current time
    }
    elapsed = timestamp - starttime; //the time elapsed since the first call of the mainlooop

    bubble();

    if (music.ended) {music.play()}
    
    //draw the debug text
    //debugVal = 1000/(timestamp-prevtime);
    //debugVal = width
    drawText(debugVal, 50, 50, true, "blue", "30px sans-serif", 1, "start", "top")

    prevtime = timestamp
    window.requestAnimationFrame(mainloop); //request the next frame
}

//run
nextLevel();
mainloop();