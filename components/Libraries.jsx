'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"

const Libraries = () => {
  const [library, setLibrary] = useState("")
  const [message, setMessage] = useState("")
  const { data: session, status } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")

    try {
        const response = await fetch("/api/library/new", {
            method: "POST",
            body: JSON.stringify({
                userId: session.user.id,
                libraryName: library,
            })
        })

        if(response.ok) {
            console.log("update libraries")
        }
        else {
            setMessage("Name must be unique/internal server error")
        }
    } catch (error) {
        console.log(error)
    }

    setLibrary("")
  }

  return (
    <>
        {session?.user ?
        <form className="w-96 my-12" onSubmit={handleSubmit}>
            <label className="flex-center flex-col">
                <div className="text-orange-200 text-lg">Create new library of tasks</div>

                <div className="flex-center w-full gap-5">
                    <input
                    value={library}
                    onChange={(e) => {setLibrary(e.target.value)}} 
                    className="form_input" 
                    type="text" 
                    placeholder="Egs: Housework, School, Work, etc." 
                    />
                    <button type="submit" className="create_btn mt-2">Create</button>
                </div>
            </label>
        </form>
        :
        status != "loading" && <div className="text-white font-bold text-2xl mt-40">Please sing in to be able to access the application</div>
        }
        {message && <div className="error">{message}</div>}
    </>
  )
}

export default Libraries