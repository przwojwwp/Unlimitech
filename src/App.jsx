import { Header } from "./components/Header/Header";
import { Banner } from "./components/Banner/Banner";
import { Categories } from "./components/Categories/Categories";
import { Products } from "./components/Products/Products";
import { Newsletter } from "./components/Newsletter/Newsletter";
import "./app.less";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        {/* <Banner /> */}
        {/* <Categories /> */}
        {/* <Products /> */}
        <Newsletter />
      </main>
    </>
  );
};
