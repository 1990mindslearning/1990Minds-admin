import React, {useEffect, useState} from 'react'
import { Input } from 'antd';
import {fethFilter} from '../../api/authSlice'
import {useDispatch} from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { useDebounce } from "use-debounce";


export default function SearchComponent({title}) {

    const dispatch = useDispatch()
    const [setLoading] = useState(false)
    const [search, setSearch] = useState('')
   
 const [debouncedText] = useDebounce(search, 1000);
 
 useEffect(()=>{ 
     if(debouncedText){

           dispatch(fethFilter(title, debouncedText ))
     } 
     setLoading(false)
   }, [dispatch, debouncedText])
  
 
   const onSearch = (e) => {
     setLoading(true)
     setSearch(e.target.value)
 
 }
 

    return (
        <SearchWrap className="mx-4 " style={{borderRadius:"4px"}}>
             <Input className="px-4 py-2 focus:outline-none shadow"
            prefix={  <SearchOutlined style={{color:'var(--brandColor)', fontWeight:'bold'}}  /> }
            
             placeholder=" Search " onChange={onSearch}  />
        </SearchWrap>
    )
}



const SearchWrap = styled.div`
width:80%;
transition:0.3s ease-in-out;
border-radius: 4px !important;
.ant-input-affix-wrapper > input.ant-input {
box-shadow: none !important;
&:focus{
    border-color:white !important;
}
&:hover{
    border-color:white !important;
}
}
`