import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Url() {
   const [originalUrl, setOriginalurl] =  useState('')
   const [shortUrl, setShorturl] =  useState('')
   const [error,setError] = useState(null)

   const validateUrl = () => {
    try {
        // Try to construct a URL object to check validity
        new URL(originalUrl);
        setError(''); // Clear error if valid
    } catch (e) {
        if(originalUrl != ''){
            setError('Invalid url please enter a valid one.');
        }
    }
};


   useEffect(()=> {
    validateUrl()
   },[originalUrl])
   
   const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/url/create', {originalUrl})
            console.log(response)
            setShorturl(response.data.shortUrl)
            
        } catch (error) {
            setError(error.message)
        }
    }


  return (  
    <div className='w-full min-h-screen text-white bg-gray-900 flex flex-col items-center p-24'>
        <div className=''>
            <h1 className='text-center text-4xl font-bold mb-10'>Url Shortner</h1>
            <form onSubmit={handleSubmit} className='flex gap-3'>
                <input
                    className='pr-32 bg-transparent pl-2 py-1 outline-none rounded-lg border  focus:border-pink-400'
                    value={originalUrl}
                    onChange={(e) => setOriginalurl(e.target.value)}
                    type="text" placeholder='Original url'/>
                <button className='bg-blue-600 hover:bg-blue-700 duration-200 px-3 py-2 rounded-lg' >Get short url</button>
            </form>
        </div>

        {shortUrl &&
                <div className='flex items-center gap-5 mt-5'>
                    <p className='bg-purple-600 px-3 py-2 rounded-lg'>Shortend url : </p>
                    <button className='bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-lg text-black'><a className='py-10' href={shortUrl}>{shortUrl}</a></button>
                </div>
        }

        {error  && 
            <p className='text-black bg-red-600 px-3 py-2 rounded-lg mt-5 '>{error}</p>
        }
    </div>
  )
}

export default Url
