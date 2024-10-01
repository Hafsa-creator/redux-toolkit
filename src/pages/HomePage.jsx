import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from './common/TopNav'


const HomePage = () => {

    return (
        <>
            <TopNav />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default HomePage