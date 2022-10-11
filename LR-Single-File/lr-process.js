
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