import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const RateReviewPart = () => {
    const[rate,setRate] = useState(0)
    const[review,setReview] = useState('')



  return (
    <section className="">
      <h4 className="text-white text-xl">Rate & Review</h4>
        <div className="">
            {[1,2,3,4,5].map((star,index)=>(
                <FontAwesomeIcon icon={faStar} key={star} onClick={()=>setRate(star)} className={`cursor-pointer ${index<rate?'text-yellow-500':'text-white'}`}/>
        ))}

                </div>
                {rate>0 &&(
                    <div className="">
                        <input type="text" className="p-2 border-2 border-white bg-transparent" placeholder="write review" value={review} onChange={(e)=>setReview(e.target.value)} />
                        <button type="button" className="px-4 py-2 bg-blue-500 text-white">Submit</button>
                    </div>
                )}

    </section>
  )
}

export default RateReviewPart