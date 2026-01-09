import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
export default function App() {
  const [dataSearch, setDataSearch] = React.useState([]);
  return (
    <>
    <Header onSearch={setDataSearch} />
    <Outlet />
    <Footer/>
    </>
  );
}
