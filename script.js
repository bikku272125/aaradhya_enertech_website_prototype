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
    const data = Object.fromEntries(formData.entries());
    
    await fetch('https://formsubmit.co/ajax/aaradhyaenertech2404@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    note.textContent = 'Success! Your enquiry has been sent.';
    note.style.color = 'green';
    form.reset();
  } catch (err) {
    note.textContent = 'Error sending message. Please try again.';
    note.style.color = 'red';
  }
  btn.disabled = false;
});
