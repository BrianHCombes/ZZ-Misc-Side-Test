


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