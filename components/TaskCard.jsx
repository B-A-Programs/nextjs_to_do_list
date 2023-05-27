import Image from 'next/image'
import { useState } from 'react'
import EditForm from './EditForm'

const TaskCard = ({ id, task, date, status, findTasks }) => {
  const [edit, setEdit] = useState(false)

  const handleComplete = async () => {
    try {
        await fetch("/api/task/complete", {
            method: "POST",
            body: JSON.stringify({
                id: id
            })
        })

        findTasks()
    } catch (error) {
        console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
        await fetch("/api/task/delete", {
            method: "POST",
            body: JSON.stringify({
                id: id
            })
        })

        findTasks()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        {!edit ?
            <div className='bg-slate-200 py-2 px-3 rounded-xl border border-orange-300 max-w-lg'>
                <div className='task_text flex'>
                    <h1 className='font-bold text-black mr-2'>Task:</h1> <div className='text-center'> {task} </div>
                </div>

                <div className='flex-between mt-2 gap-4'>
                    <div className='text-sm text-stone-500'>
                        Due by: {date}
                    </div>

                    <div className='flex'>
                        <Image className='p-0.5 cursor-pointer hover:bg-stone-300 rounded-md flex-center' src="/edit-button-svg.svg" width={30} height={30} onClick={() => setEdit(true)} alt="edit icon" />
                        {status == "ToDo" ?
                            <Image className='bg-green-400 hover:bg-green-500 rounded-full p-1 cursor-pointer' onClick={handleComplete} src="/icons8-checkmark.svg" width={34} height={34} alt="check icon"  />
                        :
                            <div className='bg-red-400 hover:bg-red-500 p-1 px-3 text-black font-bold text-lg rounded-full cursor-pointer' onClick={handleDelete}>X</div>
                        }
                    </div>
                </div>
            </div>
        :
            <EditForm task={task} date={date} id={id} findTasks={findTasks} setEdit={setEdit} />
        }
    </>
  )
}

export default TaskCard