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
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = html;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);

    alert('Copied to your clipboard, now go paste in ccdb')
})();