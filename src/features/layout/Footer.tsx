import React, {FC} from 'react'
import { Link } from 'react-router-dom'
import {BsLinkedin, BsPersonVcardFill} from 'react-icons/bs'
import {FcDocument} from 'react-icons/fc'

const Footer:FC = () => {
  return (
    <>
      <div className="bg-gray-950 text-white">
      <div className="grid py-3 px-2 space-y-8 ">
        <div className="col-span-12">
          <div className="flex flex-col justify-center items-center">
            <p className="sm:text-2xl font-bold font-serif">
            "Reading gives us someplace to go when we have to stay where we are." - Mason Cooley
            </p>
            <div className="mt-5 flex space-x-4 sm:space-x-8 justify-center text-2xl sm:text-3xl">
              <Link to={"https://www.linkedin.com/in/mohammed-minnathullah-06885b263"} target="_blank">
                <BsLinkedin className="cursor text-sky-500" />
                <p className='text-base'>LinkedIn</p>
              </Link>
              <a
                href='/images/Resume.pdf'
                download={`Minnathullah's Resume`}
                target="_blank"
              >
                <FcDocument className="cursor text-red-500" />
                <p className='text-base'>Resume</p>
              </a>
              <Link to={"https://mmr-portfolio.vercel.app/"}>
                <BsPersonVcardFill className="cursor" />
                <p className='text-base'>Portfolio</p>
              </Link>
            </div>
          </div>
        </div>       
      </div>
      <hr className="mt-10" />
      <p className="px-2 py-2">© 2023 BooksMMR, Inc. All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer
