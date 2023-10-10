import "./Panel.scss";

interface PanelRangeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function PanelRangeContainer({
  title,
  children,
}: PanelRangeContainerProps) {
  return (
    <div className="PanelRangeContainer">
      <p className="PanelRangeTitle">{title}</p>
      {children}
    </div>
  );
}
