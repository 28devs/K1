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

// const stickyNav = document.querySelector(
//   '.header:not(.header--permanent-scroll)'
// );

// if (stickyNav) {
//   stickyNav.classList.add('header--is-load');

//   const headerScroll = function() {
//     this.scrollY < 8
//       ? stickyNav.classList.remove('header--is-scroll')
//       : stickyNav.classList.add('header--is-scroll');
//   };
//   headerScroll();
//   window.onscroll = headerScroll;
// }

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
  aboutSliders.forEach(function(item) {
    let slideElem = item.querySelector('.about__slider');
    aboutSlider(slideElem, item);
  });
}

//
//animation on scroll
//

AOS.init({
  once: true,
  duration: 250
});

//
// Parallax
//

var animations = [];

var animationElems = [
  {
    selector: '.parallax__k1',
    settings: {
      yPercent: -180,
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

animationElems.forEach(function(elem) {
  var element = document.querySelector(elem.selector);

  if (element) {
    animations.push(TweenLite.to(element, 1, elem.settings));
  }
});

TweenLite.ticker.addEventListener('tick', update);

function update() {
  var min = 0;
  var max = document.body.scrollHeight;
  var step = clamp(normalize(window.pageYOffset, min, max), 0, 1);

  animations.forEach(function(elem) {
    elem.progress(step);
  });
}

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

  $(window).load(function() {
    isLoad = true;
  });

  setTimeout(function() {
    var loadInterval = setInterval(function() {
      if (isLoad) {
        setTimeout(function() {
          loader.classList.add('loader--lines-hide');
        }, 500);

        setTimeout(function() {
          from1to2 = true;
        }, 1000);

        loader.classList.add('loader--progress-hide');
        loader.classList.add('loader--logo-hide');
        clearInterval(loadInterval);
      }
    }, 100);
  }, 4800);
}

//
// Hero animation
//

var hero = document.querySelector('.hero');
var links = document.querySelector('.links');
//tousch event create
var heroTouch = new Hammer(hero);
heroTouch.get('swipe').set({
  direction: Hammer.DIRECTION_VERTICAL,
});
var linksTouch = new Hammer(links);
linksTouch.get('swipe').set({
  direction: Hammer.DIRECTION_VERTICAL,
});


if (hero) {
  var header = document.querySelector('.header');
  var from1to2 = false;

  setTimeout(function() {
    hero.classList.add('hero--is-show');
  }, 6000);

  setTimeout(function() {
    header.classList.add('header--is-show');
  }, 6000);

  $('.hero__discover').click(function() {
    transitionFrom1To2();
  });


  var scrollTop = false;
  $(window).on('wheel', function(event) {
    if (window.pageYOffset == 0 && from1to2) {
      if (event.originalEvent.deltaY < 0 && scrollTop) {
        transitionFrom2To1();
      }
      if (event.originalEvent.deltaY > 0) {
        transitionFrom1To2();
      }
    }
  });
  heroTouch.on("swipeup", function(ev) {
    if (window.pageYOffset == 0 && from1to2) {
      // console.log(scrollTop)
      // console.log(ev.type)
      // if(ev.type==='swipedown' && scrollTop) {
      //   transitionFrom2To1();
      // }
      if(ev.type==='swipeup') {
        transitionFrom1To2();
      }
    }
  });
  linksTouch.on("swipedown swipeup", function(ev) {
    var currentScroll = $("html, body").animate({ scrollTop: "1000px" });
    if (window.pageYOffset == 0 && from1to2) {
      if(ev.type==='swipedown' && scrollTop) {
        transitionFrom2To1();
      }
      if(ev.type==='swipeup') {
        $('body').scrollTo(ev.deltaY * -1);
        console.log(ev.deltaY)
        // window.scrollTo(0, currentScroll + ev.deltaY * -1);
      }
    } else {
        console.log(currentScroll)
        // console.log(ev.type)
        if(ev.type==='swipedown') {
          window.scrollTo(0, 0);
        }
        if(ev.type==='swipeup') {
          // window.scrollTo(0, currentScroll + ev.deltaY * -1);
          $('body').scrollTo(currentScroll + ev.deltaY/4 * -1)
        }
      }
  });
  // var hero1 = $('.hero')
  // console.log(hero1)
  // hero1.on('swipe', function(event){
  //   event.preventDefault();
  //   alert(1)
  //   if(event.direction == 'left' || event.direction == 'right'){
  //       console.log(123)
  //   }
  // });

  var transitionFrom1To2 = function() {
    from1to2 = false;
    scrollTop = true;
    loader.classList.remove('loader--lines-hide');

    setTimeout(function() {
      hero.classList.add('hero--is-hide');
      header.classList.add('header--is-scroll', 'header--hide-top');
    }, 550);

    setTimeout(function() {
      loader.classList.add('loader--fade-out');
      header.classList.add('header--show-top');
      document.querySelector('.links').classList.add('links--is-show');
      document.querySelector('.home').classList.remove('home--scroll-hide');
      document.querySelector('.home__k1').classList.add('home__k1--show');
      from1to2 = true;
    }, 550 * 2);
  };

  var transitionFrom2To1 = function() {
    from1to2 = false;
    scrollTop = false
    document.querySelector('.home').classList.add('home--scroll-hide');
    loader.classList.remove('loader--lines-hide');
    loader.classList.remove('loader--fade-out');

    setTimeout(function() {
      hero.classList.remove('hero--is-hide');
      header.classList.remove('header--is-scroll');
    }, 550);

    setTimeout(function() {
      loader.classList.add('loader--lines-hide');
      from1to2 = true;
    }, 550 * 2);
  }

  // Cloud opacity

  var linksCloudBgAnimation = TweenLite.to(
    document.querySelector('.links__cloud'),
    1,
    {
      autoAlpha: 0,
      paused: true
    }
  );

  TweenLite.ticker.addEventListener('tick', function() {
    linksCloudBgAnimation.progress(
      clamp(
        normalize(
          window.pageYOffset,
          0,
          document.querySelector('.links').clientHeight
        ),
        0,
        1
      )
    );
  });

  // Form bg opacity

  var formBgAnimation = TweenLite.to(document.querySelector('.form__bg'), 1, {
    autoAlpha: 1,
    paused: true
  });

  TweenLite.ticker.addEventListener('tick', function() {
    var step = clamp(
      normalize(
        window.pageYOffset,
        document.querySelector('.sponsors').offsetTop +
          document.querySelector('.sponsors').clientHeight / 3,
        document.querySelector('.form').offsetTop -
          document.querySelector('.form').clientHeight / 3
      ),
      0,
      1
    );
    formBgAnimation.progress(step);
  });
}

//
//paralax on mouse move for main
//
$(".hero").mousemove(function(e) {
  parallaxIt(e, ".hero__clouds", -20);
  parallaxIt(e, ".hero__sea", -5);
  // parallaxIt(e, ".hero__hills", -5);
  parallaxIt(e, ".hero__ships", -5);
});

function parallaxIt(e, target, movement) {
  var $this = $(".hero");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}

