"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
  let [Userlist,setUserlist] =useState([])
  let [UpdateData,setUpdateData] = useState(false)
  let [updateId,setupdateId] = useState("")
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
  }

  const handleDelete = async (i)=>{
    await axios.delete(`http://localhost:8000/deleteUsesr/${i._id}`)
  
  }
  const handleUpdate = async(i)=>{
    setUpdateData(true)
    setupdateId(i._id)
    setFromData({
      username:i.username,
      email:i.email,
      password:i.password
    })
  }
  const handlDataUpdate =async ()=>{
    const Update = await axios.post(`http://localhost:8000/updateUser/${updateId}`,{
    username: FromData.username,
    email: FromData.email,
    password:FromData.password
    })
    console.log(Update)
  }
   useEffect(() => {
        async function fetchUsers() {
                const response = await axios.get(
                    "http://localhost:8000/alluser"
                );
                setUserlist(response.data.users);
        }
        fetchUsers();
    }, []);
  return (
    <>
<div className='min-h-screen flex flex-col items-center justify-center gap-2'>
  <div className='flex flex-col gap-4 mb-7'>
    <input onChange={handleFrom} name='username' value={FromData.username} className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your full name '/>
    <input onChange={handleFrom} name='email' value={FromData.email} className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your email '/>
    <input onChange={handleFrom} name='password' value={FromData.password} className='border border-gray-300 p-3 rounded-md w-96' type='text' placeholder='Inter your passwerd '/>
    {
      UpdateData ? (
        <button onClick={handlDataUpdate} className="bg-slate-900 text-white p-3 rounded-md cursor-pointer" >Update</button>
      )
      :
    (
      <button onClick={handlSubmit} className="bg-slate-900 text-white p-3 rounded-md cursor-pointer" >Submit</button>
    )
  }
  </div>

  {Userlist.length === 0 ? (
  <p className="text-red-500 text-9xl">
     No users found
  </p>
):
(
  <div className="flex flex-wrap gap-5 justify-center bg-gray-50 p-6">
  {
    Userlist.map((item,index)=>(
      <ul
        key={index}
        className="border border-gray-200 rounded-xl w-96 divide-y divide-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <li className="flex justify-between items-center p-4">
          <span className="text-gray-500">Full Name</span>
          <span className="text-gray-900 font-medium">{item.username}</span>
        </li>

        <li className="flex justify-between items-center p-4">
          <span className="text-gray-500">Email</span>
          <span className="text-gray-900 font-medium">{item.email}</span>
        </li>

        <li className="flex justify-between items-center p-4">
          <span className="text-gray-500">Password</span>
          <span className="text-gray-900 font-medium">{item.password}</span>
        </li>
        <li className="flex justify-between items-center p-4">
        <button onClick={()=>handleDelete(item)} className='px-5 py-1.5 rounded-2xl bg-amber-100 text-black cursor-pointer'>Delet</button>
        <button onClick={()=>handleUpdate(item)} className='px-5 py-1.5 rounded-2xl bg-amber-300 text-black cursor-pointer'>Update</button>
        </li> 
      </ul>
    ))
  }
</div>
)

  }
</div>
</>
  )
}

export default page

