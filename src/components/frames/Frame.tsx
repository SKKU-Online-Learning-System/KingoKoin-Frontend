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
        <main className="flex items-center py-16 justify-center bg-surface rounded-tl-lg flex-grow">
          <div className="flex flex-col gap-6 w-[1152px] min-h-screen">
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
