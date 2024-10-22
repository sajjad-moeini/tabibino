"use client"
import React, { useState } from "react";
import CustomInputs from "./CustomInputs";
import { InputsNames } from "../utils/InputsNames";
import PlusIcon from "./Icons/PlusIcon";
import TrashIcon from "./Icons/TrashIcon";
import axios from "axios";
import { http } from "../configs/axiosConfig";

function DoctorRegister() {
   const [name, setName] = useState<string>("");
   const [family, setFamily] = useState<string>("");
   const [nationalCode, setNationalCode] = useState<number | undefined>(undefined);
   const [PhoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
   const [birthDay, setBirthDay] = useState<string>(new Date().toISOString());
   const [medicaLSystemNumber, setMedicaLSystemNumber] = useState<string>("");
   const [gender, setGender] = useState<string>("");

   const [sections, setSections] = useState([
      { doctorType: "", universityName: "", GraduationYear: "" },
   ]);
   const addSection = () => {
      setSections((prevSections) => [
         ...prevSections,
         { doctorType: "", universityName: "", GraduationYear: "" },
      ]);
   };
   const handleInputChange = (index: number, field: string, value: string | number) => {
      const updatedSections = sections.map((section, i) =>
         i === index ? { ...section, [field]: value } : section
      );
      setSections(updatedSections);
   };
   const sendDataToAPI = () => {
      if (PhoneNumber as number > 0 && medicaLSystemNumber.length > 0 && sections.length > 0) {
         const data = {
            name,
            family,
            nationalCode,
            PhoneNumber,
            birthDay,
            medicaLSystemNumber,
            gender,
            sections
         }
         http.post("/registerDoctor", data)
            .then((response) => {
               console.log(response);
            })
            .catch(err => {
               console.log(err)
            })
      } else {
         console.log("fill the field correctly")
      }

   };
   const deleteSection = (index: number) => {
      const updatedSections = sections.filter((section, i) => {
         if (index !== i) {
            return section;
         }
      })
      setSections(updatedSections)
   }


   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2  px-4 md:px-16 lg:px-24 border-b border-b-black py-10 " dir="rtl">
            <CustomInputs type="text" title={name} setTitle={setName} placeholder="نام خود را وارد کنید" inputName={InputsNames.name} />
            <CustomInputs type="text" title={family} setTitle={setFamily} placeholder="نام خانوادگی خود را وارد کنید" inputName={InputsNames.familyName} />
            <CustomInputs
               type="number"
               title={nationalCode || ""}
               setTitle={(e) => setNationalCode(Number(e))}
               placeholder="کدملی خود را وارد کنید"
               inputName={InputsNames.nationalCode}
            />
            <CustomInputs
               type="number"
               title={PhoneNumber || ""}
               setTitle={(e) => setPhoneNumber(Number(e))}
               placeholder="شماره موبایل خود را وارد کنید"
               inputName={InputsNames.phoneNumber}
            />
            <CustomInputs
               type="text"
               title={birthDay}
               setTitle={(e) => setBirthDay(e)}
               placeholder=""
               inputName={InputsNames.birthDay}
            />
            <CustomInputs type="text" title={medicaLSystemNumber} setTitle={setMedicaLSystemNumber} placeholder="شماره نظام پزشکی خود را وارد کنید" inputName={InputsNames.medicaLSystemNumber} />
            <select className=" border w-9/12 mx-auto py-2 px-4 rounded-lg outline-none focus:outline-none border-gray-500 " onChange={e => {
               setGender(e.target.value)
            }} value={gender}>
               <option value="-1">
                  جنسیت
               </option>
               <option value="men">
                  مرد
               </option>
            </select>
         </div>
         <div>
            <div className="flex justify-between items-center px-4 md:px-24 py-10 bg-white">
               <button
                  className="flex justify-around items-center gap-2 bg-green-200 px-2 md:px-4 py-1 md:py-2 rounded-lg"
                  onClick={addSection}
               >
                  <PlusIcon />
                  <span className="text-xl md:text-2xl">افزودن</span>
               </button>
               <div className="text-xl md:text-3xl font-semibold">تخصص ها</div>
            </div>

            {sections.map((section, index) => (
               <div className="border-b border-b-black py-5" key={index}>
                  <div
                     className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-24  py-5"
                     dir="rtl"
                  >
                     <CustomInputs
                        type="text"
                        title={section.doctorType}
                        setTitle={(value) => handleInputChange(index, "doctorType", value)}
                        placeholder="نوع مدرک خود را وارد کنید"
                        inputName="نوع مدرک"
                     />
                     <CustomInputs
                        type="text"
                        title={section.universityName}
                        setTitle={(value) => handleInputChange(index, "universityName", value)}
                        placeholder="نام دانشگاه خود را وارد کنید"
                        inputName="نام دانشگاه"
                     />
                     <CustomInputs
                        type="number"
                        title={section.GraduationYear || ""}
                        setTitle={(value) => handleInputChange(index, "GraduationYear", Number(value))}
                        placeholder="سال فارغ التحصیلی خود را وارد کنید"
                        inputName="سال فارغ التحصیلی"
                     />
                  </div>
                  <div className="px-4 md:px-16 lg:px-24">
                     <button
                        className="flex justify-around items-center gap-2 bg-red-400 px-2 md:px-4 py-1 md:py-2 rounded-lg"
                        onClick={() => { deleteSection(index) }}
                     >
                        <TrashIcon />
                        <span className="text-xl md:text-2xl">حذف</span>
                     </button>
                  </div>
               </div>
            ))}

            <div className="flex justify-center py-6">
               <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                  onClick={sendDataToAPI}
               >
                  ارسال اطلاعات
               </button>
            </div>
         </div>
      </>
   );
}

export default DoctorRegister;
