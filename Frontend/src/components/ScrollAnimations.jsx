import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = ({ children }) => {
  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      lenisOptions: {
        smoothTouch: false,
      }
    });

    // With Locomotive Scroll v5 (which uses Lenis under the hood),
    // it uses native scrolling, so we don't need scrollerProxy!
    // We just need to refresh ScrollTrigger on update.
    
    // We can hook into Lenis's scroll event if we want, but GSAP's ScrollTrigger
    // natively supports Lenis out of the box.

    return () => {
      if (locoScroll) locoScroll.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return children;
};

export default ScrollAnimations;
