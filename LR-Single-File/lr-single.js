// LR Response Object Declaration - window level scope
var lr = {};

//***********************************************************************************************************************************************************
// Default Config Section
// What is lr-default-config.js in separated files
//***********************************************************************************************************************************************************

// Default constants
const lrDeviceWidth                         = window.screen.width;
const lrDeviceWidthPropertyApplied          = "window.screen.width";
const lrDeviceHeight                        = window.screen.height;
const lrDeviceHeightPropertyApplied         = "window.screen.height";
const lrDeviceRatio                         = (lrDeviceHeight/lrDeviceWidth).toFixed(4);


const lrWindowWidthDefault                  = window.screen.availWidth;
const lrWindowWidthPropertyAppliedDefault   = "window.screen.availWidth";
const lrWindowHeightDefault                 = window.innerHeight;
const lrWindowHeightPropertyAppliedDefault  = "window.innerHeight";
const lrWindowRatioDefault                  = (lrWindowHeightDefault/lrWindowWidthDefault).toFixed(4);


const lrRangeUpperPointWidth                = 1920;
const lrRangeUpperPointHeight               = 940;
const lrRangeLowerPointWidth                = 360;
const lrRangeLowerPointHeight               = 560;
const lrRangePoint1Ratio                    = (lrRangeUpperPointHeight/lrRangeUpperPointWidth).toFixed(4);
const lrRangePoint2Ratio                    = (lrRangeLowerPointHeight/lrRangeLowerPointWidth).toFixed(4);


//***********************************************************************************************************************************************************
// Getter Setter Section
// What is lr-getter-setters.js in separated files
//***********************************************************************************************************************************************************

lr.default = function(){
    lr.windowWidth = lrWindowWidthDefault;
    lr.windowWidthPropertyApplied = lrWindowWidthPropertyAppliedDefault; 
    lr.windowHeight = lrWindowHeightDefault;
    lr.windowHeightPropertyApplied = lrWindowHeightPropertyAppliedDefault; 
    lr.windowRatio = lrWindowRatioDefault;

    lr.vpWidth = lr.vpWidthMax = lrWindowWidthDefault;
    lr.vpWidthPropertyApplied = lrWindowWidthPropertyAppliedDefault;
    lr.vpHeight = lr.vpHeightMax = lrWindowHeightDefault;
    lr.vpHeightPropertyApplied = lrWindowHeightPropertyAppliedDefault;
    lr.vpRatio = lrWindowRatioDefault;
    
    lr.URPw = lr.rangeUpperPointWidth = lrRangeUpperPointWidth;
    lr.LRPw = lr.rangeLowerPointWidth = lrRangeLowerPointWidth;
    lr.URPh = lr.rangeUpperPointHeight = lrRangeUpperPointHeight;
    lr.LRPh = lr.rangeLowerPointHeight = lrRangeLowerPointHeight;
    lr.RP1r = lr.rangePoint1Ratio = lrRangePoint1Ratio;
    lr.RP2r = lr.rangePoint2Ratio = lrRangePoint2Ratio;
};
lr.default();
              
//***********************************************************************************************************************************************************
// GetSet method (is a service):
var axisToUseInGetSet = "";
var evalValueToUse = -1;
var GetSet = function(){
  
  return  {
            getAxisToUse: function(){
              return axisToUseInGetSet;
            },
  
            setAxisToUse: function(axisReceived){
              axisToUseInGetSet = axisReceived;
            },
            
            setEvalToUse: function(evalValue){
              evalValueToUse = evalValue;
            },
            
            getEvalToUse: function(){
              return evalValueToUse;
            }
            
          };
};

//***********************************************************************************************************************************************************
// lr.setURP method:
// These four methods set the range points to be auto inserted into the 3 Arg expressions before processing. 
lr.setURPw = function(rangeUpperPointWidth){
    lr.rangeUpperPointWidth = lr.URPw = rangeUpperPointWidth;
};

lr.setLRPw = function(rangeLowerPointWidth){
    lr.rangeLowerPointWidth = lr.LRPw = rangeLowerPointWidth;
};

lr.setURPh = function(rangeUpperPointHeight){
    lr.rangeUpperPointHeight = lr.URPh = rangeUpperPointHeight;
};

lr.setLRPh = function(rangeLowerPointHeight){
    lr.rangeLowerPointHeight = lr.LRPh = rangeLowerPointHeight;
};

lr.setRP1r = function(rangePoint1Ratio){
    lr.rangePoint1Ratio = lr.RP1r = rangePoint1Ratio;
};

lr.setRP2r = function(rangePoint2Ratio){
    lr.rangePoint2ratio = lr.RP2r = rangePoint2Ratio;
};


//***********************************************************************************************************************************************************
// lr.setMaxVPw method:
// This method takes a single argument. It sets the maximum desired viewport width in pixels. 
// Send the string value "default" to set the maximum width to the currently used window height property. See method setVPp 
// All other methods used to set the viewport width will be capped to this value if they exceed this value.
lr.setMaxVPw =  function(maxW){
                  lr.vpWidthMax = maxW;
                  if(lr.vpWidth > lr.vpWidthMax ){
                      lr.vpWidth = lr.vpWidthMax ;
                  };
                  lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
                };
                
                
//***********************************************************************************************************************************************************
// lr.setMaxVPh method:
// This method takes a single numerical value. It sets the maximum desired viewport height. 
// All other methods used to set the viewport height will be capped to this value if they exceed this value.
lr.setMaxVPh =  function(maxH){
                  lr.vpHeightMax= maxH;
                  if(lr.vpHeight > lr.vpHeightMax){
                      lr.vpHeight = lr.vpHeightMax;
                  };
                  lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
                };
              
              
