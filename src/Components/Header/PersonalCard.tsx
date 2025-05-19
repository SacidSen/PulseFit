import { useState } from "react"

type CardProps = {
    img: string,
    overlayText: string,
    overlayDescrition: string
}

export default function PersonalCard({ img, overlayText, overlayDescrition }: CardProps) {
    const [show, setShow] = useState(false);

    return (
        <div onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}
            className="flex flex-col w-1/4 relative cursor-pointer">
            <div className="border border-gray-300 flex justify-center p-4">
                <img src={img} alt={img} />
            </div>
            {show && <div style={{height: show ? '100%' : '0' + 'px'}} className='absolute bg-red-200 ease-in-out w-full h-full flex flex-col justify-center items-center'>
                <h1>{overlayText}</h1>
                <a className="max-w-full truncate" href="#">{overlayDescrition}</a>
            </div>}
        </div>
    )
}