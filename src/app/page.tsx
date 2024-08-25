import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
import { products } from './_components/Hero'
import Counter from './_components/Counter'
import { MarqueeReview } from './_components/Marquee'
import Products from './_components/Products'
import MarqueeTwo from './_components/MarqueeTwo'
import Footer from './_components/Footer'

function Home() {
  return (
    <div className='w-full overflow-x-hidden overflow-y-scroll scrollbar-hide'>
      <HeroParallax products={products} />
      <Counter/>
      <MarqueeTwo/>
      <Products/>
      <MarqueeReview/>
      <Footer/>
    </div>
  )
}

export default Home