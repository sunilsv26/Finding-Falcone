import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./success.module.css";

import { resetVehicleSelections } from "../redux/slices/vehicles";
import { resetDestinationSelection } from "../redux/slices/destintions";

const Success = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleStartAgain = () => {
    dispatch(resetVehicleSelections());
    dispatch(resetDestinationSelection());
    navigate("/");
    localStorage.setItem("timeTaken", "");
    localStorage.setItem("planet_name", "");
  };
  return (
    <section className={classes.success}>
      <h1>Finding Falcone</h1>
      <div>
        {type === "success" ? (
          <p>
            Succes! Congratulations on Finding Falcone. King Shan is mighty
            pleased.
          </p>
        ) : (
          <p>Failure! Failed to find Falcone</p>
        )}
        {type === "success" ? (
          <>
            {" "}
            <p>Time Taken:{localStorage.getItem("timeTaken") || 0}</p>
            <p>Planet Found:{localStorage.getItem("planet_name") || ""}</p>
          </>
        ) : null}

        <div>
          <button onClick={handleStartAgain}>Start Again</button>
        </div>
      </div>
    </section>
  );
};

export default Success;