//***********************************************************************************************************************************************************
// lr.setVPw method:
// The lr.setVPw method is used to set the viewport width in px. 
// This method takes a single numerical value, typically an int, and sets the viewport width to that value in pixels.
// Note: Only the lr methods treat this value as the viewport width.
lr.setVPw = function(viewportWidth){
              lr.vpWidth = viewportWidth;
              if(lr.vpWidth > lr.vpWidthMax ){
                lr.vpWidth = lr.vpWidthMax ;
              } 
              else {lr.vpWidthPropertyApplied =  "set by this web application via the lr.setVPw() method and is NOT a directly " +
                                                 "reported window property such as window.innerWidth.";};  
              lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
            };              
               

//***********************************************************************************************************************************************************
// lr.setVPh method:
// The lr.setVPh method is used to set the viewport height in px. 
// This method takes a single numerical value, typically an int, and sets the viewport height to that value in pixels.
// Note: Only the lr methods treat this value as the viewport height.

lr.setVPh = function(viewportHeight){
              lr.vpHeight = viewportHeight;
              if(lr.vpHeight > lr.vpHeightMax){
                lr.vpHeight = lr.vpHeightMax;
              }
              else{lr.vpHeightPropertyApplied =  "set by this web application via the lr.setVPh() method and is NOT a directly " +
                                                 "reported window property such as window.innerHeight.";};
              lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);                  
            };
            
            
//***********************************************************************************************************************************************************
// lr.setVPp method:
// The lr.setVPp method is used to set the view port property to be used. 
// This method takes a single string argument. 
// It must be a known view port window property name. 
// For example: To set the width property used to 'window.screen.width' invoke as lr.setVPp('window.screen.width').
// This will be the property used but setting the viewport value with lr.setVPw or lr.setVPh will override and hard-set the value
lr.setVPp = function(viewportPropertyName){
  switch(viewportPropertyName){
    case "window.outerWidth":         windowPropertyAssignmentsWidth(window.outerWidth, viewportPropertyName); break;
    case "window.outerHeight":        windowPropertyAssignmentsHeight(window.outerHeight, viewportPropertyName); break;
    case "window.innerWidth":         windowPropertyAssignmentsWidth(window.innerWidth, viewportPropertyName); break;
    case "window.innerHeight":        windowPropertyAssignmentsHeight(window.innerHeight, viewportPropertyName); break;
    case "window.screen.width":       windowPropertyAssignmentsWidth(window.screen.width, viewportPropertyName); break;
    case "window.screen.height":      windowPropertyAssignmentsHeight(window.screen.height, viewportPropertyName); break;
    case "window.screen.availWidth":  windowPropertyAssignmentsWidth(window.screen.availWidth, viewportPropertyName); break;
    case "window.screen.availHeight": windowPropertyAssignmentsHeight(window.screen.availHeight, viewportPropertyName); break;
    case "$(window).outerWidth()":    windowPropertyAssignmentsWidth($(window).outerWidth(), viewportPropertyName); break;
    case "$(window).outerHeight()":   windowPropertyAssignmentsHeight($(window).outerHeight(), viewportPropertyName); break;                                  
    case "$(window).innerWidth()":    windowPropertyAssignmentsWidth($(window).innerWidth(), viewportPropertyName); break;
    case "$(window).innerHeight()":   windowPropertyAssignmentsHeight($(window).innerHeight(), viewportPropertyName); break;       
    case "$(window).width()":         windowPropertyAssignmentsWidth($(window).width(), viewportPropertyName); break;
    case "$(window).height()":        windowPropertyAssignmentsHeight($(window).height(), viewportPropertyName); break;
    default:                          console.log("Viewport property \"" + viewportPropertyName + "\" not found");
  };
  function windowPropertyAssignmentsWidth(windowPropertyWidth, windowPropertyWidthName){
        lr.vpWidth = lr.vpWidthMax = lr.windowWidth = windowPropertyWidth;
        lr.vpWidthPropertyApplied = lr.windowWidthPropertyApplied = windowPropertyWidthName;
        lr.vpRatio = lr.windowRatio = (lr.windowHeight/lr.windowWidth).toFixed(4);
  };
  function windowPropertyAssignmentsHeight(windowPropertyHeight, windowPropertyHeightName){
        lr.vpHeight = lr.vpHeightMax = lr.windowHeight = windowPropertyHeight;
        lr.vpHeightPropertyApplied = lr.windowHeightPropertyApplied = windowPropertyHeightName;
        lr.vpRatio = lr.windowRatio = (lr.windowHeight/lr.windowWidth).toFixed(4);
  }
};
   
   
   
////***********************************************************************************************************************************************************
// lr.getLRp method:
// The lr.getLRp method returns the current linear response property values as needed. 
// Use the lr.getLRpString method to return and reference all the available properties of the linear response object.
lr.getLRp = function(){
  let viewPortProperties = {
                            "lrDeviceWidth":                  lrDeviceWidth,
                            "lrDeviceWidthPropertyApplied":   lrDeviceWidthPropertyApplied,
                            "lrDeviceHeight":                 lrDeviceHeight,
                            "lrDeviceHeightPropertyApplied":  lrDeviceHeightPropertyApplied,
                            "lrDeviceRatio":                  lrDeviceRatio, 
                            
                            "windowWidth":                    lr.windowWidth,
                            "windowWidthPropertyApplied":     lr.windowWidthPropertyApplied,
                            "windowHeight":                   lr.windowHeight,
                            "windowHeightPropertyApplied":    lr.windowHeightPropertyApplied,
                            "windowRatio":                    lr.windowRatio,
                            
                            "vpWidth":                        lr.vpWidth, 
                            "vpMaxWidth":                     lr.vpWidthMax,
                            "vpWidthPropertyApplied":         lr.vpWidthPropertyApplied,
                            "vpHeight":                       lr.vpHeight,
                            "vpMaxHeight":                    lr.vpHeightMax,
                            "vpHeightPropertyApplied":        lr.vpHeightPropertyApplied,
                            "vpRatio":                        lr.vpRatio,
                            
                            "lrRangeUpperPointWidth":         lrRangeUpperPointWidth,
                            "lrRangeLowerPointWidth":         lrRangeLowerPointWidth,
                            "lrRangeUpperPointHeight":        lrRangeUpperPointHeight,
                            "lrRangeLowerPointHeight":        lrRangeLowerPointHeight,
                            "lrRangePoint1Ratio":             lrRangePoint1Ratio,
                            "lrRangePoint2Ratio":             lrRangePoint2Ratio
                           
                           };
  return viewPortProperties;
};

