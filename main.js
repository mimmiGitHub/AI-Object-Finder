objectDetector="";
inputName="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    inputName=document.getElementById("object_input");
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if(status !=""){
    objectDetector.detect(video,gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: Detecting Objects";
            document.getElementById("detected_objects").innerHTML="Number of objects detected are:"+objects.length;

            fill('turquoise');
            stroke('turquoise');
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        }
        if(inputName == objects[i].label){
            videoLiveView.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML="Status: Object Mentioned Found";
            synth=window.speechSynthesis;
            data_to_speak="Object Mentioned Found";
            utterThis=SpeechSynthesisUtterance(data_to_speak);
            synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML="Status: Object Mentioned Not Found";
        }
    }
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        objects=results;
    }
}