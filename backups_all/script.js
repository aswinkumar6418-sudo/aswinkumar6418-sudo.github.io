/*
 Loading sequence:
 - show loader overlay
 - reveal subtle egg text for 1 second
 - then fade loader and show page
*/
document.getElementById('year').textContent = new Date().getFullYear();

(function(){
  const loader = document.getElementById('loader');
  const egg = document.getElementById('egg');

  // show the egg text subtly for 1 second
  egg.style.opacity = '0';
  // small delay so user sees the overlay then the egg flash
  setTimeout(()=> {
    egg.style.opacity = '1';
    setTimeout(()=> {
      egg.style.opacity = '0';
      // hide loader shortly after
      setTimeout(()=> {
        loader.style.opacity = '0';
        setTimeout(()=> loader.remove(), 300);
      }, 300);
    }, 1000); // ← egg visible for 1 second
  }, 250);
})();

// simple client-side contact form behaviour (sends mailto as fallback)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value.trim());
  const email = encodeURIComponent(f.email.value.trim());
  const msg = encodeURIComponent(f.message.value.trim());
  const subject = encodeURIComponent('Website contact from ' + (f.name.value || 'visitor'));
  // Open mail client as fallback
  const body = `Name: ${f.name.value}%0D%0AEmail: ${f.email.value}%0D%0A%0D%0AMessage:%0D%0A${f.message.value}`;
  const mailto = `mailto:keshav.inbox@proton.me?subject=${subject}&body=${body}`;
  // open mail client and show status
  window.location.href = mailto;
  const status = document.getElementById('formStatus');
  status.textContent = 'Opening your email app…';
  setTimeout(()=> status.textContent = '', 3000);
});


// HIRE ME: Request Quote behavior
document.getElementById('quoteBtn')?.addEventListener('click', function(){
  const form = document.getElementById('contactForm');
  if(form){
    form.scrollIntoView({behavior:'smooth', block:'center'});
    form.querySelector('input, textarea')?.focus();
  } else {
    // fallback: open email
    window.location.href = 'mailto:keshav.inbox@proton.me?subject=Request%20for%20quote';
  }
});


// PRICING / QUOTE MODAL behavior
(function(){
  const modal = document.getElementById('priceModal');
  const close = document.getElementById('modalClose');
  const backdrop = document.getElementById('modalBackdrop');
  const quoteBtn = document.getElementById('quoteBtn');

  function openModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus first actionable element
    const wh = document.getElementById('modalWh');
    if(wh) wh.focus();
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  if(quoteBtn){
    quoteBtn.removeEventListener('click', window._oldQuoteHandler);
    quoteBtn.addEventListener('click', function(e){
      e.preventDefault();
      openModal();
    });
  }

  if(close) close.addEventListener('click', closeModal);
  if(backdrop) backdrop.addEventListener('click', closeModal);

  // close on Escape
  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape') closeModal();
  });
})();
