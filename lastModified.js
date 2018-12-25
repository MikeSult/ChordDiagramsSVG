
(function lastModified() {
    var date = document.lastModified;
    date = date.substring(0,10);
    var msg = "<b>This document was last modified on "+date+"</b>";
    document.getElementById("footer").innerHTML = msg;
})();