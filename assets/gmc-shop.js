/* GMC Theme: wishlist, recently viewed and compare. Browser storage only, no app. */
(function(){
  var W='gmc_wish',R='gmc_rv',C='gmc_cmp';
  function get(k){try{return JSON.parse(localStorage.getItem(k)||'[]');}catch(e){return [];}}
  function set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function esc(s){var d=document.createElement('div');d.textContent=s==null?'':s;return d.innerHTML;}
  function fetchP(h){return fetch('/products/'+encodeURIComponent(h)+'.js').then(function(r){return r.ok?r.json():null;}).catch(function(){return null;});}
  function cardHtml(p,extra){var img=p.featured_image?'<img src="'+esc(p.featured_image.replace(/(\.[a-z]+)(\?|$)/i,'_500x$1$2'))+'" alt="'+esc(p.title)+'" loading="lazy" width="500">':'';
    return '<div class="gmc-sc"><a href="'+esc(p.url)+'" class="gmc-sc__im">'+img+'</a><a href="'+esc(p.url)+'" class="gmc-sc__t">'+esc(p.title)+'</a><div class="gmc-sc__p">'+(p.compare_at_price>p.price?'<s>'+gmcMoney(p.compare_at_price)+'</s> ':'')+gmcMoney(p.price)+'</div>'+(extra||'')+'</div>';}
  /* record viewed product */
  if(window.gmcProductHandle){var rv=get(R).filter(function(h){return h!==gmcProductHandle;});rv.unshift(gmcProductHandle);set(R,rv.slice(0,20));}
  /* wishlist + compare buttons on cards */
  function sync(){var w=get(W),c=get(C);
    document.querySelectorAll('[data-gmc-wish]').forEach(function(b){var on=w.indexOf(b.dataset.gmcWish)>-1;b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',on);});
    document.querySelectorAll('[data-gmc-cmp]').forEach(function(b){var on=c.indexOf(b.dataset.gmcCmp)>-1;b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',on);});
    document.querySelectorAll('[data-gmc-wish-count]').forEach(function(n){n.textContent=w.length;});
    bar(c);}
  function bar(c){var b=document.getElementById('gmc-cmp-bar');if(!b)return;b.hidden=c.length<1;var n=b.querySelector('[data-n]');if(n)n.textContent=c.length;}
  document.addEventListener('click',function(e){
    var wb=e.target.closest('[data-gmc-wish]');if(wb){e.preventDefault();var h=wb.dataset.gmcWish,w=get(W),i=w.indexOf(h);if(i>-1)w.splice(i,1);else w.push(h);set(W,w);sync();var rm=wb.closest('.gmc-sc');if(rm&&wb.dataset.remove&&i>-1)rm.remove();return;}
    var cb=e.target.closest('[data-gmc-cmp]');if(cb){e.preventDefault();var h2=cb.dataset.gmcCmp,c=get(C),j=c.indexOf(h2);if(j>-1)c.splice(j,1);else{if(c.length>=4){alert(cb.dataset.max||'You can compare up to 4 products.');return;}c.push(h2);}set(C,c);sync();return;}
    var clr=e.target.closest('[data-gmc-cmp-clear]');if(clr){set(C,[]);sync();var t=document.querySelector('.gmc-cmpt');if(t)loadCompare(t.parentNode);}
  });
  /* wishlist page */
  function loadWish(box){var w=get(W);if(!w.length){box.innerHTML='<p class="gmc-empty-msg">'+esc(box.dataset.empty||'Your wishlist is empty.')+'</p>';return;}
    Promise.all(w.map(fetchP)).then(function(ps){box.innerHTML='<div class="gmc-sg">'+ps.filter(Boolean).map(function(p){return cardHtml(p,'<button type="button" class="button button--secondary gmc-sc__rm" data-gmc-wish="'+esc(p.handle)+'" data-remove="1">'+esc(box.dataset.remove||'Remove')+'</button>');}).join('')+'</div>';});}
  /* recently viewed */
  function loadRV(box){var cur=window.gmcProductHandle,list=get(R).filter(function(h){return h!==cur;}).slice(0,+box.dataset.max||6);if(!list.length){box.hidden=true;return;}
    Promise.all(list.map(fetchP)).then(function(ps){box.innerHTML='<div class="gmc-sg">'+ps.filter(Boolean).map(function(p){return cardHtml(p);}).join('')+'</div>';});}
  /* compare page */
  function loadCompare(box){var c=get(C),t=box.querySelector('.gmc-cmpbody')||box;if(!c.length){t.innerHTML='<p class="gmc-empty-msg">'+esc(box.dataset.empty||'Pick products to compare using the Compare button on product cards.')+'</p>';return;}
    Promise.all(c.map(fetchP)).then(function(ps){ps=ps.filter(Boolean);var rows=[['',function(p){return cardHtml(p,'<button type="button" class="gmc-link" data-gmc-cmp="'+esc(p.handle)+'">'+esc(box.dataset.remove||'Remove')+'</button>');}],[box.dataset.price||'Price',function(p){return gmcMoney(p.price);}],[box.dataset.vendor||'Brand',function(p){return esc(p.vendor);}],[box.dataset.type||'Type',function(p){return esc(p.type);}],[box.dataset.avail||'Availability',function(p){return p.available?(box.dataset.in||'In stock'):(box.dataset.out||'Sold out');}]];
      var opts={};ps.forEach(function(p){(p.options||[]).forEach(function(o){var n=typeof o==='string'?o:o.name;opts[n]=1;});});
      Object.keys(opts).forEach(function(n){rows.push([n,function(p){var o=(p.options||[]).find(function(x){return (typeof x==='string'?x:x.name)===n;});return o&&o.values?esc(o.values.join(', ')):'-';}]);});
      rows.push([box.dataset.desc||'Description',function(p){return esc((p.description||'').replace(/<[^>]*>/g,'').slice(0,160));}]);
      var h='<div class="gmc-cmpt-w"><table class="gmc-cmpt">'+rows.map(function(r){return '<tr><th scope="row">'+esc(r[0])+'</th>'+ps.map(function(p){return '<td>'+r[1](p)+'</td>';}).join('')+'</tr>';}).join('')+'</table></div>';
      t.innerHTML=h;});}
  function init(){document.querySelectorAll('[data-gmc-wishlist]').forEach(loadWish);document.querySelectorAll('[data-gmc-rv]').forEach(loadRV);document.querySelectorAll('[data-gmc-compare]').forEach(loadCompare);sync();}
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
  document.addEventListener('shopify:section:load',init);
  document.addEventListener('click',function(e){if(e.target.closest('[data-gmc-cmp]')){var t=document.querySelector('[data-gmc-compare]');if(t)setTimeout(function(){loadCompare(t);},0);}});
  window.addEventListener('storage',sync);
})();
