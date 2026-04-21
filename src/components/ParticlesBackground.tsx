import { useEffect, useRef } from 'react';

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  vx: number; 
  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.density = (Math.random() * 30) + 1;
    // Partícules més visibles
    this.size = (Math.random() * 2.5) + 1.2; 
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(168, 85, 247, 0.85)'; 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: Mouse, canvasWidth: number, canvasHeight: number) {
    this.baseX += this.vx;
    this.baseY += this.vy;

    if (this.baseX < 0 || this.baseX > canvasWidth) this.vx *= -1;
    if (this.baseY < 0 || this.baseY > canvasHeight) this.vy *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        const dxBase = this.x - this.baseX;
        this.x -= dxBase / 20;
      }
      if (this.y !== this.baseY) {
        const dyBase = this.y - this.baseY;
        this.y -= dyBase / 20;
      }
    }
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse: Mouse = {
      x: -1000,
      y: -1000,
      radius: 0
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      
      // Augmentem la quantitat de partícules
      const numberOfParticles = (canvas.width * canvas.height) / 7500;

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    };

    const connect = (context: CanvasRenderingContext2D) => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connexions més llargues i visibles
          if (distance < 180) {
            const opacityValue = 1 - (distance / 180);
            context.strokeStyle = `rgba(168, 85, 247, ${opacityValue * 0.4})`; 
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(particlesArray[a].x, particlesArray[a].y);
            context.lineTo(particlesArray[b].x, particlesArray[b].y);
            context.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouse, canvas.width, canvas.height);
        particlesArray[i].draw(ctx);
      }
      connect(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => init();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: '#050505'
      }}
    />
  );
}