import "../App.css";
import Articles from "./Articles";
import Hero from "./Hero";

function App(props) {
  return (
    <>
      {props.isUserLogged ? "" : <Hero />}
      <Articles />
    </>
  );
}

export default App;
