let pinAmount;

function burgerAnimation() {
	const burger = document.querySelector('.nav__burger');

	const { burgerTlOpen, overlayTl } = burgerTimelines();

	burger.addEventListener('click', () => {
		let open = burger.classList.contains('is-open');

		if (open) {
			burger.classList.remove('is-open');
			burgerTlOpen.reverse();
			overlayTl.reverse();
		} else {
			burger.classList.add('is-open');
			burgerTlOpen.play();
			overlayTl.play();
		}
	});
}

function burgerTimelines() {
	const [stick1, stick2, stick3] = document.querySelectorAll(
		'.nav__burger__sticks'
	);
	const navOverlay = document.querySelector('.nav__overlay');
	const navLinks = gsap.utils.toArray('.nav__overlay li');
	const textContainer = document.querySelector(
		'.nav__text__container--closed'
	);
	let burgerTlOpen = gsap.timeline({
		defaults: {
			duration: 0.2,
			ease: 'sine.out',
		},
		reversed: true,
	});
	burgerTlOpen
		.to(stick3, { translateY: 10, duration: 0.1 }, 0)
		.to(stick1, { translateY: -10, duration: 0.1 }, 0)
		.to(textContainer, { yPercent: 0 }, 0)
		.to(stick2, { autoAlpha: 0 })
		.to(
			stick1,
			{ rotate: 45, duration: 0.1, transformOrigin: '50% 50%' },
			1
		)
		.to(
			stick3,
			{ rotate: -45, duration: 0.1, transformOrigin: '50% 50%' },
			1
		);

	let overlayTl = gsap.timeline({
		reversed: true,
	});
	overlayTl
		.to(navOverlay, { y: 0 })
		.fromTo(
			navLinks,
			{ autoAlpha: 0, y: -50, stagger: 0.2 },
			{ autoAlpha: 1, y: 0 }
		);

	return { burgerTlOpen, overlayTl };
}

function carouselAnimation() {
	const carrCont = document.querySelector('.carousel');
	const carouselContainer = document.querySelector('.carousel__inner');
	const carouselItems = gsap.utils.toArray('.carousel__container');

	pinAmount = Math.floor(carouselContainer.offsetWidth / 7);

	//divider animations
	dividerAnimation(pinAmount);

	// carousel items coming into view from right to left
	gsap.from(
		carouselItems,
		{
			xPercent: 70,
			duration: 1.2,
			stagger: 0.1,
			autoAlpha: 0,
			scrollTrigger: {
				trigger: carrCont,
				start: 'top 60%',
			},
		},
		0
	);

	//carousel container animation
	const carouselTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: carrCont,
			scrub: 0.5,
			pin: true,
			start: 'top top',
			end: () => `+=${pinAmount}`,
			
		},
	});

	carouselTimeline.to(carouselContainer, {
		xPercent: -38.666667 * (carouselItems.length / 2),
		ease: 'none',
	});
}

function skewAnimation(element) {
	// header animation
	const tl = gsap.timeline({
		defaults: {
			duration: 0.9,
		},
	});
	tl.fromTo(
		element[0],
		{
			skewX: -12,
			yPercent: 100,
			autoAlpha: 0,
		},
		{
			skewX: 0,
			yPercent: 0,
			autoAlpha: 1,
		}
	);

	//paragraph animatio
	tl.fromTo(
		element.slice(1),
		{
			skewX: -8,
			yPercent: 40,
			autoAlpha: 0,
		},
		{
			skewX: 0,
			yPercent: 0,
			autoAlpha: 1,
		},
		0.4
	);
}

function textAnimation() {
	const header = document.querySelector('.header svg');
	const paragraphs = document.querySelectorAll('.about div p');
	skewAnimation([header, ...paragraphs]);
}

function toggleAnimation() {
	const html = document.querySelector('html');
	const ball1 = document.getElementById('left-balls');
	const ball2 = document.getElementById('right-balls');
	const themeBtn = document.querySelector('.theme-switcher-btn');

	const animation = ball1.animate([{ transform: 'translateX(50%)' }], {
		duration: 500,
		easing: 'linear',
		fill: 'forwards',
	});
	const animation2 = ball2.animate([{ transform: 'translateX(-50%)' }], {
		duration: 500,
		easing: 'linear',
		fill: 'forwards',
	});

	animation.pause();
	animation2.pause();

	let clicked = false;
	themeBtn.addEventListener('click', () => {
		console.log('clicked', clicked);

		html.classList.toggle('light-mode');
		if (clicked) {
			animation.reverse();
			animation2.reverse();
			clicked = false;
			ball2.style.fill = '#fff';
			ball1.style.fill = '#fff';
		} else {
			animation.play();
			animation2.play();
			clicked = true;
			ball2.style.fill = '#000';
			ball1.style.fill = '#000';
		}
	});
}

