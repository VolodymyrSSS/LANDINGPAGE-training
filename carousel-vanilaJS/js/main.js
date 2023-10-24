// get slider
const slider = document.querySelector('#slider');
// get children (imgs) of the slider
const sliderItems = Array.from(slider.children); // converted HTMLCollection into array
// get buttons
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');

sliderItems.forEach(function (slide, index) {
	// hide all slides exept the first one
	if (index !== 0) slide.classList.add('hidden');

	// додаєм  атрибут data-index для кожного слайда
	slide.dataset.index = index; // index of the current slide

	// додаєм атрибут data-active для першого/активного слайда
	sliderItems[0].setAttribute('data-active', '');

	// click on the slide and move to the next
	slide.addEventListener('click', function () {
		// slide.classList.add('hidden'); // hide current slide
		// slide.removeAttribute('data-active'); // to make current slide inactive

		// // to calculate next slide index
		// let nextSlideIndex;
		// if (index + 1 === sliderItems.length) {
		// 	// if index of the last slide equal to ... than
		// 	nextSlideIndex = 0; // we understend that we are on the last slide and move to the first one
		// } else {
		// 	nextSlideIndex = index + 1; // we are not on the last slide and move to the next one
		// }
		// // or can use ternary operator like:
		// // let nextSlideIndex = index + 1 === sliderItems.length ? 0 : index + 1;

		// // const nextSlideIndex = +slide.dataset.index + 1; // define index of the next slide

		// // to show next slide
		// const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
		// nextSlide.classList.remove('hidden'); // to show next slide
		// nextSlide.setAttribute('data-active', ''); // to make next slide active

		// або функція замість цього всього вище
		showSlide('next');
	});
});

btnNext.onclick = function () {
	// // to hide current slide
	// const currentSlide = slider.querySelector('[data-active]');
	// const currentSlideIndex = +currentSlide.dataset.index;
	// currentSlide.classList.add('hidden');
	// currentSlide.removeAttribute('data-active', '');

	// // to to show next slide concidering last one
	// const nextSlideIndex =
	// 	currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1;
	// const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
	// nextSlide.classList.remove('hidden');
	// nextSlide.setAttribute('data-active', '');

	// або функція замість цього всього вище
	showSlide('next');
};

btnPrev.onclick = function () {
	// // to hide current slide
	// const currentSlide = slider.querySelector('[data-active]');
	// const currentSlideIndex = +currentSlide.dataset.index;
	// currentSlide.classList.add('hidden');
	// currentSlide.removeAttribute('data-active', '');

	// // to to show prev slide concidering last one
	// const prevSlideIndex =
	// 	currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;
	// const prevSlide = slider.querySelector(`[data-index="${prevSlideIndex}"]`);
	// prevSlide.classList.remove('hidden');
	// prevSlide.setAttribute('data-active', '');

	// або функція замість цього всього вище
	showSlide('prev');
};

function showSlide(direction) {
	// to hide current slide
	const currentSlide = slider.querySelector('[data-active]');
	const currentSlideIndex = +currentSlide.dataset.index;
	currentSlide.classList.add('hidden');
	currentSlide.removeAttribute('data-active', '');

	// розразовуємо наступний індекс в залежності від руху вперед-назад
	let slideIndex;
	if (direction === 'next') {
		slideIndex =
			currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1;
	} else if (direction === 'prev') {
		slideIndex =
			currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;
	}

	// показати слайд
	const shownSlide = slider.querySelector(`[data-index="${slideIndex}"]`);
	shownSlide.classList.remove('hidden');
	shownSlide.setAttribute('data-active', '');
}
