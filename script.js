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
