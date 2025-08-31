import React, { useRef, useEffect } from "react";
import Description from "./Description/Description.jsx";

export function Meshes({ arr, setArr, nodes, materials }) {
    return (
        <>
            {arr.map((item) => {
                const shouldRender =
                    (nodes[item.fullName] &&
                        nodes[item.fullName].geometry &&
                        item.check) ||
                    item.name === "default" ||
                    item.name === "default1";

                if (!shouldRender) return null;

                return (
                    <mesh
                        key={item.id}
                        geometry={nodes[item.fullName].geometry}
                        castShadow
                        receiveShadow
                    >
                        <meshStandardMaterial {...materials[item.fullName]} />
                        {item.description && <Description setArr={setArr} item={item} />}
                    </mesh>
                );
            })}
        </>
    );
}
