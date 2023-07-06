function clearOption(){
    let x=document.getElementById("Select3");
    x.innerHTML=""
    let x1=document.createElement("option");
    x1.setAttribute("value","---");
    x1.innerText="---";
    x.appendChild(x1);
}
function createSelection(newSelect,value){
    let x=document.createElement("option");
    x.setAttribute("value",value);
    x.innerText=value;
    newSelect.appendChild(x);
}
function validateName(id1,id2){
    let name = document.getElementById(id1);
    if (name.value.length===0){
        document.getElementById(id2).innerText="Toto pole je potrebné vyplniť";
        name.style.borderColor="red"
        return false
        }
    else
    {
        document.getElementById(id2).innerText="";
        name.style.borderColor="green"
        return true

    }
}
function validateDate(){
    let date =document.getElementById("date").valueAsDate;

    if (date!=null)
    {
        let age=Math.trunc((Date.now() - date)/31557600000);
        document.getElementById("age").value=age;
        document.getElementById("age").style.borderColor="green"
        document.getElementById("date").style.borderColor="green"
        document.getElementById("infoDate").innerText="";
        document.getElementById("infoAge").innerText="";
        return true

    }
    else{
        document.getElementById("date").style.borderColor="red"
        document.getElementById("infoDate").innerText="Toto pole je potrebné vyplniť";
        return false
    }
}
function validateAge(){
    let dob =document.getElementById("date").valueAsDate;
    if (dob==null && document.getElementById("age").value.length>0){
        document.getElementById("age").style.borderColor="green";
        document.getElementById("infoAge").innerText="";
        return true
    }
    if (document.getElementById("age").value!=="")
    {
        let age=Math.trunc((Date.now() - dob)/31557600000)
        if (parseInt(document.getElementById("age").value) === age){
            document.getElementById("age").style.borderColor="green";
            document.getElementById("infoAge").innerText="";
            return true
        }
        else {
            document.getElementById("infoAge").innerText="Dátum narodenia a vek sa nezhodujú";
            document.getElementById("age").style.borderColor="red";
            return false
        }
    }
    else {
        document.getElementById("infoAge").innerText="Toto pole je potrebné vyplniť";
        document.getElementById("age").style.borderColor="red";
        return false
    }
}
function fillOptions(id1, id2, text){
    let select=document.getElementById(id1);
    let newSelect=document.getElementById(id2);
    newSelect.innerHTML="";
    let x=document.createElement("optgroup");
    x.label=text;
    newSelect.appendChild(x);
    newSelect=x;
    if (id1==="Select1"){

        if (select.value==="Bratislava") {
            //NTC
            //Mladosť
            createSelection(newSelect,"---")
            createSelection(newSelect,"NTC")
            createSelection(newSelect,"Hala Mladosť",)
        }
        else if (select.value==="Šamorín") {
            //x-bionic
            //Sportcentrum
            createSelection(newSelect,"---")
            createSelection(newSelect,"X-Bionic")
            createSelection(newSelect,"Sportcentrum")
        }
        else if (select.value==="Nitra") {
            //Olympia
            //SPU
            createSelection(newSelect,"---")
            createSelection(newSelect,"Olympia")
            createSelection(newSelect,"SPU")
        }
        clearOption()
    }
    else if (id1==="Select2"){

        if (select.value==="NTC")
        {
            //basketball
            //Futball
            //florball

            createSelection(newSelect,"---")
            createSelection(newSelect,"Basketbal")
            createSelection(newSelect,"Futbal")
            createSelection(newSelect,"Florbal")

        }
        else if (select.value==="Hala Mladosť")
        {
            //tenis
            //nohejball
            //bedminton

            createSelection(newSelect,"---")
            createSelection(newSelect,"Tenis")
            createSelection(newSelect,"Hádzaná")
            createSelection(newSelect,"Bedminton")

        }
        else if (select.value==="Sportcentrum")
        {
            //futball
            //pozemny hokej
            //hadzana

            createSelection(newSelect,"---")
            createSelection(newSelect,"Futbal")
            createSelection(newSelect,"Pozemný hokej")
            createSelection(newSelect,"Hádzaná")



        }
        else if (select.value==="X-Bionic")
        {
            //posilka
            //bezecka draha
            //plavaren

            createSelection(newSelect,"---")
            createSelection(newSelect,"Posilovňa")
            createSelection(newSelect,"Bežecká dráha")
            createSelection(newSelect,"Plaváreň")

        }
        else if (select.value==="Olympia")
        {
            //skôš
            //bedminton
            //pin pong

            createSelection(newSelect,"---")
            createSelection(newSelect,"Squash")
            createSelection(newSelect,"Bedminton")
            createSelection(newSelect,"Stolný tenis")

        }
        else if (select.value==="SPU")
        {

            createSelection(newSelect,"---")
            createSelection(newSelect,"Hádzaná")
            createSelection(newSelect,"Tenis")
            createSelection(newSelect,"Squash")
        }


    }
}
function genderOption(id){
    let textArea=document.getElementById("textArea");
    if (id===3)
    {
        textArea.style.display="block";
        document.getElementById("infoArea").style.display="block"
    }
    else{
        textArea.style.display="none";
        document.getElementById("infoArea").style.display="none"
    }
}
function validateGender(){

    let rb=document.querySelector("input[name='Pohlavie']:checked").value;
    if (rb==="iné"){
        let area=document.getElementById("textArea");
        if(area.value===""){
            document.getElementById("infoArea").innerText="Toto pole je potrebné vyplniť"
            return false
        }
        document.getElementById("infoArea").innerText=""
        return true

    }
    else return true


}
function validateSelectors(){
    let s1=document.getElementById("Select1");
    let s2=document.getElementById("Select2");
    let s3=document.getElementById("Select3");

    if (s1.value!=="---" && s2.value!=="---" && s3.value!=="---" ){
        s1.style.borderColor="green";
        s2.style.borderColor="green";
        s3.style.borderColor="green";
        return true
    }
    s1.style.borderColor=s1.value==="---" ? "red":"green";
    s2.style.borderColor=s2.value==="---" ? "red":"green";
    s3.style.borderColor=s3.value==="---" ? "red":"green";
    return false
}
function validateMail(){
    let mail=document.getElementById("email");
    if (mail.value.length === 0){
        document.getElementById("infoMail").innerText="";
        mail.style.borderColor="black";
        return true
    }
    let arr=mail.value.split("@");
    if (arr.length===1)
    {
        document.getElementById("infoMail").innerText="Nesprávny formát (***@****.***)";
        mail.style.borderColor="red";
        return false
    }
    else {
        let domain=arr[1].split(".");
        if (arr[0].length<3 || domain.length<2 || (domain[domain.length-1].length<2 || domain[domain.length-1].length>4)){
            document.getElementById("infoMail").innerText="Nesprávny formát (***@****.***)";
            mail.style.borderColor="red";
            return false
        }
        else {
            mail.style.borderColor="green";
            document.getElementById("infoMail").innerText="";
            return true
        }
    }
}
function validateTel(){
    let tel =document.getElementById("telNum");
    if (tel.value.length === 0){
        document.getElementById("infoTel").innerText="";
        tel.style.borderColor="black";
        return true
    }
    let telNum=tel.value.replaceAll(' ','');
    if (telNum[0]==="+") {
        let str=telNum.split("+");
        if (/^\d+$/.test(str[1]) && telNum.length>11 &&  telNum.length<17){
            document.getElementById("infoTel").innerText="";
            document.getElementById("telNum").style.borderColor="green"
            return true
        }
    }
    document.getElementById("infoTel").innerText="Nesprávny formát (+421*********)";
    document.getElementById("telNum").style.borderColor="red"
    return false

}
function showAuthorName(){
    if (document.getElementById("hidden1").type==="hidden")
    {
        document.getElementById("hidden1").type="text";
        document.getElementById("hidden2").type="text";
    }
    else {
        document.getElementById("hidden1").type="hidden";
        document.getElementById("hidden2").type="hidden";
    }
}
function letterCounter(id){
    let input=document.getElementById(id);
    let counter=input.value.length;
    if (counter===0){
        input.nextElementSibling.style.display="none";
        return
    }
    input.nextElementSibling.style.display="block";
    let text=counter+"/"+input.maxLength;
    input.nextElementSibling.innerText=text
}
function calculatePrice(){
    let s1=document.getElementById("Select1");
    let s2=document.getElementById("Select2");
    let s3=document.getElementById("Select3");
    let price=0;

    switch (s1.value){
        case "Bratislava": price+=3; break;
        case "Šamorín": price+=3.5; break;
        case "Nitra": price+=4;
    }

    switch (s2.value){
        case "NTC":
        case "X-Bionic": price+=0.5; break;
        case "Hala Mladosť":
        case "SPU": price+=1; break;
        case "Sportcentrum":
        case "Olympia": price+=1.5; break;
    }

    switch (s3.value){
        case "Plaváreň":price+=3; break
        case "Basketbal":
        case "Posilovňa":
        case "Futbal":price+=2; break
        case "Hádzaná":
        case "Pozemný hokej":
        case "Florbal":
        case "Tenis": price+=1;break
        case "Bedminton":
        case "Bežecká dráha":
        case "Squash":
        case "Stolný tenis":price+=0.5;break
    }
    document.getElementById("price").value=price+"€"
    return price
}
function validateReservationDate(){
    if (document.getElementById("reservDate").value==null || document.getElementById("reservDate").value===""){
        document.getElementById("infoReserv").innerText="Vyplnte toto pole";
        document.getElementById("reservDate").style.borderColor="red"
        return false
    }
    let date=new Date(document.getElementById("reservDate").value);
    let now=new Date()
    if (date>now){
        document.getElementById("infoReserv").innerText="";
        document.getElementById("reservDate").style.borderColor="green";
        return true
    }
    else{
        document.getElementById("infoReServ").innerText="Na tatu hodinu nieje možné objednať";
        document.getElementById("reservDate").style.borderColor="red";
        return false
    }
}
function checkValidation(){
    validateName('surname' ,'infoSurname')
    validateDate()
    validateAge()
    validateGender()
    validateSelectors()
    validateMail()
    validateTel()
    validateReservationDate()
    if (validateName('firstName' ,'infoName') &&
        validateName('surname' ,'infoSurname')&&
        validateDate()&&
        validateAge()&&
        validateGender()&&
        validateSelectors()&&
        validateMail()&&
        validateTel()&&
        validateReservationDate()){
        return true
    }
    return false
}
function generateModal(){
    if (!checkValidation())
        return
    let modal=document.getElementById("modal_box");

    let x=document.createElement("h1");
    x.innerText="Vaša objednávka";
    modal.appendChild(x);

    x=document.createElement("span");
    x.innerHTML="&times;";
    x.setAttribute("onclick","clearModal()")
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Meno: "+document.getElementById("firstName").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Priezvisko: "+document.getElementById("surname").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Dátum narodenia: "+document.getElementById("date").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Vek: "+document.getElementById("age").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Pohlavie: "+document.querySelector("input[name='Pohlavie']:checked").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Mesto: "+document.getElementById("Select1").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Športové centrum: "+document.getElementById("Select2").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Šport: "+document.getElementById("Select3").value;
    modal.appendChild(x);

    x=document.createElement("p");
    x.innerText="Dátum rezervácie: "+document.getElementById("reservDate").value;
    modal.appendChild(x);

    x=document.createElement("p");
    if (document.getElementById("email").value!=="")
    {
        x.innerText="Mail: "+document.getElementById("email").value;
        modal.appendChild(x);
    }

    x=document.createElement("p");
    if (document.getElementById("telNum").value!=="")
    {
        x.innerText="Telefónne číslo: "+document.getElementById("telNum").value;
        modal.appendChild(x);
    }

    x=document.createElement("p");
    x.innerText="Cena: "+calculatePrice()+"€";
    modal.appendChild(x);

    x=document.createElement("div");
    x.className="buttonDiv";
    let b=document.createElement("button");
    b.id="send";
    b.innerText="Odoslať";
    b.setAttribute("onclick","submitForm()")
    x.appendChild(b);
    modal.appendChild(x);

    document.getElementById("modal").style.display="block";
}
function clearModal(){
    document.getElementById("modal").style.display="none";
    document.getElementById("modal_box").innerHTML="";
}

function submitForm(){
    event.preventDefault();
    document.getElementById("form").submit();

}

