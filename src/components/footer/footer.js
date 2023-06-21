import classNames from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classNames.pageFooter}>
      <p>
        Coding Platform -
        <span>
          {" "}
          <a href="https://www.geektrust.com" target="_blank" rel="noreferrer">
            https://www.geektrust.com/finding-falcone{" "}
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
