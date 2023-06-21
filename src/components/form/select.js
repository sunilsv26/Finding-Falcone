import PropTyeps from "prop-types";

import classNames from "./form.module.css";

const select = ({ onChange, value, name, label, id, options }) => {
  return (
    <div className={classNames.control}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} onChange={onChange} value={value}>
        <option disabled value="">
          Select
        </option>
        {options.length > 0
          ? options.map((op) => {
              return (
                <option key={op.name} value={op.value}>
                  {op.name}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};

select.propTypes = {
  name: PropTyeps.string,
  label: PropTyeps.string,
  id: PropTyeps.string,
  value: PropTyeps.string,
  options: PropTyeps.arrayOf(
    PropTyeps.shape({
      name: PropTyeps.string,
      value: PropTyeps.string
    })
  ),
  onChange: PropTyeps.func
};

select.defaultProps = {
  value: "",
  options: []
};

export default select;
