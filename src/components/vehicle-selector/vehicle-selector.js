import PropTypes from "prop-types";

import Radio from "../form/radio";

import classes from "./vehicle-selector.module.css";

const VehicleSelector = ({
  name,
  title,
  handelVehicleSlection,
  count,
  id,
  value,
  disabled,
  selected
}) => {
  return (
    <div className={classes.vehicleRadio} key={name}>
      <Radio
        key={name}
        label={title}
        name={name}
        id={id}
        onChange={handelVehicleSlection}
        value={value}
        disabled={disabled}
        selected={selected}
      />
      <span>({count})</span>
    </div>
  );
};

VehicleSelector.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  handelVehicleSlection: PropTypes.func,
  vehicleSelection: PropTypes.string,
  count: PropTypes.number,
  disabled: PropTypes.bool,
  selected: PropTypes.string
};

export default VehicleSelector;
