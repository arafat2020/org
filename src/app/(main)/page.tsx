import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
import { products } from '../_components/Hero'
import Counter from '../_components/Counter'
import MarqueeTwo from '../_components/MarqueeTwo'
import Products from '../_components/Products'
import { MarqueeReview } from '../_components/Marquee'
import { serverClient } from '../_trpc/serverClient'
import Overview from '../_components/Overview'
import WhyUs from '../_components/whay-Us'
import Factory from '../_components/Factory'

async function Home() {
  const productForHome = await serverClient.product.getProductForHomepage()
  return (
    <div className='w-full overflow-x-hidden overflow-y-scroll scrollbar-hide'>
      <HeroParallax products={products} />
      <Counter/>
      <MarqueeTwo/>
      <Overview/>
      <WhyUs/>
      <Products data={productForHome}/>
      <Factory/>
      <MarqueeReview/>
    </div>
  )
}

export default Home