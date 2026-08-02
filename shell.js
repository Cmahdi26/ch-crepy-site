async function loadFrag(id,url){const el=document.getElementById(id);if(!el)return;try{el.innerHTML=await(await fetch(url)).text()}catch(e){console.error(e)}}
(async()=>{
  await Promise.all([
    loadFrag('site-header','https://cdn.jsdelivr.net/gh/Cmahdi26/ch-crepy-site@main/fragments/header.html'),
    loadFrag('site-footer','https://cdn.jsdelivr.net/gh/Cmahdi26/ch-crepy-site@main/fragments/footer.html')
  ]);
  const path=location.pathname.replace(/\/$/,'')||'/';
  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute('href');
    if(h===path||(path!=='/'&&h&&path.startsWith(h)&&h!=='/')) a.setAttribute('aria-current','page');
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
})();
