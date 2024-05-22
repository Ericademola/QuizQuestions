"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { postRequest } from "@/src/axios/requests";
import Cache from "../src/utils/cache"


export default function Login() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    try {
      // Call the backend API endpoint to request the token
      const response = await postRequest("/token", {email})
      Cache.set('token', response.data.token)
      router.push("/questions");
      // console.log(token); // Handle the response as needed
      // Redirect or perform further actions
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message); // Handle the error message
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <main className="flex align-center justify-center h-dvh">
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