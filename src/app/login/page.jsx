'use client'
import MaxWarp from "@/components/MaxWarp";
import Link from "next/link";
import { useState } from "react";
export default function login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (res.status === 200) {
        console.log('Login successfully');
      } else {
        const data = await res.json();
        console.log('Login failed: ', data.error || 'Unknown error');
      }
    } catch (error) {
      console.log("Error during login: ", error);
    }
  };
  

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
                type="password"
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
