window.gmcT=window.gmcT||function(k){return (window.GMC&&GMC.t&&GMC.t[k])||'';};
/* GMC Theme store-wide scripts (original code) */
(function(){
  if(document.body.classList.contains('gmc-anim')&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('gmc-in');io.unobserve(e.target);}});},{threshold:.08});
    document.querySelectorAll('.shopify-section').forEach(function(s){io.observe(s);});
    /* safety net: never leave content hidden */
    setTimeout(function(){document.querySelectorAll('.shopify-section:not(.gmc-in)').forEach(function(s){s.classList.add('gmc-in');});},2500);
  } else { document.querySelectorAll('.shopify-section').forEach(function(s){s.classList.add('gmc-in');}); }
})();

/* ---- variant swatches ---- */
(function(){
  if(!window.GMC||GMC.variant==='default')return;
  function init(root){
    (root||document).querySelectorAll('variant-selects fieldset, variant-radios fieldset').forEach(function(fs){
      var lg=fs.querySelector('legend');if(!lg||!/colou?r|swatch/i.test(lg.textContent))return;
      fs.querySelectorAll('input[type=radio]+label').forEach(function(l){
        var c=l.textContent.trim().toLowerCase().replace(/\s+/g,'');
        if(window.CSS&&CSS.supports('color',c)){l.classList.add('gmc-swatch');l.style.setProperty('--gmc-sw',c);l.title=l.textContent.trim();}
      });
    });
  }
  init();document.addEventListener('shopify:section:load',function(e){init(e.target);});
  new MutationObserver(function(){init();}).observe(document.body,{childList:true,subtree:true});
})();
/* ---- sticky header shadow ---- */
(function(){var h=document.querySelector('.section-header');if(!h)return;
  addEventListener('scroll',function(){h.classList.toggle('gmc-scrolled',scrollY>10);},{passive:true});})();
/* ---- mega menu promo ---- */
(function(){var m=window.GMC&&GMC.mega;if(!m||!m.img)return;
  document.querySelectorAll('.mega-menu__content .mega-menu__list').forEach(function(ul){
    if(ul.querySelector('.gmc-mega-promo'))return;
    var li=document.createElement('li'),a=document.createElement('a');a.className='gmc-mega-promo';a.href=m.link||'#';
    var im=document.createElement('img');im.src=m.img;im.alt='';im.loading='lazy';a.appendChild(im);
    if(m.head){var sp=document.createElement('span');sp.textContent=m.head;a.appendChild(sp);}
    li.appendChild(a);ul.appendChild(li);
  });})();
/* ---- product image zoom ---- */
(function(){
  var Z=window.GMC&&GMC.zoom;if(!Z||Z==='none')return;
  var lvl=(GMC.zoomLevel||220)/100,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  function lightbox(src){var d=document.createElement('div');d.className='gmc-lb';d.innerHTML='<img alt="">';d.firstChild.src=src;
    function c(){d.remove();document.removeEventListener('keydown',k);}function k(e){if(e.key==='Escape')c();}
    d.addEventListener('click',c);document.addEventListener('keydown',k);document.body.appendChild(d);}
  function big(img){var ss=img.getAttribute('srcset');if(ss){var parts=ss.split(',').map(function(x){return x.trim().split(' ');});return parts[parts.length-1][0];}return img.src;}
  function setup(img){
    if(img.dataset.gmcZ)return;img.dataset.gmcZ=1;
    var box=img.closest('.product__media, .media')||img.parentNode;
    if(Z==='lightbox'){box.style.cursor='zoom-in';box.addEventListener('click',function(e){if(!e.target.closest('button,a'))lightbox(big(img));},true);return;}
    if(!fine)return;
    box.classList.add('gmc-zoomwrap');
    if(Z==='pan'){
      box.addEventListener('mousemove',function(e){var r=box.getBoundingClientRect();img.style.transformOrigin=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%';img.style.transform='scale('+lvl+')';});
      box.addEventListener('mouseleave',function(){img.style.transform='';});
    } else if(Z==='lens'){
      var lens=document.createElement('div');lens.className='gmc-lens';box.appendChild(lens);
      box.addEventListener('mouseenter',function(){lens.style.backgroundImage='url("'+big(img)+'")';lens.style.display='block';});
      box.addEventListener('mouseleave',function(){lens.style.display='none';});
      box.addEventListener('mousemove',function(e){var r=box.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,s=lens.offsetWidth/2;
        lens.style.left=(x-s)+'px';lens.style.top=(y-s)+'px';lens.style.backgroundSize=(r.width*lvl)+'px '+(r.height*lvl)+'px';
        lens.style.backgroundPosition=(-(x*lvl-s))+'px '+(-(y*lvl-s))+'px';});
    }
  }
  function scan(){document.querySelectorAll('.product__media img, .product-media-container img').forEach(setup);}
  scan();document.addEventListener('shopify:section:load',scan);new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();

/* ---- cart: upsell add + free gift automation ---- */
(function(){
  var refreshing=false;
  function refresh(){
    return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(secs){
      var cd=document.querySelector('cart-drawer');
      if(cd&&cd.renderContents){cd.renderContents({sections:secs});}
      else if(document.querySelector('cart-items')){location.reload();}
    });
  }
  function add(items){return fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})}).then(function(r){return r.json();});}
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-gmc-upsell]');if(!b)return;e.preventDefault();b.disabled=true;
    add([{id:+b.dataset.gmcUpsell,quantity:1}]).then(refresh).then(syncGift);
  });
  function syncGift(){
    var gid=window.GMC&&+GMC.giftVariant;if(!gid||refreshing)return;
    fetch('/cart.js').then(function(r){return r.json();}).then(function(c){
      var th=+GMC.giftThreshold;(GMC.giftMap||'').split(/[\n,]/).forEach(function(x){var kv=x.split(':');if(kv.length===2&&kv[0].trim().toUpperCase()===c.currency)th=+kv[1];});if(!th)return;
      var gl=c.items.find(function(i){return i.variant_id===gid&&i.properties&&i.properties._gmc_gift;});
      var paid=c.total_price-(gl?gl.final_line_price:0),ok=paid>=th*100;
      if(ok&&!gl){refreshing=true;add([{id:gid,quantity:1,properties:{_gmc_gift:'true'}}]).then(refresh).finally(function(){refreshing=false;});}
      else if(!ok&&gl){refreshing=true;fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:gl.key,quantity:0})}).then(refresh).finally(function(){refreshing=false;});}
    });
  }
  syncGift();
  gmcWhenPubsub(function(){subscribe(PUB_SUB_EVENTS.cartUpdate,function(){setTimeout(syncGift,400);});});
})();

