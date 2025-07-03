import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children})=>{

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")


    const fetchBlogs = async () =>{
        try {
           const {data} = await axios.get('/api/blog/all')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const storedToken = localStorage.getItem('token')
        if(storedToken){
            setToken(storedToken)
            axios.defaults.headers.common['Authorization'] = `${storedToken}`;
        }
        
        // Add response interceptor to handle token expiration
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    setToken(null);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    navigate('/admin');
                    toast.error('Session expired. Please login again.');
                }
                return Promise.reject(error);
            }
        );
    },[])

    const value ={
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput, fetchBlogs
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
};