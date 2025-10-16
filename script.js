const URL = `https://api.exchangerate.host/convert?from=USD&to=INR&amount=1&access_key=5f157645fc508cfae1120323c14b532b`;




const dropdowns = document.querySelectorAll(".dropdown select");

const msg =  document.querySelector( ".msg");
const btn = document.querySelector("form button");
for( code in countryList){
    console.log(code , countryList[code]);
}

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for( let select of dropdowns){
    for( currCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;


        if( select.name === "from"  && currCode === "USD"){
            newOption.selected = true;
        }
        else if( select.name === "to"  && currCode === "INR"){
            newOption.selected =  true;
        }
        select.append(newOption);}




        select.addEventListener("change" , (evt) =>   {

            updateFlag(evt.target);
        });

    }

     // element is a select tag
const updateFlag = (element) =>{

    let currCode = element.value ;
    let countryCode = countryList[currCode];
    let newSrc =   `https://flagsapi.com/${countryCode}/flat/64.png` ;
    console.log(currCode);

    let img = element.parentElement.querySelector("img");
    img.src = newSrc ;


};


btn.addEventListener("click" , async(evt) =>{
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value ;
    console.log(amtVal);

    if( amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1" ;

    }

    const BASEURL = `https://api.exchangerate.host/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}&access_key=5f157645fc508cfae1120323c14b532b`;
    let response = await fetch(BASEURL);
    let data = await response.json();
    let rate = data.result;

    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}` ;
});