/* ---- helper: write a field into the main product form (used by custom fields, subscriptions) ---- */
window.gmcField=function(name,value){
  document.querySelectorAll('form[action*="/cart/add"]').forEach(function(f){
    var i=f.querySelector('input[data-gmc-field="'+name+'"]');
    if(value===''||value==null){if(i)i.remove();return;}
    if(!i){i=document.createElement('input');i.type='hidden';i.name=name;i.setAttribute('data-gmc-field',name);f.appendChild(i);}
    i.value=value;
  });
};
document.addEventListener('input',function(e){var t=e.target;if(t&&t.matches&&t.matches('[data-gmc-prop]')){gmcField(t.dataset.gmcProp,t.value);}});

/* ---- icon sprite (Tabler Icons, MIT): fetched once, cached by the browser ---- */
(function(){
  if(!window.GMC||!GMC.iconSprite||!document.querySelector('.gmc-icon'))return;
  fetch(GMC.iconSprite).then(function(r){return r.text();}).then(function(t){
    var d=document.createElement('div');d.style.display='none';d.setAttribute('aria-hidden','true');d.innerHTML=t;document.body.insertBefore(d,document.body.firstChild);
  }).catch(function(){});
})();

/* ---- highlighted text: ==word== inside headings becomes a highlight ---- */
(function(){
  function hl(root){(root||document).querySelectorAll('h1,h2,h3,.rte p,.banner__heading').forEach(function(el){
    if(el.dataset.gmcH||el.textContent.indexOf('==')<0||el.children.length>3)return;el.dataset.gmcH=1;
    el.innerHTML=el.innerHTML.replace(/==(.+?)==/g,'<mark class="gmc-hl" style="color:inherit">$1</mark>');});}
  hl();document.addEventListener('shopify:section:load',function(e){hl(e.target);});
})();

/* ---- product page interactions: add-ons, discount code, popups, scroll-to, tabs, timers, dynamic savings ---- */
(function(){
  function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
  /* add-ons (complimentary, upsells, quantity-break gifts) are queued on submit and added only after Shopify confirms the main add */
  window.gmcQueue=[];window.gmcUnits=[];window.gmcQueueAddon=function(id){id=+id;if(id&&gmcQueue.indexOf(id)<0)gmcQueue.push(id);};window.gmcQueueUnit=function(id){id=+id;if(id)gmcUnits.push(id);};
  function flush(){
    if(!(gmcQueue.length||gmcUnits.length)||!gmcOnce('flush',1500))return;
    var items=gmcQueue.map(function(id){return {id:id,quantity:1,properties:{_gmc_gift:'true'}};}).concat(gmcUnits.map(function(id){return {id:id,quantity:1};}));gmcQueue=[];gmcUnits=[];
    window.gmcPending=fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})}).then(function(r){return r.ok?r.json():null;}).then(function(){
      return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(sec){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents)cd.renderContents({sections:sec});});}).catch(function(){});
  }
  document.addEventListener('submit',function(e){
    var f=e.target;if(!f.matches||!f.matches('form[action*="/cart/add"]'))return;
    gmcQueue=[];gmcUnits=[];qa('[data-gmc-addon]').forEach(function(el){var on=el.type==='checkbox'?el.checked:true;if(on)gmcQueueAddon(el.dataset.gmcAddon);});qa('[data-gmc-unitadd]').forEach(function(el){if(el.checked&&!el.disabled)gmcQueueUnit(el.dataset.gmcUnitadd);});qa('.gmc-qg[data-state=open]').forEach(function(el){gmcQueueAddon(el.dataset.gmcQgift);});
    /* the quantity-break gift listener runs after this one in the same event, so flush on the next tick when no cart UI will announce success */
    setTimeout(function(){if(!document.querySelector('cart-drawer, cart-notification'))flush();},0);
  },true);
  gmcWhenPubsub(function(){
    subscribe(PUB_SUB_EVENTS.cartUpdate,function(ev){if(ev&&ev.source==='product-form')flush();});
  });
  document.addEventListener('click',function(e){
    var c=e.target.closest('[data-gmc-code]');
    if(c){var code=c.dataset.gmcCode;try{navigator.clipboard.writeText(code);}catch(x){}
      fetch('/discount/'+encodeURIComponent(code)).then(function(){gmcCodeOn(c,true);try{sessionStorage.setItem('gmc_code_'+code,'1');}catch(x){}});}
    var o=e.target.closest('[data-gmc-open]');if(o){var d=document.getElementById(o.dataset.gmcOpen);if(d&&d.showModal)d.showModal();}
    var sc=e.target.closest('[data-gmc-scroll]');if(sc){var t=null;try{t=document.querySelector(sc.dataset.gmcScroll);}catch(x){}if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}
    var tb=e.target.closest('.gmc-pe__tn button');if(tb){var w=tb.closest('.gmc-pe__tabs');qa('.gmc-pe__tn button',w).forEach(function(b){b.setAttribute('aria-selected',b===tb);});qa('.gmc-pe__tp',w).forEach(function(p){p.hidden=p.dataset.t!==tb.dataset.t;});}
  });
  /* countdown blocks (restarts per visitor) */
  qa('.gmc-pe__cd').forEach(function(el){
    var k='gmc_pecd_'+el.dataset.key,end;try{end=+localStorage.getItem(k);if(!end||Date.now()>end){end=Date.now()+(+el.dataset.minutes)*60000;localStorage.setItem(k,end);}}catch(x){end=Date.now()+(+el.dataset.minutes)*60000;}
    var out=el.querySelector('.gmc-pe__cdt');function t(){var s=Math.max(0,Math.floor((end-Date.now())/1000));var h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60,P=function(n){return String(n).padStart(2,'0');};out.textContent=(h?P(h)+':':'')+(el.dataset.seconds==='false'?P(m)+(h?'':' min'):P(m)+':'+P(sec));}t();setInterval(t,1000);
  });
  /* dynamic savings on variant change */
  gmcWhenPubsub(function(){
    subscribe(PUB_SUB_EVENTS.variantChange,function(ev){
      var v=ev&&ev.data&&ev.data.variant;if(!v)return;
      qa('.gmc-pe__sv').forEach(function(p){
        if(v.compare_at_price&&v.compare_at_price>v.price){var d=v.compare_at_price-v.price,pct=Math.round(d/v.compare_at_price*100);
          var m=new Intl.NumberFormat(undefined,{style:'currency',currency:GMC.money}).format(d/100);p.textContent=p.dataset.text+' '+m+' ('+pct+'%)';p.hidden=false;}else{p.hidden=true;}
      });
    });
  });
})();
/* ---- price inside the add-to-cart button + quantity next to it ---- */
(function(){
  if(!window.GMC)return;
  function run(){
    qa('product-form button[type=submit][name=add]').forEach(function(b){if(!(GMC.priceInBtn||(b.closest('product-form')&&b.closest('product-form').dataset.gmcPrice)))return;
      var info=b.closest('.product__info-container')||document;var pr=info.querySelector('.price-item--last, .price-item--sale, .price-item--regular');
      var span=b.querySelector('span');if(!span||!pr||b.disabled)return;
      var base=b.dataset.gmcBase||span.textContent.split('—')[0].trim();b.dataset.gmcBase=base;var txt=base+' — '+pr.textContent.trim();if(span.textContent!==txt)span.textContent=txt;});
    if(GMC.qtyInline){qa('product-form').forEach(function(pf){
      var info=pf.closest('.product__info-container')||document;var q=info.querySelector('.product-form__quantity');var btns=pf.querySelector('.product-form__buttons');
      if(q&&btns&&q.parentNode!==btns){btns.style.display='flex';btns.style.flexWrap='wrap';btns.style.gap='1rem';btns.style.alignItems='stretch';btns.insertBefore(q,btns.firstChild);q.style.margin='0';}});}
  }
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true,characterData:true});
})();

