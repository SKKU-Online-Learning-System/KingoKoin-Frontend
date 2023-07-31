import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface FrameProps {
  children?: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <>
      <Header />
      <div className="flex bg-primary pt-16">
        <Sidebar />
        <main className="flex flex-col items-center bg-surface rounded-tl-lg flex-grow">
          <div className="w-[1152px] min-h-screen py-8">
            <Outlet />
          </div>
        </main>
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Frame;
