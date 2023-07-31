import Header from "./Header";
import Footer from "./Footer";
import { useMatch, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Frame = ({ children }: { children?: React.ReactNode }) => {
  const match = useMatch("/main");

  return (
    <>
      <Header />
      <div className="flex bg-primary pt-16">
        {!match && <Sidebar />}
        <main className="bg-surface rounded-tl-lg flex-grow">
          <Outlet />
        </main>
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Frame;
