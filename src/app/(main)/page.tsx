import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
import { products } from '../_components/Hero'
import Counter from '../_components/Counter'
import MarqueeTwo from '../_components/MarqueeTwo'
import Products from '../_components/Products'
import { MarqueeReview } from '../_components/Marquee'

function Home() {
  return (
    <div className='w-full overflow-x-hidden overflow-y-scroll scrollbar-hide'>
      <HeroParallax products={products} />
      <Counter/>
      <MarqueeTwo/>
      <Products/>
      <MarqueeReview/>
    </div>
  )
}

export default Home