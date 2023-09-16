"use client"

import Image from 'next/image'
import Link from 'next/link'
import SingleContact from '@/components/SingleContact'
import { useQuery } from '@tanstack/react-query'
import { getData } from '@/fetchData/fetchData'

export default function Home() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["contact"],
    queryFn: getData
  });

  return (
    <div className='w-[90%] lg:w-[70%] mx-auto my-[5rem]'>
      <div className='text-right'>
        <Link href="/addContact">
          <span className='p-2 py-3 bg-pink-700 text-white rounded-md hover:bg-green-700/50'>Add Contact</span>
        </Link>
      </div>

      <div className='mt-[2rem]'>
        <h1 className='text-center text-3xl py-4 uppercase text-white'>contact app</h1>

        <table className='w-full'> 
          <thead>
            <tr className='bg-white/70 h-[4rem] text-black/80'>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-white'>{isLoading ? <td>Loading...</td> : null}</tr>
            {data?.data.map((item, i) => (
              <SingleContact item={item} key={i} />
            ))}
          </tbody>
        </table>
        {data?.data.length === 0 && (<div className='text-white text-center p-12 text-2xl font-extrabold'>No contacts found</div>)}
      </div>
    </div>
  )
}
