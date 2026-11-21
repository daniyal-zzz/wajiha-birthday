
const btn = document.getElementById("surpriseBtn");
const message = document.getElementById("messageCard");
const floating = document.getElementById("floatingElements");

const flowers = ["🌸", "🌷", "🌼", "💗", "🦋", "✨", "💕"];

function createFloatingFlower() {
  const item = document.createElement("div");
  item.className = "floating-item";
  item.textContent = flowers[
    Math.floor(Math.random() * flowers.length)
  ];

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = (20 + Math.random() * 20) + "px";
  item.style.animationDuration = (5 + Math.random() * 5) + "s";

  floating.appendChild(item);

  setTimeout(() => item.remove(), 10000);
}

setInterval(createFloatingFlower, 500);

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  particles = [];

  const colors = [
    "#ff69a6", "#ffb6c1", "#ffd700",
    "#da70d6", "#ffffff", "#ff85b3"
  ];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height,
      size: Math.random() * 8 + 3,
      speed: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360
    });
  }

  if (!animationRunning) {
    animationRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    p.y += p.speed;
    p.rotation += 4;
  });

  particles = particles.filter(p => p.y < canvas.height + 20);

  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animationRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

btn.addEventListener("click", () => {
  message.classList.add("show");
  btn.textContent = "You Are So Special! 💖";
  btn.disabled = true;

  launchConfetti();

  message.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  for (let i = 0; i < 30; i++) {
    setTimeout(createFloatingFlower, i * 100);
  }
});