//***********************************************************************************************************************************************************
// lr.getLRpString method:
// The lr.getLRpString method returns all the current linear response properties as a string. 
// Use this for reference to know all the available properties.
lr.getLRpString = function(){
  let viewPortProperties = {
                            "lrDeviceWidth":                  lrDeviceWidth,
                            "lrDeviceWidthPropertyApplied":   lrDeviceWidthPropertyApplied,
                            "lrDeviceHeight":                 lrDeviceHeight,
                            "lrDeviceHeightPropertyApplied":  lrDeviceHeightPropertyApplied,
                            "lrDeviceRatio":                  lrDeviceRatio,
                            
                            "windowWidth":                    lr.windowWidth,
                            "windowWidthPropertyApplied":     lr.windowWidthPropertyApplied,
                            "windowHeight":                   lr.windowHeight,
                            "windowHeightPropertyApplied":    lr.windowHeightPropertyApplied,
                            "windowRatio":                    lr.windowRatio,
                            
                            "vpWidth":                        lr.vpWidth, 
                            "vpMaxWidth":                     lr.vpWidthMax,
                            "vpWidthPropertyApplied":         lr.vpWidthPropertyApplied,
                            "vpHeight":                       lr.vpHeight,
                            "vpMaxHeight":                    lr.vpHeightMax,
                            "vpHeightPropertyApplied":        lr.vpHeightPropertyApplied,
                            "vpRatio":                        lr.vpRatio,
                            
                            "lrRangeUpperPointWidth":         lrRangeUpperPointWidth,
                            "lrRangeLowerPointWidth":         lrRangeLowerPointWidth,
                            "lrRangeUpperPointHeight":        lrRangeUpperPointHeight,
                            "lrRangeLowerPointHeight":        lrRangeLowerPointHeight,
                            "lrRangePoint1Ratio":             lrRangePoint1Ratio,
                            "lrRangePoint2Ratio":             lrRangePoint2Ratio
                            
                           };
  return JSON.stringify(viewPortProperties);
};

//***********************************************************************************************************************************************************
// Method processing
// What is lr-process.js in separated files
//***********************************************************************************************************************************************************


