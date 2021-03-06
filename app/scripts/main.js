const formspree = document.querySelector( '.formspree' );

if( formspree ) {
  formspree.addEventListener( 'submit', (ev) => {
    ev.preventDefault();
    let form = ev.target;
    let button = form.querySelector( '[type=submit]' );
    let result = form.querySelector( '.form__result' );
    let xhr = new XMLHttpRequest();
    if( button.disabled )return;
    if( !window.FormData ) {
      return form.submit();
    }
    button.setAttribute( 'disabled', '' );
    result.innerHTML = '';
    xhr.open( 'POST', form.action );
    xhr.setRequestHeader( 'Accept', 'application/json' );
    xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
    xhr.send( new FormData( form ));
    xhr.onreadystatechange = () => {
      if( xhr.readyState !== XMLHttpRequest.DONE )return;
      let response = JSON.parse( xhr.responseText );
      if( response.success !== 'email sent' ) {
        return form.submit();
      }
      result.innerHTML = 'Thank you! Your message has been received.';
      button.removeAttribute( 'disabled' );
      form.reset();
    };
  });
}

//
// Get coll width in px
//

const collCount = function () {
  return window.innerWidth >= 1024 ? 6 : window.innerWidth >= 680 ? 4 : 2;
};

const collWidth = function () {
  return (window.innerWidth * 0.875) / collCount();
};

//
// Minify header when page scroll
//

const stickyNav = document.querySelector(
  '.header--on-home'
);

if (stickyNav) {
  //stickyNav.classList.add('header--is-scroll', 'header--hide-top');
  var headerScrollFlag = false;

  var headerScroll = function () {
    if (window.pageYOffset < $('.hero').height()) {

      if (headerScrollFlag) {
        headerScrollFlag = !headerScrollFlag;
        stickyNav.classList.remove('header--show-top');

        setTimeout(function () {
          stickyNav.classList.remove('header--is-scroll', 'header--hide-top');
        }, 200)
      }

    } else {

      if (!headerScrollFlag) {
        headerScrollFlag = !headerScrollFlag;
        stickyNav.classList.add('header--hide-top');

        setTimeout(function () {
          stickyNav.classList.add('header--is-scroll');
        }, 400)

        setTimeout(function () {
          stickyNav.classList.add('header--show-top');
        }, 500)
      }

    }

  };
  headerScroll();
  window.onscroll = headerScroll;
}

//
// Open mobile menu button
//

const stickyNavMobileOpenBtn = document.querySelector('.header__mobile-nav');

