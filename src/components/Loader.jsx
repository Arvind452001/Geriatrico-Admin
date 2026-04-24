const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  minHeight: "200px",
};

export default function Loader() {
  return (
    <div style={loaderStyle}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}