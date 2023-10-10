import "./Avatar.scss";

interface AvatarProps {
  size?: number;
  image?: string;
}

export default function Avatar({ size = 1, image }: AvatarProps) {
  return image ? (
    <div
      className="SignInImage"
      style={{
        scale: size,
        backgroundImage: image,
      }}
    />
  ) : (
    <div
      className="SignInImage undefined"
      style={{
        scale: size,
      }}
    >
      <i className="fa-solid fa-user" />
    </div>
  );
}
