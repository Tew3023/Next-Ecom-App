"use client";
import MaxWarp from "@/components/MaxWarp";
import { useState } from "react";
import Axios from 'axios'
import { useRouter } from 'next/navigation';
export default function register() {
  const router = useRouter()  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const Registeration = async (e) =>{
    e.preventDefault();
    setLoading(true)
    if(!firstName || !lastName || !email || !password){
      setStatus('Please complete your information')
      return
    }
    try{
      const res = await Axios.post('/api/auth/signup',{
        firstname: firstName,
        lastname: lastName,
        email,
        password
      })
        console.log('Registered successfully!')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        router.push('/login')
    }catch(error){
      console.log("error on registeration : ",error)
      setStatus('An error occurred. Please try again.')
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <MaxWarp className={"w-5/12 h-[67.5vh]"}>
        <div>
          <h1 className="flex justify-center text-4xl py-10 font-semibold">
            Create account
          </h1>
          <form onSubmit={Registeration}>
            <div className="space-y-5">
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="First name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="Last name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {status && <p className="text-red-500">{status}</p>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-950 rounded-full py-3 px-10 text-white w-fit transition-all"
                >
                  {loading? 'Registering...':'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </MaxWarp>
    </div>
  );
}
