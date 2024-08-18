import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import SummaryApi from './common'
import AppContext from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Footer from './component/Footer'


function App(){
    const dispatch = useDispatch()
    
    const fetchUserDetails = async()=>{
        const dataReponse = await fetch(SummaryApi.current_user.url,{
            method : SummaryApi.current_user.method,
            credentials : "include"
        })

        const dataApi = await dataReponse.json()

        if(dataApi.success){
            dispatch(setUserDetails(dataApi.data))
        }
    }

    useEffect(()=>{
        fetchUserDetails()
    },[])

    return(
        <div className=''>
            <AppContext.Provider value={{
                fetchUserDetails
            }}>
                <ToastContainer
                position='top-center' />
                <Header/>
                <main className='min-h-[calc(113.8vh-120px)] pt-20 bg-lime-500 '>
                    <Outlet/> 
                </main>
                <Footer/>
            </AppContext.Provider>
        </div>
    )
}

export default App