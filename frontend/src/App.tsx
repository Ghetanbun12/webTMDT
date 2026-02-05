import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";  // THÊM .tsx
import Footer from "./components/Footer.tsx";  // THÊM .tsx

export type SearchContextType = {
  dataSearch: any[];
};

export default function App() {
  const [dataSearch, setDataSearch] = React.useState<any[]>([]);

  return (
    <>
      <Header onSearch={setDataSearch} />
      <Outlet context={{ dataSearch }} />
      <Footer />
    </>
  );
}