// The processArgs method accepts LR parameters and the axis to calculate. 
// It checks, converts, and filters the parameters before sending the final parameter group to the unitCalculator method for calculation.
// It returns the calculated CSS unit value based on the devices view port width or view port height.

  function processArgs(paramArgs, axisToCalculate){
      
    GetSet().setAxisToUse(axisToCalculate);
    var argData =  {
                    "err":false,
                    "args":paramArgs,
                    "result":""
                  };
                  //console.log(JSON.stringify(argData.args) + "\nand " + axisToCalculate + "\nplus" + argData.args[5]);
    // check args length
    argData = argLengthCheck(argData);
    if(argData.err === true){
      argData.result = undefined;
      return argData.result;
    }
    
    // convert args if string or array passed
    if(argData.err === false && argData.args.length === 1){ 
      argData = convertArgs(argData);
      argData = argsCheck(argData);
      if(argData.err === true){
        argData.result = "undefined";
        return argData;
      }
    }
    
    // args Check
    if(argData.err === false){
      argData = argsCheck(argData);
      if(argData.err === true){
        argData.result = undefined;
        console.log("Here and arg data is: " + argData.result + " and " + argData.err);
        return argData.result;
      }
    }
    
    // filter and return proper parameter group
    if(argData.err === false){
      argData.args = groupFilter(argData);
    }

    // calculate CSS value
    if(argData.err === false){
      argData.result = unitCalculator(argData.args[0], argData.args[1], argData.args[2], argData.args[3], argData.args[4]);
    }
    
    return argData;
  }

  function argLengthCheck(data){
    
      // if parameters
      if(data.args.length % 5 !== 0 && data.args.length > 1){
        console.error("Linear Response ERROR!: Incorrect number of parameters being passed in the calling function. Must be in multiples of 5. " +
                      "If passing a string or array assure number of demarked elements within the string or array are in multiples of 5 " +
                      "There are currently " + data.args.length + " parameters/elements detected. They are: " + data.args);
        data.err = true;
      } else
      
      // if array or string or unknown format
      if(data.args.length === 1){
        if(Array.isArray(data.args[0]) === true){
          if(data.args[0].length % 5 !== 0){
            console.error("Linear Response ERROR!: Incorrect number of parameters in the array passed as an argument in the calling Linear Response function. " +
                          "The number of parameters in the array must be in multiples of 5. " +
                          "There are currently " + data.args[0].length + " parameters/elements detected. They are: " + data.args[0]);
            data.err = true;
          }
        } else 
        if(typeof(data.args[0]) === "string"){ 
          var stringTest = [];
          stringTest = data.args[0].split(",");
          if(stringTest.length % 5 !== 0){
            console.error("Linear Response ERROR!: Incorrect number of comma separated parameters in the string passed as an argument in the calling Linear Response function. " +
                          "The number of parameters in the array must be in multiples of 5. " +
                          "There are currently " + stringTest.length + " parameters/elements detected. They are: " + stringTest);
            data.err = true;
          }
        } else {
          console.error("Linear Response ERROR!: Unknown parameter format has been submitted by the calling Linear Response function. " +
                      "Expecting individual parameters, an array, or a string. Parameter format received is: " + JSON.stringify(data.args[0]));
          data.err = true;    
        }
      }
    return data;  
  }
  
  function convertArgs(data){
    // If array
    if(typeof(data.args[0]) === 'object' && data.args.length === 1){
      data.args = data.args[0];
      for(var i=0; i<data.args.length; i++){
        var args;  
        if(isNaN(data.args[i]) && i%5 !== 0){
          args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a number - This group was received as an array.");
          data.err = true;
        }
        else if(!isNaN(data.args[i]) && i%5 === 0 && data.args[i] != 0){
          args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a string - This group was received as an array.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%5 !== 0){data.args[i]*=1;} // This conversion here must be part of a production release if it is decided to accept numbers as strings (for example: "8") of which will be converted to a number by multiplying by one..
      }
    }
  
    // If string
    if(typeof(data.args[0]) === 'string' && data.args.length === 1){
      data.args = data.args[0].split(","); // This conversion here must be part of a production release.
      for(var i=0; i<data.args.length; i++){
        if(isNaN(data.args[i]) && i%5 !== 0){
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + data.args + " must be a number - This group was received as a string.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%5 === 0){
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + data.args + " must be a string - This group was received as a string.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%5 !== 0){ // This conversion here must be part of a production release.
          data.args[i]*=1;
        } 

        if(i%5 === 0 && (data.args[i] === '""' || data.args[i] === "''")){
          data.args[i] = "";
        }
      }
    }
    return data;
  }
  
  function argsCheck(data){
      for(var i=0; i<data.args.length; i++){
        var args;  
        if(isNaN(data.args[i]) && i%5 != 0){
              args = Array.prototype.slice.call(data.args);
              console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a number - This group was received as primitive parameters.");
              data.err = true;
              break;
        }else{if(i%5 !== 0)data.args[i]*=1;}
        if(!isNaN(data.args[i]) && i%5 === 0 && data.args[i] != 0){
          args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a string - This group was received as primitive parameters.");
          data.err = true;
          break;
        }
      }
    return data;
  }
  
  function groupFilter(data){
  
    var onMatch = false;
    var axisDimension;
    var axisUsed = GetSet().getAxisToUse();
    
    if(axisUsed === "width"){   
      axisDimension = lr.vpWidth;
    } else 
    if(axisUsed === "windowWidth"){
      axisDimension = lr.windowWidth;
    } else  
    if(axisUsed === "height"){
      axisDimension = lr.vpHeight;
    } else
    if(axisUsed === "windowHeight"){
      axisDimension = window.innerHeight;
    } else
    if(axisUsed === "ratio"){
      axisDimension = lr.vpRatio;
    } else
    if(axisUsed === "windowRatio"){
      axisDimension = lrDeviceRatio;
    } else
    {
      console.error("ERROR! Unknown axis, should be either 'width' or 'height'. Response calculation aborted.");
    }
    
    // If more than one parameter group.
    if(data.args.length > 5){
          onMatch = false;
          for(var i=0; i<(data.args.length+5); i+=5){
            if((axisDimension <= data.args[i+1] && axisDimension >= data.args[i+3]) || (axisDimension >= data.args[i+1] && axisDimension <= data.args[i+3])){
              onMatch = true;
              data.args = Array.prototype.slice.call(data.args);
              data.args = data.args.slice(i,i+5);
              return data.args;
            };
          };
          
          // Find closest parameter group match when view port is outside parameter groups given.
          if(onMatch === false){
            
            if(data.args.length > 5){
              var diff;
              var closest = data.args[1] - axisDimension;
              var closestParamIndex = 1;
              data.args = Array.prototype.slice.call(data.args);
              
              for(var i=0; i<data.args.length; i+=5){
                diff = Math.abs(data.args[i+1] - axisDimension);
                if(diff < closest){
                  closest = diff;
                  closestParamIndex = i+1;
                }
                diff = Math.abs(data.args[i+3] - axisDimension);
                if(diff < closest){
                  closest = diff;
                  closestParamIndex = i+3;
                }
              }
              
              var paramGroup = Math.floor(closestParamIndex/5);
              
              data.args[0] = data.args[paramGroup*5 + 0];
              data.args[1] = data.args[paramGroup*5 + 1];
              data.args[2] = data.args[paramGroup*5 + 2];
              data.args[3] = data.args[paramGroup*5 + 3];
              data.args[4] = data.args[paramGroup*5 + 4];
              data.args = data.args.slice(0,5);
              
//              console.warn( "Warning: view port " + axisUsed + "\nThis device's view port " + axisUsed + " is outside any view port " + axisUsed + "s specified by this set of LR parameter groups. \n" +
//                            "The return value is calculated using the LR parameter group closest to this device's view port " + axisUsed + " of " + axisDimension + "px\n" +
//                            "The closest LR parameter group is: " +
//                            data.args[0] + "," + data.args[1] + "," + data.args[2] + "," + data.args[3] + "," + data.args[4]);
              return data.args;
            };
          };
    }
    // If only one parameter group provided.
    else{
      onMatch = false;
      if((axisDimension > data.args[1]) || (axisDimension < data.args[3])){
//        console.warn( "Warning: view port " + axisUsed + "\nThis device's view port " + axisUsed + " is outside the view port " + axisUsed + " specified by this LR parameter group.\n" +
//                      "However, the return value is still calculated using this LR parameter group.\nReported " + axisUsed + " is:" + axisDimension + "px\n" +
//                      "The LR parameter group is: " +
//                      data.args[0] + "," + data.args[1] + "," + data.args[2] + "," + data.args[3] + "," + data.args[4]);
      };
      data.args = Array.prototype.slice.call(data.args);
      data.args = data.args.slice(0,5);
      return data.args;
    };
  };

  function unitCalculator(propertyPlusUnit,vp1,v1,vp2,v2){
    var slope = (v1-v2)/(vp1-vp2);
    var yIntercept = (v1-slope*vp1);
    var cssProperty;
    var cssUnit;
    var colonIndex = propertyPlusUnit.indexOf(":");  

    if(colonIndex === -1){
      cssProperty = "";
      cssUnit = propertyPlusUnit;
    }
    else{
      cssProperty = propertyPlusUnit.slice(0,colonIndex)+":";
      cssUnit = propertyPlusUnit.slice(colonIndex+1);
    }
    
    if(GetSet().getAxisToUse() === "width" && GetSet().getEvalToUse() === -1){ 
      if(cssUnit === ""){return (slope*lr.vpWidth + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*lr.vpWidth + yIntercept).toFixed(2) + cssUnit;}
    } else 
    if(GetSet().getAxisToUse() === "windowWidth" && GetSet().getEvalToUse() === -1){ 
      if(cssUnit === ""){return (slope*lr.windowWidth + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*lr.windowWidth + yIntercept).toFixed(2) + cssUnit;}
    } else   
    if(GetSet().getAxisToUse() === "height" && GetSet().getEvalToUse() === -1){
      if(cssUnit === ""){return (slope*lr.vpHeight + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*lr.vpHeight + yIntercept).toFixed(2) + cssUnit;};
    } else
    if(GetSet().getAxisToUse() === "windowHeight" && GetSet().getEvalToUse() === -1){
      if(cssUnit === ""){return (slope*lr.windowHeight + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*lr.windowHeight + yIntercept).toFixed(2) + cssUnit;};
    } else
    if(GetSet().getAxisToUse() === "ratio" && GetSet().getEvalToUse() === -1){
      if(cssUnit === ""){return (slope*lr.vpRatio + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*lr.vpRatio + yIntercept).toFixed(2) + cssUnit;};
    } else
    if(GetSet().getAxisToUse() === "windowRatio" && GetSet().getEvalToUse() === -1){
      if(cssUnit === ""){return (slope*(lr.windowRatio) + yIntercept).toFixed(2);}
      else {return cssProperty + (slope*(lr.windowRatio) + yIntercept).toFixed(2) + cssUnit;};
    } else
    if(GetSet().getEvalToUse() !== -1){
      return cssProperty + (slope*GetSet().getEvalToUse() + yIntercept).toFixed(2) + cssUnit;
    } else
    {
      console.error("ERROR! Unknown axis, should be either 'width' or 'height'. Response calculation aborted.");
    }
  };
  
