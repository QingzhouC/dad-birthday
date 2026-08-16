const startScreen =
  document.getElementById("start-screen");

const mainPage =
  document.getElementById("main-page");

const startBtn =
  document.getElementById("start-btn");

const music =
  document.getElementById("birthday-music");

const musicBtn =
  document.getElementById("music-btn");

const wishCards =
  document.querySelectorAll(".wish-card");

const wishPopup =
  document.getElementById("wish-popup");

const popupIcon =
  document.getElementById("popup-icon");

const popupTitle =
  document.getElementById("popup-title");

const popupText =
  document.getElementById("popup-text");

const closePopup =
  document.getElementById("close-popup");

const birthdayBtn =
  document.getElementById("birthday-btn");

const finalPopup =
  document.getElementById("final-popup");

const closeFinal =
  document.getElementById("close-final");

const effectsLayer =
  document.getElementById("effects-layer");


/* =====================================================
   启动网站
===================================================== */

startBtn.addEventListener(
  "click",
  async () => {

    try {

      music.volume = 0.55;

      await music.play();

      musicBtn.classList.add("playing");

    } catch (error) {

      console.log(
        "浏览器暂时阻止音乐播放"
      );

    }


    startScreen.style.transition =
      "opacity 0.9s ease";

    startScreen.style.opacity = "0";


    setTimeout(() => {

      startScreen.style.display =
        "none";

      mainPage.style.display =
        "block";

      musicBtn.style.display =
        "block";

      window.scrollTo(
        0,
        0
      );

      createWelcomeParticles();

      smallFireworkBurst();

    }, 900);

  }
);


/* =====================================================
   音乐按钮
===================================================== */

musicBtn.addEventListener(
  "click",
  () => {

    if (music.paused) {

      music.play();

      musicBtn.classList.add(
        "playing"
      );

      musicBtn.innerHTML = "♪";

    } else {

      music.pause();

      musicBtn.classList.remove(
        "playing"
      );

      musicBtn.innerHTML = "Ⅱ";

    }

  }
);


/* =====================================================
   祝福内容
===================================================== */

const wishes = {

  career: {

    icon: "↗",

    title:
      "事业有成",

    text:
      "愿新的一岁事业蒸蒸日上，创业一路顺利，每一个目标都能实现。",

    effects:
      ["✦", "★", "↑", "✨"]

  },


  money: {

    icon: "¥",

    title:
      "财源广进",

    text:
      "愿生意兴隆，财运亨通，财富丰盈，付出的每一份努力都有丰厚回报。",

    effects:
      ["¥", "💰", "✦", "✨"]

  },


  future: {

    icon: "★",

    title:
      "前程似锦",

    text:
      "愿未来可期，目标坚定，一路向前，所有理想都成为现实。",

    effects:
      ["★", "✦", "🚀", "✨"]

  },


  health: {

    icon: "♥",

    title:
      "平安喜乐",

    text:
      "愿身体健康，平安顺遂，天天开心，岁岁无忧。",

    effects:
      ["♥", "✨", "✦", "⭐"]

  }

};


/* =====================================================
   点击祝福卡片
===================================================== */

wishCards.forEach(
  card => {

    card.addEventListener(
      "click",
      () => {

        const type =
          card.dataset.type;

        const wish =
          wishes[type];

        popupIcon.innerHTML =
          wish.icon;

        popupTitle.innerHTML =
          wish.title;

        popupText.innerHTML =
          wish.text;

        wishPopup.style.display =
          "flex";

        createFallingEffects(
          wish.effects,
          24
        );

        launchFireworks(
          3
        );

        fadeMusicTo(
          0.75,
          500
        );

      }
    );

  }
);


/* =====================================================
   关闭祝福
===================================================== */

closePopup.addEventListener(
  "click",
  () => {

    wishPopup.style.display =
      "none";

    fadeMusicTo(
      0.55,
      500
    );

  }
);


wishPopup.addEventListener(
  "click",
  event => {

    if (
      event.target === wishPopup
    ) {

      wishPopup.style.display =
        "none";

      fadeMusicTo(
        0.55,
        500
      );

    }

  }
);


/* =====================================================
   最终生日按钮
===================================================== */

let finalFireworkTimer = null;


birthdayBtn.addEventListener(
  "click",
  () => {

    finalPopup.style.display =
      "flex";


    fadeMusicTo(
      0.9,
      800
    );


    // 金色祝福粒子
    createFallingEffects(
      [
        "✨",
        "★",
        "¥",
        "♥",
        "✦"
      ],
      55
    );


    // 第一次大型烟花
    launchFireworks(
      15
    );


    // 打开祝福页面后持续烟花
    finalFireworkTimer =
      setInterval(
        () => {

          launchFireworks(
            4
          );

        },
        1800
      );

startFinalFireworks();

  }
);


