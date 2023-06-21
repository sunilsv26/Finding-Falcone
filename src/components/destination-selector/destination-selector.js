import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "../form/select";
import VehicleSelector from "../vehicle-selector/vehicle-selector";

import { updateOptions } from "../../redux/slices/destintions";
import { updateVehicleStatus } from "../../redux/slices/vehicles";

const Selector = ({ destination }) => {
  const dispatch = useDispatch();
  const options = useSelector((state) => state?.destintions?.options);
  const vehicles = useSelector((state) => state?.vehicles?.data);
  const destinationSelection = useSelector(
    (state) => state?.destintions?.selection[destination.name]
  );
  const vehicleSelection = useSelector(
    (state) => state?.vehicles?.selection[destination.name]
  );
  const [availableOpts, setAvailableOpts] = useState([]);

  useEffect(() => {
    let opts = options.filter(
      (op) => op.selected === false || op.value === destinationSelection
    );
    setAvailableOpts(opts);
  }, [options, destinationSelection]);

  const handelDestinationSelection = (e) => {
    const { value, name } = e.target;
    dispatch(updateOptions({ value, name }));
    dispatch(updateVehicleStatus({ name: destination.name, value: "" }));
  };

  const handelVehicleSlection = (e) => {
    const { name, value } = e.target;
    dispatch(updateVehicleStatus({ name, value }));
  };

  const getVehicleDisableStatus = useCallback(
    ({ name, count, max_distance }) => {
      let isDisbled = false;
      if (vehicleSelection !== name && count === 0) {
        isDisbled = true;
      }
      const planetDistance = options.filter(
        (op) => op.value === destinationSelection
      )[0]?.distance;

      if (max_distance < planetDistance) {
        isDisbled = true;
      }

      return isDisbled;
    },
    [vehicleSelection, destinationSelection, options]
  );

  return (
    <>
      <div>
        <Select
          label={destination.label}
          name={destination.name}
          id={destination.id}
          options={availableOpts}
          value={destinationSelection}
          onChange={handelDestinationSelection}
        />
        {destinationSelection
          ? vehicles.map((v) => {
              return (
                <VehicleSelector
                  key={v.name}
                  title={v.title}
                  name={destination.name}
                  id={`${destination.name}_${v.name}`}
                  handelVehicleSlection={handelVehicleSlection}
                  value={v.name}
                  disabled={getVehicleDisableStatus({
                    name: v.name,
                    count: v.count,
                    max_distance: v.max_distance
                  })}
                  count={v.count}
                  selected={vehicleSelection}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

Selector.propTypes = {
  destination: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
      })
    )
  })
};

export default Selector;
