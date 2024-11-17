import React from 'react';

const UserInfo = () => {

    //fetch

    return (
        <div className='p-12 bg-white rounded-lg'>
            <h2 className='text-3xl pb-4 font-medium'>User information</h2>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] text-lg font-medium' style={{ color: '#777777' }}>Created at:</p>
                <p className='font-medium text-lg'>18/10/2024</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] text-lg font-medium' style={{ color: '#777777' }}>First name:</p>
                <p className='font-medium text-lg'>Khang</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] text-lg font-medium' style={{ color: '#777777' }}>Last name:</p>
                <p className='font-medium text-lg'>Lien</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] text-lg font-medium' style={{ color: '#777777' }}>Username:</p>
                <p className='font-medium text-lg'>KhangChiLien</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] font-medium text-lg' style={{ color: '#777777' }}>Phone:</p>
                <p className='font-medium text-lg'>090000000</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] font-medium text-lg' style={{ color: '#777777' }}>Email:</p>
                <p className='font-medium text-lg'>test@gmail.com</p>
            </div>
            <div className='py-4 flex items-center'>
                <p className='w-[300px] font-medium text-lg' style={{ color: '#777777' }}>Birthday:</p>
                <p className='font-medium text-lg'>15/10/2003</p>
            </div>
            <div className='py-4 flex items-center'>
                <button className='px-8 py-3 text-black border border-black rounded-full'>Edit</button>
            </div>
        </div>
    )
}

export default UserInfo