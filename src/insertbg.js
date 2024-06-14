// 做一个随机冒泡的背景

//使用这个可以方便在html文件中插入这个背景
const insertHtml =
  '<div class="bouncing-blobs-container"><div class="bouncing-blobs-glass"></div><div class="bouncing-blobs"><div class="bouncing-blob bouncing-blob--blue"></div><div class="bouncing-blob bouncing-blob--blue"></div><div class="bouncing-blob bouncing-blob--blue"></div><div class="bouncing-blob bouncing-blob--white"></div><div class="bouncing-blob bouncing-blob--purple"></div><div class="bouncing-blob bouncing-blob--purple"></div><div class="bouncing-blob bouncing-blob--pink"></div></div></div>';

const body = document.querySelector("body");
body.insertAdjacentHTML("afterbegin", insertHtml);

const MIN_SPEED = 1.5; // 最小速度
const MAX_SPEED = 2.5; // 最大速度

// 生成介于min和max之间的随机数
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Blob类
class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect(); // 获取元素的边界矩形
    this.size = boundingRect.width; // 获取元素的宽
    this.initialX = randomNumber(0, window.innerWidth - this.size); // 随机初始X位置
    this.initialY = randomNumber(0, window.innerHeight - this.size); // 随机初始Y位置
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    // 随机速度和方向
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  // 更新Blob的位置
  update() {
    this.x += this.vx;
    this.y += this.vy;
    // 碰撞检测和速度反转
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  // 移动Blob元素
  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`;
  }
}

// 初始化所有的Blob
function initBlobs() {
  const blobEls = document.querySelectorAll(".bouncing-blob"); // 获取所有的Blob元素
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl)); // 创建Blob对象

  // 更新Blob的位置
  function update() {
    requestAnimationFrame(update); // 请求下一帧
    blobs.forEach((blob) => {
      blob.update(); // 更新位置
      blob.move(); // 移动Blob
    });
  }

  requestAnimationFrame(update); // 开始动画
}

initBlobs(); // 初始化Blob
