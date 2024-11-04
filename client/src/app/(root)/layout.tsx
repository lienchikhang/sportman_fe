import { Footer, Header } from '@/components'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <div className=''>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default layout