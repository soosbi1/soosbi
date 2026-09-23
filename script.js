document.getElementById('year').textContent = new Date().getFullYear();

// full-page inverted color glitch flash, every 6 seconds
const main = document.querySelector('main');
setInterval(() => {
	main.style.filter = 'invert(1) hue-rotate(180deg)';
	setTimeout(() => { main.style.filter = ''; }, 240);
}, 6000);

// nyan cat flies across the screen from a random height, alternating direction;
// a rainbow trail spans behind it across the whole screen, then both pixel-dissolve
function spawnNyan() {
	const goingRight = Math.random() > 0.5;
	const catHeight = 64;
	const trailHeight = catHeight / 2;
	const catWidth = catHeight * (850 / 730); // approx png aspect ratio
	const topVh = Math.random() * 80;

	const cat = document.createElement('img');
	cat.className = 'nyan-cat ' + (goingRight ? 'dir-right' : 'dir-left');
	cat.src = 'media/nyan cat.png';
	cat.alt = '';
	cat.style.top = topVh + 'vh';
	cat.style.left = goingRight ? `-${catWidth}px` : '100vw';

	const trail = document.createElement('div');
	trail.className = 'nyan-trail ' + (goingRight ? 'dir-right' : 'dir-left');
	trail.style.top = `calc(${topVh}vh + ${(catHeight - trailHeight) / 2}px)`;

	const viewport = document.getElementById('viewport');
	viewport.append(cat, trail);

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			cat.style.left = goingRight ? '100vw' : `-${catWidth}px`;
			trail.style.width = '100vw';
		});
	});

	setTimeout(() => {
		cat.classList.add('dissolving');
		trail.classList.add('dissolving');
		setTimeout(() => {
			cat.remove();
			trail.remove();
		}, 750);
	}, 1667);
}

// staggered starts so 2-3 nyan cats can be on screen at once without spawning in sync
function scheduleNyan() {
	setTimeout(() => {
		spawnNyan();
		scheduleNyan();
	}, 400 + Math.random() * 733);
}
scheduleNyan();
