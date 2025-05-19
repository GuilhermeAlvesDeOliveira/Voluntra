document.addEventListener('DOMContentLoaded', function() {

    const lazyloadImages = document.querySelectorAll('img.lazyload');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                    }

                    const picture = img.closest('picture');
                    if (picture) {
                         const sources = picture.querySelectorAll('source');
                         sources.forEach(source => {
                              const srcset = source.getAttribute('data-srcset');
                              if (srcset) {
                                   source.srcset = srcset;
                               }
                         });
                    } else {
                         const srcset = img.getAttribute('data-srcset');
                         if (srcset) {
                              img.srcset = srcset;
                         }
                    }

                    img.classList.remove('lazyload');
                    observer.unobserve(img);
                }
            });
        }, {
        });

        lazyloadImages.forEach(img => {
            observer.observe(img);
        });

    } else {
        console.log('IntersectionObserver não suportado. Lazy loading desabilitado.');
        lazyloadImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
             const srcset = img.getAttribute('data-srcset');
             if (srcset) {
                  img.srcset = srcset;
             }
        });
    }

    const toggleButtons = document.querySelectorAll('.toggle-bio');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pessoaDiv = button.closest('.pessoa');
            const infoInicial = pessoaDiv.querySelector('.info-inicial');
            const conteudoExpansivel = pessoaDiv.querySelector('.conteudo-expansivel');

            const isHidden = conteudoExpansivel.style.display === 'none' || conteudoExpansivel.style.display === '';

            if (isHidden) {
                conteudoExpansivel.style.display = 'block';
                if (infoInicial) {
                     const verMaisButton = infoInicial.querySelector('.toggle-bio');
                     if (verMaisButton) {
                          verMaisButton.style.display = 'none';
                     }
                }
                 const verMenosButton = conteudoExpansivel.querySelector('.toggle-bio');
                 if (verMenosButton) {
                      verMenosButton.style.display = 'block';
                 }

            } else {
                conteudoExpansivel.style.display = 'none';
                 if (infoInicial) {
                     const verMaisButton = infoInicial.querySelector('.toggle-bio');
                     if (verMaisButton) {
                          verMaisButton.style.display = 'block';
                     }
                 }
                 const verMenosButton = conteudoExpansivel.querySelector('.toggle-bio');
                 if (verMenosButton) {
                      verMenosButton.style.display = 'none';
                 }
            }
        });
    });

     document.querySelectorAll('.conteudo-expansivel .toggle-bio').forEach(button => {
          button.style.display = 'none';
     });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = link.getAttribute('href');

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'      
                                        
                });
            }
        });
    });
});