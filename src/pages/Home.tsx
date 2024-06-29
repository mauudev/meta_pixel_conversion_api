import { AddToCartButton } from "../components/AddToCartButton";

const Home = () => {
  return (
    <div id="Home" style={{ height: "800px" }}>
      <h1 style={{ fontSize: "50px", padding: "20%" }}>Home</h1>
      <AddToCartButton product={{ id: "123", name: "Product Name" }} />
    </div>
  );
};

export default Home;
