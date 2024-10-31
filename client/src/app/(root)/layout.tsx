import { Footer, Header } from '@/components'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default layout