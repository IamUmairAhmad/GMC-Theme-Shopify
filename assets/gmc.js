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
    gmcQueue=[];gmcUnits=[];qa('[data-gmc-addon]').forEach(function(el){var on=el.type==='checkbox'?el.checked:true;if(on)gmcQueueAddon(el.dataset.gmcAddon);});qa('[data-gmc-unitadd]').forEach(function(el){if(el.checked&&!el.disabled)gmcQueueUnit(el.dataset.gmcUnitadd);});
    /* the quantity-break gift listener runs after this one in the same event, so flush on the next tick when no cart UI will announce success */
    setTimeout(function(){if(!document.querySelector('cart-drawer, cart-notification'))flush();},0);
  },true);
  gmcWhenPubsub(function(){
    subscribe(PUB_SUB_EVENTS.cartUpdate,function(ev){if(ev&&ev.source==='product-form')flush();});
  });
  document.addEventListener('click',function(e){
    var c=e.target.closest('[data-gmc-code]');
    if(c){var code=c.dataset.gmcCode;try{navigator.clipboard.writeText(code);}catch(x){}
      fetch('/discount/'+encodeURIComponent(code)).then(function(){var s=c.querySelector('small');if(s)s.textContent=gmcT('code_saved');});}
    var o=e.target.closest('[data-gmc-open]');if(o){var d=document.getElementById(o.dataset.gmcOpen);if(d&&d.showModal)d.showModal();}
    var sc=e.target.closest('[data-gmc-scroll]');if(sc){var t=null;try{t=document.querySelector(sc.dataset.gmcScroll);}catch(x){}if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}
    var tb=e.target.closest('.gmc-pe__tn button');if(tb){var w=tb.closest('.gmc-pe__tabs');qa('.gmc-pe__tn button',w).forEach(function(b){b.setAttribute('aria-selected',b===tb);});qa('.gmc-pe__tp',w).forEach(function(p){p.hidden=p.dataset.t!==tb.dataset.t;});}
  });
  /* countdown blocks (restarts per visitor) */
  qa('.gmc-pe__cd').forEach(function(el){
    var k='gmc_pecd_'+el.dataset.key,end;try{end=+localStorage.getItem(k);if(!end||Date.now()>end){end=Date.now()+(+el.dataset.minutes)*60000;localStorage.setItem(k,end);}}catch(x){end=Date.now()+(+el.dataset.minutes)*60000;}
    var out=el.querySelector('.gmc-pe__cdt');function t(){var s=Math.max(0,Math.floor((end-Date.now())/1000));out.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}t();setInterval(t,1000);
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
      .then(function(){return fetch('/?sections=cart-drawer,cart-icon-bubble').then(function(r){return r.json();});})
      .then(function(sec2){var cd=document.querySelector('cart-drawer');if(cd&&cd.renderContents){cd.renderContents({sections:sec2});}else{location.href='/cart';}})
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
/* shared money formatter using the store's money format */
window.gmcMoney=function(c){var f=String((window.GMC&&GMC.moneyFormat)||'{{amount}}').replace(/<[^>]*>/g,''),re=/\{\{\s*(\w+)\s*\}\}/,m=f.match(re);
  function fd(n,p,t,d){n=(n/100).toFixed(p);var a=n.split('.');return a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,'$1'+t)+(a[1]?d+a[1]:'');}
  var k=m?m[1]:'amount',v;
  switch(k){case 'amount_no_decimals':v=fd(c,0,',','.');break;case 'amount_with_comma_separator':v=fd(c,2,'.',',');break;case 'amount_no_decimals_with_comma_separator':v=fd(c,0,'.',',');break;case 'amount_with_apostrophe_separator':v=fd(c,2,"'",'.');break;default:v=fd(c,2,',','.');}
  return m?f.replace(re,v):f+v;};
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
