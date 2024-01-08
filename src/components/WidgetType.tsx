import Clock from './utils/widget/Clock';

interface WidgetTypeProps {
  type: string;
}

export default function WidgetType({ type }: WidgetTypeProps) {
  function switchType() {
    switch (type) {
      case 'clock':
        return <Clock />;
    }
  }

  return switchType();
}
