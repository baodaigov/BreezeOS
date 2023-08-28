import "./Avatar.scss";

export default function Avatar({ size, image }) {
  return (
    <>
      {image ? (
        <div
          className="SignInImage"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${size - 20}px`,
          }}
        ></div>
      ) : (
        <div
          className="SignInImage undefined"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${size - 20}px`,
          }}
        >
          <i class="fa-solid fa-user"></i>
        </div>
      )}
    </>
  );
}