function navigationAnimation() {
	const navBar = document.querySelector('nav');
	let prevScrollPos = window.scrollY;
	window.addEventListener('scroll', () => {
		const currentScrollPos = window.scrollY;

		if (prevScrollPos > currentScrollPos) {
			// scrolling up
			gsap.to(navBar, { y: 0, duration: 0.2, ease: 'power1.in' });
		} else {
			// scrolling Down
			gsap.to(navBar, {
				y: -navBar.clientHeight,
				duration: 0.2,
				ease: 'power1.in',
			});
		}

		prevScrollPos = currentScrollPos;
	});

	console.log('hello world');
}

function dividerAnimation(pinAmount) {
	// Dividers before and after the carousel
	const dividersBefore = gsap.utils.toArray('.divider.divider-before');
	const dividersAfter = gsap.utils.toArray('.divider.divider-after');

	gsap.set([dividersBefore, dividersAfter], { scaleX: 0 });

	dividersBefore.forEach((divider) => {
		gsap.to(divider, {
			scaleX: 1,
			transformOrigin: 'left',
			duration: 1.3,
			scrollTrigger: {
				trigger: divider,
				
				start: `top 80%`,
			},
		});
	});
	dividersAfter.forEach((divider) => {
		gsap.to(divider, {
			scaleX: 1,
			transformOrigin: 'left',
			duration: 1.3,
			scrollTrigger: {
				trigger: divider,
				
				start: `${pinAmount}px 80%`,
			},
		});
	});
}

function workingsSection() {
	const workingSection = document.querySelector('.workings');
	const links = gsap.utils.toArray('.workings a');
	const heading = document.querySelector('.heading');

	gsap.from([heading, links], {
		autoAlpha: 0,
		yPercent: 50,
		stagger: 0.2,
		duration: 0.5,
		ease: 'power2.inOut',
		scrollTrigger: {
			trigger: workingSection,
			start: 'top 85%',
			
		},
	});
}

function visionSection() {
	const vision = document.querySelector('.vision');

	gsap.from(vision.querySelector('h3'), {
		yPercent: 50,
		autoAlpha: 0,
		opacity: 0,
		skewX: -8,
		duration: 1.2,
		ease: 'power2.inOut',
		scrollTrigger: {
			trigger: vision,
			start: `top 60%`,
			
		},
	});
}

function howSectiion() {
	const howSection = document.querySelector('.how');
	const texts = gsap.utils.toArray('.how-text');
	const heading = document.querySelector('.how-heading');
	const link = document.querySelector('.how .more-info');

	ttAni(howSection, [heading, texts, link]);

	const impactSection = document.querySelector('.impact');
	const impactHeading = impactSection.querySelector('.more-info');
	const impactText = impactSection.querySelectorAll('p');

	ttAni(impactSection, [impactHeading, impactText]);
}

function ttAni(trigger, children) {
	console.log(pinAmount, 'pinnig');
	gsap.from(children, {
		autoAlpha: 0,
		yPercent: 50,
		stagger: 0.2,
		duration: 0.5,
		ease: 'power2.inOut',
		scrollTrigger: {
			trigger: trigger,
			start: `${pinAmount}px 80%`,
			
		},
	});
}

function numberAnimation() {
	const counters = gsap.utils.toArray('.vt-num');

	ScrollTrigger.create({
		trigger: '.vision-texts',
		
		start: `${pinAmount}px 80%`,
		onEnter: () => {
			counters.forEach((ele) => {
				const targetNumber = ele.dataset.num;
				const animationDuration = 1;

				gsap.to(ele, {
					duration: animationDuration,
					innerHTML: targetNumber, // Set the final value
					roundProps: 'innerHTML', // Round the displayed value to an integer
					ease: 'power1.out', // Easing function for a smoother animation
				});
			});
		},
	});
}

function customMouse() {
	gsap.set('.ball', { xPercent: -50, yPercent: -50 });

	window.addEventListener('mousemove', (e) => {
		console.log('hello world');
		gsap.to('.ball', {
			duration: 0.6,
			ease: 'power3',
			x: e.clientX,
		}),
			gsap.to('.ball', {
				duration: 0.6,
				ease: 'power3',
				y: e.clientY,
			});
	});

	gsap.utils.toArray('a').forEach((el) => {
		el.addEventListener('mouseenter', () => {
			gsap.to('.ball', {
				scale: 3,
				filter: 'blur(5px)',
			});
		});

		el.addEventListener('mouseleave', () => {
			gsap.to('.ball', {
				scale: 1,
				filter: 'blur(0px)',
			});
		});
	});
}

