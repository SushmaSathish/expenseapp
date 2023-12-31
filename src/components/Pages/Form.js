import classes from "../Style/Form.module.css";

const Form = (props) => {
  return (
    <form className={classes.Form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;