if (stickyNavMobileOpenBtn) {
  stickyNavMobileOpenBtn.addEventListener('click', function (e) {
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
    onBeforeSlide: function (elem) {
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

      [].forEach.call( document.querySelectorAll('.sponsors__title-rank'), function (elem) {
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
  var updateCollWidth = function () {
    [].forEach.call(slides, function (slide, i) {
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

      [].forEach.call( slide.querySelectorAll('.sponsors__img-wrap'), function (elem) {
        elem.style.width = collWidth().toFixed(0) + 'px';
      });
    });
  };
  updateCollWidth();
  window.addEventListener('resize', updateCollWidth);
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
    responsive: [{
        breakpoint: 1080,
        settings: {
          slideMargin: 30
        }
      },
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

function aboutSlider(slideElem, parent) {
  if (slideElem) {
    const prevBtn = parent.querySelector('[data-slider-control=prev]');
    const nextBtn = parent.querySelector('[data-slider-control=next]');

    const slider = $(slideElem).lightSlider({
      item: 1,
      slideMargin: 0,
      controls: false,
      pager: false
    });
    prevBtn.onclick = slider.goToPrevSlide;
    nextBtn.onclick = slider.goToNextSlide;
  }
}

const aboutSliders = document.querySelectorAll('.about__slider-block');

if (aboutSliders) {
  [].forEach.call(aboutSliders, function (item) {
    let slideElem = item.querySelector('.about__slider');
    aboutSlider(slideElem, item);
  });
}

//
// Animation on scroll
//

AOS.init({
  once: true,
  duration: 250
});

//
// Parallax
//

var animations = [];

var animationElems = [{
    selector: '.parallax__k1',
    settings: {
      yPercent: -110,
      paused: true
    }
  },
  {
    selector: '.history__map',
    settings: {
      yPercent: -50,
      paused: true
    }
  },
  {
    selector: '.press__anchor',
    settings: {
      yPercent: -100,
      paused: true
    }
  },
  {
    selector: '.about__wheel',
    settings: {
      yPercent: -150,
      paused: true
    }
  },
  {
    selector: '.sponsorship__vert-text',
    settings: {
      yPercent: -90,
      paused: true
    }
  }
];

animationElems.forEach(function (elem) {
  var element = document.querySelector(elem.selector);

  if (element) {
    animations.push(TweenLite.to(element, 1, elem.settings));
  }
});

function update() {
  var min = 0;
  var max = document.body.scrollHeight;
  var step = clamp(normalize(window.pageYOffset, min, max), 0, 1);

  animations.forEach(function (elem) {
    elem.progress(step);
  });

  requestAnimationFrame(update);
}
update();

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

//
// Loader
//

var loader = document.querySelector('.loader');

if (loader) {
  var isLoad = false;
  var load = Cookies.get('load');

  if (load) {
    loader.classList.add('loader--progress-hide');
    loader.classList.add('loader--logo-hide');

    setTimeout(function () {
      loader.classList.add('loader--lines-hide');
    }, 300);

    setTimeout(function () {
      document.querySelector('.home').classList.remove('home--scroll-hide');
    }, 400);

    setTimeout(function () {
      document.querySelector('.hero').classList.add('hero--is-show');
      document.querySelector('.header').classList.add('header--is-show');
    }, 700);
  } else {
    Cookies.set('load', true, {
      expires: 90,
      path: ''
    });

    $(window).load(function () {
      isLoad = true;
    });

    setTimeout(function () {
      var loadInterval = setInterval(function () {
        if (isLoad) {
          setTimeout(function () {
            loader.classList.add('loader--lines-hide');
          }, 500);

          setTimeout(function () {
            from1to2 = true;
          }, 1000);

          loader.classList.add('loader--progress-hide');
          loader.classList.add('loader--logo-hide');
          clearInterval(loadInterval);
        }
      }, 100);
    }, 4800);
  }
}

//
// Hero animation
//

var hero = document.querySelector('.hero');
var links = document.querySelector('.links');

if (hero) {
  var header = document.querySelector('.header');
  var from1to2 = false;

  setTimeout(function () {
    hero.classList.add('hero--is-show');
  }, 6000);

  setTimeout(function () {
    header.classList.add('header--is-show');

    if ($('.home--animate-disable').length) {
      document.querySelector('.home').classList.remove('home--scroll-hide');
    }
  }, 5400);

  $('.home:not(.home--animate-disable) .hero__discover').click(function () {
    transitionFrom1To2();
  });

  $('.home--animate-disable .hero__discover').click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('.links').offset().top + 100
    }, 600);
  });

  if (!$('.home--animate-disable').length) {
    var scrollTop = false;
    $(window).on('wheel', function (event) {
      if (window.pageYOffset == 0 && from1to2) {
        if (event.originalEvent.deltaY < 0 && scrollTop) {
          transitionFrom2To1();
        }
        if (event.originalEvent.deltaY > 0) {
          transitionFrom1To2();
        }
      }
    });

    function transitionFrom1To2() {
      from1to2 = false;
      scrollTop = true;
      playParallax = false;
      loader.classList.remove('loader--lines-hide');

      setTimeout(function () {
        hero.classList.add('hero--is-hide');
        header.classList.add('header--is-scroll', 'header--hide-top');
      }, 550);

      setTimeout(function () {
        loader.classList.add('loader--fade-out');
        header.classList.add('header--show-top');
        document.querySelector('.links').classList.add('links--is-show');
        document.querySelector('.home').classList.remove('home--scroll-hide');
        document.querySelector('.home__k1').classList.add('home__k1--show');
        from1to2 = true;
      }, 550 * 2);
    }

    function transitionFrom2To1() {
      from1to2 = false;
      scrollTop = false;
      playParallax = true;

      loader.classList.remove('loader--lines-hide');
      loader.classList.remove('loader--fade-out');

      setTimeout(function () {
        document.querySelector('.home').classList.add('home--scroll-hide');
      }, 300);

      setTimeout(function () {
        hero.classList.remove('hero--is-hide');
        header.classList.remove('header--is-scroll');
      }, 550);

      setTimeout(function () {
        loader.classList.add('loader--lines-hide');
        from1to2 = true;
      }, 550 * 2);
    }
  }
}

//
// Disable CSS animate on window resize
//

window.addEventListener('resize', function () {
  requestAnimationFrame(function () {
    document.body.classList.add('disable-css-transitions');
  });
});

var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function () {
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});

function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    document.body.classList.remove('disable-css-transitions');

    heroPlaceholderFn();
  }
}

//
// heroPlaceholderFn
//

var prevWindowInnerWidth = 0;

var heroPlaceholderFn = function () {
  if (prevWindowInnerWidth == window.innerWidth) {
    return false;
  }

  prevWindowInnerWidth = window.innerWidth;

  var heroPlaceholder = $('.hero__placeholder');

  if (heroPlaceholder) {
    heroPlaceholder.height(window.innerHeight - 100);
  }
}
heroPlaceholderFn();
