import Image from 'next/image'
import Link from 'next/link'

const TaskCard = ({ task, date, status }) => {
  return (
    <div className='bg-slate-200 py-2 px-3 rounded-xl border border-orange-300 max-w-md'>
        <div className='task_text flex'>
            <h1 className='font-bold text-black mr-2'>Task:</h1> <div className='text-center'> {task} </div>
        </div>

        <div className='flex-between mt-2'>
            <div className='text-sm text-stone-500'>
                Due by: {date}
            </div>

            <div className='flex flec-col'>
                <Image className='p-0.5' src="/edit-button-svg.svg" width={30} height={30} alt="edit icon" />
                <Image className='bg-green-400 rounded-full p-0.5' src="/icons8-checkmark.svg" width={30} height={30} alt="check icon"  />
            </div>
        </div>
    </div>
  )
}

export default TaskCard