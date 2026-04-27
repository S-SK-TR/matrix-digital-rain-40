import { Settings } from '../../shared/types/settings';

interface ControlsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const Controls = ({ settings, onSettingsChange }: ControlsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSettingsChange({
      ...settings,
      [name]: name === 'density' || name === 'speed' ? parseFloat(value) : value
    });
  };

  return (
    <div className="controls">
      <h2>Kontroller</h2>
      <div className="control-group">
        <label>Hız: {settings.speed.toFixed(1)}</label>
        <input
          type="range"
          name="speed"
          min="0.1"
          max="3"
          step="0.1"
          value={settings.speed}
          onChange={handleChange}
        />
      </div>
      <div className="control-group">
        <label>Yoğunluk: {(settings.density * 100).toFixed(0)}%</label>
        <input
          type="range"
          name="density"
          min="0.01"
          max="0.5"
          step="0.01"
          value={settings.density}
          onChange={handleChange}
        />
      </div>
      <div className="control-group">
        <label>Renk</label>
        <input
          type="color"
          name="color"
          value={settings.color}
          onChange={handleChange}
        />
      </div>
      <div className="control-group">
        <label>Font Boyutu: {settings.fontSize}px</label>
        <input
          type="range"
          name="fontSize"
          min="8"
          max="32"
          value={settings.fontSize}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};