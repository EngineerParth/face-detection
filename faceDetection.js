var analyseBtn = document.getElementById("analyse");
analyseBtn.addEventListener("click",processImage);

function processImage(){
    var imgUrl = document.getElementById("imageUrl").value;
    document.getElementById("addedImage").setAttribute("src",imgUrl);
    var apiEndPoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId:true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';

    var reqBody = {
        "url":imgUrl
    };

    var reqHeaders = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':''
    });

    var initObj = {
        method:"POST",
        body: JSON.stringify(reqBody),
        headers: reqHeaders
    };

    var request = new Request(apiEndPoint, initObj);

    fetch(request).then(function(response){
        if(response.ok)
            return Promise.resolve(response.json());
        else   
            return Promise.reject(new Error(response.statusText));
    }).then(function(response){
        if(response.length > 0){
            document.getElementById("ageSpan").innerHTML = "Age: "+response[0].faceAttributes.age;
            document.getElementById("genderSpan").innerHTML = "Gender: "+response[0].faceAttributes.gender;
        }
        else{
            alert("Face not found in the image!");
        }
        
    }).catch(function(err){
        alert(err);
    });
}