/* ---- cart: reservation timer, policy checkbox gate, toggle upsell ---- */
(function(){
  function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  var endKey='gmc_cart_end';
  function timer(){qa('.gmc-cart-timer').forEach(function(el){
    var end;try{end=+sessionStorage.getItem(endKey);if(!end||Date.now()>end){end=Date.now()+(+el.dataset.min)*60000;sessionStorage.setItem(endKey,end);}}catch(e){end=Date.now()+(+el.dataset.min)*60000;}
    var t=el.querySelector('.gmc-cart-timer__t');var s=Math.max(0,Math.floor((end-Date.now())/1000));t.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');});}
  function policy(){if(!(window.GMC&&GMC.policy))return;var cb=document.querySelector('.gmc-policy__cb');
    qa('button[name=checkout]').forEach(function(b){if(cb){b.disabled=!cb.checked;}});}
  document.addEventListener('change',function(e){
    if(e.target.matches&&e.target.matches('.gmc-policy__cb'))policy();
    var tg=e.target.closest&&e.target.closest('[data-gmc-toggle]');
    if(tg){var id=+tg.dataset.gmcToggle;tg.disabled=true;
      if(tg.checked){fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:id,quantity:1}]})}).then(refresh);}
      else{try{sessionStorage.setItem('gmc_tog_off','1');}catch(x){}fetch('/cart.js').then(function(r){return r.json();}).then(function(c){var l=c.items.find(function(i){return i.variant_id===id;});if(l)return fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:l.key,quantity:0})});}).then(refresh);}
    }
  });
  function refresh(){return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(secs){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents)cd.renderContents({sections:secs});else location.reload();});}
  function pre(){var t=document.querySelector('[data-gmc-toggle][data-pre="true"]');if(t&&!t.checked){var off=false;try{off=sessionStorage.getItem('gmc_tog_off');}catch(x){}if(!off){t.checked=true;t.dispatchEvent(new Event('change',{bubbles:true}));}}}
  setInterval(timer,1000);timer();
  new MutationObserver(function(){policy();pre();}).observe(document.body,{childList:true,subtree:true});policy();pre();
})();

/* ---- security: deter copying (off in theme editor) ---- */
(function(){
  if(!(window.GMC&&GMC.security)||(window.Shopify&&Shopify.designMode))return;
  var ok=function(t){return t&&t.closest&&t.closest('input,textarea,select,[contenteditable]');};
  document.addEventListener('contextmenu',function(e){if(!ok(e.target))e.preventDefault();});
  ['copy','cut','dragstart','selectstart'].forEach(function(ev){document.addEventListener(ev,function(e){if(!ok(e.target))e.preventDefault();});});
  document.addEventListener('keydown',function(e){var k=e.key&&e.key.toLowerCase();
    if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&'ijc'.indexOf(k)>-1)||(e.metaKey&&e.altKey&&'ijc'.indexOf(k)>-1)||((e.ctrlKey||e.metaKey)&&(k==='u'||k==='s'))){e.preventDefault();}});
  var st=document.createElement('style');st.textContent='img{-webkit-user-drag:none;user-select:none}body{-webkit-user-select:none;user-select:none}input,textarea{user-select:text}';document.head.appendChild(st);
})();

