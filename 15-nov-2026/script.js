// ชื่อ: ใส่ ?name=ชื่อ ต่อท้ายลิงก์ หรือคลิกที่ชื่อบนการ์ดเพื่อแก้ไข
const params = new URLSearchParams(location.search);
const nameEl = document.getElementById('name');
const toName = document.querySelector('.to-name');
if (params.get('name')) { nameEl.textContent = params.get('name'); toName.textContent = params.get('name'); }
nameEl.addEventListener('input', () => { toName.textContent = nameEl.textContent || 'เธอ'; });
nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); } });

// เปิดซอง
const stage = document.getElementById('stage');
const env = document.getElementById('envelope');
const open = () => { if (!stage.classList.contains('opened')) { stage.classList.add('opened'); setTimeout(() => burst(120), 900); } };
env.addEventListener('click', open);
env.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });

// เทียน
const candlesEl = document.getElementById('candles');
const tip = document.getElementById('tip');
const again = document.getElementById('again');
const N = 5;
function makeCandles() {
  candlesEl.innerHTML = '';
  for (let i = 0; i < N; i++) {
    const c = document.createElement('div');
    c.className = 'candle'; c.innerHTML = '<div class="flame"></div>';
    c.addEventListener('click', () => blow(c));
    candlesEl.appendChild(c);
  }
  tip.textContent = 'อธิษฐานก่อน แล้วแตะเทียนให้ดับนะ 🕯️';
  again.hidden = true;
}
function blow(c) {
  if (c.classList.contains('out')) return;
  c.classList.add('out');
  const left = candlesEl.querySelectorAll('.candle:not(.out)').length;
  if (left === 0) {
    tip.textContent = 'ขอให้สมหวังนะ ✨ (ช้าไปวันนึง แต่ยังนับนะ!)';
    burst(220); again.hidden = false;
  } else {
    tip.textContent = 'เหลืออีก ' + left + ' เล่ม…';
  }
}
again.addEventListener('click', makeCandles);
makeCandles();

// คอนเฟตติ
const cv = document.getElementById('confetti'), ctx = cv.getContext('2d');
let parts = [], raf = null;
const colors = ['#e0607e', '#f2b84b', '#5fb3a1', '#8f7cf0', '#f7c6d0'];
function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
addEventListener('resize', size); size();
function burst(n) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < n; i++) parts.push({
    x: innerWidth / 2, y: innerHeight / 2.2,
    vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 4,
    r: Math.random() * 6 + 4, c: colors[i % colors.length],
    rot: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 0
  });
  if (!raf) loop();
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach(p => {
    p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
  });
  parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 400);
  raf = parts.length ? requestAnimationFrame(loop) : (ctx.clearRect(0, 0, innerWidth, innerHeight), null);
}
