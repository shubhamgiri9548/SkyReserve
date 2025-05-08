// import { Link } from 'react-router-dom';
// import icon from '../assets/indigoicons22.png';
// import { useSelector } from 'react-redux';

// const navLinkClasses =
//   "relative transition-all duration-300 ease-in-out hover:text-yellow-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300";

//   const authButtonClasses = "px-3 py-2 rounded-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105";

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);  // Updated selector

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       {/* Left - Logo */}
//       <div className="flex flex-row items-center gap-2">
//           <img
//             src={icon}
//             alt="SkyReserve Logo Icon"
//             className="h-10 w-auto rounded-lg shadow-sm"
//           />
//           <Link
//             to="/"
//             className="font-extrabold text-3xl text-gray-900 transition duration-200"
//           >
//             SkyReserve
//           </Link>
//         </div>


//       {/* Center - Main Links */}  
//       <div className="flex-1 flex justify-center space-x-8 text-lg">
//         <Link to="/" className={navLinkClasses}>Home</Link>
//         <Link to="/flights" className={navLinkClasses}>Flights</Link>
//         <Link to="/about" className={navLinkClasses}>About</Link>
//         <Link to="/contact" className={navLinkClasses}>Contact</Link>
//       </div>

      
//       {/* Right - Auth Links or User Avatar */}
//         {!user ? (
//           <div className="space-x-6 text-lg">
//             <Link to="/login"  className={authButtonClasses} >Login</Link>
//             <Link to="/signup" className={authButtonClasses}>Sign Up</Link>
//           </div>
//         ) : (
//           <Link
//             to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
//             className="flex items-center gap-3"
//           >
//             <img
//               src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name} `}
//               alt="User Avatar"
//               className="h-10 w-10 rounded-full border-2 border-white shadow-md"
//             />
//             <span className="font-medium text-white">{user.name}</span>
//           </Link>
//         )}

//     </nav>
//   );
// };

// export default Navbar;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/indigoicons22.png';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react'; // install lucide-react or use any icon library

const navLinkClasses =
  "relative transition-all duration-300 ease-in-out hover:text-yellow-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300";

const authButtonClasses =
  "px-3 py-2 rounded-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <img
            src={icon}
            alt="SkyReserve Logo Icon"
            className="h-10 w-auto rounded-lg shadow-sm"
          />
          <Link
            to="/"
            className="font-extrabold text-3xl text-gray-900 transition duration-200"
          >
            SkyReserve
          </Link>
        </div>

        {/* Hamburger - Mobile only */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg">
          <Link to="/" className={navLinkClasses}>Home</Link>
          <Link to="/flights" className={navLinkClasses}>Flights</Link>
          <Link to="/about" className={navLinkClasses}>About</Link>
          <Link to="/contact" className={navLinkClasses}>Contact</Link>
        </div>

        {/* Right side auth/user - Desktop only */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {!user ? (
            <>
              <Link to="/login" className={authButtonClasses}>Login</Link>
              <Link to="/signup" className={authButtonClasses}>Sign Up</Link>
            </>
          ) : (
            <Link
              to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
              className="flex items-center gap-3"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-white shadow-md"
              />
              <span className="font-medium text-white">{user.name}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg">
          <Link to="/" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/flights" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Flights</Link>
          <Link to="/about" className={navLinkClasses} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className={navLinkClasses} onClick={() => setMenuOpen(false)}>Contact</Link>

          {!user ? (
            <div className="space-y-2 pt-2">
              <Link to="/login" className={authButtonClasses} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className={authButtonClasses} onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </div>
          ) : (
            <Link
              to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
              className="flex justify-center items-center gap-3 pt-4"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-white shadow-md"
              />
              <span className="font-medium text-white">{user.name}</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
