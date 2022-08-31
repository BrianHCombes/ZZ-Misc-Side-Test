 


//***********************************************************************************************************************************************************
// lr.to Console method:
// The lr.toConsole method outputs all vital view port settings to the console. 
lr.toConsole = function(sectionTitle){
  
  
  // For colors in console.log();
  //https://stackoverflow.com/questions/7505623/colors-in-javascript-console
  if(sectionTitle === undefined)sectionTitle = "No title provided";
  console.log("%c**************************************","color:blue");
  console.log("%c   **** lr.toConsole() Begin ****   ","color:red; font-weight:bold; background-color:yellow; border:1px solid black;");
  console.log("%c    Title:    \n   " + sectionTitle + "   ", "color:yellow; background-color:red; border:2px solid black;");
  console.log("%c**************************************","color:blue");
  console.log("Device Width is:                 " + lr.getLRp().deviceWidth);
  console.log("Device Width property name is:   " + lr.getLRp().deviceWidthNameUsed);
  console.log("Device Height is:                " + lr.getLRp().deviceHeight);
  console.log("Device Height property name is:  " + lr.getLRp().deviceHeightNameUsed);
  console.log("View port width value\nof lr.vpWidth is:                " + lr.vpWidth);
  console.log("Max view port width value\nof lr.maxVPwidth is:             " + lr.maxVPwidth);
  console.log("View port height value\nof lr.vpHeight is:               " + lr.vpHeight);
  console.log("Max view port height value\nof lr.maxVPheight is:            " + lr.maxVPheight);
  console.log("The view port width property\nname currently used is:          " + lr.vpWidthNameUsed);
  console.log("The view port height property\nname currently used is:          " + lr.vpHeightNameUsed);
  console.log("The view port app ratio is:      " + lr.vpRatio);
  console.log("The view port device ratio is:   " + lr.deviceRatio);
  console.log("%c**************************************","color:blue");
  console.log("%c   ***** lr.toConsole() End *****   ","color:red; font-weight:bold; background-color:yellow; border:1px solid black;");
  console.log("%c**************************************","color:blue");
};

//***********************************************************************************************************************************************************
// lr.eval method:
// The lr.eval method calculates the return CSS numeric value based on a provided viewport dimension. This is for developer purposes.
// The first 5 arguments of the arguments object are the lr.w() or lr.h() method arguments and the 6th argument is the simulated viewport dimension. 
lr.eval = function(){
  
  if(arguments.length === 6){
    
    var evalResult;
    var evalValue = arguments[5];
    arguments.length = 5;
    
    // Checks to make sure value to be evaluated is valid.
    if(evalValue <= -1 && !isNaN(evalValue)){
      console.error("ERROR!! The evaluation argument in the lr.eval() method must be greater than or equal to 0. " + evalValue + " was entered which is less than zero.");
      return undefined;
    }
    else 
    if(isNaN(evalValue)){
      console.error("ERROR!! The evaluation argument in the lr.eval() method must be a number. \""  + evalValue + "\" was entered which is a string.");
      return undefined;
    }

    // Checks to make sure the lr expression arguments are valid. The "width" argument is required but arbitrary as long as either "width" or "height" is used.
    var returnArgs = processArgs(arguments, "width"); 
    if(returnArgs === undefined){
      return undefined;
    }
    
    // Calculates the result at the given value provided. 
    GetSet().setEvalToUse(evalValue);
    evalResult = unitCalculator(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    console.log("\n\nEvaluated result at " + evalValue + " is:\n" + evalResult + "\nusing the expression:\n" +
                arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] + "\n\n");
    GetSet().setEvalToUse(-1);
  }
  else
  console.error("Error! The lr.eval() method must have 6 arguments, first 5 must be the lr.w() or lr.h() expression arguments, the 6th is the evaluation value, detected " + arguments.length + " arguments.");
};



//***********************************************************************************************************************************************************
// lr.w method:
// The lr.w method sets the CSS value based on the viewport width. The arguments received are 
// the hard css properties that lineate from one to the other between the two specified view port ranges.
//lr.w = function(){
//  var returnArgs = processArgs(arguments, "width");
//  //console.log("lr.w arguments returned from processArgs() is: " + JSON.stringify(returnArgs));
//  return returnArgs.result;
//};

