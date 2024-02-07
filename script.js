//This is for the year in the bottom right

const yearSpan = document.querySelector('#currentYear');
const currentYear = new Date();
console.log(currentYear);
yearSpan.innerText = currentYear.getFullYear();

///////////////////



/*
***********************************
***********************************
***********************************
***********************************
***********************************
***********************************
*/



/*
***********************************
***********************************
***********************************
***********************************
***********************************
***********************************
*/
function currentYears() {
    "use strict";
    /*jslint browser:true */
    const woah = new Date().getFullYear();
    return woah;
}

function outputYear() {
    "use strict";
    /*jslint browser:true */
    const builtWith = '"Formant \u00A9 Copyright ' + currentYear() + '"';
    return builtWith;
}

/*
This here starts the beautiful, simplified version
that has no need for any weird if statement. 
*/




/*
********************************************************************************************************************************************
********************************************************************************************************************************************
********************************************************************************************************************************************
********************************************************THE GRAVEYARD OF CODE FOR LULZ******************************************************
********************************************************************************************************************************************
********************************************************************************************************************************************
*/


/*
Holy shit,
this is the old geezer, 
10,000 lines way
function hamLabel() {
  "use strict";
    /*jslint browser:true 
  let headerLabels = new Array("Home/Main"
                            , "Destinations"
                            , "Packages"
                            , "About Us"
                            , "Contact Us"); 
  const home = headerLabels[0]
      , dest = headerLabels[1]
      , pack = headerLabels[2]
      , about = headerLabels[3]
      , cont = headerLabels[4];   
  const homeLocation2 = document.getElementById("dropHome").textContent;
  const destLocation2 = document.getElementById("dropDest").textContent; 
  const packLocation2 = document.getElementById("dropPack").textContent;
  const aboutLocation2 = document.getElementById("dropAbout").textContent; 
  const contLocation2 = document.getElementById("dropCont").textContent;  
  if (homeLocation2 == "") {
    return home;      
      }  

  if (destLocation2 == "") {
    return dest;            
      }    

  if (packLocation2 == "") {
    return pack;            
      }    
  
  if (aboutLocation2 == "") {
    return about;            
      }    
  
  if (contLocation2 == "") {
    return cont;            
      } 

}

function labelMaker() {
    "use strict";
    /*jslint browser:true 
  let headerLabels = new Array("Home/Main"
                            , "Destinations"
                            , "Packages"
                            , "About Us"
                            , "Contact Us"); 
  const home = headerLabels[0]
      , dest = headerLabels[1]
      , pack = headerLabels[2]
      , about = headerLabels[3]
      , cont = headerLabels[4];  
  const homeLocation = document.getElementById("homeLabel").textContent;  
  const destLocation = document.getElementById("destLabel").textContent;
  const aboutLocation = document.getElementById("aboutLabel").textContent;
  const packLocation = document.getElementById("packLabel").textContent;
  const contLocation = document.getElementById("contLabel").textContent; 

  if (homeLocation == "") {
    return home;      
      }  
  
  if (destLocation == "") {
    return dest;            
      }
    
  if (packLocation == "") {
    return pack;            
      }
      
  if (aboutLocation == "") {
    return about;            
      }
     
  if (contLocation == "") {
    return cont;            
      }        
}
*/


/*
***********************************
***********************************
***********************************
***********************************
***********************************
***********************************
*/