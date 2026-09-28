const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>nav.classList.remove('open'));
});

document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const btn = form.querySelector('button[type="submit"]');
  
  note.textContent = 'Sending...';
  note.style.color = '#333';
  btn.disabled = true;

  try {
    const formData = new FormData(form);
    const data = new URLSearchParams(formData).toString();
    
    await fetch('https://script.google.com/macros/s/AKfycbwjFbq-mBGkh9ZPQhqjS9f1MgWTW_hLanPomy8bYw5IrHW-5mo4WLma-3PCClFuFxNN/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data
    });
    
    note.textContent = 'Success! Your enquiry has been saved to Google Sheets.';
    note.style.color = 'green';
    form.reset();
  } catch (err) {
    note.textContent = 'Error sending message. Please try again.';
    note.style.color = 'red';
  }
  btn.disabled = false;
});
