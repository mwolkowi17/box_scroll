import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const color = new THREE.Color()

export default function Model({ scroll, ...props }) {
  const t = useRef(0)
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/model7.glb");
  const fullGroup = useGLTF("/model7.glb");
  const { actions, mixer } = useAnimations(animations, group)
  const [hovered, set] = useState()
  const extras = { receiveShadow: true, castShadow: true, "material-envMapIntensity": 0.2 }
  useEffect(() => void (actions["CameraAction.005"].play().paused = true), [])
  /*useEffect(() => {
    if (hovered) group.current.getObjectByName(hovered).material.color.set("white")
    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered])*/
  useFrame((state) => {
    actions["CameraAction.005"].time = THREE.MathUtils.lerp(actions["CameraAction.005"].time, actions["CameraAction.005"].getClip().duration * scroll.current, 0.05)
    group.current.children[0].children.forEach((child, index) => {
      //child.material.color.lerp(color.set(hovered === child.name ? "tomato" : "#202020").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
      const et = state.clock.elapsedTime
      child.position.y = Math.sin((et + index * 2000) / 2) * 1
      child.rotation.x = Math.sin((et + index * 2000) / 3) / 10
      child.rotation.y = Math.cos((et + index * 2000) / 2) / 10
      child.rotation.z = Math.sin((et + index * 2000) / 3) / 10
    })
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group
       // onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
        //onPointerOut={(e) => (e.stopPropagation(), set(null))}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}>
        {/*<mesh name="Headphones" geometry={nodes.Headphones.geometry} material={materials.M_Headphone} {...extras} />*/}
        {/*<mesh name="Notebook" geometry={nodes.Notebook.geometry} material={materials.M_Notebook} {...extras} />*/}
        {/*<mesh name="Rocket003" geometry={nodes.Rocket003.geometry} material={materials.M_Rocket} {...extras} />*/}
       {/* <mesh name="Roundcube001" geometry={nodes.Roundcube001.geometry} material={materials.M_Roundcube} {...extras} />*/}
        {/*<mesh name="Table" geometry={nodes.Table.geometry} material={materials.M_Table} {...extras} />*/}
        {/*<mesh name="VR_Headset" geometry={nodes.VR_Headset.geometry} material={materials.M_Headset} {...extras} />*/}
        {/* imprtant place*/}
        <primitive name="Ob" object={fullGroup.nodes.ob1geo} /> 
        <primitive name="Ob2" object={fullGroup.nodes.ob2} /> 
        {/*<mesh name="Ob2" geometry={nodes.ob2geo.geometry} material={materials.Bottom} {...extras} /> */}
        <primitive name="Ob3" object={fullGroup.nodes.ob3} /> 
        {/*<mesh name="Ob3" geometry={nodes.ob3geo.geometry} material={materials.L6} {...extras} /> */}
        <primitive name="Ob4" object={fullGroup.nodes.ob4} /> 
        {/*<mesh name="Ob4" geometry={nodes.ob4geo.geometry} material={materials.L6a} {...extras} /> */}
        <mesh name="Ob5" geometry={nodes.ob5geo.geometry} material={materials.L5} {...extras} /> 
        <mesh name="Ob6" geometry={nodes.ob6geo.geometry} material={materials.White6} {...extras} /> 
        <mesh name="Ob7" geometry={nodes.ob7geo.geometry} material={materials.L6b} {...extras} /> 
        {/*<mesh name="Zeppelin" geometry={nodes.Zeppelin.geometry} material={materials.M_Zeppelin} v />*/}
      </group>
      <group name="Camera" position={[-1.78, 2.04, 23.58]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  )
}

useGLTF.preload("/model8.glb")
