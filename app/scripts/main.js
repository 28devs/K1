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
    if (this.scrollY < $('.hero').height()) {

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

      document
        .querySelectorAll('.sponsors__title-rank')
        .forEach(function (elem) {
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
    slides.forEach(function (slide, i) {
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

      slide.querySelectorAll('.sponsors__img-wrap').forEach(function (elem) {
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
  aboutSliders.forEach(function (item) {
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
      yPercent: -150,
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

//TweenLite.ticker.addEventListener('tick', update);

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

    touch(hero, 'down', transitionFrom1To2);
    touch(links, 'up', transitionFrom2To1, true);

    function touch(elem, direction, callback, scroll) {
      var swipeDir;
      var posStart;
      var posEnd;

      elem.addEventListener(
        'touchstart',
        function (e) {
          if (!scroll) e.preventDefault();
          posStart = parseInt(e.changedTouches[0].pageY);
        },
        false
      );

      elem.addEventListener(
        'touchend',
        function (e) {
          if (!scroll) e.preventDefault();
          posEnd = parseInt(e.changedTouches[0].pageY);
          swipeDir = posEnd - posStart > 0 ? 'up' : 'down';
          if (window.pageYOffset == 0 && swipeDir === direction) {
            callback();
          }
        },
        false
      );
    }

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

  // Cloud opacity

  // var linksCloudBgAnimation = TweenLite.to(
  //   document.querySelector('.links__cloud'),
  //   1, {
  //     autoAlpha: 0,
  //     paused: true
  //   }
  // );

  // var linksCloudBgAnimationTop = $('.home--animate-disable').length ? $('.hero').height() + 300 : 0;

  // TweenLite.ticker.addEventListener('tick', function () {
  //   linksCloudBgAnimation.progress(
  //     clamp(
  //       normalize(
  //         window.pageYOffset,
  //         linksCloudBgAnimationTop,
  //         document.querySelector('.links').clientHeight * 2
  //       ),
  //       0,
  //       1
  //     )
  //   );
  // });

  // Form bg opacity

  // var formBgAnimation = TweenLite.to(document.querySelector('.form__bg'), 1, {
  //   autoAlpha: 1,
  //   paused: true
  // });

  // TweenLite.ticker.addEventListener('tick', function () {
  //   var step = clamp(
  //     normalize(
  //       window.pageYOffset,
  //       document.querySelector('.sponsors') ? document.querySelector('.sponsors').offsetTop +
  //       document.querySelector('.sponsors').clientHeight / 3 : document.querySelector('.links').offsetTop +
  //       document.querySelector('.links').clientHeight / 3,
  //       document.querySelector('.form').offsetTop -
  //       document.querySelector('.form').clientHeight / 3
  //     ),
  //     0,
  //     1
  //   );
  //   formBgAnimation.progress(step);
  // });
}

//
// Parallax
//

const homeParallax = document.querySelector('.home:not(.home--animate-disable)');

if (homeParallax) {
  var playParallax = true;
  var currentMousePos = {
    x: -1,
    y: -1
  };

  $(document).mousemove(function (event) {
    if (event.pageY < $('.hero').height()) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
    }
  });

  var parallaxIt = function (target, movementX, movementY) {
    var $this = $('.hero');
    var relX = currentMousePos.x - $this.offset().left;
    var relY = currentMousePos.y - $this.offset().top;

    TweenMax.to(target, 1, {
      x: ((relX - $this.width() / 2) / $this.width()) * movementX,
      y: ((relY - $this.height() / 2) / $this.height()) * movementY,
      ease: Linear.easeNone
    });
  };

  TweenLite.ticker.addEventListener('tick', initParallax);

  function initParallax() {
    if (playParallax) {
      parallaxIt('.hero__clouds', -200, -100);
      parallaxIt('.hero__hills', -130, -40);
      parallaxIt('.hero__sea', -100, -30);
      parallaxIt('.hero__ships', -50, -20);
    }

    //requestAnimationFrame(initParallax);
  }
  //requestAnimationFrame(initParallax);

  //
  // Hyroscope
  //

  var rotX = 0,
    rotY = 0;

  if (window.DeviceMotionEvent) {
    window.ondeviceorientation = function (event) {
      beta = event.beta;
      gamma = event.gamma;
      setTimeout(function () {
        normalizeData(gamma, beta);
      }, 50);
    };
  }

  function normalizeData(_g, _b) {
    b = Math.round(_b);
    g = Math.round(_g);
    rotY += (g - rotY) / 5;
    rotX += (b - rotX) / 5;

    parallaxGy('.hero__clouds', g, b, 2.2, 1.1);
    parallaxGy('.hero__hills', g, b, 1.7, 1.5);
    parallaxGy('.hero__sea', g, b, 1.2, 2);
    parallaxGy('.hero__ships', g, b, 1.1, 2.5);
  }

  function parallaxGy(target, x, y, coefX, coefY) {
    var $this = $('.hero');

    TweenMax.to(target, 1, {
      x: x * coefX,
      y: y / coefY
    });
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

var heroPlaceholderFn = function () {
  var heroPlaceholder = $('.hero__placeholder');

  if (heroPlaceholder) {
    heroPlaceholder.height(window.innerHeight - 100);
  }
}
heroPlaceholderFn();

//
// Accordion with one active element
//


var accordionsOne = document.querySelectorAll('[data-accordion-one]');
var accordionsOneActive = document.querySelector(
  '[data-accordion-one][data-accordion-active]'
);

var accord = function (elem, click) {
  elem.classList.toggle('accordion__header_active');

  var panel = elem.nextElementSibling;

  panel.style.maxHeight ?
    (panel.style.maxHeight = null) :
    (panel.style.maxHeight = panel.scrollHeight + 'px');

  if (click && window.innerWidth <= 1024) {
    setTimeout(function () {
      $([document.documentElement, document.body]).animate({
        scrollTop: $(elem).offset().top - 90
      }, 300);
    }, 100);
  }
};

if (accordionsOne.length) {
  accord(accordionsOneActive, false);

  accordionsOne.forEach(function (elem, key, array) {
    elem.addEventListener('click', function (e) {
      array.forEach(function (elem) {
        elem.classList.remove('accordion__header_active');

        var panel = elem.nextElementSibling;
        panel.style.maxHeight = null;
      });

      accord(e.target, true);
    });
  });
}

$(window).load(function () {
  var activeTab = document.querySelector(
    '[data-accordion-one][data-accordion-active]'
  );

  if (activeTab) {
    //accord(activeTab, false);
  }
});