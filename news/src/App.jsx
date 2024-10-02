import { Outlet } from "react-router-dom";
import Headers from "./Components/Headers";
import NewsProvider from "./Context/Newscontext";


function App() {
  
  return (
    <NewsProvider>
      <div className="">
        <Headers />
        <div className="mx-10 m-auto my-10">
          <Outlet />
        </div>
      </div>
    </NewsProvider>
  );
}

export default App;
