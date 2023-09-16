"use client"
import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { ContextValue } from '@/Context/Context';
import { useRouter } from 'next/navigation';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { removeData } from '@/fetchData/fetchData';
const SingleContact = ({ item }) => {
    const { fullName, email, phoneNumber, address, _id } = item
    const queryClient = new QueryClient()

    const { update, setUpdate } = ContextValue();

    const updateContact = (data) => {
        setUpdate(data);
        router.push("/addContact");
    }

    const router = useRouter();

    const {mutate, isLoading, isError} = useMutation({
        mutationKey: ["contact", _id],
        mutationFn: () => removeData(_id),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        },
    })

    return (
        <tr className='text-white bg-white/40 h-[3rem] border-b border-black/40 text-center'>
            <td>{ fullName }</td>
            <td>{ email }</td>
            <td>{ phoneNumber }</td>
            <td>{ address }</td>
            <td className='flex items-center gap-4 text-xl py-2'>
                <span 
                    className='cursor-pointer opacity-70'
                    onClick={() => mutate(_id)}
                ><BsFillTrashFill /></span>
                <span 
                    className='cursor-pointer opacity-70'
                    onClick={() => updateContact(item)}
                ><AiFillEdit /></span>
            </td>
        </tr>
    )
}

export default SingleContact