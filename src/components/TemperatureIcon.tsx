// @ts-nocheck

interface TemperatureIconProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  type?: string;
}

export default function TemperatureIcon({
  icon,
  type = "regular",
  className,
  ...props
}: TemperatureIconProps) {
  const iconName =
    icon === "clear-day"
      ? "sun-bright"
      : icon === "clear-night"
      ? "moon"
      : icon === "cloudy"
      ? "clouds"
      : icon === "fog"
      ? "cloud-fog"
      : icon === "hail"
      ? "cloud-hail"
      : icon === "partly-cloudy-day"
      ? "clouds-sun"
      : icon === "partly-cloudy-night"
      ? "clouds-moon"
      : icon === "rain-snow-showers-day"
      ? "snowflake-droplets"
      : icon === "rain-snow-showers-night"
      ? "snowflake-droplets"
      : icon === "rain-snow"
      ? "snowflake-droplets"
      : icon === "rain"
      ? "cloud-rain"
      : icon === "showers-day"
      ? "cloud-sun-rain"
      : icon === "showers-night"
      ? "cloud-moon-rain"
      : icon === "sleet"
      ? "cloud-sleet"
      : icon === "snow-showers-day"
      ? "cloud-snow"
      : icon === "snow-showers-night"
      ? "cloud-snow"
      : icon === "snowd"
      ? "cloud-snow"
      : icon === "thunder-rain"
      ? "cloud-bolt"
      : icon === "thunder-showers-day"
      ? "cloud-bolt-sun"
      : icon === "thunder-showers-night"
      ? "cloud-bolt-moon"
      : icon === "thunder"
      ? "bolt"
      : icon === "wind"
      ? "wind"
      : "";

  return <i className={`fa-${type} fa-${iconName} ${className}`} {...props} />;
}
