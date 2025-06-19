// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   // const queryClient = useQueryClient();
//   // const { mutate: logoutMutation } = useMutation({
//   //   mutationFn: logout,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   const { logoutMutation } = useLogout();

//   return (
//     <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-end w-full">
//           {/* LOGO - ONLY IN THE CHAT PAGE */}
//           {isChatPage && (
//             <div className="pl-5">
//               <Link to="/" className="flex items-center gap-2.5">
//                 <ShipWheelIcon className="size-9 text-primary" />
//                 <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//                   Streamingo
//                 </span>
//               </Link>
//             </div>
//           )}

//           <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//             <Link to={"/notifications"}>
//               <button className="btn btn-ghost btn-circle">
//                 <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//               </button>
//             </Link>
//           </div>

//           {/* TODO */}
//           <ThemeSelector />

//           <div className="avatar">
//             <div className="w-9 rounded-full">
//               <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
//             </div>
//           </div>

//           {/* Logout button */}
//           <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
//             <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;






// by gpt responsive and delete acc
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  LogOutIcon,
  MenuIcon,
  ShipWheelIcon,
  Trash2Icon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { deleteAccount, logout } from "../lib/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = ({ toggleSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { logoutMutation } = useLogout();

  const isChatPage = location.pathname?.startsWith("/chat");

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await deleteAccount();
      await logout();
      queryClient.clear();
      window.location.href = "/login";
    } catch (err) {
      toast.error("Failed to delete account");
      console.error(err);
    }
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-40 h-16 flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {isChatPage && (
              <Link to="/" className="flex items-center gap-2">
                <ShipWheelIcon className="w-7 h-7 text-primary" />
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamingo
                </span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-base-content opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar">
              <div className="w-8 sm:w-9 rounded-full">
                <img
                  src={authUser?.profilePic || "public/default-avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </div>

            <button
              className="btn btn-ghost btn-circle"
              onClick={() => logoutMutation(undefined)}
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5 sm:w-6 sm:h-6 text-base-content opacity-70" />
            </button>

            <button
              className="btn btn-ghost btn-circle"
              onClick={handleDeleteAccount}
              title="Delete Account"
            >
              <Trash2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-error opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

