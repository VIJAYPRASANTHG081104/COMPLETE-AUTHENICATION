import axios from 'axios'
import { useEffect, useState } from 'react'
import { getUsername } from '../helper/helper'
axios.defaults.baseURL = "http://localhost:4000"
const useFetch = (query) => {
    const [getdata, setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    })
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                setData(prev => ({...prev,isLoading:true}))
                const{username} =!query ? await getUsername():'';
                const {data,status} = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);
                console.log(data)
                console.log(status)
                if(status === 200 ){
                    setData(prev => ({...prev,isLoading:false}))
                    setData(prev => ({...prev,apiData:data,status:status}))
                }
                setData(prev=>({...prev,isLoading:false}))
            } catch (error) {
                console.log(error)
                setData(prev => ({...prev, isLoading:false,serverError:error}))
            }
        };
        fetchData()
    },[query])

    return [getdata,setData]
}

export default useFetch