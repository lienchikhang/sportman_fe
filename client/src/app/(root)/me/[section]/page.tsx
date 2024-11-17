import RenderUser from '@/components/RenderUser';
import React from 'react';

const page = () => {
    return (
        <div className='py-8 px-16' style={{ backgroundColor: '#f1f1f1' }}>
            <div className='px-14 py-6 bg-white rounded-lg mb-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl'>Hi, LIEN CHI KHANG</h1>
                    <div className='' >
                        <p className='text-base text-end' style={{ color: '#666666' }}>You're having</p>
                        <p className='text-base font-semibold text-end'>30.000 Sportcash</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-10  rounded-lg'>
                <RenderUser />
            </div>
        </div>
    )
}

export default page