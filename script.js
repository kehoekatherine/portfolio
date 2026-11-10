const buttons=[...document.querySelectorAll('[data-filter]')];
const projects=[...document.querySelectorAll('[data-category]')];
buttons.forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;
  projects.forEach(project=>{project.hidden=category!=='all'&&project.dataset.category!==category;if(!project.hidden)count++;});
  document.getElementById('status').textContent=`Showing ${count} projects`;
  document.getElementById('count').textContent='/ '+String(count).padStart(2,'0');
}));

const carousel=document.querySelector('.neo-slideshow');
if(carousel){
 const slides=[...carousel.querySelectorAll('.neo-slide')];
 const toggle=carousel.querySelector('.slide-pause');
 let current=0,playing=!window.matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
 const show=(index)=>{current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===current);slide.setAttribute('aria-hidden',String(i!==current));});carousel.querySelector('.slide-position').textContent=`${current+1} / ${slides.length}`;};
 const sync=()=>{clearInterval(timer);toggle.textContent=playing?'Pause':'Play';toggle.setAttribute('aria-label',playing?'Pause slideshow':'Play slideshow');if(playing)timer=setInterval(()=>show(current+1),4500);};
 toggle.addEventListener('click',()=>{playing=!playing;sync();});
 carousel.querySelector('.slide-prev').addEventListener('click',()=>{show(current-1);sync();});
 carousel.querySelector('.slide-next').addEventListener('click',()=>{show(current+1);sync();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(timer);else sync();});
 show(0);sync();
}

const appCarousel=document.querySelector('.app-carousel');
if(appCarousel){
 const screens=[...appCarousel.querySelectorAll('.app-slide')];
 const toggle=appCarousel.querySelector('.app-pause');
 let current=0,playing=!window.matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
 const show=(index)=>{current=(index+screens.length)%screens.length;screens.forEach((screen,i)=>{screen.classList.toggle('active',i===current);screen.setAttribute('aria-hidden',String(i!==current));});appCarousel.querySelector('.app-position').textContent=`${current+1} / ${screens.length}`;};
 const sync=()=>{clearInterval(timer);toggle.textContent=playing?'Pause':'Play';toggle.setAttribute('aria-label',playing?'Pause app slideshow':'Play app slideshow');if(playing)timer=setInterval(()=>show(current+1),2500);};
 toggle.addEventListener('click',()=>{playing=!playing;sync();});
 appCarousel.querySelector('.app-prev').addEventListener('click',()=>{show(current-1);sync();});
 appCarousel.querySelector('.app-next').addEventListener('click',()=>{show(current+1);sync();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(timer);else sync();});
 show(0);sync();
}

// Company anchors reveal the requested story while keeping the overview compact.
function revealCompany(hash){
 const target=hash?document.getElementById(hash.slice(1)):null;
 const disclosure=target?.matches('article')?target.querySelector('.company-experience'):null;
 if(disclosure)disclosure.open=true;
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>revealCompany(link.getAttribute('href'))));
window.addEventListener('hashchange',()=>revealCompany(location.hash));
revealCompany(location.hash);

const themeChoices=[...document.querySelectorAll('[data-theme-choice]')];
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 themeChoices.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===theme)));
 try{localStorage.setItem('portfolio-theme',theme);}catch(e){}
}
applyTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');
themeChoices.forEach(button=>button.addEventListener('click',()=>applyTheme(button.dataset.themeChoice)));
const backToTop=document.querySelector('.back-to-top');
function updateBackToTop(){if(backToTop)backToTop.hidden=window.scrollY<400;}
window.addEventListener('scroll',updateBackToTop,{passive:true});
updateBackToTop();
