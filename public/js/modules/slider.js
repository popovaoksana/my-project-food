function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // Slider

  const sliders = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slideField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;
  let sliderIndex = 1;
  let offset = 0;

  if (sliders.length < 10) {
    total.textContent = `0${sliders.length}`;
    current.textContent = `0${sliderIndex}`;
  } else {
    total.textContent = sliders.length;
    current.textContent = sliderIndex;
  }

  slideField.style.width = 100 * sliders.length + "%";
  slideField.style.display = "flex";
  slideField.style.transition = "0.5s all ";

  slidesWrapper.style.overflow = "hidden";

  sliders.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement("li");

    dot.setAttribute("data-slide-to", i + 1);

    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: 0.5;
      transition: opacity 0.6s ease;
    `;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);

    dots.push(dot);
  }

  function addZero() {
    if (sliders.length < 10) {
      current.textContent = `0${sliderIndex}`;
    } else {
      current.textContent = sliderIndex;
    }
  }

  function updateDots() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));

    dots[sliderIndex - 1].style.opacity = 1;
  }
  function delateNotDigital(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset === delateNotDigital(width) * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset += delateNotDigital(width);
    }

    slideField.style.transform = `translateX(-${offset}px)`;

    if (sliderIndex === sliders.length) {
      sliderIndex = 1;
    } else {
      sliderIndex++;
    }

    addZero();
    updateDots();
  });
  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = delateNotDigital(width) * (sliders.length - 1);
    } else {
      offset -= delateNotDigital(width);
    }
    slideField.style.transform = `translateX(-${offset}px)`;
    if (sliderIndex === 1) {
      sliderIndex = sliders.length;
    } else {
      sliderIndex--;
    }
    addZero();
    updateDots();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      sliderIndex = slideTo;
      offset = delateNotDigital(width) * (slideTo - 1);

      slideField.style.transform = `translateX(-${offset}px)`;

      addZero();
      updateDots();
    });
  });

  // sliderScroll(sliderIndex);

  // if (sliders.length < 10) {
  //   total.textContent = `0${sliders.length}`;
  // } else {
  //   total.textContent = sliders.length;
  // }

  // function sliderScroll(n) {
  //   if (n > sliders.length) {
  //     sliderIndex = 1;
  //   } else if (n < 1) {
  //     sliderIndex = sliders.length;
  //   }

  //   sliders.forEach((item) => (item.style.display = "none"));

  //   sliders[sliderIndex - 1].style.display = "block";

  //   if (sliders.length < 10) {
  //     current.textContent = `0${sliderIndex}`;
  //   } else {
  //     current.textContent = sliderIndex;
  //   }
  // }

  // function plusSliders(n) {
  //   sliderScroll((sliderIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSliders(-1);
  // });
  // next.addEventListener("click", () => {
  //   plusSliders(1);
  // });
}
export default slider;