/* ---- duplicate-submission guard shared helper ---- */
(function(){var last={};window.gmcOnce=function(key,ms){var n=Date.now();if(last[key]&&n-last[key]<ms)return false;last[key]=n;return true;};})();

/* ---- cart discount code field: reports real status, never claims more than Shopify confirms ---- */
(function(){
  document.addEventListener('click',function(e){
    var b=e.target.closest('#gmc-disc-btn');if(!b)return;
    var inp=document.getElementById('gmc-disc-in'),msg=document.getElementById('gmc-disc-msg'),code=(inp.value||'').trim();
    if(!code){msg.textContent=gmcT('disc_enter');return;}
    if(b.disabled)return;b.disabled=true;msg.textContent=gmcT('disc_checking');
    fetch('/cart/update.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({discount:code})})
      .then(function(r){return r.ok?r.json():Promise.reject(new Error('http '+r.status));})
      .then(function(cart){
        var list=cart.discount_codes;var hit=Array.isArray(list)&&list.find(function(d){return (d.code||'').toLowerCase()===code.toLowerCase();});
        if(hit&&hit.applicable){msg.textContent=gmcT('disc_applied');return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(s){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents)cd.renderContents({sections:s});});}
        if(hit&&!hit.applicable){msg.textContent=gmcT('disc_not_applicable');return;}
        if(Array.isArray(list)){msg.textContent=gmcT('disc_failed');return;}
        return fetch('/discount/'+encodeURIComponent(code)).then(function(){msg.textContent=gmcT('disc_saved');});
      })
      .catch(function(){msg.textContent=gmcT('disc_check_failed');})
      .finally(function(){b.disabled=false;});
  });
})();

/* ---- navigation: [badge] suffix in a menu label becomes a small badge, e.g. "Sale [HOT]" ---- */
(function(){
  if(window.GMC&&GMC.accent)document.documentElement.style.setProperty('--gmc-accent',GMC.accent);
  function run(root){(root||document).querySelectorAll('header a, .header a, .menu-drawer a, footer a').forEach(function(a){
    if(a.dataset.gmcB)return;var t=a.firstChild&&a.childNodes.length<=3?a.textContent:'';
    var m=/\s*\[([^\]]{1,12})\]\s*$/.exec(a.textContent);if(!m)return;a.dataset.gmcB=1;
    var walker=document.createTreeWalker(a,NodeFilter.SHOW_TEXT),n,last=null;while((n=walker.nextNode())){if(/\[[^\]]{1,12}\]\s*$/.test(n.nodeValue))last=n;}
    if(last){last.nodeValue=last.nodeValue.replace(/\s*\[[^\]]{1,12}\]\s*$/,'');var b=document.createElement('span');b.className='gmc-nav-badge';b.textContent=m[1];last.parentNode.insertBefore(b,last.nextSibling);}
  });}
  run();document.addEventListener('shopify:section:load',function(e){run(e.target);});
})();

;(function(){
  function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
  function init(){

  /* section add-to-cart buttons: move to the end of their section and add via the Ajax cart */
  qa('[data-gmc-sec-atc]').forEach(function(box){
    var sec=box.closest('.shopify-section');if(sec&&box.parentNode===sec)sec.appendChild(box);
    var f=box.querySelector('form'),msg=box.querySelector('.gmc-sec-atc__m');
    f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('button');btn.disabled=true;
      fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:+f.elements.id.value,quantity:1})})
      .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.description||gmcT('add_failed'));return j;});})
      .then(function(){if(box.dataset.skip==='true'){location.href='/checkout';return null;}return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();});})
      .then(function(sec2){if(!sec2)return;var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents){cd.renderContents({sections:sec2});}else{location.href='/cart';}})
      .catch(function(err){msg.textContent=err.message;}).then(function(){btn.disabled=false;});});
  });
  /* slider autoplay on any section that has one */
  qa('[data-gmc-autoplay]').forEach(function(m){
    var sec=m.closest('.shopify-section'),secs=+m.dataset.gmcAutoplay*1000;if(!sec||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var paused=false,visible=true;sec.addEventListener('mouseenter',function(){paused=true;});sec.addEventListener('mouseleave',function(){paused=false;});sec.addEventListener('focusin',function(){paused=true;});sec.addEventListener('focusout',function(){paused=false;});
    if('IntersectionObserver' in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting;}).observe(sec);
    setInterval(function(){if(paused||!visible||document.hidden)return;
      qa('.slider',sec).forEach(function(sl){if(sl.scrollWidth<=sl.clientWidth+2)return;var end=sl.scrollLeft+sl.clientWidth>=sl.scrollWidth-4;var item=sl.querySelector('li,.slider__slide,*');var step=item?item.getBoundingClientRect().width+8:sl.clientWidth;sl.scrollTo({left:end?0:sl.scrollLeft+step,behavior:'smooth'});});},secs);
  });

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* custom product field validation: blocks the add-to-cart (main button and sticky bar) until required fields are filled */
(function(){
  function val(w){var t=w.dataset.type;if(t==='pills'){var r=w.querySelector('input:checked');return r?r.value:'';}var el=w.querySelector('input,select,textarea');return el?String(el.value).trim():'';}
  function check(w){var v=val(w),err=w.querySelector('.gmc-pe__cferr'),bad=false,msg=w.dataset.error;
    if(w.dataset.required==='true'&&v==='')bad=true;
    if(!bad&&w.dataset.type==='number'&&v!==''){var el=w.querySelector('input'),n=+v;if((el.min!==''&&n<+el.min)||(el.max!==''&&n>+el.max)){bad=true;msg=(el.min!==''?'Min '+el.min:'')+(el.min!==''&&el.max!==''?' – ':'')+(el.max!==''?'Max '+el.max:'');}}
    w.toggleAttribute('data-invalid',bad);err.hidden=!bad;err.textContent=bad?msg:'';return !bad;}
  document.addEventListener('submit',function(e){var f=e.target;if(!f.matches||!f.matches('form[action*="/cart/add"]'))return;
    var first=null;document.querySelectorAll('[data-gmc-cf]').forEach(function(w){if(!check(w)&&!first)first=w;});
    if(first){e.preventDefault();e.stopImmediatePropagation();first.scrollIntoView({behavior:'smooth',block:'center'});var i=first.querySelector('input,select,textarea');if(i&&i.type!=='radio')i.focus({preventScroll:true});}
  },true);
  document.addEventListener('change',function(e){var w=e.target.closest&&e.target.closest('[data-gmc-cf]');if(w&&w.hasAttribute('data-invalid'))check(w);});
})();

