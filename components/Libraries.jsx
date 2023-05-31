'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import LibCard from "@/components/LibCard"

const Libraries = () => {
  const [library, setLibrary] = useState("")
  const [message, setMessage] = useState("")
  const { data: session, status } = useSession()
  const [urgent, setUrgent] = useState([])

  const [collections, setCollections] = useState([])

  const findLibrary = async () => {
    const response = await fetch("/api/library");
    const {libraries, urgentLibs} = await response.json()

    setUrgent(urgentLibs);
    setCollections(libraries);
  }

  useEffect(() => {
    if(status === "authenticated") {
        findLibrary()
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")

    try {
        const response = await fetch("/api/library/new", {
            method: "POST",
            body: JSON.stringify({
                userId: session?.user.id,
                libraryName: library,
            })
        })

        if(response.ok) {
            findLibrary()
        }
        else {
            setMessage("Name must be unique!")
        }
    } catch (error) {
        console.log(error)
    }

    setLibrary("")
  }

  return (
    <>
        {session?.user ?
        <>
            <form className="w-full my-16 flex-center" onSubmit={handleSubmit}>
                <label className="flex-center flex-col w-full xl:w-1/3">
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

            <div className="flex-center max-w-4xl gap-6 columns-5 flex-wrap py-3">
                {Object.values(collections).map((library) => (
                    <LibCard name={library.name} key={library.name} urgent={urgent.includes(library.name)} />
                ))}
            </div>
        </>
        :
        status != "loading" && <div className="text-white font-bold text-2xl mt-40">Please sing in to be able to access the application</div>
        }
        {message && <div className="error">{message}</div>}
    </>
  )
}

export default Libraries