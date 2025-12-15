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
  - 섹션 링크 클릭 시 단일 페이지 내에서 섹션 전환을 처리합니다.
  - 현재 경로/호스트가 링크와 일치하는지 확인한 후, 해당 해시(예: #about)의 섹션을 찾아 표시합니다.
  - 헤더에 `header-top` 클래스를 토글해 상단 스타일(스틱 효과 등)을 제어하고,
    활성 메뉴 항목(`.active`)을 관리합니다.
  - 모바일 메뉴가 열려 있으면 자동으로 닫아줍니다.
*/
// 메뉴 2개가 클릭되면 동작하는 함수를 문서 전체(document)에 할당함
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {  // e 는 이벤트 정보를 담는 객체, 이벤트 발생하면 정보가 담김
    // 같은 페이지 내 anchor 이동인지 확인 (다른 페이지 링크는 기본 동작 유지)
    // location : 현재 페이지 URL 정보   ,  this : 클릭된 앵커 태그(이동할 링크 주소)
    // pathname : 경로 이름(예 : /index.html)  ,  replace : 문자열 앞의 / 를 공백으로 바꿔서 제거 -> 비교 실패 방지  , hostname : 도메 이름(예 : www.example.com)
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;  // 클릭된 앵커 태그의 해시 부분(예 : #about) , 즉 id 속성값
      var target = $(hash);  // jQuery 선택자로 해당 해시(id) 값을 가진 요소를 찾음 (예 : id="about"인 섹션) -> 해당 요소를 가진 객체 전부 추가?(리스트?)
      if (target.length) {  // 길이가 0보다 크면(즉, 해당 id를 가진 요소가 존재하면)
        e.preventDefault();  // 기본 앵커 이동 동작 방지 (페이지 리로드 및 기본 스크롤 이동 방지)

        if ($(this).parents('.nav-menu, .mobile-nav').length) {  // 클릭된 앵커가 nav-menu 또는 mobile-nav 내부에 있는지 확인 -> 부모 객체에서 앵커를 싹다 긁어오고 길이 측정
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');  // 기존에 활성화된 메뉴 항목에서 active 클래스 제거
          $(this).closest('li').addClass('active');  // 클릭된 앵커의 가장 가까운 li 부모 요소(메뉴니까)에 active 클래스 추가 (현재 클릭된 메뉴 항목 활성화)
        }

        if (hash == '#header') {  // 클릭된 앵커의 해시가 #header(최상단)인 경우
          // 최상단(header)으로 이동하면 header-top 스타일을 제거하고, 다른 섹션들을 숨깁니다.
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;  // 함수 종료
        }
        // header-top이 없으면 추가하고, 섹션 전환을 지연시켜 스타일 전환 애니메이션이 자연스럽게 보이도록 함
        if (!$('#header').hasClass('header-top')) {  // header-top 클래스가 없으면
          $('#header').addClass('header-top');   // header-top 클래스 추가
          // header-top이 추가될 때(스타일 전환 애니메이션 여유)를 준 후 섹션 전환
          setTimeout(function() {   // setTimeout(함수, 지연시간(ms)) : 일정 시간 후에 함수 실행
            $("section").removeClass('section-show');    // 모든 섹션에서 section-show 클래스 제거 (모든 섹션 숨김)
            $(hash).addClass('section-show');   // 클릭된 앵커의 해시(id)를 가진 섹션에 section-show 클래스 추가 (해당 섹션 표시)

            // 섹션이 보이기 시작할 때 해당 섹션 전용 애니메이션(스프라이트 등)을 트리거
            triggerSpriteAnimation(hash); 

          }, 350);
        } else {
          // header-top이 이미 있는 경우 지체 없이 섹션 전환 및 애니메이션 시작
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');

          // 추가 : 애니메이션 트리거 호출
          triggerSpriteAnimation(hash); 
        }

        if ($('body').hasClass('mobile-nav-active')) {  // 모바일 네비게이션이 활성화된 상태인지 확인
          $('body').removeClass('mobile-nav-active');   // 모바일 네비게이션 비활성화
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');  // 모바일 네비게이션 토글 아이콘 변경
          $('.mobile-nav-overly').fadeOut();  // 모바일 네비게이션 오버레이 숨기기
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  /* 특정 경로를 통해 메인화면이 아닌 섹션으로 바로 접근할 때 처리하는 로직
  - 페이지 로드 시 URL에 해시(예: example.com/#portfolio)가 있으면 해당 섹션을 활성화합니다.
  - header-top을 추가해 상단 스타일을 고정하고, 네비게이션의 활성 상태를 맞춰 줍니다.
*/
  if (window.location.hash) {  // URL에 해시가 있으면
    var initial_nav = window.location.hash;   // 해시 값을 initial_nav 변수에 저장 (예 : #portfolio)
    if ($(initial_nav).length) {   // 해당 해시(id)를 가진 요소가 존재하면
      $('#header').addClass('header-top');   // header-top 클래스 추가 (상단 스타일 고정)
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');  // 기존 활성 메뉴 항목에서 active 클래스 제거
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');  // 해당 섹션에 맞는 메뉴 항목에 active 클래스 추가
      setTimeout(function() {    // 섹션 전환을 지연시켜 스타일 전환 애니메이션이 자연스럽게 보이도록 함
        $("section").removeClass('section-show');   // 모든 섹션에서 section-show 클래스 제거 (모든 섹션 숨김)
        $(initial_nav).addClass('section-show');   // initial_nav 해시(id)를 가진 섹션에 section-show 클래스 추가 (해당 섹션 표시)
      }, 350);
    }
  }

  // Mobile Navigation
  /*
  - 데스크톱 `.nav-menu`를 복제해 모바일 전용 `.mobile-nav`를 생성합니다.
  - `.mobile-nav-toggle` 버튼 클릭으로 바디에 `mobile-nav-active` 클래스를 토글하여 메뉴 보이기/숨기기를 제어합니다.
  - 문서 클릭 시 메뉴 외부를 클릭하면 모바일 메뉴를 닫는 로직을 포함합니다.
*/
  if ($('.nav-menu').length) {    // .nav-menu 요소가 존재하면
    var $mobile_nav = $('.nav-menu').clone().prop({   // .nav-menu 요소를 복제하여 새로운 jQuery 객체 생성
      class: 'mobile-nav d-lg-none'   // 클래스명을 mobile-nav d-lg-none으로 설정
    });
    $('body').append($mobile_nav);   // 복제된 모바일 네비게이션을 바디 끝에 추가
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');  // 모바일 네비게이션 토글 버튼을 바디 맨 앞에 추가
    $('body').append('<div class="mobile-nav-overly"></div>');  // 모바일 네비게이션 오버레이를 바디 끝에 추가

    $(document).on('click', '.mobile-nav-toggle', function(e) {  // 모바일 네비게이션 토글 버튼 클릭 시
      $('body').toggleClass('mobile-nav-active');  // 바디에 mobile-nav-active 클래스 토글 (메뉴 보이기/숨기기)
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');  // 토글 아이콘 변경
      $('.mobile-nav-overly').toggle();  // 모바일 네비게이션 오버레이 보이기/숨기기
    });

    $(document).click(function(e) {  // 문서 클릭 시
      var container = $(".mobile-nav, .mobile-nav-toggle");  // 모바일 네비게이션 및 토글 버튼을 컨테이너로 설정
      if (!container.is(e.target) && container.has(e.target).length === 0) {  // 클릭된 대상이 컨테이너 내부가 아니면
        if ($('body').hasClass('mobile-nav-active')) {  // 모바일 네비게이션이 활성화된 상태인지 확인
          $('body').removeClass('mobile-nav-active');   // 모바일 네비게이션 비활성화
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');  // 모바일 네비게이션 토글 아이콘 변경
          $('.mobile-nav-overly').fadeOut();  // 모바일 네비게이션 오버레이 숨기기
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {  // .nav-menu 요소가 없고, 모바일 네비게이션 요소가 존재하면
    $(".mobile-nav, .mobile-nav-toggle").hide();   // 모바일 네비게이션 및 토글 버튼 숨기기
  }




  // Porfolio isotope and filter
  /*
  - 페이지 로드 시 Isotope 라이브러리를 초기화해 포트폴리오 아이템의 레이아웃을 관리합니다.
  - 필터 버튼 클릭으로 `.filter-active`를 토글하고, 해당하는 필터값만 보여주도록 Isotope에 전달합니다.
 */
  $(window).on('load', function() {   // 페이지 로드 시 실행
    var portfolioIsotope = $('.portfolio-container').isotope({  // .portfolio-container 요소에 대해 Isotope 초기화
      itemSelector: '.portfolio-item',   // 아이템 선택자 지정 (.portfolio-item 요소들을 대상으로 함)
      layoutMode: 'fitRows'   //  레이아웃 모드 설정 (fitRows: 행 단위로 아이템 배치)
    });

    $('#portfolio-flters li').on('click', function() {  // 포트폴리오 필터 버튼 클릭 시
      $("#portfolio-flters li").removeClass('filter-active');   // 모든 필터 버튼에서 filter-active 클래스 제거
      $(this).addClass('filter-active');   // 클릭된 필터 버튼에 filter-active 클래스 추가

      portfolioIsotope.isotope({   // Isotope에 필터 적용
        filter: $(this).data('filter')   // 클릭된 버튼의 data-filter 속성값을 필터로 사용
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  // Initiate venobox (lightbox feature used in portofilo)
  /*
  - `.venobox` 요소들에 대해 VenoBox 플러그인을 초기화합니다.
  - 클릭 시 모달형 라이트박스로 이미지/비디오를 표시합니다.
 */
  $(document).ready(function() {  // 문서 준비 시 실행
    $('.venobox').venobox();  // .venobox 요소들에 대해 VenoBox 플러그인 초기화
  });




    /*
     스프라이트 기반 프레임 애니메이션 재생기

     설명:
     - 특정 섹션이 보여질 때(예: #education, #portfolio) SVG/CSS 스프라이트 프레임
     클래스를 순차적으로 붙여 프레임 애니메이션을 재생합니다.
     - 각 프레임은 CSS 클래스(`prefix + 0000` 형식)로 표현되며, 이전 프레임 클래스는 제거합니다.
     - 포트폴리오 섹션은 애니메이션 종료 후 팔을 페이드아웃하고 막대(line)를 확장하는 추가 효과가 있습니다.
    */
    // 전역으로 유지되는 timeout ID (현재 재생 중인 애니메이션을 중단할 때 사용)
    let activeAnimationTimeout = null;  

    /**
     * 섹션별 애니메이션 트리거
     * @param {string} sectionHash - 호출된 섹션 해시('#education' 등)
     */
    function triggerSpriteAnimation(sectionHash) {  // sectionHash : #education , #portfolio 위에서 해쉬값 받았음
      // 이미 실행 중인 애니메이션 있으면 중단
      if (activeAnimationTimeout) {   // 이전에 설정된 타임아웃이 있으면
        clearTimeout(activeAnimationTimeout);  // clearTimeout(파라미터로 타임아웃 ID를 넘겨서 해당 타임아웃을 취소)
        activeAnimationTimeout = null;   // 타임아웃 ID 초기화
      }

      // 프레임 클래스들(가능한 모든 프리픽스 + 인덱스)을 제거해 초기 상태로 복구
      const prefixes = ['arm_moving1-Synfig-Animation-1-', 'arm_moving2-Synfig-Animation-1-'];  // 사용되는 프레임 클래스 접두사 목록
      $('.my-animation-sprite').each(function() {  // .my-animation-sprite 요소들에 대해 다음 함수 반복
        for (const prefix of prefixes) {   // 각 프리픽스에 대해
          // 0000 ~ 0099 형식의 클래스 이름을 모두 제거
          for (let i = 0; i < 100; i++) {
            $(this).removeClass(prefix + i.toString().padStart(4, '0'));  // toString() : 숫자를 문자열로 변환
            // padStart(길이, 채울문자) : 문자열 길이가 지정된 길이보다 짧으면 앞에 채울문자를 붙여서 길이를 맞춤
          }
        }
      });

      // 포트폴리오 전용 초기화: 팔을 보이게 하고, 막대가 보이지 않게 초기 설정
      if (sectionHash === '#portfolio') {  // 포트폴리오 섹션일 때
        const $sprite = $('#portfolio .my-animation-sprite');  // 포트폴리오 섹션의 스프라이트 요소 선택
        const $bar = $('#portfolio .line');  // 포트폴리오 섹션의 막대 요소 선택

        // 팔은 보이게 설정
        $sprite.css({ opacity: 1 });  

        // 막대는 초기에 가려두기 (폭을 0으로 설정하여 이후 애니메이션에서 확장)
        $bar.css({ width: $bar.width(0) });
      }

      // 프레임 재생 공통 함수
      // startSpriteAnimation(스프라이트 선택자, 프레임 접두사, 프레임 수, 프레임 간격(ms), 콘텐츠 래퍼 선택자)
      function startSpriteAnimation(spriteSelector, prefix, frameCount, duration, contentSelector) {  // contentSelector : 애니메이션 재생 후 보여줄 콘텐츠 래퍼 선택자
        const $sprite = $(spriteSelector);  // 스프라이트 요소 선택
        let currentFrame = 0;  // 현재 프레임 인덱스 초기화

        // 애니메이션 재생 전 관련 콘텐츠는 숨김(fadeIn을 끝에 실행)
        $(contentSelector).hide();  

        function playNextFrame() {  // 다음 프레임 재생 함수
          // 현재 프레임 클래스 추가
          const currentFrameName = prefix + currentFrame.toString().padStart(4, '0');  // 현재 프레임 클래스 이름 생성 = 스프라이트 시트에 있던 클래스명과 동일하게 생성
          $sprite.addClass(currentFrameName);  // 현재 프레임 클래스 추가

          // 이전 프레임 클래스 제거
          if (currentFrame > 0) {  // 첫 프레임이 아니면 이전 프레임 클래스 제거
            const previousFrameName = prefix + (currentFrame - 1).toString().padStart(4, '0');  // 이전 프레임 클래스 이름 생성
            $sprite.removeClass(previousFrameName);  // 이전 프레임 클래스 제거
          }

          currentFrame++;  // 다음 프레임으로 증가

          // 다음 프레임 예약 또는 종료 처리
          if (currentFrame < frameCount) {   // 아직 재생할 프레임이 남아 있으면
            activeAnimationTimeout = setTimeout(playNextFrame, duration);  // 일정 시간 후에 다음 프레임 재생 예약
          } else {  // 모든 프레임 재생이 완료되면
            activeAnimationTimeout = null;  // 타임아웃 ID 초기화

            // 포트폴리오의 경우: 팔을 fadeOut하고 막대를 확장한 뒤 콘텐츠를 fadeIn
            if (prefix === 'arm_moving2-Synfig-Animation-1-') {  // 포트폴리오 섹션일 때
              const $sprite = $(spriteSelector);   // 스프라이트 요소 선택
              const $bar = $('#portfolio .line');  // 포트폴리오 섹션의 막대 요소 선택
              const moveDuration = 400; // 0.4초   // 팔 페이드아웃 시간
              const barDuration = 800;  // 0.8초   // 막대 확장 시간

              $sprite.animate({ opacity: 0 }, moveDuration);  // 팔을 서서히 사라지게 함 , animate(속성, 시간, 콜백함수)

              $bar.animate({ width: '100%' }, barDuration, function() {  // 막대를 서서히 확장  animate(속성, 시간, 콜백함수)
                $(contentSelector).fadeIn(500);   // 확장이 완료된 후 콘텐츠 fadeIn  , 콜백함수는 애니메이션이 완료된 후 실행됨
              });

            } else {
              // education 섹션은 단순히 콘텐츠 fadeIn
              $(contentSelector).fadeIn(500);  // 0.5초 동안 콘텐츠를 서서히 나타나게 함 , fadeIn(시간, 콜백함수)
            }
          }
        }

        // 재생 시작
        playNextFrame();
      }

      // 섹션별 재생 설정 (프레임 수와 prefix가 다릅니다)
      if (sectionHash === '#education') {
        startSpriteAnimation('#education .my-animation-sprite', 'arm_moving1-Synfig-Animation-1-', 49, 30, '#education .education-content-wrapper');
      } else if (sectionHash === '#portfolio') {
        startSpriteAnimation('#portfolio .my-animation-sprite', 'arm_moving2-Synfig-Animation-1-', 25, 30, '#portfolio .portfolio-content-wrapper');
      }
    }
  


// 추가 : 보스의 눈동자가 마우스를 따라다니는 코드
// - 화면 중심 기반으로 오브젝트(보스) 위치를 조금 이동시키고,
// - 그 내부의 눈(eyeWrapper)은 십자가(Cross) 경로 제약(가로/세로 중 하나만 움직임)으로 따라다니도록 처리합니다.
let currentDirection = 'none';      
const directionChangeThreshold = 30; // 방향 전환을 감지할 때 필요한 최소 차이
const returnToCenterDuration = 100; // 방향 전환 시 눈을 중앙으로 되돌리는 시간(ms)

document.addEventListener('mousemove', function(e) {  // 마우스 무브 이벤트 리스너 등록
  const gostObject = document.querySelector('.gost-object');  // 보스 오브젝트 선택  , querySelector : 선택자에 해당하는 첫번째 요소 반환 -> 해당 클래스 가진 요소 중 첫번째
  const eyeWrapper = document.querySelector('.eye-wrapper');  // 눈동자 래퍼 선택

    

  // 1) 객체 전체(보스) 이동 계산: 화면 중앙 기준으로 최대 moveLimit만큼 이동
  const screenCenterX = window.innerWidth / 2;  // 화면 가로 중앙 좌표
  const screenCenterY = window.innerHeight / 2;  // 화면 세로 중앙 좌표
  const deltaX_screen = e.clientX - screenCenterX;  // 마우스 X 좌표와 화면 중앙 X 좌표의 차이
  const deltaY_screen = e.clientY - screenCenterY;  // 마우스 Y 좌표와 화면 중앙 Y 좌표의 차이
  const moveLimit_object = 80;  // 보스 오브젝트가 움직일 수 있는 최대 거리

  // 제한된 이동 거리 계산, 화면 중앙을 기준으로 최대 moveLimit_object 만큼만 이동
  const objectFinalX = Math.max(-moveLimit_object, Math.min(moveLimit_object, deltaX_screen));  // Math.max(a, b) : a와 b 중 큰 값 반환 , Math.min(a, b) : a와 b 중 작은 값 반환
  const objectFinalY = Math.max(-moveLimit_object, Math.min(moveLimit_object, deltaY_screen));  // Math.max(a, b) : a와 b 중 큰 값 반환 , Math.min(a, b) : a와 b 중 작은 값 반환

  // 보스 전체를 translate로 이동 (중앙 기준 보정 포함)
  gostObject.style.transform = `translate(-50%, -50%) translate(${objectFinalX}px, ${objectFinalY}px)`; 

  // 2) 눈동자 움직임 계산 (보스 내부 좌표 기반)
  const gostRect = gostObject.getBoundingClientRect();    // getBounding
  const centerOffsetX = gostRect.left + gostRect.width / 2;  // 왼쪽에서부터 보스까지 거리 + 보스 너비 절반
  const centerOffsetY = gostRect.top + gostRect.height / 2;  // 위쪽에서부터 보스까지 거라 + 보스 높이 절반

  const deltaX_gost = e.clientX - centerOffsetX;   // 마우스 x좌표 - 눈동자 x좌표
  const deltaY_gost = e.clientY - centerOffsetY;   // 마우스 y좌표 - 눈동자 y좌표

  // 눈(eyeWrapper)은 보스 내부에서만 움직이도록 제한 (가로/세로 각각 limit 설정)
  const limitX = (gostRect.width - eyeWrapper.offsetWidth) / 2;     // 보스 너비 - 
  const limitY = (gostRect.height - eyeWrapper.offsetHeight) / 2;

  let eyeFinalX = 0;
  let eyeFinalY = 0;

  const absDeltaX = Math.abs(deltaX_gost);
  const absDeltaY = Math.abs(deltaY_gost);

  // 방향 판정: 가로/세로 중 어느 방향으로 움직일지 결정 (십자가 경로)
  let newDirection;
  if (absDeltaX > absDeltaY + directionChangeThreshold) {
    newDirection = 'horizontal';
  } else if (absDeltaY > absDeltaX + directionChangeThreshold) {
    newDirection = 'vertical';
  } else {
    // 차이가 뚜렷하지 않으면 기존 방향 유지
    newDirection = currentDirection;
  }

  // 핵심: 방향이 바뀔 때는 잠깐 눈을 중앙으로 되돌려 '벽 뚫림' 같은 시각적 이상 현상 방지
  if (currentDirection !== newDirection && currentDirection !== 'none') {
    // 중앙으로 되돌림
    eyeWrapper.style.transform = `translate(-50%, -50%) translate(0px, 0px)`;

    // 약간의 딜레이 후 방향을 바꿔 다음 프레임에서 자연스럽게 이동 시작
    setTimeout(() => {
      currentDirection = newDirection;
    }, returnToCenterDuration);

    return; // 이 프레임은 중앙 정렬만 수행

  } else {
    currentDirection = newDirection;
  }

  // 십자가 경로 계산: 가로 모드면 Y 고정, 세로 모드면 X 고정
  if (currentDirection === 'horizontal') {
    eyeFinalY = 0;
    eyeFinalX = Math.max(-limitX, Math.min(limitX, deltaX_gost));
  } else if (currentDirection === 'vertical') {
    eyeFinalX = 0;
    eyeFinalY = Math.max(-limitY, Math.min(limitY, deltaY_gost));
  }

  // 계산된 위치 적용
  eyeWrapper.style.transform = `translate(-50%, -50%) translate(${eyeFinalX}px, ${eyeFinalY}px)`;
});


// 보스의 페이드인 효과 구현
// - 페이지 로드 직후 오버레이(`.gost-overlay`)에 `fade-out` 클래스를 추가해 CSS 전환으로 서서히 사라지게 함
document.addEventListener('DOMContentLoaded', function() {
  const gostOverlay = document.querySelector('.gost-overlay');

  if (gostOverlay) {
    // 짧은 딜레이 후 클래스를 추가하면 CSS 트랜지션이 자연스럽게 동작
    setTimeout(() => {
      gostOverlay.classList.add('fade-out');
    }, 100);
  }
});



/* 연락처 폼 애니메이션 */
const form = document.getElementById("contactForm");
const arm = form.querySelector(".arm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 재로딩 방지

  // 1. 팔 내려오기
  arm.style.transform = "translateY(170px)";  // 괄호 안에 더 이동 시키고 싶은 거리

  // 2. 잠깐 후 폼 잡기
  setTimeout(() => {
    form.classList.add("grabbed");
  }, 400);

  // 3. 팔 + 폼 위로 사라짐
  setTimeout(() => {
    arm.style.transform = "translateY(-100%)";
  }, 900);

  // 4. 폼 초기화 & 복귀
  setTimeout(() => {
    form.reset();
    form.classList.remove("grabbed");
  }, 1500);
});



})(jQuery);