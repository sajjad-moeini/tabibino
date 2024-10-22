"use client"

import React from 'react'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type props = {
   value: string
   setValue: (e: string) => void
}

function CustomDatePicker({ setValue, value}: props) {
   return (
      <div className='flex  w-full  justify-start ps-[15%] gap-4 items-center  '>
         <div className=" text-xl md:text-2xl transition-all text-gray-500">
            تاریخ تولد
         </div>
         <DatePicker
            value={value}
            minDate={new Date()}
            weekStartDayIndex={1}
            calendar={persian}
            locale={persian_fa}
            onChange={(e: DateObject) => {
               setValue(e.convert(persian).format());
            }} />
      </div>

   )
}

export default CustomDatePicker