import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineCheck } from 'react-icons/ai'

interface OptionQuestionProps {
  option: string
  votes: number
  percentage: number
  primary?: boolean
  onClick?: () => void
  selectedOption?: string
}

export const OptionQuestion: React.FC<OptionQuestionProps> = ({ option, primary, onClick, selectedOption, votes, percentage }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!selectedOption) return

    const interval = setInterval(() => {      
      if (count >= percentage) {
        clearInterval(interval);
      } else {
        setCount(count + 1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [count, selectedOption]);


  return (
    <div 
      onClick={onClick}
      className={`text-white py-6 text-center rounded-xl flex-1 ${primary ? 'bg-gradient-to-tr from-sky-400 to-sky-500' : 'bg-gradient-to-tr from-amber-400 to-amber-500'} font-semibold h-[250px] flex flex-col shadow-xl shadow-indigo-50 hover:cursor-pointer transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white border border-slate-50`}
    >
      { selectedOption && (
        <div className='flex flex-col items-center justify-center flex-1 pb-6 text-2xl'>
          <div className='flex items-center justify-end w-full px-4 h-9'>
          { selectedOption === option && (
            <div className={`p-2 rounded-full bg-sky-600 ${primary ? 'bg-sky-600' : 'bg-amber-600'}`}><AiOutlineCheck /></div>
            ) }
          </div>
          <span className='text-6xl'>{count}%</span>
        </div>
      ) }
      <div className='flex items-center justify-center flex-1 px-6'>
        <span className='text-md sm:text-xl lg:text-xl'>{option}</span>
      </div>
    </div>
  )
}