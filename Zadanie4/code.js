let gallery=document.getElementById("gallery");
let modal=document.getElementById("modal");
let img=document.getElementById("img");
let text=document.getElementById("text")
let search=document.getElementById("search")
let slide=false
let map = L.map('map')
let marker=new L.marker([48.01793364889813, 17.301514848394284]).addTo(map);

fetch('./photos.json').then(response => {
    return response.json();
}).then(data => {
    for (x=0;x<data.photos.length;x++){
        let obj=document.createElement("img");
        obj.setAttribute("src",data.photos[x].fileAddress)
        obj.addEventListener("click",showPhoto)
        gallery.appendChild(obj)
    }

});
function searchResult(){
    let substr=search.value;
    gallery.innerText="";
    fetch('./photos.json').then(response => {
        return response.json();
    }).then(data => {
        for (x=0;x<data.photos.length;x++){
            if (data.photos[x].name.toLowerCase().includes(substr.toLowerCase())||data.photos[x].description.toLowerCase().includes(substr.toLowerCase())){
                let obj=document.createElement("img");
                obj.setAttribute("src",data.photos[x].fileAddress)
                obj.addEventListener("click",showPhoto)
                gallery.appendChild(obj)
            }
        }

    });

}



function showPhoto(event){
    img.innerHTML="";
    let x=document.createElement("img");
    x.setAttribute("src",event.target.getAttribute("src"));
    x.setAttribute("id","photo")
    fillInfo()
    img.appendChild(x)
    modal.style.display="block";

}
function fillInfo(){
    fetch('./photos.json').then(response => {
        return response.json();
    }).then(data => {
        let index =data.photos.findIndex(obj=>{
            return obj.fileAddress===photo.getAttribute("src")
        })
        text.innerHTML="Name: " + data.photos[index].name +
            "</br>Description: " + data.photos[index].description +
            "</br>Date: " + data.photos[index].dateTime;

        map.setView(data.photos[index].GPS, 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        map.removeLayer(marker);
        marker=new L.marker(data.photos[index].GPS).addTo(map);


    });
}


function closeModal(){
    modal.style.display="none";
}
function nextPhoto(right){
    slide=false
    let photo=document.getElementById("photo");
    fetch('./photos.json').then(response => {
        return response.json();
    }).then(data => {
        let index =data.photos.findIndex(obj=>{
            return obj.fileAddress===photo.getAttribute("src")
        })
        if(right)
            index=index+1===data.photos.length?0:index+1;
        else
            index=index===0?data.photos.length-1:index-1;
        photo.setAttribute("src",data.photos[index].fileAddress)
    });
    fillInfo()
}
async function slideShow(){
    slide=!slide;
    while (slide){
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!slide)
            return
        nextPhoto(true);
        slide=!slide;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
