import PropTypes from "prop-types";

import classes from "./loader.module.css";

const loader = ({ loading }) => {
  return loading ? (
    <div className={classes.loader}>
      <div className={classes.spinner}></div>
    </div>
  ) : null;
};

loader.proptypes = {
  loading: PropTypes.bool
};

export default loader;
