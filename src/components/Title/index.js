import "./Title.css";

function Title({ title }) {
  return (
    <div className="title-part d-flex">
      <div className="title-part-heading">{title}</div>
    </div>
  );
}

export default Title;
