"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
  let [FromData,setFromData] = useState({
    username:"",
    email:"",
    password:""
  })
  let [Error,setError] = useState({
    username:"",
    email:"",
    password:""
  })
  let handleFrom =(e)=>{
    let{name,value} = e.target
    setFromData({...FromData,[name]:value})
    setError({})

  }
  let handlSubmit= async ()=>{
    const response = await axios.post('http://localhost:8000/registration', {
    username: FromData.username,
    email: FromData.email,
    password:FromData.password
  });
console.log(response);
  }
  useEffect(()=>{
    async function fatch (){
    const response = await axios.get('http://localhost:8000/alluser');
  console.log(response);
    }
    fatch()
    

  },[])

  return (
    <>
<div className='min-h-screen flex flex-col items-center justify-center gap-2'>
  <div className='flex flex-col gap-4 mb-7'>
    <input onChange={handleFrom} name='username' className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your full name '/>
    <input onChange={handleFrom} name='email' className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your email '/>
    <input onChange={handleFrom} name='password' className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your passwerd '/>
    <button onClick={handlSubmit} className="bg-slate-900 text-white p-3 rounded-md cursor-pointer" >Submit</button>
  </div>

  <div className="flex flex-col gap-3 bg-amber-50">
    <ul className="border border-gray-300 rounded-md w-96 divide-y divide-gray-200">
      <li className="flex justify-between p-4">
        <span className="text-gray-500">Full Name</span>
        <span className="text-gray-900 font-medium">John Doe</span>
      </li>
      <li className="flex justify-between p-4">
        <span className="text-gray-500">Email</span>
        <span className="text-gray-900 font-medium">john@example.com</span>
      </li>
      <li className="flex justify-between p-4">
        <span className="text-gray-500">Password</span>
        <span className="text-gray-900 font-medium">••••••••</span>
      </li>
    </ul>
  </div>
</div>
</>
  )
}

export default page

