let fr = 30; //starting FPS

var Heli;
var start_time, end_time;
//gravity variable
var gravity = 0.1;
var i = 0;
var wingLength, wingWidth, bodyLength, fins, nose;
let img, bg;
function preload() {
    img = loadImage('asset/cartoon-unscreen.gif');
    bg= loadImage('asset/BG.png');
}

function setup() {
    //frameRate(fr); // Attempt to refresh at starting
    openNav();
    
    start_time = new Date();
    var myCanvas = createCanvas(1200,500); //(windowWidth, windowHeight-300);
    myCanvas.parent("Canvas1");
    background(bg);
	//createCanvas(480, 270);



    Heli = new Ball(800 , 20, 50);
    refresh();
}

function draw() {
    clear();
    // noLoop();
    
	background(bg);
    
	// for (var i = 0; i < balls.length; i++) { // Whatever the length of that array, update and display all of the objects.
	// 	balls[i].update();
	// 	balls[i].display();
	// }

        
        Heli.update();
        Heli.display();
        


}


function changeText(id,text){
    document.getElementById(id).innerHTML = text;
  }



function refresh(){
    start_time = new Date();                    
    wingLength = getRadioValue('wingLength');
    wingWidth = getRadioValue('wingWidth');
    bodyLength = getRadioValue('bodyLength');
    fins = getRadioValue('Fins');
    nose = getRadioValue('Nose');


    //Heli.speedY =-10
    Heli.y = 0;
    Heli.x= 800
    Heli.stop = false;


    background(250);


    if (wingLength == "L") {
        Heli.speedY=Heli.speedY-1
        gravity=0.07;
    } else {
        Heli.speedY =0
    }

    if (bodyLength == "L") {
        Heli.speedY=Heli.speedY-1
        gravity=0.08;
    } else {
        Heli.speedY =0
    }

    if (wingWidth == "L") {
        Heli.speedY=Heli.speedY-1
        gravity=0.08-0.04;
    } else {
        Heli.speedY =0
    }

    if (fins == "Y") {
        Heli.speedY=Heli.speedY-1
        Heli.speedX = -4
        gravity=0.08-0.01;
    } else {
        Heli.speedY =0
        Heli.speedX = 0
    }

    if (nose == "Y") {
        Heli.speedY=Heli.speedY+ 3
        gravity=0.08-0.01;
    } else {
        Heli.speedY =0
    }

}



//https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
function getRadioValue(name_) {
    var ele = document.getElementsByName(name_);
    
    for(i = 0; i < ele.length; i++) {
        //console.log('Omar');
        if(ele[i].checked){
            res = ele[i].value;
            console.log(name_,res);
        }
    }
    return res;
}
//#####################

// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 8-5: Rewrite the gravity example from Chapter 5 using objects with a Ball class. 
// Include two instances of a Ball object.

  // Ball constuctor
  function Ball(tempX, tempY, tempW) {
    this.x = tempX;  // x location of square 
    this.y = tempY;  // y location of square 
    this.w = tempW;  
    this.speedX= 0;
    this.speedY = 0;  
    this.stop = false;

    this.display = function() {
        // Display the square 
        

        //ellipse(this.x,this.y,this.w,this.w);
        //push();
        //translate(this.x, this.y);
        //translate (width/10, height/4);
        //imageMode(CENTER);
        i+=1;
        //rotate(PI / 180 * i);
        image(img,this.x,this.y,this.w*2,this.w);
        //pop();
    }; 
  
    this.update = function() {
        if(this.stop!=true){
                // Add speed to location
                this.y = this.y + this.speedY; 
                if (fins == "Y" & wingWidth == "L"){
                    this.x = this.x + this.speedX*5*Math.cos(i); 
                }else{
                    this.x = this.x + this.speedX; 
                }
                
                // Add gravity to speed
                this.speedY = this.speedY + gravity; 
                i+=3;
                // If square reaches the bottom 
                // Reverse speed 
                if (this.y > height-this.w) { 
                   
                    this.speedY = 0;
                    this.stop = true  
                    end_time = new Date() - start_time;
                    if (end_time > 3800){end_time =3800}
                    changeText('time', end_time/1000)
                }
        }

    };
  }