(() => {
  const e = document.querySelector(".type");
  let n = null;
  const t = document.querySelector("footer");
  (document.querySelector("body"),
  new IntersectionObserver(
    (t) => {
      t[0].isIntersecting
        ? (function (e, t) {
            e.innerHTML = "";
            let o = 0;
            n = setInterval(function () {
              o < 85
                ? (e.append(
                    "Thank you for visiting Flower Heaven! Bringing joy to your life, one bloom at a time.".charAt(
                      o
                    )
                  ),
                  o++)
                : clearInterval(n);
            }, 75);
          })(e)
        : (clearInterval(n), (n = null), (e.innerHTML = ""));
    },
    { rootMargin: "0px", threshold: 0.5 }
  )).observe(t);
})();
