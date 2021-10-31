Webcam.set({
    width:350,
    height:300
});
Webcam.attach("camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='image'src="+data_uri+">";
    })
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wuaoYbAOC/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
prediction_1="";
prediction_2="";
function speak(){
    var s=window.speechSynthesis;
    speak1="the first prediction is "+prediction_1;
    speak2="the second prediction is "+prediction_2;
utterThis=new SpeechSynthesisUtterance(speak1+speak2);
s.speak(utterThis);
}
function check(){
    img=document.getElementById("image");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("emotion_name").innerHTML=result[0].label;
        document.getElementById("emotion_name1").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak();

        if(result[0].label=="happy"){
            document.getElementById("emoji").innerHTML="&#128522;";
        }
        if(result[0].label=="sad"){
            document.getElementById("emoji").innerHTML="&#128532;";
            
        }
        if(result[0].label=="angry"){
            document.getElementById("emoji").innerHTML=">&#128548;";
            
        }
        if(result[1].label=="happy"){
            document.getElementById("emoji1").innerHTML="&#128522;";
        }
        if(result[1].label=="sad"){
            document.getElementById("emoji1").innerHTML="&#128532;";
            
        }
        if(result[1].label=="angry"){
            document.getElementById("emoji1").innerHTML=">&#128548;";
            
        }
    }
}