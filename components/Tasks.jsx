'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"

const Tasks = ({ name }) => {
  const { data: session } = useSession()
  const [task, setTask] = useState("")
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")

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

  return (
    <>
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

        {/* <div className="flex-center flex-row">
            <TaskCol />
            <TaskCol />
            <TaskCol />
        </div> */}
    </>
  )
}

export default Tasks