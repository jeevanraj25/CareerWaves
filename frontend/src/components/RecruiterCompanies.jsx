import React from 'react'
import Marquee from './ui/marquee';

const companyLogos = [
  { src: '/apple.jpeg', alt: 'Apple ' },
  { src: '/Google.png', alt: 'Google' },
  { src: '/Samsung.jpeg', alt: 'Samsung' },
  { src: '/microsoft.jpeg', alt: 'Microsoft' },
  { src: '/openai.jpeg', alt: 'OpenAI' },
  { src: '/Meta.png', alt: 'Meta' },
];


const RecruiterCompanies = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div> 
                <h1 className='text-3xl font-bold my-5'>Our top recruiters companies</h1>
            </div>
           <div className="relative flex h-[100px] w-[1000px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]">
            {companyLogos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                
                className="h-[50px] w-[50px] mx-6"
              />
            ))}
          </Marquee>
        </div>
        </div>
    );
}

export default RecruiterCompanies
