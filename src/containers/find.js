import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import DestinationSelector from "../components/destination-selector/destination-selector";
import Loader from "../components/loader/loader";

import { getAPICall, postAPICall } from "../utils/api-client";
import { setInitial } from "../redux/slices/destintions";
import { setVehicles } from "../redux/slices/vehicles";

import classNames from "./find.module.css";

const Find = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state?.destintions?.destintions);
  const vehicleSelection = useSelector((state) => state?.vehicles?.selection);
  const vehicles = useSelector((state) => state?.vehicles?.data);
  const destinationSelection = useSelector(
    (state) => state?.destintions?.selection
  );
  const planets = useSelector((state) => state?.destintions?.options);
  const [loading, setLoading] = useState(true);
  const [hasError, setError] = useState("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getPlanets = async () => {
      try {
        const planetsResp = await getAPICall(
          "https://findfalcone.geektrust.com/planets"
        );
        dispatch(setInitial({ planets: planetsResp, destinations }));
        const vehicles = await getAPICall(
          "https://findfalcone.geektrust.com/vehicles"
        );
        dispatch(setVehicles({ data: vehicles }));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Failed to get Planets/Vehicles data !");
      }
    };
    getPlanets();
  }, [destinations, dispatch]);

  useEffect(() => {
    let takenTime = 0;
    let count = 0;
    destinations.forEach((d) => {
      let speed;
      let distance;
      if (vehicleSelection[d.name]) {
        count = count + 1;
        speed = vehicles.filter((v) => v.name === vehicleSelection[d.name])[0]
          ?.speed;
      }
      if (destinationSelection[d.name]) {
        distance = planets.filter(
          (p) => p.name === destinationSelection[d.name]
        )[0]?.distance;
      }
      if (speed && distance) {
        takenTime = takenTime + distance / speed;
      }
    });
    setTimeTaken(takenTime);
    setDisabled(count < 4);
  }, [destinationSelection, vehicleSelection, destinations, planets, vehicles]);

  const getPlaneAndVehicleNames = () => {
    const planet_names = [];
    const vehicle_names = [];
    Object.values(vehicleSelection).forEach((val) => {
      vehicle_names.push(val);
    });
    Object.values(destinationSelection).forEach((val) => {
      planet_names.push(val);
    });
    return { planet_names, vehicle_names };
  };

  const checkResult = (result) => {
    const { error, status, planet_name } = result;
    if (error) {
      alert("Try Again!");
    }
    if (status === "success") {
      navigate("/success");
      localStorage.setItem("timeTaken", timeTaken);
      localStorage.setItem("planet_name", planet_name);
    } else {
      navigate("/fail");
      localStorage.setItem("timeTaken", "");
      localStorage.setItem("planet_name", "");
    }
  };

  const handelFindFalcon = async () => {
    setLoading(true);
    try {
      const getToken = await postAPICall(
        "https://findfalcone.geektrust.com/token",
        {}
      );
      if (getToken.token) {
        const { planet_names, vehicle_names } = getPlaneAndVehicleNames();
        const result = await postAPICall(
          "https://findfalcone.geektrust.com/find",
          {
            token: getToken.token,
            planet_names,
            vehicle_names
          }
        );
        if (result) {
          setLoading(false);
          checkResult(result);
        }
      }
    } catch (error) {
      setLoading(false);
      alert("Try Again!");
    }
  };

  return (
    <>
      {!hasError ? (
        <section className={classNames.find}>
          <Loader loading={loading} />
          <h1 className={classNames.heading}>Finding Falcone</h1>
          <h2 className={classNames.heading}>
            {" "}
            Select planets you want to search in:{" "}
          </h2>
          <form className={classNames.form}>
            {destinations.map((destination) => {
              return (
                <DestinationSelector
                  key={destination.name}
                  destination={{
                    label: destination.label,
                    name: destination.name,
                    id: destination.id
                  }}
                />
              );
            })}
            <h3 className={classNames.timeTaken}>Time Taken: {timeTaken}</h3>
          </form>
          <div className={classNames.findfalcon}>
            <button disabled={isDisabled} onClick={handelFindFalcon}>
              Find Falcone
            </button>
          </div>
        </section>
      ) : (
        <h4>{hasError}</h4>
      )}
    </>
  );
};

Find.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

Find.defaultProps = {
  destinations: []
};

export default Find;
