import { useAppSelector } from '@/store/hooks';
import { Theme } from 'types';
import './index.scss';

interface CheckboxProps {
  active: boolean;
  size?: number;
  color?: string;
  theme?: Theme;
  disabled?: boolean;
  onToggle: React.MouseEventHandler<HTMLDivElement>;
}

export default function Checkbox({
  active,
  size = 1,
  color = '#2563eb',
  theme = 'system',
  disabled,
  onToggle,
}: CheckboxProps) {
  const lightMode = useAppSelector((state) => state.settings.themeLight);

  return (
    <div
      className={`Checkbox ${active && "active"} ${disabled && 'disabled'} ${
        theme === 'dark'
          ? 'darkTheme'
          : theme === 'system' && lightMode
          ? 'darkTheme'
          : ''
      }`}
      style={{ transform: `scale(${size})`, backgroundColor: active ? color : "" }}
      onClick={onToggle}
    >
      <i className="fa-regular fa-check" />
    </div>
  )
}
