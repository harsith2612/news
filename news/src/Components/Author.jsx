import { useState } from "react";

const Author=({authorList,setAuthorFilter})=>{
    
    const [authorName,setAuthorName]=useState('');
   
    return(
        <div className="">
            <select
              name="Author"
              value={authorName}
              onChange={(e)=>(setAuthorName(e.target.value),setAuthorFilter(e.target.value))}
              className="p-2 border rounded-lg outline-none items-center max-w-48"
            >
              <option value="">All Authors</option>
              {
                authorList.map((author)=>( <option className="" key={author} value={author}>{author}</option>))
              }
            </select>
        </div>
    )
}

export default Author;