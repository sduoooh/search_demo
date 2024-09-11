export function replaceNoscriptImagesZH(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    const figureElements = doc.querySelectorAll('figure[data-size="normal"]');
  
    figureElements.forEach(figure => {
      const noscriptElement = figure.querySelector('noscript');
  
      if (noscriptElement) {
        const noscriptImg = noscriptElement.querySelector('img');
  
        if (noscriptImg) {
          const lastImg = figure.querySelector('img:not(noscript img)');
  
          if (lastImg) {
            lastImg.replaceWith(noscriptImg.cloneNode(true));
          }
  
          noscriptElement.remove();
        }
      }
    });
  
    return doc.body.innerHTML;
  }