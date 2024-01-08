import { useAppSelector } from '../store/hooks';
import './Widget.scss';
import WidgetType from './WidgetType';

export default function Widget() {
  const widgets = useAppSelector((state) => state.widget.widgets);
  return (
    <div className="Widget">
      {widgets.map((i) => (
        <WidgetType type={i} />
      ))}
    </div>
  );
}
