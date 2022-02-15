let Loader = (props) => (
  <div className={props.isSmall ? "" : "loader"}>
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
