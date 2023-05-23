'use client'

import Image from "next/image"
import Link from "next/link"
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import { useState, useEffect } from "react"

const Nav = () => {
    const { data: session, status } = useSession()
    const [providers, setProviders] = useState()

    useEffect(() => {
        const initProviders = async () => {
            const prov = await getProviders()

            setProviders(prov)
        }

        initProviders()
    }, [])

    return (
        <nav className="flex-between px-24 lg:px-48 py-4 font-inter bg-zinc-800">
            
            <Link href="/">
                <div className="flex-center flex-row gap-4">
                    <Image src="/to-do-logo.png" width={97} height={60} alt="to do logo" />
                    <h1 className="head_text">| Just do it!</h1>
                </div>
            </Link>

            {status === "authenticated" ?
            <div className="flex-center flex-row gap-4">
                <div className="text-white text-base font-bold">Welcome back, {session.user.name}!</div>
                <Image src={session.user.image} width={40} height={40} className="rounded-full" />
                <button className="sign_btn" onClick={signOut}>Sign Out</button>
            </div>
            : 
            <>
                {providers &&
                Object.values(providers).map((provider) => (
                    <button className="sign_btn" key={provider.id} onClick={() => signIn(provider.id)}><Image src="Google__G__Logo.svg" alt="google logo" width={20} height={20} />Sign In</button>
                ))}
            </>
            }
        </nav>
    )
}

export default Nav