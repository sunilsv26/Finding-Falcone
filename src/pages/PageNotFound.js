import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  const gotToHome = () => {
    navigate("/");
  };
  return (
    <div className="notFound">
      <h2>Page Not Fond !</h2>
      <button onClick={gotToHome}>Go to home</button>
    </div>
  );
};

export default Notfound;
