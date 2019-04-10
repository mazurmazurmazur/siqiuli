



let imagesArr = []; 
let detsArr = [];


function getAllArtItems() {
  fetch(
    "http://dashboard.siqiuli.com/?rest_route=/wp/v2/event&per_page=100"
    
  )
    .then(res => res.json())
    .then(showItems)
    .then(applyExhAnim)
   
}


function showItems(data) {
  let list = document.querySelector("#listMenu");
  let listImage = document.querySelector(".mainPainting");
  let templateTitle = document.querySelector(".templateTitle").content;
  let templateImage= document.querySelector(".templateImage").content;
  console.log(data);    


let i = 0;
  data.forEach(function(theEvent) {

    let clone = templateTitle.cloneNode(true);
    let cloneImage = templateImage.cloneNode(true);

   



    let image = cloneImage.querySelector(".eventImg");
    let detailsAnchor = cloneImage.querySelector(".dets");
    let titleTag = clone.querySelector(".aa");
    let year = clone.querySelector(".aa span");

   
   

    
    let image1 = theEvent.acf.event.english.images.image1;
    let yearJson = theEvent.acf.event.year;
    let titleJson = theEvent.title.rendered;
    let itemId = theEvent.id;

    console.log(image1);

   

    
    titleTag.id="a"+ i;

    image.setAttribute("src", image1);
    imagesArr.push(image1);
    detsArr.push(itemId);
    
   
    titleTag.innerHTML = "<span>"+yearJson+" </span>"+ titleJson;




    list.appendChild(clone)
     listImage.appendChild(cloneImage)

     i++;
  
  }


  )}


  getAllArtItems();












function applyExhAnim(){

let wrapper = $("#listMenu");
let menuItems = $(".aa");


$(".aa").click( function(){
  
  let distanceFromTop = $(this).offset().top;
  let halfPageHeight = $(document).height()/2;
  let listMenu= $("#listMenu");
  let menuFromTop = listMenu.offset().top;
  
  
  
    listMenu.css("top", menuFromTop +(halfPageHeight-distanceFromTop));
  
  menuItems.css("font-size", "10px");
  $(this).css("font-size", "30px");
  
  
  

   
 




 
  let mainDetails =  $(".dets");

   let mainPainting =  $(".mainPainting img");
  
  
  
  let arrNr = this.id.split('a').pop();


   

      mainPainting.css("opacity", 0);
       setTimeout(function(){
         mainPainting.attr("src", imagesArr[arrNr]);
         mainDetails.attr("href", "event-gallery.html?id=" + detsArr[arrNr]);

     
    mainPainting.css("opacity", 1);
       }, 500)
 
  
  











$(".aa").hover( function(){
$(this).find("span").css("text-decoration", "underline")},
         function(){
$("span").css("text-decoration", "none")}     );

});


}