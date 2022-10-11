

//// Default constants
//const lrDeviceWidth = window.screen.width;
//const lrDeviceWidthPropertyApplied = "window.screen.width";
//const lrDeviceHeight = window.screen.height;
//const lrDeviceHeightPropertyApplied = "window.screen.height";
//const lrDeviceRatio = (lrDeviceHeight/lrDeviceWidth).toFixed(4);
//
//const lrWindowWidthDefault = window.screen.availWidth;
//const lrWindowWidthPropertyAppliedDefault = "window.screen.availWidth";
//const lrWindowHeightDefault = window.innerHeight;
//const lrWindowHeightPropertyAppliedDefault = "window.innerHeight";
//const lrWindowRatioDefault = (lrWindowHeightDefault/lrWindowWidthDefault).toFixed(4);
//
//const lrRangeUpperPointWidth = 1920;
//const lrRangeUpperPointHeight = 940;
//const lrRangeLowerPointWidth = 360;
//const lrRangeLowerPointHeight = 560;
//const lrRangePoint1Ratio = (lrRangeUpperPointHeight/lrRangeUpperPointWidth).toFixed(4);
//const lrRangePoint2Ratio = (lrRangeLowerPointHeight/lrRangeLowerPointWidth).toFixed(4);

// Default assignments

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