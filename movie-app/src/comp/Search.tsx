import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"

const Search = () => {
    const[userInput,setUserInput] = useState('')
  return (
    <div className=" flex justify-center items-start search-comp">
        <input type="input" placeholder="search" value={userInput} onChange={(e)=>setUserInput(e.target.value)} className=" px-10 py-2 border-2 border-gray-500 rounded-2xl "  />
        <FontAwesomeIcon icon={faSearch} className="p-2 bg-slate-200 cursor-pointer h-6 rounded-lg"/>

    </div>
  )
}

export default Search;