lr.w = function(){
    
//  console.log("lr.upperRangePoint is: " + lr.upperRangePoint);  
//  console.log("lr.lowerRangePoint is: " + lr.lowerRangePoint);
  
//  var arguments1 = ["em",4,0.8];
  
//  if(arguments.length === 3){
//     var argArrayTest = [];
//     
//     argArrayTest[0] = arguments[0];
//     argArrayTest[1] = lr.upperRangePoint;
//     argArrayTest[2] = arguments[1];
//     argArrayTest[3] = lr.lowerRangePoint;
//     argArrayTest[4] = arguments[2];
//     
//     console.log("argArrayTest is: " + argArrayTest);
//      
//  }

    if(arguments.length === 3){
     var argArrayPlaceHolder = [];   
     argArrayPlaceHolder[0] = arguments[0];
     argArrayPlaceHolder[1] = arguments[1];
     argArrayPlaceHolder[2] = arguments[2];
     
//     console.log("argArrayPlaceHolder is: " + JSON.stringify(argArrayPlaceHolder));
//     console.log("argArrayPlaceHolder[1] is: " + argArrayPlaceHolder[1]);
//     console.log("argArrayPlaceHolder[2] is: " + argArrayPlaceHolder[2]);
     
     
     arguments[0] = argArrayPlaceHolder[0];
     arguments[1] = lr.upperRangePoint;
     arguments[2] = argArrayPlaceHolder[1];
//     console.log("%cargArrayPlaceHolder[2] is: " + argArrayPlaceHolder[2], "color:blue; font-size:20px;");
     arguments[3] = lr.lowerRangePoint;
     arguments[4] = argArrayPlaceHolder[2];
     
     arguments.length = 5;
     
//     console.log("arguments is: " + JSON.stringify(arguments));
//     console.log("arguments is: " + arguments[1]);
//     console.log("arguments.length is: " + arguments.length);
      
  }



//    arguments[1] = lr.upperRangePoint;
    console.log("arguments is: " + JSON.stringify(arguments));
    console.log("arguments is: " + arguments[1]);
  
  
  
  
  var returnArgs = processArgs(arguments, "width");
  //console.log("lr.w arguments returned from processArgs() is: " + JSON.stringify(returnArgs));
  return returnArgs.result;
};




//***********************************************************************************************************************************************************
// lr.dw method:
// The lr.dw method returns response values based on the device-viewport width as defined by the 
// window.screen.availWidth property. This is not to be confused with the 
// just the viewport width which is settable and is used by the lr.w method. Often, the device-viewport width and
// the viewport width are the same unless the lr.setVPw method is used to set the viewport width to something other
// than the device width. The arguments sent are the hard css properties that lineate from one to the other between 
// the two specified device-viewport ranges.
lr.dw = function(){
  var returnArgs = processArgs(arguments, "deviceWidth");
  //console.log("lr.w arguments returned from processArgs() is: " + JSON.stringify(returnArgs));
  return returnArgs.result;
};


//***********************************************************************************************************************************************************
// lr.h method:
// The arguments received are the hard css properties that are to lineate between the two specified view port ranges.
// With this method the lineation is based on viewport height
lr.h = function(){
  var returnArgs = processArgs(arguments, "height");
  //console.log("lr.h arguments returned from processArgs() is: " + JSON.stringify(returnArgs));
  return returnArgs.result;
};


//***********************************************************************************************************************************************************
// lr.dh method:
// The lr.dh method returns response values based on the device-viewport height as defined by the 
// window.innerHeight property. This is not to be confused with  
// just the settable viewport height which is used by the lr.h() method. Often, the device-viewport height and
// the viewport height are the same unless the lr.setVPh method is used to set the viewport height to something other
// than the device height. The arguments sent are the hard css properties that lineate from one to the other between 
// the two specified device-viewport ranges.
lr.dh = function(){
  var returnArgs = processArgs(arguments, "deviceHeight");
  //console.log("lr.w arguments returned from processArgs() is: " + JSON.stringify(returnArgs));
  return returnArgs.result;
};


//***********************************************************************************************************************************************************
// lr.r method:
// The arguments received are the hard css properties that are to lineate between two specified view port height to width ratios.
// With this method the lineation is based on ratio of viewport height to viewport width.
lr.r = function(){
  var returnArgs = processArgs(arguments, "ratio");
  return returnArgs.result;
};

lr.dr = function(){
  var returnArgs = processArgs(arguments, "deviceRatio");
  return returnArgs.result;
};

lr.html = function(){
  var returnHTMLCSS = processHTMLCSS(arguments, "width");
  return returnHTMLCSS.result;
};

lr.hhtml = function(){
  var returnHTMLCSS = processHTMLCSS(arguments, "height");
  return returnHTMLCSS.result;
};

lr.css = function(){
  var returnHTMLCSS = processHTMLCSS(arguments, "width");
  return returnHTMLCSS.result;
};

lr.hcss = function(){
  var returnHTMLCSS = processHTMLCSS(arguments, "height");
  return returnHTMLCSS.result;
};

// https://stackoverflow.com/questions/6843951/which-way-is-best-for-creating-an-object-in-javascript-is-var-necessary-befor