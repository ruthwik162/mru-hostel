import React from 'react'
import AboutCard from '../Components/AboutCard'
import HostelImages from '../Components/HostelImages';

const AboutUs = () => {
  return (
    <div className='relative min-h-screen py-30 bg-gray-50 overflow-hidden'>
      <HostelImages/>
        <AboutCard/>
    </div>
  )
}

export default AboutUs;