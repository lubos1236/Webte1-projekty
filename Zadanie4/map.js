let map = L.map('map');
let mapCenterCoord=[48.73476039286902, 19.091143888046947];
let gallery=document.getElementById("gallery");
let control;

fetch('./photos.json').then(response => {
    return response.json();
}).then(data => {
    map.setView(mapCenterCoord, 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
});
placeMarkers()


function placeMarkers(){
    fetch('./photos.json').then(response => {
        return response.json();
    }).then(data => {
        let tmp=[];
        data.photos.forEach(obj=>{
            tmp.push(obj.GPS)
        });
        let places=Array.from(new Set(tmp.map(JSON.stringify)), JSON.parse);

        places.forEach(coord=>{
            let GPSIndex=[];
            for (let x=0;x<data.photos.length;x++)
                if (JSON.stringify(data.photos[x].GPS)===JSON.stringify(coord))
                    GPSIndex.push(x)
            new L.marker(coord).addTo(map).on('click', function(e) {
                modal.style.display="block";
                if (GPSIndex.length>1){
                    let val=100
                    document.querySelector(":root").style.setProperty("--x",val.toString()+"px")
                    for (let x=0;x<GPSIndex.length;x++){
                        let obj=document.createElement("img");
                        obj.setAttribute("src",data.photos[GPSIndex[x]].fileAddress)
                        obj.setAttribute("class","popImg")
                        gallery.appendChild(obj)
                    }
                }
                else {
                    let val=0
                    document.querySelector(":root").style.setProperty("--x",val.toString()+"px")
                    let div=document.createElement("div");
                    div.setAttribute("class","popMax")
                    gallery.appendChild(div)

                    let obj=document.createElement("img");
                    obj.setAttribute("src",data.photos[GPSIndex[0]].fileAddress)
                    div.appendChild(obj)

                    obj=document.createElement("div");
                    obj.setAttribute("class","text")
                    obj.innerHTML="Name: " + data.photos[GPSIndex[0]].name +
                        "</br>Description: " + data.photos[GPSIndex[0]].description +
                        "</br>Date: " + data.photos[GPSIndex[0]].dateTime
                    gallery.appendChild(obj)
                }
            });
        });
    });
}

function closeModal(){
    modal.style.display="none";
    gallery.innerHTML=""
}
function route(){
    if (!document.getElementById("toggle").checked)
    {
        document.getElementById("distance").innerText='';
        map.removeControl(control);
        return
    }
    fetch('./photos.json').then(response => {
        return response.json();
    }).then(data => {
        let tmp=[];
        data.photos.forEach(obj=>{
            tmp.push(obj)
        });
        tmp.sort(function(a, b) {
            return new Date(a.dateTime) - new Date(b.dateTime);
        })
        let tmp2=[];
        tmp.forEach(obj=>{
            tmp2.push(obj.GPS)
        })
        let places=Array.from(new Set(tmp2.map(JSON.stringify)), JSON.parse);
        tmp3=[]
        places.forEach(obj=>{
            tmp3.push(L.latLng(obj));
        })
        control=L.Routing.control({
            waypoints:tmp3,
            show: false,

        }).addTo(map)
        control.on('routesfound', function(e) {
            let marker=L.marker(places[0]).addTo(map)
            e.routes[0].coordinates.forEach(function (coord, index){
                setTimeout(()=>{
                    if (!document.getElementById("toggle").checked)
                    {
                        map.removeLayer(marker);
                        return
                    }
                    marker.setLatLng(coord)
                },20*index);
            });


            let routes = e.routes;
            let summary = routes[0].summary;
            document.getElementById("distance").innerText='Total Distance: '+summary.totalDistance / 1000 +' km';
            });
    });
}