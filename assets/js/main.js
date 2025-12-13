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

            // 추가 : 애니메이션 트리거 호출
            triggerSpriteAnimation(hash); 


          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');

          // 추가 : 애니메이션 트리거 호출
          triggerSpriteAnimation(hash); 
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




  /* 추가 : 스프라이트 애니메이션 함수 - CSS 클래스 이름을 사용하여 애니메이션을 프레임별로 재생 */
// 전역 변수로 interval ID를 저장해 둡니다. (혹시 모를 중복 실행 방지용)
  // 전역 변수로 timeout ID를 저장해 둡니다.
 // 전역 변수로 timeout ID를 저장해 둡니다.
  // 전역 변수로 timeout ID를 저장해 둡니다.
  let activeAnimationTimeout = null;

  function triggerSpriteAnimation(sectionHash) {
      // 1. 기존에 실행 중인 애니메이션이 있다면 중지 및 초기화합니다.
      if (activeAnimationTimeout) {
          clearTimeout(activeAnimationTimeout);
          activeAnimationTimeout = null;
      }

      // 모든 애니메이션 요소에서 기존 프레임 클래스 제거 (접두사 목록을 사용)
      // 실제 사용하는 접두사로 변경하세요.
      const prefixes = ['arm_moving1-Synfig-Animation-1-', 'arm_moving2-Synfig-Animation-1-']; 
      
      $('.my-animation-sprite').each(function() { 
          for (const prefix of prefixes) {
              // 대략적인 최대 프레임 수만큼 반복하여 클래스 제거 (최대 100프레임 가정)
              for (let i = 0; i < 100; i++) { 
                  $(this).removeClass(prefix + i.toString().padStart(4, '0'));
              }
          }
      });

      // 2. 애니메이션 실행 로직을 처리할 공통 함수
      function startSpriteAnimation(spriteSelector, prefix, frameCount, duration, contentToShowSelector) {
          const $sprite = $(spriteSelector);
          let currentFrame = 0;

          $(contentToShowSelector).hide(); // 애니메이션 시작 전에 콘텐츠 숨기기 

          function playNextFrame() {
              // 현재 프레임 클래스 추가
              const currentFrameName = prefix + currentFrame.toString().padStart(4, '0');
              $sprite.addClass(currentFrameName);

              // 이전 프레임 클래스 제거 (현재 프레임 추가 후 제거하여 깜박임 최소화)
              if (currentFrame > 0) {
                  const previousFrameName = prefix + (currentFrame - 1).toString().padStart(4, '0');
                  $sprite.removeClass(previousFrameName);
              }

              currentFrame++;

              if (currentFrame < frameCount) {
                  // 다음 프레임이 남았다면, 지정된 시간 후에 함수를 다시 호출합니다.
                  activeAnimationTimeout = setTimeout(playNextFrame, duration);
              } else {
                  // 애니메이션 종료 (마지막 프레임 유지)
                  console.log("Animation Finished for " + spriteSelector);
                  activeAnimationTimeout = null;

                  // 여기에 애니메이션 후에 나타날 요소를 보이게 하는 코드를 추가합니다.
                  // ----------------------------------------------------
                  $(contentToShowSelector).fadeIn(500); // 0.5초 동안 서서히 나타나게 함 (fadeIn 효과 사용)
              }
          }
          
          // 애니메이션 시작
          playNextFrame();
      }

      // 3. 어떤 섹션인지 확인하여 애니메이션 실행 (여기에 sectionHash === 사용)
      if (sectionHash === '#education') {
          // education 섹션 진입 시 arm_moving1 애니메이션 실행 (크기/이동 없음)
          startSpriteAnimation('#education .my-animation-sprite', 'arm_moving1-Synfig-Animation-1-', 49, 30, '#education .education-content-wrapper');
      } else if (sectionHash === '#portfolio') {
          // projects 섹션 진입 시 arm_moving2 애니메이션 실행
          startSpriteAnimation('#portfolio .my-animation-sprite', 'arm_moving2-Synfig-Animation-1-', 25, 30, '#portfolio .portfolio-content-wrapper');
      }
  }



