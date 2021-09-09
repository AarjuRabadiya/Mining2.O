import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import metamaskIcon from "./Assets/metamaskIcon.png";
import back from "./Assets/back.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./button.scss";

function ButtonContainer(props) {
  const svgIcon = (
    <Icon>
      <img alt="edit" src={metamaskIcon} />
    </Icon>
  );
  return (
    <div id="div-outer">
      <Button
        id="div-inner"
        className={`button ${props.className}`}
        onClick={props.onClick}
        startIcon={props.icon === "metamsk" && svgIcon}
        disabled={props.disabled}
      >
        {props.isLoading ? (
          <CircularProgress />
        ) : props.startIcon === "back" ? (
          <img src={back} />
        ) : (
          props.name
        )}
      </Button>
    </div>
  );
}

export default ButtonContainer;
