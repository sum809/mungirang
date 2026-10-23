const menuButton=document.querySelector ('.menu-button');
const mobileMenu=document.querySelector ('.mobile-menu');
menuButton?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});

mobileMenu?.querySelectorAll('a').forEach (
  link=>link.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  })
);

document.querySelectorAll('#booking,.match-form').forEach ( 
  form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    const message=form.id==='booking'?'선택한 조건으로 객실을 확인할게요.'
    :'우리 아이에게 어울리는 객실을 추천할게요.';alert(message);
  })
);

const cards = [...document.querySelectorAll('.room-card') ]; let roomIndex=0;
function showRoom(index){
  roomIndex = (index+cards.length)%cards.length;
  cards.forEach((card,i)=>card.classList.toggle('active',i===roomIndex));
}
document.querySelector('.carousel-arrow.prev')?.addEventListener('click',()=>showRoom(roomIndex-1));
document.querySelector('.carousel-arrow.next')?.addEventListener('click',()=>showRoom(roomIndex+1));


/* =========================
  Main Visual Slider
========================= */

const hero = document.querySelector('.hero');
const heroSlides = [...document.querySelectorAll('.hero-slides .hero-image')];
const heroDots = document.querySelector('.hero-dots');
const heroPrevButton = document.querySelector('.hero-prev');
const heroNextButton = document.querySelector('.hero-next');

let heroIndex = 0;
let heroTimer;

/* 이미지 개수만큼 페이지 버튼 생성 */
heroSlides.forEach((slide, index) => {
  const dot = document.createElement('button');

  dot.type = 'button';
  dot.className = `hero-dot${index === 0 ? ' active' : ''}`;
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `${index + 1}번 배너 보기`);
  dot.setAttribute('aria-selected', String(index === 0));

  dot.addEventListener('click', () => {
    showHero(index);
    restartHero();
  });

  heroDots?.append(dot);
});

/* 선택된 배너 한 장만 표시 */
function showHero(index) {
  if (!heroSlides.length) return;

  heroIndex = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === heroIndex;

    slide.classList.toggle('active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  document.querySelectorAll('.hero-dot').forEach((dot, dotIndex) => {
    const isActive = dotIndex === heroIndex;

    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

/* 5초마다 다음 배너로 자동 전환 */
function startHero() {
  if (heroSlides.length <= 1) return;

  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    showHero(heroIndex + 1);
  }, 5000);
}

function stopHero() {
  window.clearInterval(heroTimer);
}

function restartHero() {
  stopHero();
  startHero();
}

/* 이전·다음 버튼 */
heroPrevButton?.addEventListener('click', () => {
  showHero(heroIndex - 1);
  restartHero();
});

heroNextButton?.addEventListener('click', () => {
  showHero(heroIndex + 1);
  restartHero();
});

/* 마우스를 올리거나 버튼을 조작하는 동안 자동재생 정지 */
hero?.addEventListener('mouseenter', stopHero);
hero?.addEventListener('mouseleave', startHero);
hero?.addEventListener('focusin', stopHero);
hero?.addEventListener('focusout', startHero);

/* 첫 번째 배너 표시 및 자동재생 시작 */
if (heroSlides.length) {
  showHero(0);
  startHero();
}
