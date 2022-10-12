

//document.getElementById("div1").innerHTML = "Tales from the Script";

function gozer1(){ 
  console.log("You Gozer!")
};
gozer1();


function gozer2(){
  
  let argReturn = gozer3(1,2,3,4);
  console.log("argReturn is: " + argReturn);
  console.log("argReturn[2] is: " + argReturn[2]);
  console.log("is array?: " + Array.isArray(argReturn));
  
}
gozer2();


function gozer3(){
  
  newArg = [];
  for(let i=0; i<arguments.length; i++){
    newArg[i] = arguments[i];
  }
  
  console.log("arguments length is: " + arguments.length);
  console.log("newArg is: " + JSON.stringify(newArg));
  console.log("newArg Length is: " + newArg.length);
  newArg.push("width");
  
  console.log("newArg is: " + JSON.stringify(newArg));
  
  gozer4(arguments,5)
  
  return newArg
  
}




/*document.getElementById("div1").style.fontSize = "5em";*/

window.document.getElementById("div2").style.color = "blue";