import React, { useEffect } from 'react';
import Buttons from "./Buttons/Buttons.jsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { v1 } from "uuid";
import * as THREE from "three";
import Env from "./Environment/Env.jsx";
import { Meshes } from "./Meshes.jsx";

const Constructor = ({ openelements, setOpenelements, nameFile, arr, setArr }) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const modelPath = `${baseUrl}/uploads/${user.username}/${nameFile}`;

    const { nodes, materials, scenes, parser } = useGLTF(modelPath);

    const extras = scenes?.[0]?.extras ?? scenes?.[0]?.userData?.extras ?? parser?.json?.scenes?.[0]?.extras;

    const env = extras?.env ?? null;
    console.log("extras:", extras); // покажет весь объект extras
    console.log("env:", env);       // должно вывести { lights: "black" }

    useEffect(() => {
        if (!nodes) return;
        const meshes = Object.values(nodes || {}).filter((node) => node.isMesh);

        const arrModel = meshes.map((item) => ({
            id: v1(),
            name: item.name.replace(/[0-9_]/g, ""),
            fullName: item.name,
            check: item.name[1] === "0",
            group: Number(
                isNaN(Number(item.name.slice(0, 1))) === false
                    ? item.name.slice(0, 1)
                    : NaN
            ),
            description: item.userData?.i,
            x: item.userData?.x ?? 0.5,
            y: item.userData?.y ?? 0,
            z: item.userData?.z ?? 0,
            clickDescription: false,
        }));

        setArr(arrModel);
    }, [nameFile, nodes]);

    return (
        <div className="h-screen">
            <Canvas
                camera={{ fov: 50, position: [0, 0, 5] }}
                shadows={{ type: THREE.PCFSoftShadowMap }}
            >
                <Meshes arr={arr} setArr={setArr} materials={materials} nodes={nodes} />
                {env && <Env env={env} />} {/* Только если env найден */}
                <OrbitControls makeDefault />
            </Canvas>

            <Buttons
                arr={arr}
                setArr={setArr}
                openelements={openelements}
                setOpenelements={setOpenelements}
            />
        </div>
    );
};

export default Constructor;
