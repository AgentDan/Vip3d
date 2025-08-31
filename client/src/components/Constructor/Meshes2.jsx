import React, { Suspense, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

extend({ Reflector });

function Mirror() {
    const mirrorRef = useRef();
    const geometry = new THREE.PlaneGeometry(5, 5);
    const reflector = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: 512,
        textureHeight: 512,
        color: 0x777777,
    });
    reflector.rotation.x = -Math.PI / 2;
    return <primitive object={reflector} ref={mirrorRef} />;
}

function Model({ url, position }) {
    const { scene } = useGLTF(url);
    scene.position.set(...position);
    return <primitive object={scene} />;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <Mirror />
            <Model url="/soba.gltf" position={[0, 1, -1]} />
        </>
    );
}

export default function App() {
    return (
        <Canvas style={{ width: "100vw", height: "100vh" }} camera={{ position: [5, 5, 5], fov: 50 }}>
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
