


// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  // Give the parameter a variable name
  var dynamicContent = getParameterByName("id");
  //getParameterByName is a function that fetches the id from URL
  //the id in URL comes from dynamically set "href" in blog.html through blog.js
  //the id set in this URL comes from fetched json file in blog.js






var paintings = [];





function getAllPaintings() {
  fetch("http://dashboard.siqiuli.com/?rest_route=/wp/v2/event/"+dynamicContent)
    .then(res => res.json())
    .then(showPaintings)

  
}

function showPaintings(data) {
    console.log(data);
    let list = document.querySelector(".m-p-g__thumbs");
    let template = document.querySelector(".paintingTemplate").content;



    let clone = template.cloneNode(true);
    let images = data.acf.event.english.images;
    let images2 = data.acf.event.english.images2;
    let images3 = data.acf.event.english.images3;


function pushImages(arrTemp){
    for (key in arrTemp) {
      
        ///looping through all keys in this product(acf= advanced custom fields)
        if(key){
        let clone = template.cloneNode(true)
         let imageTemp = key;
            let photo = arrTemp[imageTemp];
            if(photo){
                let newImage = document.createElement("img");
                
                newImage.setAttribute("src", photo);
                newImage.setAttribute("data-full", photo);
                newImage.setAttribute("class", "m-p-g__thumbs-img");

                list.appendChild(newImage);
    
            list.appendChild(clone);

            console.log("adding image done");
        }
           
    }
       
    }
}

pushImages(images);
pushImages(images2);
pushImages(images3);
}


getAllPaintings();



function start(){
        
    var elem = document.querySelector('.m-p-g');
    
    document.addEventListener('DOMContentLoaded', function() {
        var gallery = new MaterialPhotoGallery(elem);
    });

    console.log("launced")
}


setTimeout(function(){start()}, 5000);











$(".m-p-g > div").on("click", function(){
    $("#header").css("z-index", 0);
})








$(".menu-icon").on("click", function(){
    $("#header").css("z-index", 20);
})


