import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchColors } from "./app/slices/colorsSlice";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  return <HomePage />;
}

export default App;
