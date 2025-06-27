// רקע כדורים
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 25 + 20,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  angle: Math.random() * Math.PI * 2
}));

function drawBall(p, lx, ly) {
  p.angle += 0.01;
  const dx = p.x - lx, dy = p.y - ly;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const norm = Math.max(0.2, Math.min(1, 1 - dist / 600));
  const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.3, p.x, p.y, p.r);
  grad.addColorStop(0, `rgba(255,255,255,${0.2 * norm})`);
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const lx = canvas.width / 2 + Math.sin(Date.now() / 1000) * 200;
  const ly = canvas.height / 2 + Math.cos(Date.now() / 1000) * 200;
  balls.forEach(b => {
    drawBall(b, lx, ly);
    b.x += b.dx;
    b.y += b.dy;
    if (b.x < b.r || b.x > canvas.width - b.r) b.dx *= -1;
    if (b.y < b.r || b.y > canvas.height - b.r) b.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// auth
const navAuth = document.getElementById("nav-auth");
const user = JSON.parse(localStorage.getItem("discordUser"));

if (user) {
  navAuth.innerHTML = `
    <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" class="user-pfp" />
    <span>${user.username}#${user.discriminator}</span>
    <button class="logout-btn" onclick="logout()">התנתקות</button>
  `;
} else {
  navAuth.innerHTML = `
    <a class="discord-btn" href="https://discord.com/oauth2/authorize?client_id=1388210958702215329&response_type=token&redirect_uri=https%3A%2F%2Fbeben2.com%2Fauth%2Fdiscord%2Fcallback&scope=identify">התחברות עם דיסקורד</a>
  `;
}

function logout() {
  localStorage.removeItem("discordUser");
  location.reload();
}
