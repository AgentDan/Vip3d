import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

const EnvShadows = ({ shadows }) => {
    const { gl } = useThree();

    useEffect(() => {
        if (!shadows) return;
        gl.shadowMap.enabled = shadows.enabled ?? true;
        gl.shadowMap.type = THREE[shadows.type] || THREE.PCFSoftShadowMap;
    }, [gl, shadows]);

    return null;
};

export default EnvShadows;
