import { useOutletContext } from "react-router-dom";
interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  bestSeller: boolean;
}
interface OutletContextType {
  dataSearch: Product[];
}
const SearchProductsPage = () => {
  const { dataSearch } = useOutletContext<OutletContextType>();

  return (
    <div>
      <h1>Search Products</h1>

      {dataSearch.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {dataSearch.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProductsPage;