/* =====================================================
   关闭最终祝福
===================================================== */

closeFinal.addEventListener(
  "click",
  () => {


    finalPopup.style.display =
      "none";


    // 停止持续烟花
    if(finalFireworkTimer){

      clearInterval(
        finalFireworkTimer
      );

      finalFireworkTimer = null;

    }


    fadeMusicTo(
      0.55,
      700
    );


  }
);


/* =====================================================
   掉落效果
===================================================== */

function createFallingEffects(
  items,
  count
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const element =
      document.createElement(
        "div"
      );

    element.className =
      "falling-item";

    element.innerHTML =
      items[
        Math.floor(
          Math.random() *
          items.length
        )
      ];

    element.style.left =
      Math.random() *
      100 +
      "vw";

    element.style.fontSize =
      14 +
      Math.random() *
      22 +
      "px";

    element.style.animationDuration =
      3 +
      Math.random() *
      4 +
      "s";

    element.style.animationDelay =
      Math.random() *
      1.5 +
      "s";

    const colors = [
      "#ffd86b",
      "#ffffff",
      "#1ba8ff",
      "#ffb42f"
    ];

    element.style.color =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    effectsLayer.appendChild(
      element
    );


    setTimeout(
      () => {

        element.remove();

      },
      8000
    );

  }

}


/* =====================================================
   页面启动粒子
===================================================== */

function createWelcomeParticles() {

  createFallingEffects(
    [
      "✦",
      "✨",
      "◆",
      "★"
    ],
    30
  );

}


/* =====================================================
   音量渐变
===================================================== */

function fadeMusicTo(
  targetVolume,
  duration
) {

  if (
    music.paused
  ) {
    return;
  }

  const startVolume =
    music.volume;

  const difference =
    targetVolume -
    startVolume;

  const startTime =
    performance.now();


  function update(
    currentTime
  ) {

    const progress =
      Math.min(
        (
          currentTime -
          startTime
        ) /
        duration,
        1
      );

    music.volume =
      Math.max(
        0,
        Math.min(
          1,
          startVolume +
          difference *
          progress
        )
      );


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


/* =====================================================
   Canvas 烟花
===================================================== */

const canvas =
  document.getElementById(
    "fireworks"
  );

const ctx =
  canvas.getContext("2d");

let particles = [];


/* 设置尺寸 */

function resizeCanvas() {

  canvas.width =
    window.innerWidth *
    window.devicePixelRatio;

  canvas.height =
    window.innerHeight *
    window.devicePixelRatio;

  canvas.style.width =
    window.innerWidth +
    "px";

  canvas.style.height =
    window.innerHeight +
    "px";

  ctx.setTransform(
    window.devicePixelRatio,
    0,
    0,
    window.devicePixelRatio,
    0,
    0
  );

}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);


/* 烟花粒子 */

class FireworkParticle {

  constructor(
    x,
    y,
    color
  ) {

    this.x = x;

    this.y = y;

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      Math.random() *
      5 +
      1.5;

    this.vx =
      Math.cos(angle) *
      speed;

    this.vy =
      Math.sin(angle) *
      speed;

    this.gravity =
      0.045;

    this.friction =
      0.985;

    this.alpha = 1;

    this.decay =
      0.011 +
      Math.random() *
      0.015;

    this.color =
      color;

    this.size =
      Math.random() *
      2.5 +
      1;

  }


  update() {

    this.vx *=
      this.friction;

    this.vy *=
      this.friction;

    this.vy +=
      this.gravity;

    this.x +=
      this.vx;

    this.y +=
      this.vy;

    this.alpha -=
      this.decay;

  }


  draw() {

    ctx.globalAlpha =
      Math.max(
        0,
        this.alpha
      );

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI *
      2
    );

    ctx.fillStyle =
      this.color;

    ctx.shadowBlur = 15;

    ctx.shadowColor =
      this.color;

    ctx.fill();

  }

}


/* 创建一朵烟花 */

function createFirework(
  x,
  y
) {

  const colors = [
    "#ffd166",
    "#ffffff",
    "#149cff",
    "#ff9f1c",
    "#4cc9ff"
  ];

  const color =
    colors[
      Math.floor(
        Math.random() *
        colors.length
      )
    ];

  const amount =
    55 +
    Math.floor(
      Math.random() *
      30
    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    particles.push(
      new FireworkParticle(
        x,
        y,
        color
      )
    );

  }

}


/* 多轮烟花 */

