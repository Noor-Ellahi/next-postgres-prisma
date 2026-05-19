'use client'
import { useState } from "react";
import { BiMenu, BiPlus, BiCheckbox, BiCheckboxChecked, BiChevronRight } from "react-icons/bi";




const Home = () => {

  const [menu , setMenu] = useState(false)


  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-400">

      <div className={`w-[80%] flex rounded-tr-xl ${menu ? "" : "p-5"} rounded-tl-xl bg-[#FAFAFA] h-[90%]`}>
        <div className={`w-[25%] p-5 ${menu ? 'hidden' : ''}  bg-[#F2F2F2]`}>
          <div className="flex justify-between">
            <h3 className="text-xl">Menu</h3>
            <BiMenu className="text-3xl text-[#7C7C7C]" onClick={() => setMenu(!menu)}/>
          </div>
        </div>
        <div className="h-full w-[100%]">
          <div className={`pl-10 pt-9 ${menu ? '' : 'pl-0 pt-[0px]'}`}>
            <div className="flex gap-25 items-center">
              <BiMenu className={`text-3xl ${menu ? "" : "hidden"} text-[#7C7C7C]`} onClick={() => setMenu(!menu)}/>
              <div className="flex gap-9">
                <h1 className="text-5xl">Today</h1>
                <h2 className="text-3xl px-3 py-1 rounded-lg border-2 border-[#F3F3F3]">5</h2>
              </div>
            </div>
          </div>

          <div className="h-[90%] pt-10 flex justify-end pr-15">
            <div className={`w-[85%]  ${menu ? "" : "w-[100%] pl-10"} `}>
              <div className="relative w-full text-[#7c7c7c]">
                <BiPlus className="absolute left-5 top-1/2 text-lg -translate-y-1/2" />

                <input
                  type="text"
                  placeholder="Add New task"
                  className="pl-12 border-2 outline-none border-[#F3F3F3] p-3 w-full rounded-sm"
                />
              </div>
              <ul className="flex text-[15px] flex-col gap-6 text-[#444444] p-4">
                <li className="flex  justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex  justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex  justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex  justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex  justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      {/* {JSON.stringify(tests , null, 2)} */}
      {/* <h1>hi</h1> */}
    </div>
  )
}

export default Home;