/* per-option variant picker types: forced colour swatches and variant images */
(function(){
  function parse(txt){var m={};String(txt||'').split(/\n|,/).forEach(function(l){var i=l.indexOf(':');if(i>0)m[l.slice(0,i).trim().toLowerCase()]=l.slice(i+1).trim();});return m;}
  function init(root){(root||document).querySelectorAll('fieldset[data-gmc-force]').forEach(function(fs){
    var mode=fs.dataset.gmcForce,colors=parse(fs.dataset.gmcColors),imgs={};try{imgs=JSON.parse(fs.dataset.gmcImages||'{}');}catch(e){}
    fs.querySelectorAll('input[type=radio]').forEach(function(inp){var l=inp.nextElementSibling;if(!l||l.tagName!=='LABEL')return;var v=inp.value;
      if(mode==='swatch'){var c=colors[v.toLowerCase()]||v.toLowerCase().replace(/\s+/g,'');if(window.CSS&&CSS.supports('color',c)){l.classList.add('gmc-swatch');l.style.setProperty('--gmc-sw',c);l.title=v;}}
      else if(mode==='cards'){l.classList.add('gmc-vcard');if(!l.querySelector('.gmc-vcard__p')&&imgs[v]){var sp=document.createElement('span');sp.className='gmc-vcard__p';sp.textContent=imgs[v];l.appendChild(sp);}}
      else if(mode==='image'&&imgs[v]){l.classList.add('gmc-imgsw');l.style.setProperty('--gmc-img','url("'+imgs[v]+'")');l.title=v;}
    });});}
  init();document.addEventListener('shopify:section:load',function(e){init(e.target);});
  new MutationObserver(function(){init();}).observe(document.body,{childList:true,subtree:true});
})();

/* buy button option: skip the cart and go straight to checkout once the add (and any queued add-ons) finished */
gmcWhenPubsub(function(){subscribe(PUB_SUB_EVENTS.cartUpdate,function(ev){
  if(!ev||ev.source!=='product-form'||!document.querySelector('product-form[data-gmc-skip]'))return;
  setTimeout(function(){Promise.resolve(window.gmcPending).catch(function(){}).then(function(){window.location.href=(window.routes&&routes.root_url?routes.root_url.replace(/\/$/,''):'')+'/checkout';});},60);
});});

/* multi upsells: variant dropdown updates the add-on variant and the displayed price */
document.addEventListener('change',function(e){var s=e.target;if(!s.matches||!s.matches('.gmc-ups__var'))return;
  var it=s.closest('.gmc-ups__item'),o=s.options[s.selectedIndex],p=+o.dataset.price,t=it.dataset.dtype,n=p;
  if(t==='percent')n=Math.round(p*(100-(+it.dataset.dpct||0))/100);else if(t==='fixed')n=Math.max(0,p-(+it.dataset.dfix||0));
  var inp=it.querySelector('.gmc-ups__in');inp.dataset.gmcUnitadd=s.value;inp.disabled=o.disabled;
  var now=it.querySelector('[data-ups-now]'),old=it.querySelector('.gmc-ups__price s');now.textContent=gmcMoney(n);
  if(n<p){if(!old){old=document.createElement('s');now.parentNode.insertBefore(old,now);now.parentNode.insertBefore(document.createTextNode(' '),now);}old.textContent=gmcMoney(p);}else if(old)old.remove();});


/* bundle offer block: totals, savings line and add-all-to-cart */
(function(){
  function calc(b){var tot=0,items=[];b.querySelectorAll('.gmc-bnd__item').forEach(function(it){var v=it.querySelector('.gmc-bnd__var'),o=v.tagName==='SELECT'?v.options[v.selectedIndex]:v,p=+o.dataset.price;tot+=p;items.push({id:+v.value,p:p,el:it,dis:!!o.disabled});});
    var t=b.dataset.dtype,sv=0;if(t==='percent')sv=Math.round(tot*(+b.dataset.dpct||0)/100);else if(t==='fixed')sv=Math.min(tot,+b.dataset.dfix||0);
    return {tot:tot,sv:sv,items:items};}
  function render(b){var c=calc(b),pct=c.tot?(c.tot-c.sv)/c.tot:1;
    c.items.forEach(function(x){var el=x.el.querySelector('[data-bnd-price]');el.innerHTML=(c.sv>0?'<s>'+gmcMoney(x.p)+'</s> ':'')+'<b>'+gmcMoney(Math.round(x.p*pct))+'</b>';});
    b.querySelector('[data-bnd-total]').textContent=gmcMoney(c.tot-c.sv);
    var s=b.querySelector('[data-bnd-save]');s.hidden=!(c.sv>0);s.textContent=(b.dataset.save||'').replace('[saved]',gmcMoney(c.sv));
    b.querySelector('.gmc-bnd__btn').disabled=c.items.some(function(x){return x.dis;});}
  function init(){document.querySelectorAll('.gmc-bnd').forEach(function(b){if(b.dataset.ready)return;b.dataset.ready=1;render(b);});}
  init();document.addEventListener('shopify:section:load',init);
  document.addEventListener('change',function(e){var b=e.target.closest&&e.target.closest('.gmc-bnd');if(b&&e.target.matches('.gmc-bnd__var'))render(b);});
  gmcWhenPubsub(function(){subscribe(PUB_SUB_EVENTS.variantChange,function(ev){var v=ev&&ev.data&&ev.data.variant;if(!v)return;document.querySelectorAll('.gmc-bnd [data-main] select.gmc-bnd__var').forEach(function(s){s.value=v.id;render(s.closest('.gmc-bnd'));});});});
  document.addEventListener('click',function(e){var btn=e.target.closest&&e.target.closest('.gmc-bnd__btn');if(!btn)return;var b=btn.closest('.gmc-bnd'),err=b.querySelector('.gmc-bnd__err');err.hidden=true;btn.disabled=true;
    var items=calc(b).items.map(function(x){return {id:x.id,quantity:1,properties:{_bundle:b.dataset.block}};});
    fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})}).then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.description||'Could not add the bundle');return j;});})
    .then(function(){return b.dataset.code?fetch('/discount/'+encodeURIComponent(b.dataset.code)).catch(function(){}):null;})
    .then(function(){if(b.dataset.skip==='true'){location.href='/checkout';return;}
      return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(sec){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents){cd.renderContents({sections:sec});}else{location.href=(window.GMC&&GMC.cartUrl)||'/cart';}});})
    .catch(function(x){err.textContent=x.message;err.hidden=false;}).finally(function(){btn.disabled=false;render(b);});});
})();