function launchFireworks(
  amount = 5
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(
      () => {

        const x =
          window.innerWidth *
          (
            0.15 +
            Math.random() *
            0.7
          );

        const y =
          window.innerHeight *
          (
            0.15 +
            Math.random() *
            0.45
          );

        createFirework(
          x,
          y
        );

      },
      i *
      260
    );

  }

}


function smallFireworkBurst() {

  setTimeout(
    () => {

      launchFireworks(
        3
      );

    },
    600
  );

}


/* 烟花循环 */

function animateFireworks() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  for (
    let i =
      particles.length - 1;
    i >= 0;
    i--
  ) {

    const particle =
      particles[i];

    particle.update();

    particle.draw();


    if (
      particle.alpha <= 0
    ) {

      particles.splice(
        i,
        1
      );

    }

  }

  ctx.globalAlpha = 1;

  requestAnimationFrame(
    animateFireworks
  );

}

animateFireworks();


/* =====================================================
   页面点击随机小光点
===================================================== */

document.addEventListener(
  "pointerdown",
  event => {

    if (
      mainPage.style.display !==
      "block"
    ) {
      return;
    }

    createClickSpark(
      event.clientX,
      event.clientY
    );

  }
);


function createClickSpark(
  x,
  y
) {

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    const spark =
      document.createElement(
        "div"
      );

    spark.style.position =
      "fixed";

    spark.style.left =
      x +
      "px";

    spark.style.top =
      y +
      "px";

    spark.style.width =
      "4px";

    spark.style.height =
      "4px";

    spark.style.borderRadius =
      "50%";

    spark.style.background =
      i % 2 === 0
        ? "#ffd66b"
        : "#31aaff";

    spark.style.boxShadow =
      "0 0 10px currentColor";

    spark.style.pointerEvents =
      "none";

    spark.style.zIndex =
      "9999";

    document.body.appendChild(
      spark
    );


    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      20 +
      Math.random() *
      35;


    spark.animate(
      [
        {
          transform:
            "translate(0,0) scale(1)",
          opacity: 1
        },

        {
          transform:
            `translate(
              ${Math.cos(angle) * distance}px,
              ${Math.sin(angle) * distance}px
            ) scale(0)`,
          opacity: 0
        }
      ],
      {
        duration: 600,
        easing: "ease-out"
      }
    );


    setTimeout(
      () => {
        spark.remove();
      },
      650
    );

  }

}
/* =================================
   最终祝福页面烟花
================================= */


const finalCanvas =
document.getElementById(
  "final-fireworks"
);


const finalCtx =
finalCanvas.getContext("2d");


let finalParticles = [];


function resizeFinalCanvas(){

  finalCanvas.width =
  window.innerWidth *
  window.devicePixelRatio;


  finalCanvas.height =
  window.innerHeight *
  window.devicePixelRatio;


  finalCtx.setTransform(
    window.devicePixelRatio,
    0,
    0,
    window.devicePixelRatio,
    0,
    0
  );

}


resizeFinalCanvas();


window.addEventListener(
"resize",
resizeFinalCanvas
);



function createFinalFirework(){


const x =
Math.random() *
window.innerWidth;


const y =
100 +
Math.random() *
window.innerHeight *
0.45;



const colors=[

"#ffd166",
"#ffffff",
"#00aaff",
"#ffcc66"

];


const color =
colors[
Math.floor(
Math.random()*colors.length
)
];


for(
let i=0;
i<70;
i++
){


const angle =
Math.random()*Math.PI*2;


const speed =
Math.random()*5+2;


finalParticles.push({

x:x,

y:y,

vx:
Math.cos(angle)*speed,

vy:
Math.sin(angle)*speed,

life:1,

color:color

});


}


}



function animateFinalFireworks(){


finalCtx.clearRect(

0,

0,

window.innerWidth,

window.innerHeight

);



finalParticles.forEach(
(p,index)=>{


p.x += p.vx;

p.y += p.vy;


p.vy +=0.04;


p.life -=0.001;



finalCtx.beginPath();


finalCtx.arc(

p.x,

p.y,

2,

0,

Math.PI*2

);


finalCtx.fillStyle =
p.color;


finalCtx.globalAlpha =
p.life;


finalCtx.shadowBlur=15;

finalCtx.shadowColor=
p.color;


finalCtx.fill();



if(
p.life<=0
){

finalParticles.splice(
index,
1
);

}


}
);


finalCtx.globalAlpha=1;


requestAnimationFrame(
animateFinalFireworks
);


}


animateFinalFireworks();



let finalFireworkLoop;



function startFinalFireworks(){


clearInterval(
finalFireworkLoop
);


finalFireworkLoop =
setInterval(
()=>{

createFinalFirework();

},
700
);


}



closeFinal.addEventListener(
"click",
()=>{


clearInterval(
finalFireworkLoop
);


finalParticles=[];


}
);