(() => {
  const root = document.documentElement;

  /*
   * Animações de entrada
   */
  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    !reduceMotion &&
    'IntersectionObserver' in window &&
    revealItems.length > 0
  ) {
    root.classList.add('js');

    revealItems.forEach((item) => {
      const delay = Number(item.dataset.delay || 0);

      item.style.setProperty(
        '--reveal-delay',
        `${delay}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });
  }

  /*
   * Menu responsivo
   */
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const menuLabel = menuButton?.querySelector('.sr-only');

  const closeMenu = () => {
    if (!menuButton || !navigation) {
      return;
    }

    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');

    if (menuLabel) {
      menuLabel.textContent = 'Abrir menu';
    }
  };

  const openMenu = () => {
    if (!menuButton || !navigation) {
      return;
    }

    navigation.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');

    if (menuLabel) {
      menuLabel.textContent = 'Fechar menu';
    }
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const menuIsOpen =
        navigation.classList.contains('is-open');

      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu =
        navigation.contains(event.target);

      const clickedMenuButton =
        menuButton.contains(event.target);

      if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const menuWasOpen =
          navigation.classList.contains('is-open');

        closeMenu();

        if (menuWasOpen) {
          menuButton.focus();
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });
  }

  /*
   * Ano automático no rodapé
   */
  const year = document.querySelector('#ano-atual');

  if (year) {
    year.textContent = String(
      new Date().getFullYear()
    );
  }
})();