/* gifts on quantity: locked / unlocked state follows the chosen quantity */
(function(){
  function qty(){var c=document.querySelector('.gmc-qb input:checked');if(c)return +c.value||1;var i=document.querySelector('input[name="quantity"]');return i?(+i.value||1):1;}
  function upd(){var q=qty();document.querySelectorAll('.gmc-qg').forEach(function(g){var need=+g.dataset.need,ok=q>=need;g.dataset.state=ok?'open':'locked';
    g.querySelector('.gmc-qg__msg').textContent=ok?g.dataset.open:g.dataset.locked.replace('[need]',(need-q)+' more');g.querySelector('.gmc-qg__ic').textContent=ok?'🎁':'🔒';});}
  upd();['change','input','click'].forEach(function(ev){document.addEventListener(ev,function(e){var t=e.target;if(t&&t.closest&&(t.closest('quantity-input,.gmc-qb')||(t.name==='quantity')))setTimeout(upd,60);},true);});
  window.addEventListener('load',function(){setTimeout(upd,150);});document.addEventListener('shopify:section:load',upd);
})();

/* drawer: cart note, upsell variant picker, gift blocks that add / remove their gift as the cart total changes */
(function(){
  document.addEventListener('change',function(e){var t=e.target;if(!t.matches)return;
    if(t.matches('.gmc-cup__var')){var it=t.closest('.gmc-cup__item'),o=t.options[t.selectedIndex];it.querySelector('.gmc-cup__btn').dataset.gmcUpsell=t.value;it.querySelector('.gmc-cup__btn').disabled=o.disabled;it.querySelector('.gmc-cup__price').textContent=gmcMoney(+o.dataset.price);}
    if(t.matches('.gmc-cnote__in')){fetch('/cart/update.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({note:t.value})});}
  });
  var busy=false;
  function refresh(){return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();}).then(function(sec){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents)cd.renderContents({sections:sec});});}
  function sync(){if(busy)return;var blocks=document.querySelectorAll('.gmc-cgift');if(!blocks.length)return;
    fetch('/cart.js').then(function(r){return r.json();}).then(function(c){var add=[],rm=[];
      var want={};blocks.forEach(function(g){var id=+g.dataset.variant;if(g.dataset.state==='open')want[id]=true;else if(!want[id])want[id]=false;});
      Object.keys(want).forEach(function(k){var id=+k,line=c.items.find(function(i){return i.variant_id===id&&i.properties&&i.properties._gmc_gift;});
        if(want[k]&&!line)add.push({id:id,quantity:1,properties:{_gmc_gift:'true'}});
        if(!want[k]&&line)rm.push(line.key);});
      if(!add.length&&!rm.length)return;busy=true;
      var p=Promise.resolve();
      if(add.length)p=p.then(function(){return fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:add})});});
      rm.forEach(function(k){p=p.then(function(){return fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:k,quantity:0})});});});
      return p.then(refresh).finally(function(){busy=false;});});}
  var tm;function later(){clearTimeout(tm);tm=setTimeout(sync,500);}
  document.addEventListener('DOMContentLoaded',function(){later();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var n=ms[i].target;if(n&&n.closest&&n.closest('cart-drawer')){later();return;}}}).observe(document.body,{childList:true,subtree:true});});
  gmcWhenPubsub(function(){subscribe(PUB_SUB_EVENTS.cartUpdate,later);});
})();

/* cart drawer test mode (theme editor only) */
document.addEventListener('DOMContentLoaded',function(){var d=document.querySelector('cart-drawer[data-gmc-test]');if(d&&d.open)setTimeout(function(){d.open();},400);});

/* ---- GMC slider engine (original code): [data-gmc-slider] ----
   data-mode slide|fade, data-autoplay seconds (0 off), data-loop, data-perview / data-perview-m, data-dots, data-arrows, data-drag
   markup: .gmc-sl > .gmc-sl__vp > .gmc-sl__tr > .gmc-sl__s ...  */
