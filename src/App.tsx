import { useState, useEffect, useRef } from 'react';
import { DigitalRain } from './features/digitalRain/DigitalRain';
import { Controls } from './features/controls/Controls';
import { Settings } from './shared/types/settings';

function App() {
  const [settings, setSettings] = useState<Settings>({
    speed: 1,
    density: 0.1,
    color: '#0f0',
    fontSize: 16,
    trailLength: 10
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Canvas başlatma
      }
    }
  }, [settings]);

  return (
    <div className="app">
      <h1>Matrix Dijital Yağmur</h1>
      <canvas
        ref={canvasRef}
        className="digital-rain-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <Controls settings={settings} onSettingsChange={setSettings} />
    </div>
  );
}

export default App;