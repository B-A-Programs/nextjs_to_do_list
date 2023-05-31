import Link from 'next/link'
import React from 'react'

const LibCard = ({ name, urgent }) => {
  return (
    <>
      <Link href={`/collection/${name}`}>
          {urgent ?
            <div className='bg-gradient-to-r transition-all from-orange-700 to-yellow-600 hover:from-orange-800 hover:to-yellow-700 text-red-700 font-extrabold w-48 h-16 text-xl border border-white rounded-2xl flex-center break-inside-avoid'>
              {name}
            </div>
          :
          <div className='bg-gradient-to-r transition-all from-orange-700 to-yellow-600 hover:from-orange-800 hover:to-yellow-700 text-white font-medium w-48 h-16 text-xl border border-white rounded-2xl flex-center break-inside-avoid'>
            {name}
          </div>
          }
      </Link>
    </>
  )
}

export default LibCard