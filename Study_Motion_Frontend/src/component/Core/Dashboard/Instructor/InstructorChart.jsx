import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip,Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip,Legend);
export const InstructorChart = ({coursesData,isStudent}) => {
    function getRandomColors(count){
        const Colors=[]     
        for(let i=0;i<count;i++)
        {
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            Colors.push(color)
        }
        return Colors
    }
    const data={
    labels:coursesData.flatMap((element)=>{
        return element.courseName
    }),
    datasets: [
    {
    data:!isStudent ? coursesData.flatMap((element)=>{
            return element.totalAmount
    }) : coursesData.flatMap((element)=>{
         return element.Students
    }),
    backgroundColor:getRandomColors(coursesData.length),
    // borderColor:getRandomColors(coursesData.length),
    borderWidth: 1
    }
]  
}
const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top', // Places labels at the top
        labels: {
          font: {
            size: 12,
          },
          color: '#7A98A6',
          padding: 20,
          boxWidth: 20, // Makes the color indicators smaller
        },
      },
    },
  };
  
    return (
    <div className='w-[70%] bg-richblack-800 py-2 flex gap-2 flex-col  rounded-sm border-[1px] border-richblack-700'>
      <Pie data={data} width={800} height={800} options={options}/>
    </div>
  )
}
