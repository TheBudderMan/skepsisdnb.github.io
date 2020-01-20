//importing from another file/class
/*import {whatever} 'filename';   */

/* Gemmas javascript for navigation */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


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
function currentYear() {
    "use strict";
    /*jslint browser:true */
    const woah = new Date().getFullYear();
    return woah;
}

function outputThing() {
    "use strict";
    /*jslint browser:true */
    const builtWith = '"Formant \u00A9 Copyright ' + currentYear() + '"';
    return builtWith;
}

/*
This here starts the beautiful, simplified version
that has no need for any weird if statement. 
*/
class labelHolder {
  constructor(home,destination,packages,about,contact){
    home ="Home";    
    destination = "Destinations";
    packages = "Packages";
    about = "About Us";
    contact = "Contact Us";    
    this.home = home;
    this.destination = destination;
    this.packages = packages;
    this.about = about;
    this.contact = contact;   
    
  }  
  getHome() {
    return this.home;
  }
  getDestination() {
    return this.destination;    
  }
  getPackage() {
    return this.packages;
  }
  getAbout() {
    return this.about;
  }
  getContact() {
    return this.contact;
  }  
}
class labelOutput extends labelHolder {
  getHome() {
    return super.getHome();
  }
  getDestination() {
    return super.getDestination();
  }
  getPackage() {
    return super.getPackage();
  }
  getAbout() {
    return super.getAbout();
  }
  getContact() {
    return super.getContact();
  }
}

let labelMakerPro = new labelOutput();

//Use these to output labels to ID tags.
labelMakerPro.getHome().fontcolor( "white" );
labelMakerPro.getDestination();
labelMakerPro.getPackage();
labelMakerPro.getAbout();
labelMakerPro.getContact();

document.getElementById("builtWith").textContent = outputThing();
document.getElementById("homeLabel").textContent = labelMakerPro.getHome();
document.getElementById("destLabel").textContent = labelMakerPro.getDestination();
document.getElementById("packLabel").textContent = labelMakerPro.getPackage();
document.getElementById("aboutLabel").textContent = labelMakerPro.getAbout();
document.getElementById("contLabel").textContent = labelMakerPro.getContact();

document.getElementById("dropHome").textContent = labelMakerPro.getHome();
document.getElementById("dropDest").textContent = labelMakerPro.getDestination();
document.getElementById("dropPack").textContent = labelMakerPro.getPackage();
document.getElementById("dropAbout").textContent = labelMakerPro.getAbout();
document.getElementById("dropCont").textContent = labelMakerPro.getContact();

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