// Client/src/components/ContactInformation.tsx
import React from "react";
import { GuestContactProps } from "./guestDetailTypes";

type PlusOneInformationProps = GuestContactProps & {
  plus_one_allowed: boolean;
};

const PlusOneInformation: React.FC<PlusOneInformationProps> = ({
  //   register,
  //   errors,
  //   labelClass,
  //   inputClass,
  plus_one_allowed,
}) => {
  if (plus_one_allowed) {
    return <div>Good Job, you are allowed a guest! Yay!</div>;
  }

  return <div></div>;
};

export default PlusOneInformation;

// {!plusOneAllowed && (
//     <div className="flex items-center justify-center text-center w-full py-5">
//       <p className="md:w-[50%]">
//         We are very sorry,we have to limit the number of guests at our
//         wedding due to budget and space. As such, you are not eligible to
//         bring a plus one. Please read the{" "}
//         <a href="/faq" className="text-blue-500 underline">
//           FAQ
//         </a>{" "}
//         for more information.
//       </p>
//     </div>
//   )}
//   {plusOneAllowed && <div>Good Job, you are allowed a guest! Yay!</div>}
