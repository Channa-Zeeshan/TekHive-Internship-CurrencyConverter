const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies"; // /usd.json
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")



for(select of dropdown){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode ==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && currCode ==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
      
}

const updateExchangeRate=async()=>{

    let amount= document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal ==="" || amountVal <1){
        amountVal=1
        amount.value="1"
       

    }
    console.log(fromCurr.value, toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response= await fetch(URL)
    let data=await response.json();
    console.log(data);
    let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount= amountVal * rate;
    msg.innerText=`${amountVal}  ${fromCurr.value} = ${finalAmount} ${toCurr.value}`  
}
const updateFlag=(element)=>{
    let currCode=element.value
    console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img")
    img.src=newSrc;

};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    // let amount= document.querySelector(".amount input");
    // let amountVal=amount.value;
    // if(amountVal ==="" || amountVal <1){
    //     amountVal=1
    //     amount.value="1"
       

    // }
    // console.log(fromCurr.value, toCurr.value);
    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    // let response= await fetch(URL)
    // let data=await response.json();
    // console.log(data);
    // let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    // console.log(rate);
    // let finalAmount= amountVal * rate;
    // msg.innerText=`${amountVal}  ${fromCurr.value} = ${finalAmount} ${toCurr.value}`  
});
window.addEventListener("load",()=>{
    updateExchangeRate();

});

