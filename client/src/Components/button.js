const Button = (props) => {
  const myClass = `pomodoro-btn ${props.type}`;
  console.log();

  return (
    <button className={myClass} onClick={props.handleClick} value={props.value}>
      {props.children}
    </button>
  );
};

export default Button;
