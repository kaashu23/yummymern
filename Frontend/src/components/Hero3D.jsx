import { Canvas } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';

const AbstractFoodElement = ({ color, position, rotation, scale, geometry }) => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={position}>
      <mesh rotation={rotation} scale={scale}>
        {geometry === 'torus' && <torusGeometry args={[1, 0.3, 32, 64]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
        {geometry === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />}
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.8} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
        />
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="city" />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {/* Central Plate/Bowl abstract representation */}
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={2.5}>
              <cylinderGeometry args={[1, 0.8, 0.2, 64]} />
              <meshPhysicalMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </mesh>
          </Float>

          {/* Floating Abstract "Food" Elements */}
          <AbstractFoodElement 
            geometry="torus" 
            color="#CE1212" 
            position={[-1.5, 1, 1]} 
            rotation={[Math.PI/4, Math.PI/4, 0]} 
            scale={0.5} 
          />
          <AbstractFoodElement 
            geometry="sphere" 
            color="#f59e0b" 
            position={[1.5, 1.5, -1]} 
            rotation={[0, 0, 0]} 
            scale={0.6} 
          />
          <AbstractFoodElement 
            geometry="cylinder" 
            color="#10b981" 
            position={[0, 2, 1.5]} 
            rotation={[Math.PI/3, 0, Math.PI/4]} 
            scale={0.4} 
          />
        </PresentationControls>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