//***********************************************************************************************************************************************************
// HTML and CSS method calls
// What is lr-html-css.js in separated files
//***********************************************************************************************************************************************************




function processHTMLCSS(paramArgs, axisToCalculate){
  
  GetSet().setAxisToUse(axisToCalculate);
  var argData =  {
                  "err":false,
                  "args":paramArgs,
                  "result":""
                };
  
    // check args length
    argData = argLengthCheckHTMLCSS(argData);
    if(argData.err === true){
      argData.result = undefined;
      return argData.result;
      //console.log("Error True: Return from Length Check is: " + JSON.stringify(argData));
    };
    //console.log("Error False: Return from Length Check is: " + JSON.stringify(argData));
    
    
    // convert args if string or array passed
    if(argData.err === false && argData.args.length === 1){ 
      argData = convertArgsHTMLCSS(argData);
      argData = argsCheckHTMLCSS(argData);
      if(argData.err === true){
        argData.result = "undefined";
        return argData.result;
      };
    };
    
    // args Check
    if(argData.err === false){
      argData = argsCheckHTMLCSS(argData);
      if(argData.err === true){
        argData.result = undefined;
        return argData.result;
      }
    }
    
    // filter and return proper parameter group
    if(argData.err === false){
      argData.args = groupFilterHTMLCSS(argData);
      argData.result = argData.args[0];
    };  
    
    return(argData);
};



function argLengthCheckHTMLCSS(data){
    
      // if parameters
      if(data.args.length % 3 !== 0 && data.args.length > 1){
        console.error("Linear Response ERROR!: Incorrect number of parameters being passed in the calling function. Must be in multiples of 3. " +
                      "If passing a string or array assure number of demarked elements within the string or array are in multiples of 3 " +
                      "There are currently " + data.args.length + " parameters/elements detected. They are: " + JSON.stringify(data.args));
        data.err = true;
      } else
      
      // if array or string or unknown format
      if(data.args.length === 1){
        if(Array.isArray(data.args[0]) === true){
          if(data.args[0].length % 3 !== 0){
            console.error("Linear Response ERROR!: Incorrect number of parameters in the array passed as an argument in the calling Linear Response function. " +
                          "The number of parameters in the array must be in multiples of 3. " +
                          "There are currently " + data.args[0].length + " parameters/elements detected. They are: " + data.args[0]);
            data.err = true;
          }
        } else 
        if(typeof(data.args[0]) === "string"){ 
          var stringTest = [];
          stringTest = data.args[0].split(",");
          if(stringTest.length % 3 !== 0){
            console.error("Linear Response ERROR!: Incorrect number of comma separated parameters in the string passed as an argument in the calling Linear Response function. " +
                          "The number of parameters in the array must be in multiples of 3. " +
                          "There are currently " + stringTest.length + " parameters/elements detected. They are: " + stringTest);
            data.err = true;
          }
        } else {
          console.error("Linear Response ERROR!: Unknown parameter format has been submitted by the calling Linear Response function. " +
                      "Expecting individual parameters, an array, or a string. Parameter format received is: " + JSON.stringify(data.args[0]));
          data.err = true;    
        };
      }
    return data;  
  };  
  
function convertArgsHTMLCSS(data){
    // If array
    if(typeof(data.args[0]) === 'object' && data.args.length === 1){
      data.args = data.args[0];
      for(var i=0; i<data.args.length; i++){
        if(isNaN(data.args[i]) && i%3 !== 0){
          var args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a number - This group was received as an array.");
          data.err = true;
        }
        else if(!isNaN(data.args[i]) && i%3 === 0 && data.args[i] != 0){
          var args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a string - This group was received as an array.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%3 !== 0){data.args[i]*=1;}; // This conversion here must be part of a production release if it is decided to accept numbers as strings (for example: "8") of which will be converted to a number by multiplying by one..
      };
    };

    // If string
    if(typeof(data.args[0]) === 'string' && data.args.length === 1){
      data.args = data.args[0].split(","); // This conversion here must be part of a production release.
      for(var i=0; i<data.args.length; i++){
        if(isNaN(data.args[i]) && i%3 !== 0){
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + data.args + " must be a number - This group was received as a string.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%3 === 0){
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + data.args + " must be a string - This group was received as a string.");
          data.err = true;
          break;
        }
        else if(!isNaN(data.args[i]) && i%3 !== 0){ // This conversion here must be part of a production release.
          data.args[i]*=1;
        }; 

        if(i%3 === 0 && (data.args[i] === '""' || data.args[i] === "''")){
          data.args[i] = "";
        };
      };
    };
    console.log(data.args[3]);
    return data;
};    

