import "./input.scss";

function Input(props) {
  return (
    <input
      type={props.type && props.type}
      value={props.value && props.value}
      name={props.name && props.name}
      placeholder={props.placeholder && props.placeholder}
      onChange={props.onChange}
      min={props.min && props.min}
      max={props.max && props.max}
      minLength={props.minlength && props.minlength}
      maxLength={props.maxlength && props.maxlength}
    />
  );
}

export default Input;
