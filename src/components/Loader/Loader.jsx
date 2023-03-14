import PropTypes from "prop-types";

const useStyles = () => ({
  container: {
    position: "absolute",
    top: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.20)",
  },
});

function Loader({ isLoading }) {
  const styles = useStyles();

  if (isLoading)
    return (
      <div style={styles.container} className="some-class">
        <h1>Loading...</h1>
      </div>
    );
  else return <></>;
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
