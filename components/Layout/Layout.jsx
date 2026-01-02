import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Projects from "../Projects/Projects";

const Layout = () => {
  return (
    <div className="appWrapper">
      <Header />
      <main>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
