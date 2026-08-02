async function loadFrag(id,url){
  const el=document.getElementById(id);
  if(!el)return;
  try{el.innerHTML=await(await fetch(url,{cache:'no-cache'})).text()}catch(e){console.error(e)}
}
function pageName(path){
  let p=(path||location.pathname).replace(/\/$/,'');
  if(!p||p.endsWith('/ch-crepy-site')) return 'index.html';
  const base=p.split('/').pop()||'index.html';
  return base.endsWith('.html')?base:base+'.html';
}
(async()=>{
  await Promise.all([
    loadFrag('site-header','https://cdn.jsdelivr.net/gh/Cmahdi26/ch-crepy-site@main/fragments/header.html'),
    loadFrag('site-footer','https://cdn.jsdelivr.net/gh/Cmahdi26/ch-crepy-site@main/fragments/footer.html')
  ]);
  const current=pageName();
  document.querySelectorAll('a[href]').forEach(a=>{
    const h=(a.getAttribute('href')||'').split('#')[0].split('?')[0];
    if(!h||h.startsWith('http')||h.startsWith('tel:')||h.startsWith('mailto:')) return;
    const file=h.split('/').pop()||'index.html';
    if(file===current||(current==='index.html'&&(file===''||file==='index.html'))){
      a.setAttribute('aria-current','page');
    }
  });
  document.querySelectorAll('button[aria-controls="mobile-nav"],button[aria-label*="menu" i],button[aria-label*="Menu"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const nav=document.getElementById('mobile-nav');
      if(!nav)return;
      const open=nav.getAttribute('data-open')==='1';
      nav.style.display=open?'none':'block';
      nav.setAttribute('data-open',open?'0':'1');
      btn.setAttribute('aria-expanded',open?'false':'true');
    });
  });
  document.querySelectorAll('button[aria-expanded]').forEach(b=>{
    b.addEventListener('click',()=>{
      const exp=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded', exp?'false':'true');
      const id=b.getAttribute('aria-controls');
      if(id){const el=document.getElementById(id); if(el){ el.hidden=exp; el.style.display=exp?'none':''; }}
      const menu=b.parentElement&&b.parentElement.querySelector('[role="menu"]');
      if(menu&&!id){ menu.hidden=exp; menu.style.display=exp?'none':''; }
    });
  });
})();
