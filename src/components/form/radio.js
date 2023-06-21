import PropTypes from "prop-types";

const Radio = ({ name, id, value, label, onChange, disabled, selected }) => {
  return (
    <div className={""}>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        disabled={disabled}
        checked={selected === value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.string
};

Radio.defaultProps = {
  value: ""
};

export default Radio;
