'use strict';;
(function() {
  let $breakPoint = 768;

  let modal = () => {
    let $newsLink = document.getElementsByClassName('newsLink');
    let $newsAnkerLink = [];
    let $modalTarget = [];
    let $modal = document.querySelectorAll('[id^="modal"]');
    let $overlay = document.getElementById('overlay');
    let $close = document.getElementsByClassName('modalClose');

    for (let i = 0; i < $newsLink.length; i++) {
      $newsLink[i].addEventListener('click', (e) => {
        e.preventDefault();
        // アンカーリンクのテキストを取得
        $newsAnkerLink[i] = $newsLink[i].href.replace(/^.*#/g, '');
        $modalTarget[i] = $newsLink[i].getAttribute('data-modalTarget');
        for (let j = 0; j < $modal.length; j++) {
          if ($modal[j].getAttribute('id') === $modalTarget[i] && $modal[j].getAttribute('aria-hidden') === 'false') {
            // モーダルの表示
            $modal[j].setAttribute('aria-hidden', 'true');
            $overlay.setAttribute('aria-hidden', 'true');
            let $modalBody = $modal[j].getElementsByClassName('modalBody')[0];
            let $modalBodyId = $modalBody.getAttribute('id');
            // モーダル内のアンカーリンクへのスクロール
            $modalBody = document.getElementById($modalBodyId);
            let scrollTarget = $modalBody.querySelectorAll('[id="' + $newsAnkerLink[i] + '"]')[0].offsetTop;
            let $modalTop = $modalBody.scrollTop;
            let scrollToTarget = scrollTarget - $modalTop;
            $modalBody.scrollTo(0, scrollToTarget);

            // クローズボタンでの閉じる処理
            $close[j].addEventListener('click', (e) => {
              let $closeTarget = $close[j].getAttribute('data-modalClose');
              if ($modal[j].getAttribute('id') === $closeTarget) {
                $modal[j].setAttribute('aria-hidden', 'false');
                $overlay.setAttribute('aria-hidden', 'false');
              }
            });

            // overlayでの閉じる処理
            $overlay.addEventListener('click', (e) => {
              $modal[j].setAttribute('aria-hidden', 'false');
              $overlay.setAttribute('aria-hidden', 'false');
            });
          }
        }
      });
    };
  }

  let news = () => {
    // newsの高さを取得
    let $newsList = document.getElementById('newsList');
    let $newsListItem = $newsList.children;
    let $newsLinkMaxHeight = 0;
    // newsの最大値を取得
    for (let i = 0; i < $newsListItem.length; i++) {
      if ($newsLinkMaxHeight < $newsListItem[i].clientHeight) {
        $newsLinkMaxHeight = $newsListItem[i].clientHeight;
      }
    }
    // newsの高さを付与
    $newsLinkMaxHeight = $newsLinkMaxHeight + 'px';
    $newsList.style.height = $newsLinkMaxHeight;
    for (let i = 0; i < $newsListItem.length; i++) {
      $newsListItem[i].style.height = $newsLinkMaxHeight;
    }
    // newsのanimationの設定
    let count = 0;
    $newsListItem[count].classList.add('js-show');
    let newsAnimation = () => {
      if ($newsListItem[count].classList.contains('js-show')) {
        $newsListItem[count].classList.remove('js-show');
      }
      $newsListItem[count].classList.add('js-preNext');
      count++;
      if (count >= $newsListItem.length) {
        count = 0;
      }
      $newsListItem[count].classList.add('js-show');
      if ($newsListItem[count].classList.contains('js-preNext')) {
        $newsListItem[count].classList.remove('js-preNext');
      }
    }
    // 遅延繰り返し処理
    let timer = setInterval(newsAnimation, 6000);
  }

  let accodionServiceList = () => {
    let $windowWidth = document.body.offsetWidth;
    let $serviceListTitle = document.getElementsByClassName('serviceListTitle');
      for(let i = 0; i < $serviceListTitle.length; i++) {
        $serviceListTitle[i].addEventListener('click', () => {
          if($breakPoint > $windowWidth) {
            if($serviceListTitle[i].classList.contains('js--active')) {
              $serviceListTitle[i].classList.remove('js--active');
            }else {
              $serviceListTitle[i].classList.add('js--active');
            }
          }else {
            $serviceListTitle[i].classList.add('js--active');
            for(let j = 0; j < $serviceListTitle.length; j++) {
              if(i !== j) {
                $serviceListTitle[j].classList.remove('js--active');
              }
            }
          }
        });
      }
      // $serviceListTitle[i].addEventListener('click', () => {
      //   $serviceListTitle[i].classList.add('js--active');
      //   for(let j = 0; j < $serviceListTitle.length; j++) {
      //     if(i !== j && $windowWidth > $breakPoint) {
      //       $serviceListTitle[j].classList.remove('js--active');
      //     }
      //   }
      // });
  }

  // let accodionFirst = () => {
  //   let $serviceListTitle = document.getElementsByClassName('serviceListTitle');
  //   let $serviceListContentsWrap = document.getElementsByClassName('serviceListContentsWrap');
  //   for(let i = 0; i < $serviceListTitle.length; i++) {
  //     if(i === 0) {
  //       $serviceListContentsWrap[i].style.height = '100%';
  //       $serviceListTitle[i].classList.add('js--active');
  //     }else {
  //       $serviceListContentsWrap[i].style.height = '0';
  //       $serviceListTitle[i].classList.remove('js--active');
  //     }
  //   }
  // }

  let accodionPerformance = () => {
    let $performance = document.getElementById('js--performance');
    let $viewAllBtn = document.getElementById('js--viewAll');
    let $performanceTableWrap = document.getElementsByClassName('performanceTableWrap');
    let $performanceTable = document.getElementsByClassName('performanceTable');
    let $performanceMinCount = 5;
    let $performanceMaxCount = $performanceTable.length;
    let performanceMinHeigh = 0;
    let performanceMaxHeight = 0;
    for (let i = 0; i < $performanceMaxCount; i++) {
      if (i < $performanceMinCount) {
        performanceMinHeigh += $performanceTable[i].clientHeight;
        performanceMaxHeight += $performanceTable[i].clientHeight;
      } else {
        performanceMaxHeight += $performanceTable[i].clientHeight;
      }
    }
    performanceMinHeigh = performanceMinHeigh + 'px';
    performanceMaxHeight = performanceMaxHeight + 'px';
    $performance.classList.remove('js--open');
    $performanceTableWrap[0].style.height = performanceMinHeigh;

    $viewAllBtn.addEventListener('click', () => {
      if ($performance.classList.contains('js--open')) {
        $performance.classList.remove('js--open');
        $performanceTableWrap[0].style.height = performanceMinHeigh;
      } else {
        $performance.classList.add('js--open');
        $performanceTableWrap[0].style.height = performanceMaxHeight;
      }
    });
  }



  let $stringAnimationTop = document.getElementsByClassName('js--stringAnimation--top');
  let stringAnimationTopArr = [];

  for (let i = 0; i < $stringAnimationTop.length; i++) {
    stringAnimationTopArr[i] = $stringAnimationTop[i].textContent.split('');

    let maxCount = stringAnimationTopArr[i].length;
    for (let j = 0; j < maxCount; j++) {
      stringAnimationTopArr[i][j] = '<span class="js--innerTextTop">' + stringAnimationTopArr[i][j] + '</span>';
    }
    let subText = stringAnimationTopArr[i].join('');
    $stringAnimationTop[i].innerHTML = '';
    $stringAnimationTop[i].insertAdjacentHTML('afterbegin', subText);


    let $stringAnimationTopItem = [];
    $stringAnimationTopItem = $stringAnimationTop[i].querySelectorAll('.js--innerTextTop');

    window.addEventListener('load', () => {
        let j = 0;
        let counter01 = () => {
          $stringAnimationTopItem[j].classList.add('js--feadIn');
          j++;
          if(j < $stringAnimationTopItem.length){
            setTimeout(counter01, 50);
          }
        }
        let timer01 = counter01();
    });
  }


  let $stringAnimation = document.getElementsByClassName('js--stringAnimation');
  let stringAnimationArr = [];

  for (let i = 0; i < $stringAnimation.length; i++) {
    stringAnimationArr[i] = $stringAnimation[i].textContent.split('');

    let maxCount = stringAnimationArr[i].length;
    for (let j = 0; j < maxCount; j++) {
      stringAnimationArr[i][j] = '<span class="js--innerText">' + stringAnimationArr[i][j] + '</span>';
    }
    let subText = stringAnimationArr[i].join('');
    $stringAnimation[i].innerHTML = '';
    $stringAnimation[i].insertAdjacentHTML('afterbegin', subText);


    let $stringAnimationItem = [];
    $stringAnimationItem = $stringAnimation[i].querySelectorAll('.js--innerText');

    window.addEventListener('scroll', () => {
      const rect = $stringAnimation[i].getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (scroll > offset - windowHeight + 200) {
        let j = 0;
        let counter01 = () => {
          $stringAnimationItem[j].classList.add('js--feadIn');
          j++;
          if(j < $stringAnimationItem.length){
            setTimeout(counter01, 50);
          }
        }
        let timer01 = counter01();
      }
    });
  }


  let $square = document.querySelectorAll('.square');
  for (let i = 0; i < $square.length; i++) {
    window.addEventListener('scroll', () => {
      const rect = $square[i].getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (scroll > offset - windowHeight + 300) {
        $square[i].classList.add('js--active');
      }
    });
  }

  let $squareTop = document.querySelectorAll('.square--top');
  for (let i = 0; i < $squareTop.length; i++) {
    window.addEventListener('load', () => {
      const rect = $squareTop[i].getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (scroll > offset - windowHeight + 200) {
        $squareTop[i].classList.add('js--active');
      }
    });
  }

  let $imgMsk = document.querySelectorAll('.imgMsk');
  for (let i = 0; i < $imgMsk.length; i++) {
    window.addEventListener('scroll', () => {
      const rect = $imgMsk[i].getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (scroll > offset - windowHeight + 200) {
        $imgMsk[i].classList.add('js--active');
      }
    });
  }


  window.addEventListener('load', () => {
    news();
    modal();
    accodionServiceList();
    accodionPerformance();
    // accodionFirst();
  });
})();