import { Outlet } from "react-router-dom";
import Headers from "./Components/Headers";

function App() {
  return (
    <div className="">
      <Headers />
      <div className="mx-10 m-auto my-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
