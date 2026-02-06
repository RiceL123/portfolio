import { useState, useContext, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, BakeShadows } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'
import { Instances, Computers } from './Computers.tsx'
import { ResumeContext, type ResumeSectionId } from './ResumeContext'
import { ResumeOverlay } from './ResumeOverlay'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [scrollToSection, setScrollToSection] = useState<ResumeSectionId | null>(null)
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === 'experience' || hash === 'skills' || hash === 'education' || hash === 'projects') {
      setResumeOpen(true)
      setScrollToSection(hash as ResumeSectionId)
    }
  }, [])
  const openResumeTo = (section: ResumeSectionId) => {
    setScrollToSection(section)
    setResumeOpen(true)
    if (typeof window !== 'undefined') window.location.hash = section
  }
  const handleCloseOverlay = () => {
    setResumeOpen(false)
    if (typeof window !== 'undefined') window.location.hash = ''
  }
  return (
    <ResumeContext.Provider value={{ resumeOpen, setResumeOpen, scrollToSection, setScrollToSection, openResumeTo }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
          eventSource={document.getElementById('root') ?? undefined}
          eventPrefix="client"
        >
          <SceneContent />
        </Canvas>
        {resumeOpen && <ResumeOverlay onClose={handleCloseOverlay} />}
      </div>
    </ResumeContext.Provider>
  )
}

function SceneContent() {
  const resume = useContext(ResumeContext)
  const groupRef = useRef<any>(null)
  const targetX = resume?.resumeOpen ? -2 : 0
  useFrame((_, delta) => {
    if (groupRef.current) {
      const current = groupRef.current.position.x
      groupRef.current.position.x = current + (targetX - current) * Math.min(1, delta * 4)
    }
  })
  return (
    <>
      <color attach="background" args={['black']} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight decay={0} position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <group ref={groupRef} position={[0, -1, 0]}>
        <Instances>
          <Computers scale={0.5} />
        </Instances>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={100}
            roughness={0}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          />
        </mesh>
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0} intensity={3} mipmapBlur />
        <DepthOfField target={[0, 0, -2]} focusRange={4} bokehScale={4} height={700} />
      </EffectComposer>
      <CameraRig />
      <BakeShadows />
    </>
  )
}

function CameraRig() {
  const influence = 0.35
  useFrame((state, delta) => {
    const x = -1 + (state.pointer.x * state.viewport.width * influence) / 3
    const y = (1 + state.pointer.y * influence) / 2
    easing.damp3(state.camera.position, [x, y, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return null;
}
