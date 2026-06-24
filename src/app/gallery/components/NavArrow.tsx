// "use client";

// import React from "react";
// import Image from "next/image";

// interface NavArrowProps {
//   onClick: () => void;
//   isActive?: boolean;
// }

// const NavArrow: React.FC<NavArrowProps> = ({ onClick, isActive }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`relative w-[90px] h-[90px] focus:outline-none ${
//         isActive ? "ring-4 ring-yellow-400" : ""
//       }`}
//     >
//       <Image
//         src="/navArrow.png"
//         alt="Gallery Arrow"
//         width={1000}
//         height={1000}
//         className="w-full h-full object-contain"
//       />
//     </button>
//   );
// };

// export default NavArrow;



"use client";

import React from "react";
import Image from "next/image";

interface NavArrowProps {
  onClick: () => void;
  isActive?: boolean;
}

const NavArrow: React.FC<NavArrowProps> = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-[90px] h-[70px] transition-transform duration-300 ease-in-out ${
        isActive ? "-translate-x-3" : "translate-x-0"
      }`}
    >
      <Image
        src="/navArrow.png"
        alt="Nav Arrow"
        width={1000}
        height={1000}
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default NavArrow;
