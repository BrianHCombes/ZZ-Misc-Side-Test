angular.module('viewNav')
    .controller("VNCtrl", ['$state', 'VnData', 'GetSet', 'viewManager', '$window', '$scope', function($state, VnData, GetSet, viewManager, $window, $scope){

        var vn = this;
        var maxWidth = 1170;
        lr.setMaxVPw(maxWidth);
        vn.maxWidth = "max-width:" + maxWidth + "px";
        //GetSet.setMaxWidth(maxWidth);
        
        var devMode = true;
        var viewForDev = "view00";
        
        
        
//***********************************************************************************************************************************************************        
//  Thumb to show as a preview-box on the primary template     
    vn.thumbToShowFunc = function(thumb){;
      vn.thumbToShow = "newthumbs/" + thumb;
    }

//***********************************************************************************************************************************************************
// to see the loaded data brought in by function menuCallback see file: json-client.json Note: Name my change
// for styling configuration see factory "GetSet"
        menuCallback = function(data){
            vn.menuBar1 = data.menuBar1;              // is array
            vn.frameBkColor = data.frameWorkBkColor;  // is single property
        };
        VnData.menuConfig(menuCallback, "frameworkMenus");
        
        
//***********************************************************************************************************************************************************            
//  $state.go('some-view') loads the desired view as the default view upon load.
//  IMPORTANT!!! 11/21/2018 Due to the occasional (unexplained) corrupt load and subsequent error report which needs further investigation I have
//  temporarily implemented a workaround fix that seems to be holding. Note how view00 is loaded first then 300ms later the view as defined by the urlParam
//  variable is loaded. Did this because the second loading always comes up good (so far).

        var urlExp = window.location.href;
        var urlParamIndex = urlExp.indexOf("?");
        var urlParam = "";

        if(urlParamIndex === -1){urlParam = "intro";}
        else {urlParam = urlExp.slice(urlParamIndex+1);};
        
        if(urlParam === "ttd" || urlParam === "buyprice" || urlParam === "products" || urlParam === "reviews"){}
        else         
        if(urlParam.length > 6) urlParam = "intro";
        
        var stateGo = (function(){    
            $state.go('view00');
        }());
        
        if(devMode === false)
          setTimeout(function(){$state.go(urlParam);},800);
        else 
          setTimeout(function(){$state.go(viewForDev);},400);
        
        
//***********************************************************************************************************************************************************        
// The selectedViewForHighlight function manages all thumbnail and top menu highlighting.

        var selectedViewForHighlight = function(){
        var viewCount = $window.document.getElementsByClassName("screen1ThisForThumbnailCount").length;
        var selectedThumbnailToHighlightCSS = [ "intro", 
                                                "view00", "view01", "view02", "view03", "view04", "view05", 
                                                "view06", "view07", "view08", "view09", "view10", "view11",
                                                "view12", "view13", "view14", "view15", "view16", "view17",
                                                "view18", "view19", "view20", "view21", "view22", "view23",
                                                "view24", "view25", "view26", "view27", "view28", "view29",
                                                "view30", "view31", "view32", "view33", "view34", "view35",
                                                "view36", "view37", "view38", "view39", "view40", "view41",
                                                "view42", "view43", "view44", "view45", "view46", "view47"
                                              ]; 
        var viewSelected = GetSet.getSelectedView();
        var shadow1 = "blue";
        if(viewSelected != "ttd" && viewSelected != "buyprice" && viewSelected != "products" && viewSelected != "reviews"){
          for(var i = 0; i < viewCount; i++){
            if(viewSelected === selectedThumbnailToHighlightCSS[i]) 
              { 
                $window.document.getElementById(selectedThumbnailToHighlightCSS[i]).style = "box-shadow: 0px 0px 25px " + shadow1 + "," +
                                                                                                        "0px 0px 25px " + shadow1 + "," +
                                                                                                        "0px 0px 25px " + shadow1 + "," +
                                                                                                        "0px 0px 25px " + shadow1 + "," +
                                                                                                        "0px 0px 25px " + shadow1 + "," +
                                                                                                        "0px 0px 25px " + shadow1 + ";";
              }
            else
              {
                $window.document.getElementById(selectedThumbnailToHighlightCSS[i]).style = "";                          
              }
          }; 

          for(var i=0; i<vn.menuBar1.length; i++){
                  vn.menuBar1[i].highlight = "white";
          };
          $window.document.getElementById("topItemTextHighlight").style = "color:transparent;";
        }
        else{
          for(var i=0; i<vn.menuBar1.length; i++){
              if(viewSelected === vn.menuBar1[i].menuItem){
                  vn.menuBar1[i].highlight = "#00ffff";}
              else {
                  vn.menuBar1[i].highlight = "white";};
          }
          for(var i = 0; i < viewCount; i++){
                $window.document.getElementById(selectedThumbnailToHighlightCSS[i]).style = "";
          }; 
          var shadow2 = "blue";
          $window.document.getElementById("topItemTextHighlight").style = "text-shadow: 0px 0px 15px " + shadow2 + "," +
                                                                                       "0px 0px 15px " + shadow2 + "," +
                                                                                       "0px 0px 15px " + shadow2 + "," +
                                                                                       "0px 0px 15px " + shadow2 + "," +
                                                                                       "0px 0px 15px " + shadow2 + "," +
                                                                                       "0px 0px 15px " + shadow2 + ";" +
                                                                                       "color:white; margin-top:5%;";
        }
      }
      viewManager.ref1(selectedViewForHighlight);
      
      vn.separatorDOT = [0];
      vn.category = [
                      {
                        "showCategory":1,
                        "separatorDotLeft":1,
                        "separatorDotRight":1,
                        "thmbNails":[0,1,2,3,4,5,6,7,8,9,10,11,12]
                      },
                      {
                        "showCategory":1,
                        "separatorDotLeft":1,
                        "separatorDotRight":1,
                        "thmbNails":[1]
                      }
                      
                    ];
      vn.thmbNails = [1,1];
      
      
      
        
      var screenSelect  = (function(){
        
                              var screenMode = GetSet.getScreenMode();
                              //console.log("screenMode is from controller: " + screenMode);
                              if(screenMode === "screen1"){
                                vn.screen1 = true;
                                vn.screen2 = false;
                                vn.screen1uiView = "rootView";
                                vn.screen2uiView = "";
                                
                              }  
                              else {
                                vn.screen1 = false;
                                vn.screen2 = true;
                                vn.screen1uiView = "";
                                vn.screen2uiView = "rootView";
                              }
                          }());   
      
//***********************************************************************************************************************************************************     
//  Responsive function: screenResponse is for all screen responsive needs 
    function screenResponse(){
        
        var vpWidth = GetSet.getDeviceAvailWidth(); // window.screen.availWidth;
        var vpHeight = GetSet.getDeviceInnerHeight(); 
        lr.setVPw(vpWidth);

        // Top Menu Response
        vn.topMenuFontSize = lr.w("font-size:px",1170,16,320,10);
         
        //***********************************************************************************************************************************************************
        // Screen 1 Response
        
        vn.tmplViewWidth = "width:" + GetSet.getTmplViewWidth() + "px";
        
        // Screen 1 Main Template height Response 
        vn.screen1MainTemplateHeight = "height:" + 
                                            ( vpHeight 
                                            - lr.w("",1170,28,360,13)                   // range of height for top menu links
                                            - lr.w("",1170,235,360,95)                  // range of height for table with thumbnails
                                            - vpHeight * lr.w("",1170,0.02,360,0.045))  // fine tune
                                            + "px";
        
        // Screen 1 Thumbnail Image Box Over Main Template Response
        vn.screen1ThumbnailImageBoxWidth = lr.w("width:px",1170,800,360,270);
           
        // screen1 Thumbnail (Wrapping Div) of Table Height Response
        vn.screen1WrappingDivOfThumbnailTableHeight = lr.w("height:px",1170,235,360,100);
          
        // screen1 Thumbnail Table Height Response   
        vn.screen1ThumbnailTableHeight = lr.w("height:px",1170,210,360,80);
          
        // screen1 Thumbnail Table Width Response   
        vn.screen1ThumbnailTableWidth = lr.w("width:px",1170,1800,870,850,"width:px",869,849,360,550);
        
        // screen1 Thumbnail Table Font Size and Padding Response                          
        vn.screen1ThumbnailTableFontSize = lr.w("font-size:em",1170,1.15,360,0.65);
        vn.screen1ThumbnailTableCellPadding = lr.w("padding-top:px",1170,8,360,2);
        
        // screen1 Thumbnail Table SeparatorDotCSS Configuration and Response        
        vn.screen1ThumbnailTableSeparatorDotEntity = "&#9899;";
        vn.screen1ThumbnailTableSeparatorDotWidth = lr.w("width:px",1170,10,360,5);
        vn.screen1ThumbnailTableSeparatorDotFontSize = lr.w("font-size:em",1170,0.70,360,0.35);
        vn.screen1ThumbnailTableSeparatorDotPadding = lr.w("padding-top:px",1170,10,360,5);
              
        // screen1 Thumbnail Table Thumbnail Image Spacer (is a transparent png)
        vn.screen1BlankPngImageBkColor  = "background-color:transparent"; 
        vn.screen1BlankPngImageWidth    = "width:5px";

        // screen1 Thumbnail Table Thumbnail Image Width Response
        vn.screen1ThumbnailImageWidth = lr.w("width:px",1170,70,360,30);
        console.log("vn.screen1ThumbnailImageWidth is: " + vn.screen1ThumbnailImageWidth)
        
        //***********************************************************************************************************************************************************
        // Screen 2 Response
        vn.screen2MainTemplateWidth = GetSet.getTmplViewWidth();                         
        vn.screen2OuterWidth = GetSet.getOuterWidth();
        vn.screen2Height01 = GetSet.getTmplViewHeight();
        vn.screen2TTDLogoWidth = GetSet.getTTDLogoWidth();
        vn.screen2ThumbNailTitleFontSize = GetSet.getThumbNailTitleTextFontSize();
        vn.screen2ThumbNailTableBoxHeight = GetSet.getThumbNailTableBoxHeight();
        vn.screen2ThumbNailImageWidth = GetSet.getThumbnailImageWidth();
        vn.screen2ThumbNailShowBoxWidth = GetSet.getThumbNailShowBoxWidth();
        
        vn.screen2ThumbnailColumnBackgroundColor =   "background-color:transparent;";
        vn.screen2TOuterWidthColumnBackgroundColor = "background-color:magenta; opacity:0.2;";
    } 

  // setScreenResponse is set up as a callback to assure all response data is stable upon invocation of the screenResponse()function  
  function setScreenResponse(){
    //console.log("Being Called");
    //screenSelect();
    screenResponse();
  };
  GetSet.setScreenResponseInit(setScreenResponse);
}]);

