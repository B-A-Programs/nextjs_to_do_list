'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TaskCard from "@components/TaskCard"
import { useRouter } from "next/navigation"

const Tasks = ({ name }) => {
  const Router = useRouter()
  const { data: session } = useSession()
  const [task, setTask] = useState("")
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")

  const [toDo, setToDo] = useState()
  const [completed, setCompleted] = useState()

  const findTasks = async () => {
    try {
        const response = await fetch("/api/task", {
            method: "POST",
            body: JSON.stringify({
                name: name,
            })
        })
        const data = await response.json()

        setToDo(data.toDo)
        setCompleted(data.completed)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    findTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    /// Check date correct
    if((new Date(date)).getTime() - (new Date()).getTime() < -86400000) {
        setMessage("Date must be later than today's date")
    }
    else {
        try {
            const response = await fetch("/api/task/new", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    task: task,
                    date: date,
                    userId: session?.user.id,
                })
            })

            if(response.ok) {
                findTasks()
                setMessage("")
                setDate("")
                setTask("")
            } else {
                setMessage("Task is required! Date is required!")
            }
        } catch (error) {
            setMessage("Task is required! Date is required!")
            console.log(error)
        }
    }
  }

  const handleDelete = async () => {
    try {
        await fetch("/api/library/delete", {
            method: "POST",
            body: JSON.stringify({
                name: name
            })
        })

        Router.push("/")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        <div className='bg-red-400 p-1 ml-12 px-3 text-red-700 hover:bg-red-500 hover:text-red-800 font-bold text-lg rounded-full cursor-pointer float-left absolute' onClick={handleDelete}>Delete library</div>
        <form className="w-full mt-4 flex-center" onSubmit={(e) => handleSubmit(e)}>
            <label className="flex-center flex-col w-full xl:w-1/3">
            <div className="text-orange-200 text-lg">Create new task in the <span className="text-orange-500">{name}</span> library: </div>

            <div className="flex-center w-full gap-5">
                <input
                value={task}
                onChange={(e) => {setTask(e.target.value)}}
                className="form_input"
                type="text"
                placeholder="Write your task here..."
                />
                <input
                value={date}
                onChange={(e) => {setDate(e.target.value)}}
                className="form_input"
                type="date"
                />
            </div>
            <button type="submit" className="create_btn mt-2">Create</button>
            </label>
        </form>
        {message && <div className="error mt-4">{message}</div>}

        <hr className="bg-white h-0.5 my-6" />

        <div className="flex justify-around">
            <div className="flex items-center flex-col">
                <div className="sec_title">To Do</div>

                <div className="flex-center max-w-2xl gap-6 mt-4 flex-wrap">
                    {(toDo && toDo.length > 0) ?
                        toDo.map((task) => {
                            return <TaskCard id={task._id.toString()} findTasks={findTasks} task={task.text} date={task.dueBy.split("T")[0]} key={task._id.toString()} status="ToDo" />
                        })
                    :
                        <div className="text-white font-bold text-2xl mt-40">Looks like you don't have any<br /> tasks to do in this library!</div>
                    }
                </div>
            </div>
            
            <div className="flex items-center flex-col">
                <div className="sec_title">Completed</div>

                <div className="flex-center max-w-2xl gap-6 mt-4 flex-wrap">
                    {(completed && completed.length > 0) ?
                        completed.map((task) => {
                            return <TaskCard id={task._id.toString()} findTasks={findTasks} task={task.text} date={task.dueBy.split("T")[0]} key={task._id.toString()} status="Completed" />
                        })
                    :
                        <div className="text-white font-bold text-2xl mt-40">Looks like you don't have any<br /> completed tasks in this library!</div>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Tasks