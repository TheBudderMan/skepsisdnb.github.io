(function() {
    function setCanonicalTag() {
      // Create and configure the canonical tag
      const canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
  
      // Get current hash route (if any) and build the canonical URL
      const hash = location.hash ? location.hash : "";
      canonicalTag.setAttribute("href", "https://www.formant.ca/" + hash);
  
      // Append the tag to the <head>
      document.head.appendChild(canonicalTag);
    }
  
    // Ensure the script runs after the DOM is fully loaded
    window.addEventListener("DOMContentLoaded", setCanonicalTag);
  })();
  