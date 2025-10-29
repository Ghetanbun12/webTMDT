import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";

export default function App() {
  return (
    <>
    <Header/>
    <Login/>
    <Register/>
    </>
  );
}
