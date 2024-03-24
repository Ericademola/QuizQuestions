"use client";

import { useState } from "react"

export const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [ loginValue, SetLoginValue] = useState<{email: string}>()

  const onLogin = (e: {preventDefault: () => void}) => {

      e.preventDefault();
      const submission = {email};
      SetLoginValue(submission);
  
  }

  return (
    <main className="bg-[#b9b3a9] flex align-center justify-center h-dvh">
      <div className="w-[450px] p-5 mt-20 h-fit bg-white rounded-[20px] shadow">
        <h1 className="text-center">Login</h1>
        <form className="align-center w-[90%] flex flex-col gap-4" onSubmit={onLogin}>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">
              Enter email
            </label>
            <input type="email" name="question" 
            value={email}
            placeholder="Please input your email address"
            className="w-[80%] border-[green] border-2 p-1 rounded outline-none" 
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
          type="submit"
          className="h-fit px-4 py-2 bg-blue-500 text-white rounded m-auto">
            Send
          </button>
        </form>
          
      </div>
    </main>
  )
}