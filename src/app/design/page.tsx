"use client"
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "//assets.pinterest.com/js/pinit.js";
    document.body.appendChild(script);
  }, []);
  return (
    <div className='p-24'>
        <a
        data-pin-do="embedBoard"
        data-pin-board-width="1200"
        data-pin-scale-height="700"
        data-pin-scale-width="80"
        href="https://www.pinterest.com/sanjeetkazi/luxury/"
      ></a>
        <iframe src="https://assets.pinterest.com/ext/embed.html?id=36380709483637951" height="420" style={{borderRadius:"0px"}} width="236" frameBorder="0" scrolling="no" ></iframe>
    </div>
  )
}


export default page