// 추가 : 보스의 눈동자가 마우스를 따라다니는 코드
// script.js (기존 마우스 이벤트 리스너 교체)
// script.js (벽 뚫림 방지 및 중앙 초기화 로직 포함)

let currentDirection = 'none';
const directionChangeThreshold = 30; 
const returnToCenterDuration = 100; // 0.1초

document.addEventListener('mousemove', function(e) {
    const gostObject = document.querySelector('.gost-object');
    const eyeWrapper = document.querySelector('.eye-wrapper');

    // 1. 객체 전체 움직임 계산 (기존과 동일)
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const deltaX_screen = e.clientX - screenCenterX;
    const deltaY_screen = e.clientY - screenCenterY;
    const moveLimit_object = 80;

    const objectFinalX = Math.max(-moveLimit_object, Math.min(moveLimit_object, deltaX_screen));
    const objectFinalY = Math.max(-moveLimit_object, Math.min(moveLimit_object, deltaY_screen));

    gostObject.style.transform = `translate(-50%, -50%) translate(${objectFinalX}px, ${objectFinalY}px)`;

    // 2. 눈동자 움직임 계산 및 십자가 경로 제한

    const gostRect = gostObject.getBoundingClientRect();
    const centerOffsetX = gostRect.left + gostRect.width / 2;
    const centerOffsetY = gostRect.top + gostRect.height / 2;

    const deltaX_gost = e.clientX - centerOffsetX;
    const deltaY_gost = e.clientY - centerOffsetY;

    const limitX = (gostRect.width - eyeWrapper.offsetWidth) / 2; 
    const limitY = (gostRect.height - eyeWrapper.offsetHeight) / 2; 

    let eyeFinalX = 0;
    let eyeFinalY = 0;

    const absDeltaX = Math.abs(deltaX_gost);
    const absDeltaY = Math.abs(deltaY_gost);
    
    let newDirection;
    if (absDeltaX > absDeltaY + directionChangeThreshold) {
        newDirection = 'horizontal';
    } else if (absDeltaY > absDeltaX + directionChangeThreshold) {
        newDirection = 'vertical';
    } else {
        newDirection = currentDirection;
    }

    // 핵심 로직: 경로 전환 감지 및 중앙 초기화 (벽 뚫림 방지)
    if (currentDirection !== newDirection && currentDirection !== 'none') {
        // 방향 전환 시 중앙으로 이동
        eyeWrapper.style.transform = `translate(-50%, -50%) translate(0px, 0px)`;
        
        setTimeout(() => {
            currentDirection = newDirection;
        }, returnToCenterDuration); 

        return; // 이 프레임에서는 이동을 멈추고 다음 프레임을 기다립니다.
        
    } else {
        currentDirection = newDirection;
    }
    
    // 최종 위치 계산 (십자가 로직)
    if (currentDirection === 'horizontal') {
        eyeFinalY = 0;
        eyeFinalX = Math.max(-limitX, Math.min(limitX, deltaX_gost));
    } else if (currentDirection === 'vertical') {
        eyeFinalX = 0;
        eyeFinalY = Math.max(-limitY, Math.min(limitY, deltaY_gost));
    }

    // 눈동자 위치 적용
    eyeWrapper.style.transform = `translate(-50%, -50%) translate(${eyeFinalX}px, ${eyeFinalY}px)`;
});


// 보스의 페이드인 효과 구현
// DOM 콘텐츠 로드 시 오버레이 투명화 시작
document.addEventListener('DOMContentLoaded', function() {
    const gostOverlay = document.querySelector('.gost-overlay');

    if (gostOverlay) {
        // 페이지 로드 후 약간의 딜레이 후 페이드 아웃 시작
        setTimeout(() => {
            gostOverlay.classList.add('fade-out');
        }, 100); 
    }
});




})(jQuery);