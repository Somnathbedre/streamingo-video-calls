// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Layout = ({ children, showSidebar = false }) => {
//   return (
//     <div className="min-h-screen">
//       <div className="flex">
//         {showSidebar && <Sidebar />}

//         <div className="flex-1 flex flex-col">
//           <Navbar />

//           <main className="flex-1 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Layout;






// by gpt responsive 
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Mobile Sidebar */}
        {showSidebar && isSidebarOpen && (
          <div className="fixed z-40 inset-0 lg:hidden bg-black bg-opacity-50" onClick={toggleSidebar}>
            <aside
              className="absolute left-0 top-0 w-64 h-full bg-base-100 shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        {showSidebar && (
          <aside className="hidden lg:block lg:w-64 border-r border-base-300">
            <Sidebar />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-3 py-2 sm:px-6 sm:py-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;


