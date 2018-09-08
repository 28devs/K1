//
// Minify header when page scroll
//

const stickyNav = document.querySelector('.header');

if (stickyNav) {
  stickyNav.classList.add('header--is-load');

  const headerScroll = function() {
    this.scrollY < 8
      ? stickyNav.classList.remove('header--is-scroll')
      : stickyNav.classList.add('header--is-scroll');
  };
  headerScroll();
  window.onscroll = headerScroll;
}

//
// Open mobile menu button
//

const stickyNavMobileOpenBtn = document.querySelector('.header__mobile-nav');

if (stickyNavMobileOpenBtn) {
  stickyNavMobileOpenBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    stickyNavMobileOpenBtn.classList.toggle('header__mobile-nav--close');
    document
      .querySelector('.header__nav-wrap')
      .classList.toggle('header__nav-wrap--open');
    stickyNav.classList.toggle('header--nav-open');
  });
}

//
// Sponsors slider
//
const sponsorsSliderBlock = document.querySelector('.sponsors__slider');

if (sponsorsSliderBlock) {
  const sponsorsSliderPrevBtn = document.querySelector(
    '.sponsors__slider-control--prev'
  );
  const sponsorsSliderNextBtn = document.querySelector(
    '.sponsors__slider-control--next'
  );

  const sponsorsSlider = $(sponsorsSliderBlock).lightSlider({
    item: 1,
    autoWidth: true,
    slideMargin: 0,
    controls: false,
    pager: false,
    onBeforeSlide: function(elem) {
      if (sponsorsSlider.getCurrentSlideCount() == 1) {
        sponsorsSliderPrevBtn.classList.add('sponsors__slider-control--hide');
      } else {
        sponsorsSliderPrevBtn.classList.remove(
          'sponsors__slider-control--hide'
        );
      }

      if (sponsorsSlider.getCurrentSlideCount() == 4) {
        sponsorsSliderNextBtn.classList.add('sponsors__slider-control--hide');
      } else {
        sponsorsSliderNextBtn.classList.remove(
          'sponsors__slider-control--hide'
        );
      }
    }
  });

  sponsorsSliderPrevBtn.onclick = sponsorsSlider.goToPrevSlide;
  sponsorsSliderNextBtn.onclick = sponsorsSlider.goToNextSlide;
}

//
// DEV
//

const navDev = document.querySelectorAll('.header__link');

navDev.forEach(function(elem) {
  elem.addEventListener('click', function(e) {
    navDev.forEach(function(elem) {
      elem.classList.remove('header__link--active');
    });

    e.target.classList.add('header__link--active');
  });
});
