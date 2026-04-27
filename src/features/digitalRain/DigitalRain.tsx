import { useEffect, useRef } from 'react';
import { Settings } from '../../shared/types/settings';

interface DigitalRainProps {
  settings: Settings;
}

export const DigitalRain = ({ settings }: DigitalRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutlarını ayarla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Karakter seti
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Sütunlar
    const columns = Math.floor(canvas.width / settings.fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Animasyon döngüsü
    const animate = () => {
      // Arka planı yarı saydam siyah ile kapla
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Her sütun için karakter çiz
      ctx.fillStyle = settings.color;
      ctx.font = `${settings.fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * settings.fontSize, drops[i] * settings.fontSize);

        // Rastgele bir noktada tekrar başlat
        if (drops[i] * settings.fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Hız kontrolü
        drops[i] += settings.speed;
      }
    };

    // Animasyonu başlat
    const animationId = requestAnimationFrame(animate);

    // Pencere boyutu değiştiğinde canvas boyutunu güncelle
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      className="digital-rain-canvas"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};