function argsCheckHTMLCSS(data){
      for(var i=0; i<data.args.length; i++){
        if(isNaN(data.args[i]) && i%3 != 0){
              var args = Array.prototype.slice.call(data.args);
              console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a number - This group was received or converted to primitive parameters.");
              data.err = true;
              break;
        }else{if(i%3 !== 0)data.args[i]*=1;}
        if(!isNaN(data.args[i]) && i%3 === 0 && data.args[i] != 0){
          var args = Array.prototype.slice.call(data.args);
          console.error("ERROR!!: parameter " + (i+1) + " from the parameter group: " + args + " must be a string - This group was received or converted to primitive parameters.");
          data.err = true;
          break;
        }
      }
    return data;
  };
  
function groupFilterHTMLCSS(data){
  
    var onMatch = false;
    var axisDimension;
    var axisUsed = GetSet().getAxisToUse();
    
    if(axisUsed === "width"){   
      axisDimension = lr.vpWidth;
    } else 
    if(axisUsed === "windowWidth"){   
      axisDimension = lr.windowWidth;
    } else   
    if(axisUsed === "height"){
      axisDimension = lr.vpHeight;
    } else
    if(axisUsed === "windowHeight"){
      axisDimension = lr.windowHeight;
    } else
    if(axisUsed === "ratio"){
      axisDimension = lr.vpRatio;
    } else
    if(axisUsed === "windowRatio"){
      axisDimension = lr.windowRatio;
    } else
    {
      console.error("ERROR! Unknown axis, should be either 'width', 'windowWidth', 'height', 'windowHeight', 'ratio', or 'windowRatio'. Response calculation aborted.");
    }
    
    // If more than one parameter group.
    if(data.args.length > 3){
          onMatch = false;
          for(var i=0; i<(data.args.length+3); i+=3){
            if((axisDimension <= data.args[i+1] && axisDimension >= data.args[i+2]) || (axisDimension >= data.args[i+1] && axisDimension <= data.args[i+2])){
              onMatch = true;
              data.args = Array.prototype.slice.call(data.args);
              data.args = data.args.slice(i,i+3);
              return data.args;
            };
          };
          
          // Find closest parameter group match when view port is outside parameter groups given.
          if(onMatch === false){
            
            if(data.args.length > 3){
              var diff;
              var closest = data.args[1] - axisDimension;
              var closestParamIndex = 1;
              data.args = Array.prototype.slice.call(data.args);
              
              for(var i=0; i<data.args.length; i+=3){
                diff = Math.abs(data.args[i+1] - axisDimension);
                if(diff < closest){
                  closest = diff;
                  closestParamIndex = i+1;
                }
                diff = Math.abs(data.args[i+2] - axisDimension);
                if(diff < closest){
                  closest = diff;
                  closestParamIndex = i+2;
                }
              }
              //console.log("Closest param index: " + closestParamIndex);
              var paramGroup = Math.floor(closestParamIndex/3);
              
              data.args[0] = data.args[paramGroup*3 + 0];
              data.args[1] = data.args[paramGroup*3 + 1];
              data.args[2] = data.args[paramGroup*3 + 2];
             
              data.args = data.args.slice(0,3);
              
//              console.warn( "Warning: view port " + axisUsed + "\nThis device's view port " + axisUsed + " is outside any view port " + axisUsed + "s specified by this set of LR parameter groups. \n" +
//                            "The return value is calculated using the LR parameter group closest to this device's view port " + axisUsed + " of " + axisDimension + "px\n" +
//                            "The closest LR parameter group is: " +
//                            data.args[0] + "," + data.args[1] + "," + data.args[2]);
              return data.args;
            }
          }
    }
    // If only one parameter group provided.
    else{
      onMatch = false;
      if((axisDimension > data.args[1]) || (axisDimension < data.args[2])){
//        console.warn( "Warning: view port " + axisUsed + "\nThis device's view port " + axisUsed + " is outside the view port " + axisUsed + " specified by this LR parameter group.\n" +
//                      "However, the return value is still calculated using this LR parameter group.\nReported " + axisUsed + " is:" + axisDimension + "px\n" +
//                      "The LR parameter group is: " +
//                      data.args[0] + "," + data.args[1] + "," + data.args[2]);
      };
      data.args = Array.prototype.slice.call(data.args);
      data.args = data.args.slice(0,3);
      return data.args;
    };
  };
  
  //***********************************************************************************************************************************************************
  // Lineation Method Calls
  // What is lr-main.js in separated files
  //***********************************************************************************************************************************************************
  
   


