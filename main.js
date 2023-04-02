status ="";
object_name ="";
objects =[]; 

function setup(){
    canvas =createCanvas(650, 389);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();
}

function modelLoaded(){
    console.log("Model Loaded");
    status =true;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("model_status").innerHTML = "Status: Detecting object";
    document.getElementById("object_name").innerHTML = object_name;
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;

    }
}

function draw(){
    image(video, 0, 0, 650, 389);

    if (status != ""){
        for(i=0; i<objects; i++){

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent +"% "+objects[i].x+15 +", "+ objects[i].y+15);

         nofill();
         stroke("#FF0000");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if (object_name = objects){
            video.stop();
            objectDetector = objectDetector.detect(gotResults);
            document.getElementById("object_status").innerHTML = "Object Found!";
            synth = window.speechSynthesis; 
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("object_status").innerHTML = "Object NOT Found.";
        }
    }
}