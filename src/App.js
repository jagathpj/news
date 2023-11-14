import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Details from "./Pages/Details";
import { useEffect, useState } from "react";

function App() {

  const [searchResults, setsearchResults] = useState([]);

  const [category, setcategory] = useState("Top");

  return (
    <>
      <Header
        setsearchResults={setsearchResults}
        setcategory={setcategory}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchResults={searchResults}
              category={category}
            ></Home>
          }
        ></Route>
        <Route path="/details" element={<Details></Details>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}
export default App;
