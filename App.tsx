import React from 'react';
import Layout from './components/Layout';
import AnimatedBackground from './components/ui/AnimatedBackground';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Proof from './components/Proof';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

function App() {
  return (
    <Layout>
      <CustomCursor />
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col gap-10">
        <Hero />
        <ValueProps />
        <Proof />
        <Pricing />
        <CTA />
      </div>
    </Layout>
  );
}

export default App;