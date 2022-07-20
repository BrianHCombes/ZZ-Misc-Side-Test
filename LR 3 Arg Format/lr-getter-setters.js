
// Default settings
lr.vpWidth = lr.maxVPwidth = lr.deviceWidth = window.screen.availWidth;
lr.vpHeight = lr.maxVPheight = lr.deviceHeight = window.innerHeight;
lr.deviceRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
lr.vpRatio = lr.deviceRatio;
lr.vpWidthNameUsed = lr.deviceWidthNameUsed = "window.screen.availWidth";
lr.vpHeightNameUsed = lr.deviceHeightNameUsed = "window.innerHeight";

lr.default =  function(){
                lr.vpWidth = lr.maxVPwidth = window.screen.availWidth;
                lr.vpHeight = lr.maxVPheight = window.innerHeight;
                lr.deviceRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
                lr.vpRatio = lr.deviceRatio;
                lr.vpWidthNameUsed = lr.deviceWidthNameUsed = "window.screen.availWidth";
                lr.vpHeightNameUsed = lr.deviceHeightNameUsed = "window.innerHeight";
              };


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
}


//***********************************************************************************************************************************************************
// lr.setMaxVPw method:
// This method takes a single argument. It sets the maximum desired viewport width in pixels. 
// Send the string value "default" to set the maximum width to the currently used window height property. See method setVPp 
// All other methods used to set the viewport width will be capped to this value if they exceed this value.
lr.setMaxVPw =  function(maxW){
                  lr.maxVPwidth = maxW;
                  if(lr.vpWidth > lr.maxVPwidth){
                      lr.vpWidth = lr.maxVPwidth;
                  };
                  lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
                };
                
                
//***********************************************************************************************************************************************************
// lr.setMaxVPh method:
// This method takes a single numerical value. It sets the maximum desired viewport height. 
// All other methods used to set the viewport height will be capped to this value if they exceed this value.
lr.setMaxVPh =  function(maxH){
                  lr.maxVPheight = maxH;
                  if(lr.vpHeight > lr.maxVPheight){
                      lr.vpHeight = lr.maxVPheight;
                  };
                  lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
                };
              
              
//***********************************************************************************************************************************************************
// lr.setVPw method:
// The lr.setVPw method is used to set the viewport width in px. 
// This method takes a single numerical value, typically an int, and sets the viewport width to that value in pixels.
// Note: Only the lr methods treat this value as the viewport width.
lr.setVPw = function(userViewportWidth){
              lr.vpWidth = userViewportWidth;
              if(lr.vpWidth > lr.maxVPwidth){
                lr.vpWidth = lr.maxVPwidth;
              } 
              else {lr.vpWidthNameUsed =  "set by this web application via the lr.setVPw() method and is NOT a directly " +
                                          "reported window property such as window.innerWidth.";};  
              lr.vpRatio = (lr.vpHeight/lr.vpWidth).toFixed(4);
            };              
               

//***********************************************************************************************************************************************************
// lr.setVPh method:
// The lr.setVPh method is used to set the viewport height in px. 
// This method takes a single numerical value, typically an int, and sets the viewport height to that value in pixels.
// Note: Only the lr methods treat this value as the viewport height.

lr.setVPh = function(userViewportHeight){
              lr.vpHeight = userViewportHeight;
              if(lr.vpHeight > lr.maxVPheight){
                lr.vpHeight = lr.maxVPheight;
              }
              else{lr.vpHeightNameUsed =  "set by this web application via the lr.setVPh() method and is NOT a directly " +
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
lr.setVPp = function(viewportNameProperty){
  
  switch(viewportNameProperty){
    
    case "window.outerWidth":         lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = window.outerWidth;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
     
    case "window.outerHeight":        lr.vpHeight = lr.deviceHeight = lr.maxVPheight = window.outerHeight;
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;
    
    case "window.innerWidth":         lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = window.innerWidth;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "window.innerHeight":        lr.vpHeight = lr.deviceHeight = lr.maxVPheight = window.innerHeight;
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;
    
    case "window.screen.width":       lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = window.screen.width;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "window.screen.height":      lr.vpHeight = lr.deviceHeight = lr.maxVPheight = window.screen.height;
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;
    
    case "window.screen.availWidth":  lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = window.screen.availWidth;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "window.screen.availHeight": lr.vpHeight = lr.deviceHeight = lr.maxVPheight = window.screen.availHeight;
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;
                                      
    case "$(window).outerWidth()":    lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = $(window).outerWidth() ;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "$(window).outerHeight()":   lr.vpHeight = lr.deviceHeight = lr.maxVPheight = $(window).outerHeight();
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;                                  
                                                                            
    case "$(window).innerWidth()":    lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = $(window).innerWidth() ;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "$(window).innerHeight()":   lr.vpHeight = lr.deviceHeight = lr.maxVPheight = $(window).innerHeight();
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;       
                                                                            
    case "$(window).width()":         lr.vpWidth = lr.deviceWidth = lr.maxVPwidth = $(window).width() ;
                                      lr.vpWidthNameUsed = lr.deviceWidthNameUsed = viewportNameProperty;
                                      break;
                                      
    case "$(window).height()":        lr.vpHeight = lr.deviceHeight = lr.maxVPheight = $(window).height();
                                      lr.vpHeightNameUsed = lr.deviceHeightNameUsed = viewportNameProperty;
                                      break;
                                      
    default:  console.log("Viewport property \"" + viewportNameProperty + "\" not found");
  }
};
                
                
                
                
                
                


////***********************************************************************************************************************************************************
// lr.getLRp method:
// The lr.getLRp method returns the current linear response property values as needed. 
// Use the lr.getLRpString method to return and reference all the available properties of the linear response object.
lr.getLRp = function(){
  var viewPortProperties = {
                            "deviceWidth":          lr.deviceWidth,
                            "deviceWidthNameUsed":  lr.deviceWidthNameUsed,
                            "deviceHeight":         lr.deviceHeight,
                            "deviceHeightNameUsed": lr.deviceHeightNameUsed,
                            "widthUsed":            lr.vpWidth, 
                            "heightUsed":           lr.vpHeight,
                            "widthPropertyName":    lr.vpWidthNameUsed,
                            "heightPropertyName":   lr.vpHeightNameUsed,
                            "maxVPwidth":           lr.maxVPwidth,
                            "maxVPheight":          lr.maxVPheight,
                            "vpRatio":              lr.vpRatio + " ",
                            "deviceRatio":          lr.deviceRatio + " " 
                           };
  return viewPortProperties;
};

//***********************************************************************************************************************************************************
// lr.getLRpString method:
// The lr.getLRpString method returns all the current linear response properties as a string. 
// Use this for reference to know all the available properties.
lr.getLRpString = function(){
  var viewPortProperties = {
                            "deviceWidth":          lr.deviceWidth + " ",
                            "deviceWidthNameUsed":  lr.deviceWidthNameUsed + " ",
                            "deviceHeight":         lr.deviceHeight + " ",
                            "deviceHeightNameUsed": lr.deviceHeightNameUsed + " ",
                            "widthUsed":            lr.vpWidth + " ", 
                            "heightUsed":           lr.vpHeight + " ",
                            "widthPropertyName":    lr.vpWidthNameUsed + " ",
                            "heightPropertyName":   lr.vpHeightNameUsed + " ",
                            "maxVPwidth":           lr.maxVPwidth + " ",
                            "maxVPheight":          lr.maxVPheight + " ",
                            "vpRatio":              lr.vpRatio + " ",
                            "deviceRatio":          lr.deviceRatio + " " 
                           };
  return JSON.stringify(viewPortProperties);
};