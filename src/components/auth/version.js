import React from 'react'
import Logo from '../../images/office6.png'
 
import data from './data'
import { HiOutlineClock } from 'react-icons/hi';

export default function ReleaseNote() {


    console.log({data});

  return (
    <div className=' bg-white'>

        {/* <div className='w-full bg-zinc-100 fixed top-0 bg-white'>
        <div className='max-w-screen-xl  mx-auto h-20 2xl:h-24 px-10 flex justify-start items-center'>
            <img src={Logo} alt='Logo' style={{ width: "auto", height: '38px', display: 'block', }}/>
        </div>
        </div> */}


        <div className='max-w-screen-xl mx-auto mb-12 2xl:mt-36 px-10'>
            <p className=' text-3xl'>Admin 1990minds- Version History</p>
            <p className='mt-4 text-lg'>All the upgrades and fixes.</p>

        {
            data.reverse().map((item,i)=>{
                return <div key={i} className='border border-zinc-300 rounded my-5 '>

                    <div className=' w-full bg-zinc-100 py-2 px-5 text-xl border-b border-zinc-300  font-medium flex justify-between items-center'>
                        <p> Version {item?.version}</p>
                        <div className='flex justify-start w-48 '>
                            <HiOutlineClock className=' text-base mt-[2px]'/>
                            <p className='text-sm ml-2'>Published on {item?.published}</p>
                        </div>
                    </div>

                        <div className='py-3 mx-16'>
                            {
                                item.updates.map((update,i)=>{

                                    return <p className=' text-sm'>- &nbsp;{update}</p>
                                })
                            }
                        </div>
                    </div>
            })
        }

       </div>
    </div>
  )
}