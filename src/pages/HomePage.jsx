import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/common/TopNav'


const HomePage = () => {

    return (
        <>
            <TopNav />
            <main style={{ paddingTop: '64px', backgroundColor: '#f5f5f5' }}>
                <Outlet />
            </main>
        </>
    )
}

export default HomePage