/*
* Original Author: Prerak Raja
* Source Repository: https://github.com/rajaprerak/rajaprerak.github.io
* License: MIT License
 
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
  /*
  이 코드는 사용자가 포트폴리오의 각 섹션(예: About, Resume, Contact) 링크를 클릭했을 때, 
  페이지 전체를 새로고침하지 않고 콘텐츠 영역만 빠르게 전환하는 SPA(Single Page Application) 방식의 내비게이션을 구현합니다.
  또한, 헤더 스타일 변경, 활성 메뉴 표시, 모바일 메뉴 자동 닫힘 등의 사용자 경험을 개선하는 기능이 포함되어 있습니다.
*/
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  /*이 코드는 사용자가 특정 링크를 통해 웹사이트의 특정 섹션으로 바로 들어왔을 때, 
  자바스크립트 기반의 화면 전환 시스템이 그 초기 상태를 올바르게 인식하고 해당 섹션부터 애니메이션과 함께 보여주도록 설정합니다. */
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  /*이 코드는 데스크톱 버전의 메뉴를 복사하여 모바일 버전 메뉴를 만들고, 
  햄버거 버튼(메뉴 토글 버튼) 클릭 시 메뉴가 나타나고 사라지는 동작을 제어합니다.
 */
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  /*이 코드는 사용자가 웹 페이지를 스크롤하여 특정 통계 섹션(예: "프로젝트 완료 수", "수상 경력", "고객 만족도")에 도달했을 때, 
  숫자가 0부터 시작하여 최종 목표 숫자까지 빠르게 올라가는 동적인 애니메이션 효과를 부여합니다. */
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  /*이 코드는 웹사이트 방문자가 "Skills" 섹션까지 스크롤하면, 
  미리 설정된 숙련도(예: 90%)만큼 프로그레스 바가 움직이는 애니메이션 효과를 발생시킵니다.
waypoint 플러그인을 사용하여 사용자가 해당 섹션을 볼 수 있는 위치에 도달했을 때만 애니메이션이 실행되도록 하여, 
웹사이트의 성능을 최적화하고 시각적인 흥미를 유발합니다. */
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  /* Owl Carousel이라는 자바스크립트 라이브러리를 사용하여 "Testimonials (사용 후기)" 섹션의 슬라이더(캐러셀)를 설정하는 코드입니다.
이 코드는 사용 후기가 자동으로 회전하며, 화면 크기에 따라 몇 개의 후기를 보여줄지 반응형으로 정의합니다. */
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  /*웹사이트의 포트폴리오 섹션에서 항목들을 정렬하고 필터링하는 기능을 구현하는 jQuery 코드입니다.
이 코드는 **Isotope(아이소톱)**이라는 외부 라이브러리를 사용하여, 사용자가 'Web Design', 'App', 'Card' 같은 카테고리를 클릭했을 때
 해당 항목들만 애니메이션과 함께 부드럽게 보이도록 처리합니다.
 */
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  /*VenoBox(베노박스)**라는 jQuery 플러그인을 초기화하는 코드입니다.
이 코드는 웹사이트의 특정 이미지나 링크를 클릭했을 때, 
현재 페이지 위에 멋진 팝업창(라이트박스) 형태로 콘텐츠(이미지, 비디오 등)를 띄워주는 기능을 활성화합니다. */
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);