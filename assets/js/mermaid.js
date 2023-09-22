import mermaid from 'mermaid';

var config = {
  theme: 'default',
  fontFamily: '"Catamaran", sans-serif;',
};

document.addEventListener('DOMContentLoaded', () => {
  mermaid.initialize(config);
  mermaid.init(undefined, '.language-mermaid');
});
