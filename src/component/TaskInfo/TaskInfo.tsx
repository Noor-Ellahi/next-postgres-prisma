'use client'

import { GrClose, GrDown } from "react-icons/gr"
import Calendar from "@/component/DateComp/DateComp"

type ListType = {
  id: string
  name: string
}

type TaskForm = {
  title: string
  description: string
  completed: boolean
  listId: string
  dueDate?: Date
}

type Props = {
  taskForm: TaskForm
  setTaskForm: React.Dispatch<React.SetStateAction<TaskForm>>

  todoInfo: any
  listData: ListType[] | null

  setTaskMenu: React.Dispatch<React.SetStateAction<boolean>>

  openCalendar: boolean
  setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>

  dropper: boolean
  setDropper: React.Dispatch<React.SetStateAction<boolean>>

  dropper1: boolean
  setDropper1: React.Dispatch<React.SetStateAction<boolean>>

  saveTask: () => void
  delTask: () => void
}

export default function TaskPanel({
  taskForm,
  setTaskForm,
  todoInfo,
  listData,

  setTaskMenu,

  openCalendar,
  setOpenCalendar,

  dropper,
  setDropper,

  dropper1,
  setDropper1,

  saveTask,
  delTask,
}: Props) {

  return (
    <div className="w-[25%] p-5 bg-[#f4f4f4]">
      <div className="flex flex-col h-[100%] justify-between">

        {/* HEADER */}
        <div>

          <div className="flex items-center font-semibold text-[#7c7c7c] justify-between">
            <h3 className="text-xl">Task:</h3>

            <span
              className="p-1.5"
              onClick={() => {
                setTaskMenu(false)
                setDropper(false)
              }}
            >
              <GrClose className="text-lg" />
            </span>
          </div>

          {/* INPUTS */}
          <div className="mt-8 flex flex-col text-[#444444] gap-6 p-3 text-sm">

            <input
              type="text"
              value={taskForm.title}
              placeholder={todoInfo?.title || "Type Title here"}
              className="w-full outline-none"
              onChange={(e) =>
                setTaskForm((prev) => ({
                  ...prev,
                  title: e.target.value
                }))
              }
            />

            <textarea
              value={taskForm.description}
              placeholder={todoInfo?.description || "Type description here"}
              className="outline-none"
              rows={4}
              cols={50}
              onChange={(e) =>
                setTaskForm((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            />

          </div>

          {/* OPTIONS */}
          <div className="text-[#444444] flex mt-10 gap-8.5">

            <div className="flex flex-col gap-5 text-xs">
              <h3>List</h3>
              <h3>Completed</h3>
              <h3>Due date</h3>
            </div>

            <div className="flex relative flex-col gap-5 text-xs">

              {/* LIST */}
              <h3
                onClick={() => {
                  setDropper(!dropper)
                  setDropper1(false)
                }}
                className="flex items-center gap-3"
              >
                {
                  listData?.find(
                    (item) => item.id === taskForm.listId
                  )?.name || "Options"
                }
                <GrDown className="text-[8px]" />
              </h3>

              {
                dropper && (
                  <ul className="flex absolute bottom-[-40] gap-1 bg-[#fAFAFA] p-1 flex-col">

                    {
                      listData?.map((item) => (
                        <li
                          key={item.id}
                          className="text-sm hover:bg-[#7c7c7c] p-1 transition"
                          onClick={() =>
                            setTaskForm((prev) => ({
                              ...prev,
                              listId: item.id,
                            }))
                          }
                        >
                          {item.name}
                        </li>
                      ))
                    }

                  </ul>
                )
              }

              {/* COMPLETED */}
              <h3
                onClick={() => {
                  setDropper1(!dropper1)
                  setDropper(false)
                }}
                className="flex items-center gap-3"
              >
                {taskForm.completed ? "Done" : "NotDone"}
                <GrDown className="text-[8px]" />
              </h3>

              {
                dropper1 && (
                  <ul className="flex absolute bottom-[-40] gap-1 bg-[#fAFAFA] p-1 flex-col">

                    {[true, false].map((val, i) => (
                      <li
                        key={i}
                        className="text-sm hover:bg-[#7c7c7c] p-1 transition"
                        onClick={() =>
                          setTaskForm((prev) => ({
                            ...prev,
                            completed: val,
                          }))
                        }
                      >
                        {val ? "Done" : "NotDone"}
                      </li>
                    ))}

                  </ul>
                )
              }

              {/* DATE */}
              <h3
                className="flex items-center gap-3"
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                {
                  taskForm.dueDate
                    ? new Date(taskForm.dueDate).toLocaleDateString()
                    : "Select"
                }
                <GrDown className="text-[8px]" />
              </h3>

              {
                openCalendar && (
                  <Calendar
                    date={taskForm.dueDate}
                    setDate={(date) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        dueDate: date,
                      }))
                    }
                    setOpenCalendar={setOpenCalendar}
                  />
                )
              }

            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-around text-sm">

          <button
            onClick={delTask}
            className="px-3 py-2 border rounded-sm hover:bg-[#7c7c7c]"
          >
            Delete Task
          </button>

          <button
            onClick={saveTask}
            className="px-3 py-2 bg-[#FED44D] rounded-sm"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  )
}