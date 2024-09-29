import React from 'react'
import Hero from './homeuitils/Hero'
import TabNavigator from './homeuitils/TabNavigator'
import SubscribeSection from './homeuitils/SubscribeSection'
import DilerSection from './homeuitils/DilerSection'

const Home:React.FC = () => {
  return (
    <main className='home'>
      <Hero />
      <TabNavigator />
      <SubscribeSection />
      <DilerSection />
    </main>
  )
}

export default Home