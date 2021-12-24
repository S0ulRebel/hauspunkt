/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Sink_Washbasin_1: THREE.Mesh
    Sink_Washbasin_2: THREE.Mesh
    Sink_Washbasin_3: THREE.Mesh
  }
  materials: {
    ['diffuse_0.002']: THREE.MeshStandardMaterial
    ['Polierter Edelst']: THREE.MeshStandardMaterial
    mat1: THREE.MeshStandardMaterial
  }
}

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('models/Sink.gltf') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={nodes.Sink_Washbasin_1.geometry} material={materials['diffuse_0.002']} />
        <mesh geometry={nodes.Sink_Washbasin_2.geometry} material={materials['Polierter Edelst']} />
        <mesh geometry={nodes.Sink_Washbasin_3.geometry} material={materials.mat1} />
      </group>
    </group>
  )
}

useGLTF.preload('/Sink.gltf')