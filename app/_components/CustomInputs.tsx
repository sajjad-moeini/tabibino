import { useState } from "react";
import { InputsNames } from "../utils/InputsNames";
import CustomDatePicker from "./DatePicker";

type Props = {
   title: string | number;
   setTitle: (e: string) => void;
   inputName: string;
   type: "text" | "number";
   placeholder: string;
};

function CustomInputs({ title, setTitle, inputName, type, placeholder }: Props) {
   const [isForeign, setIsForeign] = useState(false);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isForeign) {
         setTitle(e.target.value);
      }
   };

   const handleCheckboxChange = () => {
      setIsForeign((prev) => !prev);
   };

   return (
      <div className="relative my-5 w-full flex justify-center items-center">
        {
        InputsNames.birthDay !== inputName  && (
         <>
         <input
          type={type}
          placeholder={inputName == InputsNames.phoneNumber ? "91" : placeholder }
          className={`border w-9/12 ${isForeign ? "bg-gray-300" : "bg-gray-300"} border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-blue-300 placeholder-center text-base text-[#2a2e33] my-3 ${inputName === InputsNames.phoneNumber ? "ps-[15%]" : ""}`}
          value={title}
          onChange={handleInputChange}
          onFocus={(e) => isForeign && e.preventDefault()}
          dir={inputName == InputsNames.phoneNumber ? "ltr" : "rtl"}
       />
       <label className="absolute right-[15%] text-xl md:text-2xl transition-all top-[-10%] bg-gray-300 text-gray-500">
       {inputName}
    </label>
         </>
        )
        }
        

         {inputName === InputsNames.nationalCode && (
            <div className="absolute left-[15%] top-[-10px] flex items-center gap-1">
               <input type="checkbox" onChange={handleCheckboxChange} />
               <span>اتباع خارجی هستم</span>
            </div>
         )}
         {inputName === InputsNames.phoneNumber && (
            <div className="absolute left-[15%] top-4 flex items-center gap-1">
               <select className="outline-none focus:outline-none py-2 bg-gray-300" dir="ltr">
                  <option value="-1">+98</option>
                  <option value="1">+46</option>
                  <option value="2">+36</option>
               </select>
            </div>
         )}
           {inputName === InputsNames.birthDay && (
              <div className="absolute w-full h-full right-0 top-3">
               <CustomDatePicker  value={title as string} setValue={setTitle}  />
              </div>
         )}
      </div>
   );
}

export default CustomInputs;
