import React from 'react'

export default function ModalTrailer({onTrailer,onCloseTrailer,trailer}) {
  if(!onTrailer){
    return ''
  }
  return (
    <div  onClick={onCloseTrailer} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 ">
        <div  className="bg-white cursor-pointer rounded-lg overflow-hidden">
        <iframe width="560" height="315" src={trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </div>
  )
}
