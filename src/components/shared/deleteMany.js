import React, {useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {deleteIdSelector, deleteManyItems} from '../../api/logic'

import { FaRegTrashAlt } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import DeleteConfirm from './deleteConfirm'


export default function DeleteMany({api_path, fetch, pagination}) {
    
    const {all_ids } = useSelector(deleteIdSelector)
    const dispatch = useDispatch()


    const confirm = async (e, path, ids) => {
    
     await   dispatch(deleteManyItems(path, ids))
        fetch({pagination})
       
      }
      
      const cancel = (e) =>{
        return null
      }







    return (
        <>
            {
 all_ids.length > 0 && 
 <AnimatePresence>
       <motion.div
       initial={{ opacity: 0, y:-10 }}
       animate={{ opacity: 1, y:0  }}
       exit={{ opacity: 0}} 
       transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
       style={{backgroundColor:"#ffcfcf4d", padding:"0.45rem"}}
       className=" rounded "
       >

             <DeleteConfirm confirm={(e)=>confirm(e, api_path, all_ids)} title="kits" cancel={cancel}>

 <FaRegTrashAlt className="text-xl cursor-pointer" style={{  color:'red'}}/>
</DeleteConfirm>

 </motion.div>
  </AnimatePresence>
}  
        </>
    )
}
