(function(){
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    var html = text.replace(/[\u00A0-\u2666]/g, function(c) {
        return '\\char{'+c.charCodeAt(0)+'}';
    });
    alert(html);
})();