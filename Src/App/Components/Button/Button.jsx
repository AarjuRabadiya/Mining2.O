import Button from "@material-ui/core/Button";
import "./button.scss";

function ButtonContainer(props) {
  return (
    <div id="div-outer">
      <Button
        id="div-inner"
        className={`button ${props.className}`}
        onClick={props.onClick}
      >
        {props.name}
      </Button>
    </div>
  );
}

export default ButtonContainer;
