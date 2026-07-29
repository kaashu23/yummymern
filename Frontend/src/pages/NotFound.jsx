import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text, Center, Float, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Floating404 = () => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Center>
        <group ref={meshRef}>
          <Text
            fontSize={6}
            letterSpacing={0.1}
            color="#c5a059"
            outlineWidth={0.05}
            outlineColor="#050505"
          >
            404
          </Text>
        </group>
      </Center>
    </Float>
  );
};

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#c5a059" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Floating404 />
          <Environment preset="city" />
        </Canvas>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 text-center mt-64 pointer-events-auto"
      >
        <h1 className="font-['EB_Garamond'] text-3xl md:text-5xl text-white mb-6 italic">Lost in the Cosmos</h1>
        <p className="text-white/50 text-sm md:text-base font-light mb-8 px-4 w-full text-center">
          The culinary experience you're looking for seems to have vanished into thin air.
        </p>
        <Link 
          to="/" 
          className="inline-block font-['Manrope'] text-xs uppercase tracking-[0.2em] text-[#050505] bg-white px-8 py-4 rounded-full hover:bg-[#c5a059] hover:text-white transition-all duration-500 font-bold"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