function impactSection() {
	const container = gsap.utils.toArray('.iw-cont');

	console.log('hello ther');

	container.forEach((element) => {
		const smallPart = element.querySelector('.iw-text-cont');
		const largePart = element.querySelector('.iw-img-carousel');
		gsap.set(element, { height: smallPart.offsetHeight + 80 });
		let isExpanding = false;
		element.addEventListener('click', () => {
			if (!isExpanding) {
				gsap.to(element, {
					height:
						largePart.offsetHeight + smallPart.offsetHeight + 100,
					duration: 0.7,
					ease: 'power2.out',
				});
			} else {
				gsap.to(element, {
					height: smallPart.offsetHeight + 80,
					duration: 0.7,
					ease: 'power2.in',
				});
			}

			isExpanding = !isExpanding;
		});

		element.addEventListener('mouseenter', () => {
			gsap.to('.ball', {
				scale: 3,
				filter: 'blur(5px)',
			});
		});

		element.addEventListener('mouseleave', () => {
			gsap.to('.ball', {
				scale: 1,
				filter: 'blur(0px)',
			});
		});
	});
}

function storySection() {
	const storySection = document.querySelector('.story');

	gsap.from(storySection.querySelector('h2'), {
		yPercent: 50,
		autoAlpha: 0,
		opacity: 0,
		skewX: -8,
		duration: 1.2,
		ease: 'power2.inOut',
		scrollTrigger: {
			trigger: storySection,
			start: `${pinAmount}px 80%`,
			
		},
	});
}

function workWithUs() {
	const withusSection = document.querySelector('.work-with-us');

	const ele1 = withusSection.querySelector('.inner-1 h3');
	const ele2 = withusSection.querySelector('.inner-1 p');
	const ele3 = gsap.utils.toArray('.inner-2 div');

	gsap.from([ele1, ele2, ...ele3], {
		yPercent: 50,
		autoAlpha: 0,
		opacity: 0,
		duration: 1.2,
		ease: 'power2.inOut',
		stagger: 0.2,
		scrollTrigger: {
			trigger: withusSection,
			start: `${pinAmount}px 80%`,
			
		},
	});
}

function connectSection() {
	const connectSect = document.querySelector('.connect');
	let eles = [
		gsap.utils.toArray('.connect h3'),
		gsap.utils.toArray('.connect p'),
		connectSect.querySelector('.connect-form'),
	];

	gsap.from(eles, {
		autoAlpha: 0,
		opacity: 0,
		duration: 1.5,
		yPercent: 100,
		ease: 'power4',
		scrollTrigger: {
			trigger: connectSect,
			start: `${pinAmount}px 80%`,
			
		},
	});
}

function formatTimeTo12Hour(time) {
	const date = new Date(time);
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const period = hours >= 12 ? 'pm' : 'am';

	if (hours > 12) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}

	return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function formatDateToCustomFormat(date) {
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
}

function dateCal() {
	const currentTime = new Date(); // You can replace this with your desired time
	const formattedTime = formatTimeTo12Hour(currentTime);
	console.log(formattedTime);

	const currentDate = new Date(); // You can replace this with your desired date
	const formattedDate = formatDateToCustomFormat(currentDate);
	const daty = formattedDate.split(',');

	const time = document.querySelector('.time');
	const day = document.querySelector('.day');
	const caly = document.querySelector('.calender');

	time.textContent = formattedTime;
	day.textContent = daty[0];
	caly.textContent = daty[1] + ' ' + daty[2];
}


const loading = document.querySelector('.loading');
const loaderContent = document.querySelector('.animation-container')
gsap.set(loading, { autoAlpha: 1 });
const loadingAnimation = () => {
	
	const tl = gsap.timeline({
		onComplete:()=> {
			document.querySelector('body').classList.remove('is-loading')
			
			init()
		}
	}).to(loaderContent, {
		duration: 0.8,
		y: '-50%',
		opacity: 1,
		yoyoEase: 'linear',
		repeat: 2, yoyo: true
	}).to(".loading", {
		yPercent: -100,
		ease: "power3.inOut",
		duration: 1
	  })
	  
	
};
  


function init() {
	
	impactSection();
	carouselAnimation();
	textAnimation();
	howSectiion();
	workingsSection();
	numberAnimation();
	visionSection();
	customMouse();
	storySection();
	workWithUs();
	connectSection();
	dateCal();
	
}

window.addEventListener('load', () => {
	// init();
	loadingAnimation();

});
