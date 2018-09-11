//
// Get coll width in px
//
const collCount = function() {
  return window.innerWidth >= 1024 ? 6 : window.innerWidth >= 680 ? 4 : 2;
};

const collWidth = function() {
  return (window.innerWidth * 0.875) / collCount();
};

//
// Minify header when page scroll
//

const stickyNav = document.querySelector(
  '.header:not(.header--permanent-scroll)'
);

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
    document.querySelector('.header').classList.toggle('header--nav-open');
  });
}

//
// Sponsors slider
//

const sponsorsSliderBlock = document.querySelector('.sponsors__slider');

if (sponsorsSliderBlock) {
  const sponsorsSliderPrevBtn = document.querySelector(
    '.sponsors [data-slider-control=prev]'
  );
  const sponsorsSliderNextBtn = document.querySelector(
    '.sponsors [data-slider-control=next]'
  );

  const sponsorsSlider = $(sponsorsSliderBlock).lightSlider({
    item: 1,
    autoWidth: true,
    slideMargin: 0,
    controls: false,
    pager: false,
    onBeforeSlide: function(elem) {
      let current = sponsorsSlider.getCurrentSlideCount();
      let max = sponsorsSlider.getTotalSlideCount();
      let controlHideClass = 'slider__control--hide';
      let rankHideClass = 'sponsors__title-rank--hide';

      current > max ? --current : null;

      if (current == 1) {
        sponsorsSliderPrevBtn.classList.add(controlHideClass);
      } else {
        sponsorsSliderPrevBtn.classList.remove(controlHideClass);
      }

      if (current >= max) {
        sponsorsSliderNextBtn.classList.add(controlHideClass);
      } else {
        sponsorsSliderNextBtn.classList.remove(controlHideClass);
      }
      let currentSlide = document.querySelector(
        '.sponsors__slide:nth-child(' + current + ')'
      );
      let rank = currentSlide.getAttribute('data-rank');

      document
        .querySelectorAll('.sponsors__title-rank')
        .forEach(function(elem) {
          elem.classList.add(rankHideClass);
        });

      document
        .querySelector('.sponsors__title-rank--' + rank)
        .classList.remove(rankHideClass);
    }
  });

  sponsorsSliderPrevBtn.onclick = sponsorsSlider.goToPrevSlide;
  sponsorsSliderNextBtn.onclick = sponsorsSlider.goToNextSlide;

  var slides = document.querySelectorAll('.sponsors__slide');

  // Set new coll width for img-wrap
  var updateCollWidth = function() {
    slides.forEach(function(slide, i) {
      // last slide always full width
      if (slides.length === i + 1) {
        var colls = collCount() == 6 ? 4 : collCount();
        slide.style.width = colls * collWidth().toFixed(0) + 'px';
      } else {
        if (window.innerWidth >= 680) {
          slide.style.width =
            Math.round(slide.childElementCount / 2) * collWidth().toFixed(0) +
            'px';
        } else {
          var mobileColls = slide.childElementCount <= 2 ? 1 : 2;
          slide.style.width = mobileColls * collWidth().toFixed(0) + 'px';
        }
      }

      slide.querySelectorAll('.sponsors__img-wrap').forEach(function(elem) {
        elem.style.width = collWidth().toFixed(0) + 'px';
      });
    });
  };
  updateCollWidth();
  window.addEventListener('resize', updateCollWidth);

  // Magic for mobile
  //
  // TO REMOVE LATER
  //
  // var updateForMobile = function() {
  //   slides.forEach(function(slide) {
  //     console.log(slide.childElementCount);
  //   });
  // };
  // updateForMobile();
}

//
// History slider
//

const historySliderBlock = document.querySelector('.history__slider');

if (historySliderBlock) {
  const historySliderPrevBtn = document.querySelector(
    '.history__slider-block [data-slider-control=prev]'
  );
  const historySliderNextBtn = document.querySelector(
    '.history__slider-block [data-slider-control=next]'
  );

  const historySlider = $(historySliderBlock).lightSlider({
    item: 1,
    slideMargin: 56,
    controls: false,
    pager: false,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slideMargin: 0
        }
      }
    ]
  });

  historySliderPrevBtn.onclick = historySlider.goToPrevSlide;
  historySliderNextBtn.onclick = historySlider.goToNextSlide;
}

//
// About slider
//

const aboutSliderBlock = document.querySelector('.about__slider');

if (aboutSliderBlock) {
  const aboutSliderPrevBtn = document.querySelector(
    '.about__slider-block [data-slider-control=prev]'
  );
  const aboutSliderNextBtn = document.querySelector(
    '.about__slider-block [data-slider-control=next]'
  );

  const aboutSlider = $(aboutSliderBlock).lightSlider({
    item: 1,
    slideMargin: 56,
    controls: false,
    pager: false,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slideMargin: 0
        }
      }
    ]
  });
  console.log(aboutSliderPrevBtn)
  aboutSliderPrevBtn.onclick = aboutSlider.goToPrevSlide;
  aboutSliderNextBtn.onclick = aboutSlider.goToNextSlide;
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
