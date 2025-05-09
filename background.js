chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertText",
    title: "Convert Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertSelectedText
    });
  }
});

function convertSelectedText() {
  const selectedText = window.getSelection().toString();
  if (!selectedText) return;
  
   // First preserve newlines, then handle special characters
  const convertedText = selectedText
    .split('\n')
    .map(line => {
      return line.replace(/[\u00A0-\u2666]/g, function(c) {
        return '\\char{' + c.charCodeAt(0) + '}';
      });
    })
    .join('\n');
 
  // Try to use Clipboard API first
  try {
    // Using the execCommand method which is more reliable in extensions
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = convertedText;
    document.body.appendChild(input);
    input.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(input);
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert('Failed to copy to clipboard');
  }
}
