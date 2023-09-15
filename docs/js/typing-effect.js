const typingEl = document.getElementById("typing-effect");
const text = typingEl.dataset.text;
const delay = 100; // Delay between each character in milliseconds

let i = 0;
const typingEffect = setInterval(() => {
  const currentText = typingEl.innerHTML;
  const nextChar = text.charAt(i);
  typingEl.innerHTML = currentText + nextChar;
  i++;

  if (i >= text.length) {
    clearInterval(typingEffect);
  }
}, delay);
