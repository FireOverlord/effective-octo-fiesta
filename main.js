song="";
volume="";
speed="";
var scoreLeftWrist;
var RWX=0;var RWY=0;var LWX=0;var LWY=0;
function preload(){
    song=loadSound("SONG.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    video=createCapture(VIDEO);
    video.hide();
    canvas.position(750,500);
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
    }
function draw(){
    image(video,0,0,500,500)
    
    fill("cyan");
    stroke("black");
    circle(LWX,LWY,"20");
    if(RWY>0&&RWY<=100){
     document.getElementById("spe").innerHTML="=2.5x";       
     song.rate(2.5);  
    }else if(RWY>100&&RWY<=200){
        document.getElementById("spe").innerHTML="Speed =2x";       
         song.rate(2);}
    else if(RWY>200&&RWY<=300){
            document.getElementById("spe").innerHTML="Speed =1.5x";       
             song.rate(1.5);}
    else if(RWY>300&&RWY<=400){
     document.getElementById("spe").innerHTML="Speed =1x";       
    song.rate(1);}
    else if(RWY>400&&RWY<=500){
        document.getElementById("spe").innerHTML="Speed =0.5x";       
         song.rate(0.5);}
    
    NUMLWY=Number(LWY);
    remove_decimal=floor(NUMLWY);
    VOLUME=remove_decimal/500;
    document.getElementById("vol").innerHTML=VOLUME;
    song.setVolume(VOLUME);

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("Posenet has loaded");
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        RWX=results[0].pose.rightWrist.x;
        LWX=results[0].pose.leftWrist.x;
        RWY=results[0].pose.rightWrist.y;
        LWY=results[0].pose.leftWrist.y;
        console.log("Left wrist x="+LWX+" Right wrist x="+RWX+" Left Wrist Y="+LWY+" Right Wrist Y="+RWY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score of your right wrist is "+scoreRightWrist);
        console.log("score of your left wrist is "+scoreLeftWrist);
    }
}


















































