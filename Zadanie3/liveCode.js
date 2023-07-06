sliderCheckBox=document.getElementById("sliderCheckBox");
numberCheckBox=document.getElementById("numberCheckBox");
slider=document.querySelector("value-slider");
sliderValue=slider.shadowRoot.querySelector('input[type="range"]');



sliderCheckBox.addEventListener('change', (e) => {
    slider.setVisible("slider",e.target.checked)
})

numberCheckBox.addEventListener('change', (e) => {
    slider.setVisible("number",e.target.checked)
})


let up=true

var trace1 = {
    y: [0],
    type: 'scatter'
};

var trace2 = {
    y: [0],
    type: 'scatter'
};

var data = [trace1, trace2];

var layout = {
    showlegend: false,
    yaxis:{
        fixedrange:true
    },
    xaxis:{
        fixedrange:true
    }
};

Plotly.newPlot('liveGraph', data,layout);



var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
source.onmessage = function(event) {
    data=JSON.parse(event.data);
    if (up===true)
        Plotly.extendTraces("liveGraph", {y: [[data.y1*sliderValue.value], [data.y2*sliderValue.value]]}, [0, 1])
};

function showHide(id){
    let box=document.getElementById(id);
    var update =box.checked? {opacity: 1}:{opacity: 0};
    id==="sin"? Plotly.restyle("liveGraph", update,[0]):Plotly.restyle("liveGraph", update,[1])
}
function stopStreaming(){
    up=false;
    var update = {
        showlegend: false,
        yaxis:{
            fixedrange:false
        },
        xaxis:{
            fixedrange:false
        }
    };
    let pl=Plotly.relayout("liveGraph", update)
    console.log(pl)
}