var xml= new XMLHttpRequest();
xml.open('GET','z03.xml',false)
xml.send();
let xmlData=xml.responseXML.getElementsByTagName("zaznam");
let data=Array.from(xmlData)

let years=[];
data.forEach(n=> {years.push(n.children[0].innerHTML)})
let marks=[];
let markTypes=['A', 'B', 'C', 'D', 'E', 'Fx', 'Fn']
marks.push(getMarks(data[0].children[1]))
marks.push(getMarks(data[1].children[1]))
marks.push(getMarks(data[2].children[1]))
marks.push(getMarks(data[3].children[1]))
marks.push(getMarks(data[4].children[1]))
marks.push(getMarks(data[5].children[1]))
generateGraph()


//Pie

marks.forEach((m,index)=>{
    var data = [{
        values: m,
        labels: markTypes,
        type: 'pie'
    }];

    var layout = {
        title: years[index],
        height: 500,
        width: 500
    };

    Plotly.newPlot('pie'+(index+1), data, layout,{displayModeBar: false});
})
//Multypie
let ind=0
let d=[];
for (var x=0;x<2;x++){
    for (var y=0;y<3;y++){
        d.push(getMultiPieData(ind,y,x));
        ind++;
    }
}

var layout = {
    height: 800,
    width: 800,
    grid: {rows: 3, columns: 2}
};

Plotly.newPlot('multypie', d, layout);


function generateGraph(){
    let orient=window.outerWidth<550? "h":"v";

    var trace1 = {
        x: years,
        y: nthVal(marks,0),
        type: 'bar',
        orientation:orient,
    };
    var trace2 = {
        x: years,
        y: nthVal(marks,1),
        type: 'bar',
        orientation:orient,
    };
    var trace3 = {
        x: years,
        y: nthVal(marks,2),
        type: 'bar',
        orientation:orient,
    };
    var trace4 = {
        x: years,
        y: nthVal(marks,3),
        type: 'bar',
        orientation:orient,
    };
    var trace5 = {
        x: years,
        y: nthVal(marks,4),
        type: 'bar',
        orientation:orient,
    };
    var trace6 = {
        x: years,
        y: nthVal(marks,5),
        type: 'bar',
        orientation:orient,
    };
    var trace7 = {
        x: years,
        y: nthVal(marks,6),
        type: 'bar',
        orientation:orient,
    };

    var traces = [trace1, trace2, trace3,trace4, trace5, trace6, trace7];

    var layout = {
        autosize:true,
        showlegend: false
    };

    Plotly.newPlot('differ', traces, layout, {displayModeBar: false});


}










function getMultiPieData(index,r,c){

    var data={
        title:markTypes[index],
        values: marks[index],
        labels: years,
        type: 'pie',
        name: years[index],
        domain: {
            row: r,
            column: c
        },
        hoverinfo: 'label+percent+value',
        textinfo: 'none'
    }
    return data
}


function getMarks(zaznam){
    let d=[]
    d.push(parseInt(zaznam.children[0].innerHTML));
    d.push(parseInt(zaznam.children[1].innerHTML));
    d.push(parseInt(zaznam.children[2].innerHTML));
    d.push(parseInt(zaznam.children[3].innerHTML));
    d.push(parseInt(zaznam.children[4].innerHTML));
    d.push(parseInt(zaznam.children[5].innerHTML));
    d.push(parseInt(zaznam.children[6].innerHTML));
    return d;
}
function nthVal(marks, index){
    let d=[]
    for (var x=0;x<6;x++){
        d.push(marks[x][index]);
    }
    return d
}