"use client"

import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import { useEffect, useState } from 'react'
import { useMutation, QueryClient } from '@tanstack/react-query'
import { addData, updateData } from '@/fetchData/fetchData'
import { ContextValue } from '@/Context/Context'

const page = () => {
    const router = useRouter();
    const { update, setUpdate } = ContextValue();
    const queryClient = new QueryClient()

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        address: "",
        phoneNumber: ""
    });

    const {mutateAsync, isLoading, isError} = useMutation({
        mutationFn: addData,
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["contact"] })
        },
    })

    const {mutateAsync:updateMutate, isLoading:updateLoading, isError:updateError} = useMutation({
        mutationFn: () => updateData(update._id, form),
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["contact"] })
        },
    })

    useEffect(() => {
        if(update) {
            setForm(update)
        } else {
            setForm({
                fullName: "",
                email: "",
                address: "",
                phoneNumber: ""
            })
        }
    }, [update]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!update) {
            await mutateAsync(form);
        } else {
            await updateMutate(update._id, form)
            setUpdate("")
        }
        
        router.push("/")
    }
    const inputs = [
        {
            label: "Full Name",
            type: "text",
            name: "fullName"
        },
        {
            label: "Email",
            type: "text",
            name: "email"
        },
        {
            label: "Phone",
            type: "text",
            name: "phoneNumber"
        },
        {
            label: "Address",
            type: "text",
            name: "address"
        },
    ];

    const loadingText = isLoading ? "Submitting..." : updateLoading ? "Updating..." : "";
    const titleText = update ? "Edit Contact Form" : "Add Contact Form"

    return (
        <div className='w-[90%] md:w-[30rem] mx-auto my-[5rem] border border-gray-500 bg-white/10 rounded-md p-6 text-white'>
            <span 
                onClick={ () => router.push("/") }
                className='bg-pink-600/50 p-3 rounded-md hover:bg-pink-700/50 absolute left-[3rem] top-[3rem] cursor-pointer'>Go Back</span>

            <h2 className='text-center text-2xl pb-7'>{ titleText }</h2>
            <form onSubmit={handleSubmit}>
                {inputs.map((item, i) => (
                    <Input item={item} key={i} setForm={setForm} form={form} />
                ))}
                <button type="submit" className='mt-[2rem] bg-pink-600/50 w-full p-3 rounded-md hover:bg-pink-700/50'>
                { !loadingText ? (update ? "Update" : "Submit") : loadingText }</button>
            </form>
        </div>
    )
}

export default page