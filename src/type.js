const type = document.querySelector(".type");
const speed = 75;
let text =
  "Thank you for visiting Flower Heaven! Bringing joy to your life, one bloom at a time.";
let timer = null;
function typeEffect(element, speed) {
  element.innerHTML = "";

  let i = 0;
  timer = setInterval(function () {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

const footer = document.querySelector("footer");
const body = document.querySelector("body");

//使用observerApi，只有当用户滚动到footer并且footer50%可见时执行动画
//这样就能做到让用户每次滚动到下方都可以看见打字效果
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      typeEffect(type, speed);
    } else {
      clearInterval(timer);
      timer = null;
      type.innerHTML = "";
    }
  },
  {
    rootMargin: "0px",
    threshold: 0.5,
  }
);
observer.observe(footer);
