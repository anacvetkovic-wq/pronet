(function(){
  const d=document,root=d.documentElement;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) root.classList.add('reduce');
  const hasG=typeof gsap!=='undefined';
  if(hasG&&typeof ScrollTrigger!=='undefined') gsap.registerPlugin(ScrollTrigger);

  /* lenis */
  let lenis=null;
  if(!reduce&&typeof Lenis!=='undefined'){
    lenis=new Lenis({duration:1.15,smoothWheel:true});
    if(hasG){lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
    else{const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)}
  }

  /* nav hide/show */
  const nav=d.querySelector('.nav');let last=0;
  const onScroll=()=>{const y=window.scrollY;nav.classList.toggle('scrolled',y>20);
    if(!d.body.classList.contains('menu-open')&&!(mega&&mega.classList.contains('open'))) nav.classList.toggle('hide',y>last&&y>400);last=y};
  window.addEventListener('scroll',onScroll,{passive:true});

  /* mega */
  const mega=d.querySelector('.mega'),mbtn=d.querySelector('[data-mega]');
  if(mega&&mbtn){
    let t,openedAt=0;const open=v=>{clearTimeout(t);if(v&&!mega.classList.contains('open'))openedAt=Date.now();mega.classList.toggle('open',v);mbtn.setAttribute('aria-expanded',v);if(v)nav.classList.remove('hide')};
    mbtn.addEventListener('click',()=>{const o=mega.classList.contains('open');open(!o||Date.now()-openedAt<600)});
    mbtn.addEventListener('mouseenter',()=>open(true));
    mega.addEventListener('mouseenter',()=>clearTimeout(t));
    [mbtn,mega].forEach(el=>el.addEventListener('mouseleave',()=>{t=setTimeout(()=>open(false),220)}));
    d.querySelector('.mega-veil').addEventListener('click',()=>open(false));
    d.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
  }
  /* burger */
  const bg=d.querySelector('.burger');
  if(bg) bg.addEventListener('click',()=>{const o=d.body.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o);if(lenis)o?lenis.stop():lenis.start()});

  /* forms */
  d.querySelectorAll('form.form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.classList.add('sent')}));

  /* testimonials */
  d.querySelectorAll('.testi').forEach(w=>{
    const bs=[...w.querySelectorAll('nav button')],qs=[...w.querySelectorAll('blockquote')];let i=0,timer;
    const go=n=>{i=n;bs.forEach((b,k)=>b.classList.toggle('on',k===n));qs.forEach((q,k)=>q.classList.toggle('on',k===n))};
    const auto=()=>{clearInterval(timer);timer=setInterval(()=>go((i+1)%bs.length),7000)};
    bs.forEach((b,k)=>b.addEventListener('click',()=>{go(k);auto()}));go(0);if(!reduce)auto();
  });

  /* jobs */
  d.querySelectorAll('.job>button').forEach(b=>b.addEventListener('click',()=>{const j=b.parentElement;j.classList.toggle('open');b.setAttribute('aria-expanded',j.classList.contains('open'));setTimeout(()=>hasG&&ScrollTrigger.refresh(),650)}));

  /* split words */
  d.querySelectorAll('.sl').forEach(el=>{
    const walk=n=>{[...n.childNodes].forEach(c=>{
      if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/);const frag=d.createDocumentFragment();
        parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){frag.appendChild(d.createTextNode(' '));return}
          const w=d.createElement('span');w.className='w';const s=d.createElement('span');s.textContent=p;w.appendChild(s);frag.appendChild(w)});
        c.replaceWith(frag)}
      else if(c.nodeType===1&&!c.classList.contains('w')&&c.tagName!=='BR'){walk(c)}})};
    walk(el);
  });

  /* loader */
  const loader=d.querySelector('.loader');
  let seen=false;try{seen=sessionStorage.getItem('pn-seen')==='1';sessionStorage.setItem('pn-seen','1')}catch(e){}
  const intro=()=>{
    if(!hasG||reduce){d.querySelectorAll('.rv').forEach(e=>{e.style.opacity=1;e.style.transform='none'});return}
    const tl=gsap.timeline();
    const h=d.querySelectorAll('.intro .sl .w>span');
    tl.from(h,{yPercent:110,duration:1.1,ease:'expo.out',stagger:.045},0);
    const sph=d.querySelector('.sphere');
    if(sph) tl.from(sph,{scale:.2,opacity:0,duration:1.6,ease:'expo.out'},0);
    tl.from('.chip',{y:40,opacity:0,duration:1,ease:'expo.out',stagger:.12},.5);
    tl.to('.intro .rv',{opacity:1,y:0,duration:1,ease:'expo.out',stagger:.08},.35);
  };
  if(loader&&hasG&&!reduce&&!seen){
    const i=loader.querySelector('i');
    gsap.timeline({onComplete:()=>loader.remove()})
      .to(i,{scale:1,duration:.55,ease:'back.out(2)'})
      .to(i,{scale:40,duration:.75,ease:'expo.in'},'+=.1')
      .set(loader,{background:'transparent'})
      .to(i,{opacity:0,duration:.45,ease:'power2.out'})
      .add(intro,'-=.5');
  }else{if(loader)loader.remove();intro()}

  if(!hasG||reduce) return;

  /* reveals */
  gsap.utils.toArray('.rv').forEach(el=>{if(el.closest('.intro'))return;
    gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}})});
  gsap.utils.toArray('.sl').forEach(el=>{if(el.closest('.intro'))return;
    gsap.from(el.querySelectorAll('.w>span'),{yPercent:110,duration:1.1,ease:'expo.out',stagger:.035,scrollTrigger:{trigger:el,start:'top 86%'}})});

  /* hero parallax */
  const sph=d.querySelector('.hero .sphere');
  if(sph){
    gsap.to(sph,{yPercent:22,scale:.86,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    const chips=d.querySelectorAll('.chip');
    window.addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
      gsap.to(sph,{x:x*-24,duration:1.2,ease:'power3.out'});
      chips.forEach((c,k)=>gsap.to(c,{x:x*(30+k*18),y:y*(24+k*14),duration:1.2,ease:'power3.out'}))});
  }
  /* chart bars */
  gsap.utils.toArray('.chart').forEach(c=>gsap.from(c.children,{scaleY:0,duration:1.2,ease:'expo.out',stagger:.05,scrollTrigger:{trigger:c,start:'top 90%'}}));
  gsap.utils.toArray('.stock .b i').forEach(b=>gsap.from(b,{width:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:b,start:'top 92%'}}));

  /* counters */
  gsap.utils.toArray('[data-count]').forEach(el=>{
    const end=parseFloat(el.dataset.count),o={v:0};
    gsap.to(o,{v:end,duration:2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'},onUpdate:()=>{el.firstChild.textContent=Math.round(o.v).toLocaleString('sl-SI')}});
  });

  /* photo parallax */
  gsap.utils.toArray('.photo img').forEach(img=>gsap.fromTo(img,{yPercent:-8},{yPercent:0,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));

  /* trust word */
  const tw=d.querySelector('.trust .word');
  if(tw) gsap.fromTo(tw,{xPercent:6},{xPercent:-14,ease:'none',scrollTrigger:{trigger:tw,start:'top bottom',end:'bottom top',scrub:true}});

  /* documentbox story */
  const st=d.querySelector('.story');
  if(st){
    const steps=st.querySelectorAll('.step'),bars=st.querySelectorAll('.prog i b'),fs=st.querySelectorAll('.inv .f'),led=st.querySelector('.ledger'),rws=st.querySelectorAll('.ledger .rw'),scan=st.querySelector('.story .scanl'),inv=st.querySelector('.story .inv');
    const tl=gsap.timeline({scrollTrigger:{trigger:st,start:'top top',end:'+=260%',pin:'.pin',scrub:.8,
      onUpdate:s=>{const p=s.progress*3.3;fs.forEach((f,k)=>f.classList.toggle('on',p>1.2+k*.14&&p<2.25))}}});
    tl.to(bars[0],{scaleX:1,duration:1},0)
      .fromTo(scan,{top:'4%',opacity:1},{top:'96%',duration:1,ease:'none'},0)
      .to(scan,{opacity:0,duration:.1},1)
      .to(steps[0],{opacity:0,y:-30,duration:.3},1)
      .fromTo(steps[1],{opacity:0,y:30},{opacity:1,y:0,duration:.3},1.15);
    tl.to(bars[1],{scaleX:1,duration:1},1.1)
      .to(steps[1],{opacity:0,y:-30,duration:.3},2.2)
      .fromTo(steps[2],{opacity:0,y:30},{opacity:1,y:0,duration:.3},2.35)
      .to(inv,{xPercent:-22,rotate:-4,scale:.92,duration:.8,ease:'power2.inOut'},2.2)
      .fromTo(led,{opacity:0,y:60},{opacity:1,y:0,duration:.6,ease:'power3.out'},2.4)
      .from(rws,{opacity:0,x:30,stagger:.12,duration:.3},2.6)
      .to(bars[2],{scaleX:1,duration:.9},2.3);
  }
  window.addEventListener('load',()=>ScrollTrigger.refresh());
})();
