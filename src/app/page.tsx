'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { BiMenu, BiPlus, BiCheckbox, BiCheckboxChecked, BiChevronRight, BiSearch, BiCalendar, BiListOl, BiGridSmall, BiSolidSquare, BiLogOut, BiCross } from "react-icons/bi";
import { GrClose, GrDown } from "react-icons/gr";
import Calendar from "@/component/DateComp/DateComp";
import { toast } from "sonner";

// Comp



const Home = () => {
  type ListType = {
    id: string
    name: string
  }
  type TodoType = {
    id: string
    title: string
    description: string
    completed: boolean
    dueDate: string | null
    userId: string
    listId: string | null
  }


  const colors = [
    '#96a4f7ff', '#FE6A6E', '#68D9E7', '#FED44D', '#B4FEB6', '#A580A4'
  ]

  const [menu, setMenu] = useState(false)
  const [taskMenu, setTaskMenu] = useState(false)
  const [listData, setListData] = useState<ListType[] | null>(null)
  const [selectList, setSelectList] = useState<string | null>(null)

  const [popup, setPopup] = useState(false)
  const [dropper, setDropper] = useState(false)
  const [dueDate, setDueDate] = useState<Date>()

  const [openCalendar, setOpenCalendar] = useState(false)

  const [todo, setTodo] = useState<TodoType[]>([])

  const [task, setTask] = useState(null)



  const [title, setTitle] = useState('')


  const getList = async () => {
    try {
      const res = await axios.get(
        '/api/list',
        { withCredentials: true }


      )
      setListData(res.data.list)
      // console.log(res.data)
    } catch (error) {
      console.log("error ouccured", error)
    }
  }


  const makeTodo = async () => {
    try {
      const res = await axios.post(
        '/api/task', {
        title
      }
      )
      toast.success("Task Added!")
      getTodo()
      setTitle('')
    } catch (error: any) {
      toast.error(error.response?.data?.error)
    }
  }

  const getTodo = async () => {
    try {
      const res = await axios.get(
        '/api/task',
      )
      console.log(res)
      // setTodo(res.data.todos.reverse())
      setTodo([...res.data.todos].reverse())
    } catch (error: any) {
      toast.error(error.response?.data?.error)
    }
  }


  useEffect(() => {
    getList()
    getTodo()
  }, [])

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-400">

      <div className={`w-[80%] flex rounded-tr-xl ${menu ? "" : "p-5"} rounded-tl-xl bg-[#FAFAFA] h-[90%]`}>

        <div className={`w-[25%] flex flex-col justify-between p-5 ${menu ? 'hidden' : ''}  bg-[#F2F2F2]`}>

          <div>
            <div className="flex justify-between">
              <h3 className="text-xl">Menu</h3>
              <BiMenu className="text-3xl text-[#7C7C7C]" onClick={() => {
                setMenu(!menu)
                setPopup(false)
              }} />
            </div>

            <div className="relative flex flex-col mt-7.5">
              <input type="text" className="pl-10 py-2 border outline-none border-[#DCDCDC] rounded-sm" placeholder="Seacrh" />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2">
                <BiSearch />
              </span>
            </div>

            <div className="mt-7.5">
              <div>
                <ul className="text-[16px] flex gap-1 flex-col">
                  <li className="text-[12px] text-[#44556B] font-bold">TASKS</li>
                  <li className=" text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[#EBEBEB] mt-1"><BiGridSmall className="text-xl" /> All tasks</li>
                  <li className="text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[#EBEBEB]"><BiListOl className="text-xl" /> Today</li>
                  <li className="text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[#EBEBEB]"><BiCalendar className="text-xl" />Calender</li>
                </ul>
                {/* #E3E2E1 */}
              </div>
            </div>

            <div className="mt-7.5">
              <div>
                <ul className="text-[16px] flex gap-1 flex-col">
                  <li className="text-[12px] text-[#44556B] font-bold">LISTS</li>
                  {
                    listData?.map((items, index) => {
                      // console.log(items.name)
                      return (
                        <li key={index} className={` text-[#7C7C7C] p-2 flex justify-between items-center  hover:bg-[#Ebebeb] ${index == 0 ? 'mt-1' : ''} `}>
                          <div className="flex items-center gap-3">
                            <BiSolidSquare style={{ color: colors[index] }} className={` rounded-xl text-xl`} /> {items.name}
                          </div>
                          <span className="text-xs px-2 font-bold text-[#444964] rounded-[3px] bg-[#E3e2e1]">
                            5
                          </span>
                        </li>
                      )
                    })
                  }
                  {
                    popup ?
                      (
                        <div className=" p-3 bg-[#Ebebeb]">
                          <input type="text" placeholder="List name" className="text-sm text-[#7c7c7c] w-full outline-none border  border-[#7c7c7c] p-1 rounded" />
                          <div className="flex text-sm text-[#7c7c7c] justify-between">
                            <button onClick={() => setPopup(false)} className="w-1/2 py-3">CANCEL</button>
                            <button className="w-1/2 py-3">ADD</button>
                          </div>
                        </div>
                      )
                      :
                      (null)
                  }
                  {popup ? null : <li onClick={() => setPopup(true)} className="text-[#7c7c7c] flex items-center gap-3 px-2 py-1 text-sm  hover:bg-[#Ebebeb]"><BiPlus className=" text-lg" /> Add New List</li>}


                  {/* <li className="text-[12px] text-[#44556B] font-bold">LISTS</li>
                <li className=" text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[red] mt-1"><BiSolidSquare className="text-[#FE6A6E] rounded-xl text-xl" /> All tasks</li>
                <li className="text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[red]"><BiSolidSquare className="text-[#68D9E7] text-xl" /> Today</li>
                <li className="text-[#7C7C7C] flex items-center p-2 gap-3 hover:bg-[red]"><BiSolidSquare className="text-[#FED44D] text-xl" />Calender</li> */}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <button className="flex w-full p-2 hover:bg-[#ebebeb] items-center gap-3 text-sm text-[#7C7C7C]">
              <BiLogOut />
              Sign out
            </button>
          </div>

        </div>

        <div className="h-full w-[100%]">
          <div className={`pl-10 pt-9 ${menu ? '' : 'pl-0 pt-[0px]'}`}>
            <div className="flex gap-25 items-center">
              <BiMenu className={`text-3xl ${menu ? "" : "hidden"} text-[#7C7C7C]`} onClick={() => setMenu(!menu)} />
              <div className="flex gap-9">
                <h1 className="text-5xl">Today</h1>
                <h2 className="text-3xl px-3 py-1 rounded-lg border-2 border-[#F3F3F3]">5</h2>
              </div>
            </div>
          </div>

          <div className="h-[90%] pt-10 flex justify-end pr-15">
            <div className={`w-[85%]  ${menu ? "" : "w-[100%] pl-10"} `}>
              <div className="flex">
                <div className="relative w-full text-[#7c7c7c]">
                  <BiPlus className="absolute left-5 top-1/2 text-lg -translate-y-1/2" />

                  <input
                    value={title}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        makeTodo()
                      }
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add New task"
                    className="pl-12 border-2 outline-none border-[#F3F3F3] p-3 w-full rounded-sm"
                  />
                </div>
                <button className="text-[#7c7c7c] px-10" onClick={() => makeTodo()}>Enter</button>
              </div>
              <ul className="flex text-[15px] flex-col gap-6 text-[#444444] pt-5 p-2">
                {/* <li onClick={() => setTaskMenu(!taskMenu)} className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                <li className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" /> Lorem ipsum dolor sit amet.</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li> */}

                {
                  todo?.map((item, index) => {
                    return (
                      <li key={index} onClick={() => setTaskMenu(!taskMenu)} className="flex py-1 justify-between"><div className="flex gap-3 items-center"><BiCheckbox className="text-2xl text-[#ECECEC]" />{item.title}</div> <BiChevronRight className="text-2xl text-[#7D7D7D]" /></li>
                    )
                  })
                }
              </ul>
            </div>
          </div>

        </div>

        {
          taskMenu ?
            (
              <div className="w-[25%] p-5 bg-[#f4f4f4] ">
                <div className="flex flex-col h-[100%]  justify-between">
                  <div>
                    <div className="flex items-center font-semibold text-[#7c7c7c] justify-between">
                      <h3 className="text-xl">Task:</h3>
                      <span className="p-1.5" onClick={() => {
                        setTaskMenu(false)
                        setDropper(false)
                      }}><GrClose className="text-lg" /></span>
                    </div>

                    <div className="mt-8 flex flex-col text-[#444444] gap-6 p-3 text-sm">
                      <input type="text" placeholder="Task Text here" className="w-full outline-none" />
                      {/* <input type="text" placeholder="Description" className="h-20 bg-red-500"/> */}
                      <textarea rows={4} placeholder="Description" className="outline-none" cols={50}>
                      </textarea>
                    </div>

                    <div className="text-[#444444] flex mt-10 gap-8.5">
                      <div className="flex flex-col gap-5 text-xs">
                        <h3>List</h3>
                        <h3>Due date</h3>

                      </div>
                      <div className="flex relative flex-col gap-5 text-xs">
                        <h3 onClick={() => setDropper(!dropper)} className="flex items-center gap-3">{selectList ? selectList : "Options"} <GrDown className="text-[8px]" /></h3>
                        {dropper ?
                          (
                            <ul className="flex absolute bottom-[-70] select-none gap-1 bg-[#fAFAFA] p-1 flex-col">
                              {
                                listData?.map((item, index) => {
                                  return (

                                    <li className="text-sm hover:bg-[#7c7c7c] p-1 transition" onClick={() => {
                                      setSelectList(item.name)
                                      setDropper(false)
                                    }} key={index}>{item.name}</li>

                                  )
                                })
                              }
                            </ul>
                          ) : null
                        }


                        <h3 className="flex items-center gap-3" onClick={() => setOpenCalendar(!openCalendar)}>{dueDate ? new Date(dueDate).toLocaleDateString() : "Select"} <GrDown className="text-[8px]" /></h3>
                        {
                          openCalendar ?
                            <Calendar
                              date={dueDate}
                              setDate={setDueDate}
                              setOpenCalendar={setOpenCalendar}
                            /> : null
                        }
                        {/* <input type="date"  /> */}


                      </div>
                    </div>

                  </div>
                  <div className="flex justify-around text-sm">
                    <button className="px-7 py-2 bg-[#F4F4F4] hover:bg-[#7c7c7c] transition border border-[#C7C6C5] rounded-sm">Delete Task</button>
                    <button className="px-5 py-2 bg-[#FED44D] hover:bg-[#A88D3C] transition hover:text-[#7c7c7c] rounded-sm">Save Changes</button>
                  </div>

                </div>


              </div>
            ) : null
        }



      </div>
      {/* {JSON.stringify(tests , null, 2)} */}
      {/* <h1>hi</h1> */}
    </div>
  )
}

export default Home;