//***********************************************************************************************************************************************************
// lr.to Console method:
// The lr.toConsole method outputs all vital view port settings to the console. 
lr.toConsole = function(sectionTitle){
  
  if(sectionTitle === undefined)sectionTitle = "No title provided";
  console.log("%c******************************************************************","color:blue");
  console.log("%c   **** lr.toConsole() Begin ****   ","color:red; font-weight:bold; background-color:yellow; border:1px solid black;");
  console.log("%c    Title:    \n   " + sectionTitle + "   ", "color:yellow; background-color:red; border:2px solid black;");
  console.log("%c******************************************************************","color:blue");
  
  console.log("%c▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼","color:#cc33ff; font-size:2.0em;");
  console.log("%c➥ " + "%cDevice width:                       " + 
              "%c" + lr.getLRp().lrDeviceWidth, "color:#cc33ff; font-size:1.2em", "color:black", "color:#cc33ff; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cDevice width property used:         " + 
              "%c" + lr.getLRp().lrDeviceWidthPropertyApplied, "color:#cc33ff; font-size:1.2em", "color:black", "color:#cc33ff; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cDevice height:                      " + 
              "%c" + lr.getLRp().lrDeviceHeight, "color:#cc33ff; font-size:1.2em", "color:black", "color:#cc33ff; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cDevice height property used:        " + 
              "%c" + lr.getLRp().lrDeviceHeightPropertyApplied, "color:#cc33ff; font-size:1.2em", "color:black", "color:#cc33ff; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cDevice height/width ratio:          " + 
              "%c" + lr.getLRp().lrDeviceRatio, "color:#cc33ff; font-size:1.2em", "color:black", "color:#cc33ff; font-weight:bold; font-size:1.2em;");
  
  console.log("%c▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼","color:red; font-size:2.0em;");
  console.log("%c➥ " + "%cWindow width:                       " + 
              "%c" + lr.getLRp().windowWidth, "color:#ff4000; font-size:1.2em", "color:black", "color:#ff4000; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cWindow width property used:         " + 
              "%c" + lr.getLRp().windowWidthPropertyApplied, "color:#ff4000; font-size:1.2em", "color:black", "color:#ff4000; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cWindow Height:                      " + 
              "%c" + lr.getLRp().windowHeight, "color:#ff4000; font-size:1.2em", "color:black", "color:#ff4000; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cWindow Height property used:        " + 
              "%c" + lr.getLRp().windowHeightPropertyApplied, "color:#ff4000; font-size:1.2em", "color:black", "color:#ff4000; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cWindow height/width ratio:          " + 
              "%c" + lr.getLRp().windowRatio, "color:#ff4000; font-size:1.2em", "color:black", "color:#ff4000; font-weight:bold; font-size:1.2em;");
  
  console.log("%c▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼","color:blue; font-size:2.0em;");
  console.log("%c➥ " + "%cLR viewport width:                  " + 
              "%c" + lr.getLRp().vpWidth, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport max width:              " + 
              "%c" + lr.getLRp().vpMaxWidth, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport width property used:    " +
              "%c" + lr.getLRp().vpWidthPropertyApplied, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport height:                 " + 
              "%c" + lr.getLRp().vpHeight, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport max height:             " + 
              "%c" + lr.getLRp().vpMaxHeight, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport height property used:   " + 
              "%c" + lr.getLRp().vpHeightPropertyApplied, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR viewport height/width ratio:     " + 
              "%c" + lr.getLRp().vpRatio, "color:blue; font-size:1.2em", "color:black", "color:blue; font-weight:bold; font-size:1.2em;");
  
  console.log("%c▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼","color:#339933; font-size:2.0em;");
  console.log("%c➥ " + "%cLR range - upper point width:       " + 
              "%c" + lr.URPw, "color:#339933; font-size:1.2em;", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR range - lower point width:       " + 
              "%c" + lr.LRPw, "color:#339933; font-size:1.2em", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR range - upper point height:      " + 
              "%c" + lr.URPh, "color:#339933; font-size:1.2em", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR range - lower point height:      " + 
              "%c" + lr.LRPh, "color:#339933; font-size:1.2em", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR range - point 1 (h/w) ratio:     " + 
              "%c" + lr.RP1r, "color:#339933; font-size:1.2em", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");
  console.log("%c➥ " + "%cLR range - point 2 (h/w) ratio:     " + 
              "%c" + lr.RP2r, "color:#339933; font-size:1.2em", "color:black", "color:#339933; font-weight:bold; font-size:1.2em;");    
  
  console.log("%c******************************************************************","color:blue");
  console.log("%c   ***** lr.toConsole() End *****   ","color:red; font-weight:bold; background-color:yellow; border:1px solid black;");
  console.log("%c******************************************************************","color:blue");
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



lr.wFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "width");
  return returnArgs.result;
};

lr.wwFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "windowWidth");
  return returnArgs.result;
};

lr.hFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "height");
  return returnArgs.result;
};

lr.whFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "windowHeight");
  return returnArgs.result;
};

lr.rFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "ratio");
  return returnArgs.result;
};

lr.wrFiveArg = function(){
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnArgs = processArgs(arguments, "windowRatio");
  return returnArgs.result;
};



//***********************************************************************************************************************************************************
// lr.w method:
// The lr.w method sets the CSS value based on the viewport width. The arguments
// received are the hard css properties that lineate between the two specified 
// viewport ranges, the upper viewport range and the lower viewport range. 
// Typically, the method receives 5 arguments. 
// They are: (1)CSS property and/or unit, (2)upper viewport range point, 
// (3)upper range css unit value, (4)lower viewport range point, (5)lower range 
// css unit value.
// However, if 3 arguments are received, the arguments.length conditional is 
// used to fill in the missing 2 arguments. This abbreviated 3 argument option 
// streamlines the method call since the upper viewport range point and lower 
// viewport range point are often kept the same throughout the entire client 
// application.

// As of 09/16/2022:
// This lr.w method (here in C:\xampp\htdocs\Project-Linear-Response\linear-response\node_modules\linear-response-master-files\lr-main.js)
// has been upgraded to a new streamlined version for the user. 
// Case in point: There is now a 3-arg method and a 3-arg + 2n argument method.
// A few more tests and this code work will be ready for production.
lr.w = function(){
  arguments = ArgConversionToLongFormGradient(arguments,lr.URPw,lr.LRPw);
  var returnArgs = processArgs(arguments, "width");
  return returnArgs.result;
};

lr.wLong = function(){};
lr.wFull = function(){};
lr.w5    = function(){};
lr.w5arg = function(){};


//***********************************************************************************************************************************************************
// lr.dw method:
// The lr.dw method returns response values based on the device-viewport width as defined by the 
// window.screen.availWidth property. This is not to be confused with the 
// just the viewport width which is settable and is used by the lr.w method. Often, the device-viewport width and
// the viewport width are the same unless the lr.setVPw method is used to set the viewport width to something other
// than the device width. The arguments sent are the hard css properties that lineate from one to the other between 
// the two specified device-viewport ranges.
lr.ww = function(){
  arguments = ArgConversionToLongFormGradient(arguments,lr.URPw,lr.LRPw);
  var returnArgs = processArgs(arguments, "windowWidth");
  return returnArgs.result;
};

