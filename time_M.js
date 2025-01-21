const yearSpan = document.querySelector('#currentYearMobile');
const currentYear = new Date();
console.log(currentYear);
yearSpan.innerText = currentYear.getFullYear();


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