import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AnimatedBackground from './components/ui/AnimatedBackground';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Proof from './components/Proof';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import FreeQuestionsLanding from './components/FreeQuestionsLanding';

function HomePage() {
  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col gap-10">
        <Hero />
        <ValueProps />
        <Proof />
        <Pricing />
        <CTA />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/free-questions" element={<FreeQuestionsLanding />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;