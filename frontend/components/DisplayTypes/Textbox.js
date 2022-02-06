export default function Textbox(props) {
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "5px",
        padding: "5px",
        width: "80%",
      }}
    >
      <strong>{props.category}</strong>
      <br />
      <div>{props.text}</div>
    </div>
  );
}
