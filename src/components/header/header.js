import { useDispatch } from "react-redux";

import { resetVehicleSelections } from "../../redux/slices/vehicles";
import { resetDestinationSelection } from "../../redux/slices/destintions";

import classNames from "./header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetVehicleSelections());
    dispatch(resetDestinationSelection());
  };

  return (
    <header className={classNames.pageheader}>
      <button className={classNames.resetbtn} onClick={handleReset}>
        Reset
      </button>
      |
      <a href="https://www.geektrust.com/" target="_blank" rel="noreferrer">
        Geek Trust Home
      </a>
    </header>
  );
};

export default Header;
