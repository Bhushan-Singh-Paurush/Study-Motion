import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { rating } from '../../services/apis'
import ReactStars from 'react-stars'
export const Rating = ({courseId,count=null}) => {

    const[ratingcount,setRatingCount]=useState()
    useEffect(()=>{
        ;(async()=>{
            if(count)
            {
                setRatingCount(count)
                return ;
            }
            const result = await apiConnector("POST",rating.GET_RATING,{courseId})
            if(result)
            {
                setRatingCount(result.data.AverageRating)
            }

        })()
    },[])  
    return (
   <>
    {ratingcount!==null && <div className=' flex w-fit gap-4 items-center'>
        <div className=' text-yellow-100'>{ratingcount}</div>
        <ReactStars count={5} edit={false} size={20} value={ratingcount} color2={'#E7C009'}/>
        <div className=' text-richblack-400'>(Review Count)</div>
    </div>}
   </>
  )
}
