var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML="";
    recognition.start();
}

recognition.onresult = function(event)
{
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    if (Content=="Take my selfie")
    {
        console.log("Taking selfie");
        speak();
    }
    document.getElementById("textbox").innerHTML=Content;
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in five seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    setTimeout(function(){
    take_snapshot();
    save();
    },5000);
    Webcam.attach(camera);
}

Webcam.set({
    width:350,
    height:250,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="photo" src="'+data_uri+'">';

    });
}

function save()
{
    link = document.getElementById("link");
    img = document.getElementById("photo").src;
    link.href = img;
    link.click();
}