(function(){
  function init(el){
    if(el.dataset.ready)return;var tr=el.querySelector('.gmc-sl__tr');if(!tr)return;el.dataset.ready='1';
    var slides=Array.prototype.slice.call(tr.children),n=slides.length,mode=el.dataset.mode==='fade'?'fade':'slide',loop=el.dataset.loop==='true',auto=+el.dataset.autoplay||0,idx=0,timer=null,paused=false,visible=true,dragged=false;
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)auto=0;
    function per(){return matchMedia('(max-width:749px)').matches?(+el.dataset.perviewM||1):(+el.dataset.perview||1);}
    function maxIdx(){return mode==='fade'?n-1:Math.max(0,n-per());}
    var dots=el.querySelector('.gmc-sl__dots'),prev,next,pp;
    if(el.dataset.dots==='true'&&n>1){if(!dots){dots=document.createElement('div');dots.className='gmc-sl__dots';el.appendChild(dots);}
      dots.innerHTML='';for(var i=0;i<=maxIdx();i++){(function(k){var b=document.createElement('button');b.type='button';b.className='gmc-sl__dot';b.setAttribute('aria-label','Go to slide '+(k+1));b.addEventListener('click',function(){go(k,true);});dots.appendChild(b);})(i);}}
    if(el.dataset.arrows==='true'&&n>1){prev=el.querySelector('.gmc-sl__a--prev');next=el.querySelector('.gmc-sl__a--next');
      if(!prev){prev=document.createElement('button');prev.type='button';prev.className='gmc-sl__a gmc-sl__a--prev';prev.setAttribute('aria-label','Previous slide');prev.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';el.appendChild(prev);}
      if(!next){next=document.createElement('button');next.type='button';next.className='gmc-sl__a gmc-sl__a--next';next.setAttribute('aria-label','Next slide');next.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';el.appendChild(next);}
      prev.addEventListener('click',function(){go(idx-1,true);});next.addEventListener('click',function(){go(idx+1,true);});}
    if(auto&&n>1){pp=document.createElement('button');pp.type='button';pp.className='gmc-sl__pp';pp.setAttribute('aria-label','Pause autoplay');pp.textContent='❚❚';pp.addEventListener('click',function(){paused=!paused;pp.textContent=paused?'▶':'❚❚';pp.setAttribute('aria-label',paused?'Start autoplay':'Pause autoplay');});el.appendChild(pp);}
    function render(){
      if(mode==='fade'){slides.forEach(function(s,k){s.classList.toggle('is-active',k===idx);s.setAttribute('aria-hidden',k===idx?'false':'true');});}
      else{var gap=parseFloat(getComputedStyle(tr).columnGap||getComputedStyle(tr).gap)||0,w=slides[0].getBoundingClientRect().width+gap;tr.style.transform='translate3d('+(-idx*w)+'px,0,0)';var p=per();slides.forEach(function(s,k){s.setAttribute('aria-hidden',(k>=idx&&k<idx+p)?'false':'true');});}
      if(dots)Array.prototype.forEach.call(dots.children,function(d,k){d.classList.toggle('is-on',k===idx);d.setAttribute('aria-current',k===idx?'true':'false');});
      if(!loop){if(prev)prev.disabled=idx<=0;if(next)next.disabled=idx>=maxIdx();}
      el.dispatchEvent(new CustomEvent('gmc:slide',{detail:{index:idx}}));
    }
    function go(i,user){var m=maxIdx();if(i>m)i=loop?0:m;if(i<0)i=loop?m:0;idx=i;render();if(user)restart();}
    function restart(){clearInterval(timer);if(auto&&n>1)timer=setInterval(function(){if(paused||!visible||document.hidden)return;go(idx+1);},auto*1000);}
    el.addEventListener('mouseenter',function(){paused=true;});el.addEventListener('mouseleave',function(){paused=pp&&pp.textContent==='▶';});
    el.addEventListener('focusin',function(){paused=true;});el.addEventListener('focusout',function(){paused=pp&&pp.textContent==='▶';});
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){visible=e[0].isIntersecting;}).observe(el);
    el.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(idx-1,true);else if(e.key==='ArrowRight')go(idx+1,true);});
    if(el.dataset.drag!=='false'&&n>1){var vp=el.querySelector('.gmc-sl__vp')||el,sx=0,sy=0,down=false;
      vp.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;if(e.target.closest('button,a,video,input,select'))return;down=true;dragged=false;sx=e.clientX;sy=e.clientY;});
      window.addEventListener('pointerup',function(e){if(!down)return;down=false;var dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){dragged=true;go(dx<0?idx+1:idx-1,true);}});
      vp.addEventListener('click',function(e){if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);}
    var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(idx>maxIdx())idx=maxIdx();render();},120);});
    render();restart();
  }
  function scan(root){(root||document).querySelectorAll('[data-gmc-slider]').forEach(init);}
  scan();document.addEventListener('shopify:section:load',function(e){scan(e.target);});
  window.gmcSliderScan=scan;
})();

/* estimated delivery and shipping checkpoints: real dates from day ranges */
(function(){
  var DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function names(csv,def,n){var a=String(csv||'').split(',').map(function(x){return x.trim();}).filter(Boolean);return a.length===n?a:def;}
  function add(d,n,skip){var r=new Date(d.getFullYear(),d.getMonth(),d.getDate());n=+n||0;while(n>0){r.setDate(r.getDate()+1);if(!skip||(r.getDay()!==0&&r.getDay()!==6))n--;}return r;}
  function fmt(d,f,dn,mn){var D=dn[d.getDay()],M=mn[d.getMonth()],dd=d.getDate(),yy=d.getFullYear();
    switch(f){case 'long':return D+', '+M+' '+dd;case 'day_month':return dd+' '+M.slice(0,3);case 'month_day':return M.slice(0,3)+' '+dd;case 'dmy':return ('0'+dd).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+yy;case 'mdy':return ('0'+(d.getMonth()+1)).slice(-2)+'/'+('0'+dd).slice(-2)+'/'+yy;default:return D.slice(0,3)+', '+M.slice(0,3)+' '+dd;}}
  function run(root){
    (root||document).querySelectorAll('[data-gmc-eta]').forEach(function(el){var dn=names(el.dataset.days,DN,7),mn=names(el.dataset.months,MN,12),sk=el.dataset.skip==='true',now=new Date();
      el.querySelector('.gmc-pe__eta-t').textContent=el.dataset.tpl.split('[start_date]').join(fmt(add(now,el.dataset.min,sk),el.dataset.fmt,dn,mn)).split('[end_date]').join(fmt(add(now,el.dataset.max,sk),el.dataset.fmt,dn,mn));});
    (root||document).querySelectorAll('[data-gmc-cp]').forEach(function(ol){var dn=names(ol.dataset.days,DN,7),mn=names(ol.dataset.months,MN,12),sk=ol.dataset.skip==='true',now=new Date();
      ol.querySelectorAll('li').forEach(function(li){var a=fmt(add(now,li.dataset.from,sk),ol.dataset.fmt,dn,mn),b=fmt(add(now,li.dataset.to,sk),ol.dataset.fmt,dn,mn);li.querySelector('.gmc-pe__cpd').textContent=li.dataset.tpl.split('[start_date]').join(a).split('[end_date]').join(b);});});
  }
  run();document.addEventListener('shopify:section:load',function(e){run(e.target);});
})();

