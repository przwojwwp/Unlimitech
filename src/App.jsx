import { Header } from "./components/Header/Header";
import { Banner } from "./components/Banner/Banner";
import { Categories } from "./components/Categories/Categories";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Categories />
      </main>
    </>
  );
};
