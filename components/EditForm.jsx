import { useState } from "react"


const EditForm = ({id, task, date, findTasks, setEdit}) => {
  const [d, setD] = useState(date)
  const [t, setT] = useState(task)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if((new Date(d)).getTime() - (new Date()).getTime() < -86400000) {
      setMessage("Date must be later than today's date")
    }
    else {
      try {
          await fetch("/api/task/update", {
              method: "POST",
              body: JSON.stringify({
                  id: id,
                  text: t,
                  date: d,
              })
          })

          findTasks()
          setEdit(false)
      } catch (error) {
          console.log(error)
      }
    }
  }

  return (
    <form className='bg-slate-200 py-2 px-3 rounded-xl border border-orange-300 max-w-lg' onSubmit={(e) => handleSubmit(e)}>
        <textarea value={t} onChange={(e) => {setT(e.target.value)}} />

        <div className='flex-between mt-2 gap-4'>
            <input type="date" value={d} onChange={(e) => {setD(e.target.value)}} />

            <button type="submit" className='edit_btn'>Edit</button>
        </div>
        {message && <div className="error mt-4">{message}</div>}
    </form>
  )
}

export default EditForm