/* popup dialogs (sizing chart etc.) */
(function(){
  document.addEventListener('click',function(e){var o=e.target.closest('[data-gmc-dlg]');if(o){var d=document.getElementById(o.dataset.gmcDlg);if(d&&d.showModal){d.showModal();}return;}
    var x=e.target.closest('[data-gmc-dlgx]');if(x){x.closest('dialog').close();return;}
    if(e.target.tagName==='DIALOG'&&e.target.classList.contains('gmc-dlg')){e.target.close();}});
  function t(){document.querySelectorAll('dialog.gmc-dlg[data-gmc-open]').forEach(function(d){if(!d.open&&d.showModal){d.showModal();}});}
  t();document.addEventListener('shopify:section:load',t);
})();

function gmcCodeOn(c,on){var s=c.querySelector('small');c.classList.toggle('is-on',on);if(s)s.textContent=on?c.dataset.tOn:c.dataset.tOff;var ic=c.querySelector('.gmc-cdisc__i use');if(ic&&c.dataset.iOn){if(!c._i0)c._i0=ic.getAttribute('href');ic.setAttribute('href',on?'#gmc-i-'+c.dataset.iOn:c._i0);}}
document.querySelectorAll('.gmc-cdisc').forEach(function(c){try{if(sessionStorage.getItem('gmc_code_'+c.dataset.gmcCode))gmcCodeOn(c,true);}catch(x){}});

/* product video blocks: play/pause, sound, timeline */
(function(){
  function init(root){(root||document).querySelectorAll('[data-gmc-vid]').forEach(function(w){if(w._g)return;w._g=1;var v=w.querySelector('video'),pb=w.querySelector('[data-gmc-vplay]'),sb=w.querySelector('[data-gmc-vsound]'),bar=w.querySelector('.gmc-pm__vt b');
    if(pb)pb.addEventListener('click',function(){if(v.paused){v.play();}else{v.pause();}});
    if(v&&pb){v.addEventListener('play',function(){pb.textContent='❚❚';});v.addEventListener('pause',function(){pb.textContent='▶';});}
    if(sb)sb.addEventListener('click',function(){v.muted=!v.muted;sb.textContent=v.muted?'🔇':'🔊';});
    if(bar)v.addEventListener('timeupdate',function(){bar.style.width=(v.currentTime/(v.duration||1)*100)+'%';});
    if('IntersectionObserver' in window&&v.autoplay){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){v.play().catch(function(){});}else{v.pause();}});}).observe(w);}});}
  init();document.addEventListener('shopify:section:load',function(e){init(e.target);});
})();

/* product gallery: pagination, variant-first order */
(function(){
  function init(root){(root||document).querySelectorAll('media-gallery[data-gmc-pag]').forEach(function(g){if(g._gp)return;g._gp=1;
    var ul=g.querySelector('.product__media-list'),mode=g.dataset.gmcPag;if(!ul)return;
    if(g.dataset.gmcOrder){var ord=g.dataset.gmcOrder.split(',');var items=[].slice.call(ul.children);items.sort(function(a,b){return ord.indexOf(a.dataset.mediaId)-ord.indexOf(b.dataset.mediaId);});items.forEach(function(i){ul.appendChild(i);});}
    if(mode==='none'||!mode)return;
    var n=ul.children.length;if(n<2)return;
    var bar=document.createElement('div');bar.className='gmc-pag'+(mode==='dots_overlay'?' gmc-pag--overlay':'')+(mode==='numeric'?' gmc-pag--numeric':'');
    function build(){bar.innerHTML='';if(mode==='numeric'){bar.textContent='1 / '+n;return;}for(var i=0;i<n;i++){var d=document.createElement('i');d.dataset.i=i;bar.appendChild(d);}}
    build();
    var host=ul.parentNode;if(mode==='dots_overlay'){host.style.position='relative';host.appendChild(bar);}else{host.insertAdjacentElement('afterend',bar);}
    function cur(){var w=ul.children[0]?ul.children[0].getBoundingClientRect().width:1;return Math.max(0,Math.min(n-1,Math.round(ul.scrollLeft/(w||1))));}
    function mark(){var c=cur();if(mode==='numeric'){bar.textContent=(c+1)+' / '+n;}else{[].forEach.call(bar.children,function(d,i){d.classList.toggle('on',i===c);});}}
    ul.addEventListener('scroll',mark,{passive:true});mark();
    bar.addEventListener('click',function(e){var d=e.target.closest('i');if(d){var t=ul.children[+d.dataset.i];if(t)ul.scrollTo({left:t.offsetLeft-ul.offsetLeft,behavior:'smooth'});}});
  });}
  init();document.addEventListener('shopify:section:load',function(e){init(e.target);});
})();

/* copy-to-clipboard buttons */
document.addEventListener('click',function(e){var b=e.target.closest('[data-gmc-copy]');if(!b)return;try{navigator.clipboard.writeText(b.dataset.gmcCopy);}catch(x){}var s=b.querySelector('small');if(s){var o=s.textContent;s.textContent=b.dataset.done;setTimeout(function(){s.textContent=o;},1800);}});
