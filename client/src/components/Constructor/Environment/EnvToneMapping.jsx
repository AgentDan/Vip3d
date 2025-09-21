import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const EnvToneMapping = ({ toneMapping }) => {
    const { gl } = useThree();

    useEffect(() => {
        if (!toneMapping) return;
        gl.toneMapping = THREE[toneMapping.type] || THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.1;
    }, [toneMapping, gl]);

    return null;
};

export default EnvToneMapping;
