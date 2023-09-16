import React from 'react'

const Input = ({item, setForm, form}) => {
    const { label, type, name } = item;

    const handleOnChange = (e) => {
      return setForm({...form, [e.target.name]: e.target.value})
    }
  return (
    <div className='flex flex-col gap-2 mb-3'>
        <label className='text-sm'>{ label }</label>
        <input 
            type={type} 
            name={name}
            value={form[name]} 
            placeholder={`${label}...`}
            onChange={handleOnChange}
            className='p-3 bg-white/20 outline-none text-sm rounded-md'
        />
    </div>
  )
}

export default Input