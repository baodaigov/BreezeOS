import "./StartMenu.scss";

interface StartAppProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  icon?: string;
}

export default function StartApp({ name, icon, ...props }: StartAppProps) {
  return (
    <div className="StartApp" {...props}>
      <img src={icon} className="StartIcon" width="75px" height="75px" />
      <p className="StartAppTitle">{name}</p>
    </div>
  );
}
