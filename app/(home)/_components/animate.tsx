type StarSize = "big" | "medium" | "small";

const CONFIG = {
  count: 15,
  speed: 0.5,
  sizes: {
    big: 3,
    medium: 2,
    small: 1,
  },
  chances: {
    big: 0.2,
    medium: 0.6,
    small: 0.2,
  },
  starSideHeightMultiplier: 3, // n * star edge half-width = star edge height
};

const colors = [
  "hsla(0, 100%, 90%, 1)",
  "hsla(240, 60%, 35%, 1)",
  "hsla(335, 75%, 66%, 1)",
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const getRandomSize = (): StarSize => {
  const random = Math.random();

  if (random < CONFIG.chances.small) {
    return "small";
  }
  if (random < CONFIG.chances.small + CONFIG.chances.medium) {
    return "medium";
  }

  return "big";
};

class Star {
  x = 0;

  y = 0;

  speed = 0;

  size: StarSize = "big";

  color: string = "";

  constructor(canvas: HTMLCanvasElement) {
    this.size = getRandomSize();
    this.color = getRandomColor();

    this.resetPosition(canvas);
  }

  xPostion(canvas: HTMLCanvasElement) {
    return Math.random() * canvas.clientWidth * 0.6 + canvas.clientWidth * 0.2;
  }

  resetPosition(canvas: HTMLCanvasElement) {
    this.speed = Math.random() * CONFIG.speed + CONFIG.speed;
    this.x = this.xPostion(canvas);
    this.y = canvas.clientHeight * 2 * Math.random();
  }
}

function drawStar({
  context,
  x,
  y,
  size,
  color,
}: {
  x: number;
  y: number;
  size: StarSize;
  color: string;
  context: CanvasRenderingContext2D;
}) {
  context.beginPath();

  context.moveTo(x, y);

  const sideHalf = CONFIG.sizes[size];
  const sideWidth = sideHalf * 2;
  const sideHeight = sideHalf * CONFIG.starSideHeightMultiplier;

  const lineTo = (_x: number, _y: number = 0) => context.lineTo(x + _x, y + _y);

  // top triangle
  lineTo(sideHalf, -sideHeight);
  lineTo(sideWidth);

  // right triangle
  lineTo(sideWidth + sideHeight, sideHalf);
  lineTo(sideWidth, sideWidth);

  // bottom triangle
  lineTo(sideHalf, sideWidth + sideHeight);
  lineTo(0, sideWidth);

  // left triangle
  lineTo(-sideHeight, sideHalf);
  lineTo(0, 0);

  context.closePath();

  context.fillStyle = color;
  context.fill();
  context.restore();
}

const scaleCanvasForRetina = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => {
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;

  context.scale(window.devicePixelRatio, window.devicePixelRatio);
};

export const startAnimation = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d")!;

  scaleCanvasForRetina(canvas, context);

  const stars = Array.from({ length: CONFIG.count }, () => new Star(canvas));

  window.addEventListener("resize", () => {
    scaleCanvasForRetina(canvas, context);

    stars.forEach((star) => star.resetPosition(canvas));
  });

  const animate = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    stars.forEach((star) => {
      star.y -= star.speed;

      if (star.y < canvas.clientHeight * -0.2) {
        star.y = canvas.clientHeight + canvas.clientHeight * Math.random();
        star.x = Math.random() * canvas.clientWidth;
      }

      drawStar({
        context,
        ...star,
      });
    });

    requestAnimationFrame(animate);
  };

  animate();
};
