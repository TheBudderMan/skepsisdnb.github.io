// canonical.js
(function () {
    function setCanonicalTag() {
      const canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
  
      const hash = location.hash || "";
      canonicalTag.setAttribute("href", "https://www.formant.ca/" + hash);
  
      document.head.appendChild(canonicalTag);
    }
  
    document.addEventListener("DOMContentLoaded", setCanonicalTag);
  })();
  
  window.addEventListener("load", () => {
    setTimeout(() => {
      window.scrollTo(0, 1); // Trigger slight scroll
    }, 100);
  });