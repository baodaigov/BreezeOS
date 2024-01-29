import { useAppDispatch, useAppSelector } from "@/store/hooks";
import "./Avatar.scss";
import { setUserImage } from "@/store/reducers/settings";
import { Theme } from "types";

interface AvatarProps {
  size?: number;
  editable?: boolean;
  theme?: Theme;
}

export default function Avatar({
  size = 1,
  editable,
  theme = "system",
}: AvatarProps) {
  const dispatch = useAppDispatch();
  const lightMode = useAppSelector((state) => state.appearance.themeLight);
  const image = useAppSelector((state) => state.settings.user.image);

  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      dispatch(setUserImage(URL.createObjectURL(e.target.files[0])));
    }
  }

  return (
    <div
      className={`SignInImage ${!image && "undefined"} ${
        theme === "dark"
          ? "darkTheme"
          : theme === "system" && lightMode
          ? "darkTheme"
          : ""
      }`}
      style={{
        transform: `scale(${size})`,
        backgroundImage: image ? `url(${image})` : "none",
      }}
    >
      {!image && <i className="fa-solid fa-user" />}
      {editable && (
        <div className="editable">
          <i className="fa-regular fa-pen" />
          <input
            type="file"
            accept=".png,jpg,.jpeg,.heic,.heif"
            onChange={addImage}
          />
        </div>
      )}
    </div>
  );
}