//***********************************************************************************************************************************************************
// lr.h method:
// The arguments received are the hard css properties that are to lineate between the two specified view port ranges.
// With this method the lineation is based on viewport height
lr.h = function(){
  arguments = ArgConversionToLongFormGradient(arguments,lr.URPh,lr.LRPh);
  var returnArgs = processArgs(arguments, "height");
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
lr.wh = function(){
  arguments = ArgConversionToLongFormGradient(arguments,lr.URPh,lr.LRPh);
  var returnArgs = processArgs(arguments, "windowHeight");
  return returnArgs.result;
};

//***********************************************************************************************************************************************************
// lr.r method:
// The arguments received are the hard css properties that are to lineate between two specified view port height to width ratios.
// With this method the lineation is based on ratio of viewport height to viewport width.
lr.r = function(){
  
  arguments = ArgConversionToLongFormGradient(arguments,lr.RP1r,lr.RP2r);
  var returnArgs = processArgs(arguments, "ratio");
  return returnArgs.result;
};

lr.wr = function(){
  arguments = ArgConversionToLongFormGradient(arguments,lr.RP1r,lr.RP2r);
  var returnArgs = processArgs(arguments, "windowRatio");
  return returnArgs.result;
};


function ArgConversionToLongFormGradient(){
  
  let UpperRangePoint = arguments[1];
  let LowerRangePoint = arguments[2];
  arguments = arguments[0];
  
  if(arguments.length > 2){
    if(arguments.length === 3){
      var argArrayPlaceHolder = [];   
      argArrayPlaceHolder[0] = arguments[0];
      argArrayPlaceHolder[1] = arguments[1];
      argArrayPlaceHolder[2] = arguments[2];

      arguments[0] = argArrayPlaceHolder[0];
      arguments[1] = UpperRangePoint;
      arguments[2] = argArrayPlaceHolder[1];
      arguments[3] = LowerRangePoint;
      arguments[4] = argArrayPlaceHolder[2];
      arguments.length = 5;
    }  
    else {
      let argGroup = [];
        let argIndex = 2;
        argGroup.push(arguments[0]);
        argGroup.push(UpperRangePoint);
        argGroup.push(arguments[1]);
        while(argIndex <= arguments.length-3){
          argGroup.push(arguments[argIndex]);
          argGroup.push(arguments[argIndex+1]);
          argGroup.push(arguments[0]);
          argGroup.push(arguments[argIndex]);
          argGroup.push(arguments[argIndex+1]);
          argIndex += 2;
        }
        argGroup.push(UpperRangePoint);
        argGroup.push(arguments[arguments.length-1]);

        for(let i=0; i<argGroup.length; i++){
          arguments[i] = argGroup[i];
        }
        arguments.length = argGroup.length;
    }
  }
  return arguments;
}

// HTML and CSS based response methods
//***********************************************************************************************************************************************************

// As of 09/16/2022:
// This lr.whtml method (here in C:\xampp\htdocs\Project-Linear-Response\linear-response\node_modules\linear-response-master-files\lr-main.js)
// has been upgraded to a new streamlined version for the user. 
// Case in point: lr.whtml() now accepts streamlined 3-arguments and 3-arguments + 2n arguments.
// A few more tests and this code work will be ready for production.

// NOTE!!!!!!!!!!!!!!!!!!!!! - as of 09-17-2022
// is lr.wwhtml, whhtml, and wrhtml, needed?? Maybe not because these methods are not lineations. They are demarcations.

lr.whtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  console.log("arguments is: " + JSON.stringify(arguments));
  var returnHTMLCSS = processHTMLCSS(arguments, "width");
  return returnHTMLCSS.result;
};
lr.wwhtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowWidth");
  return returnHTMLCSS.result;
};
lr.hhtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "height");
  return returnHTMLCSS.result;
};
lr.whhtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowHeight");
  return returnHTMLCSS.result;
};
lr.rhtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "ratio");
  return returnHTMLCSS.result;
};
lr.wrhtml = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowRatio");
  return returnHTMLCSS.result;
};


lr.wcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "width");
  return returnHTMLCSS.result;
};
lr.wwcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowWidth");
  return returnHTMLCSS.result;
};
lr.hcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "height");
  return returnHTMLCSS.result;
};
lr.whcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowHeight");
  return returnHTMLCSS.result;
};
lr.rcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "ratio");
  return returnHTMLCSS.result;
};
lr.wrcss = function(){
  arguments = ArgConversionToLongFormDemark(arguments);
  var returnHTMLCSS = processHTMLCSS(arguments, "windowRatio");
  return returnHTMLCSS.result;
};

function ArgConversionToLongFormDemark(){
  arguments = arguments[0];
  console.log("Demark arguments is: " + JSON.stringify(arguments));
  let twoArg = true;
  let threeArg = [];
  
  // Test for even indexes having strings
  for(let n = 0; n < arguments.length; n+=2){
    if(isNaN(arguments[n])){}
    else{twoArg = false;};
  };
  
  // Test for odd indexes having numbers
  for(let n = 1; n < arguments.length; n+=2){
    if(!isNaN(arguments[n])){}
    else{twoArg = false;};
  };
  
  // Convert to 3 arg format
  if(twoArg === true){
    let twoArgIndex = 1;
    threeArg.push(arguments[0]);
    threeArg.push(100000);
    while(twoArgIndex < arguments.length){
      threeArg.push(arguments[twoArgIndex]);
      threeArg.push(arguments[twoArgIndex+1]);
      threeArg.push(arguments[twoArgIndex]);
      twoArgIndex += 2;
    }
    threeArg.push(0);
    
    for(let i=0; i<threeArg.length; i++){
      arguments[i] = threeArg[i];
    }
    arguments.length = threeArg.length;
  }
  return arguments;
};



// https://stackoverflow.com/questions/6843951/which-way-is-best-for-creating-an-object-in-javascript-is-var-necessary-befor