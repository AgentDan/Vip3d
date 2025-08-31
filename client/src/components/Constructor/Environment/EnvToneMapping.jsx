import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const EnvToneMapping = ({ toneMapping }) => {
    const { gl } = useThree();

    useEffect(() => {
        if (!toneMapping) return;

        // установка toneMapping
        gl.toneMapping = THREE[toneMapping.type] || THREE.ACESFilmicToneMapping;

        // экспозиция (яркость)
        if (toneMapping.exposure !== undefined) {
            gl.toneMappingExposure = toneMapping.exposure;
        }

    }, [toneMapping, gl]);

    return null;
};

export default EnvToneMapping;
