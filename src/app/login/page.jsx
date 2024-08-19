'use client'
import MaxWarp from "@/components/MaxWarp";
import Link from "next/link";
import Axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
export default function login() {
  const router = useRouter()  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const Login = async (e) => {
    e.preventDefault();
    try{
      const res = await Axios.post('/api/auth/login',{
        email,
        password
      })
      if(res.status === 200){
        console.log('login successfully!')
        router.push('/')
      }
    }catch(error){
      console.log("error on registeration : ",error)
    }
  }

  return (
    <div>
      <MaxWarp className={"w-5/12 h-[67vh]"}>
        <div>
          <h1 className="flex justify-center text-4xl py-10 font-semibold">
            Login
          </h1>
          <form onSubmit={Login}>
            <div className="space-y-5">
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <input
                className="w-full border border-spacing-5 border-zinc-400 p-3"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <Link className="text-sm underline underline-offset-4" href="/">
                Forgot your password?
              </Link>
              <div className="flex justify-center">
                <button
                  className="bg-green-950 rounded-full py-3 px-10 text-white w-fit"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <Link
                className="flex justify-center text-sm underline underline-offset-4 my-4"
                href="/register"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </MaxWarp>
    </div>
  );
}
