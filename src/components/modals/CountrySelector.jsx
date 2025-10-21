// "use client";
// import { useCountry } from "@/hooks/useCountry";
// import { countries } from "@/lib/constants";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function CountrySelector() {
//   const { country, selectCountry } = useCountry();
//   const [open, setOpen] = useState(!country);
//   const router = useRouter();

//   const handleSelect = (c) => {
//     selectCountry(c.code);
//     setOpen(false);
//     router.push(`/${c.locale}/homepage?dispatchCountry=${c.code}`);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-96 p-6 space-y-3 shadow-xl overflow-y-auto max-h-[80vh]">
//         <h2 className="text-xl font-bold mb-2">CHOOSE YOUR COUNTRY/REGION</h2>
//         <div className="text-gray-500 text-sm mb-3">Vela Noire</div>
//         <ul className="space-y-2">
//           {countries.map((c) => (
//             <li key={c.code}>
//               <button
//                 className="w-full p-2 rounded hover:bg-gray-100 transition"
//                 onClick={() => handleSelect(c)}
//               >
//                 {c.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
