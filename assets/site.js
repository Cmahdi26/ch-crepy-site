
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('button[aria-controls="mobile-nav"],button[aria-label*="menu" i],button[aria-label*="Menu"]');
  const panel=document.getElementById('mobile-nav');
  if(btn && panel){
    const sync=()=>{const open=!panel.hasAttribute('hidden') && panel.style.display!=='none' && panel.offsetParent!==null;
      // use class-based: toggle data-open
    };
    // If panel is conditionally rendered, ensure a fallback
  }
  // Toggle any button that expands mobile nav
  document.querySelectorAll('button[aria-expanded]').forEach(b=>{
    b.addEventListener('click',()=>{
      const exp=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded', exp?'false':'true');
      const id=b.getAttribute('aria-controls');
      if(id){const el=document.getElementById(id); if(el){ el.hidden=exp; el.style.display=exp?'none':''; }}
      // dropdowns
      const menu=b.parentElement && b.parentElement.querySelector('[role="menu"]');
      if(menu && !id){ menu.hidden=exp; menu.style.display=exp?'none':''; }
    });
  });
});
