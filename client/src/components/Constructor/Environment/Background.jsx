import {useEffect} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {EXRLoader} from "three/examples/jsm/loaders/EXRLoader.js";

const Background = ({background}) => {
    const {scene} = useThree();
    console.log("Background: ", background)

    useEffect(() => {
        const loader = new EXRLoader();
        loader.load(
            background.file,
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;   // фон сцены
                scene.environment = texture;  // отражения материалов
            },
            undefined,
            (err) => {
                console.error("Failed to load HDRI:", err);
            }
        );

        return () => {
            if (scene.background) scene.background.dispose();
            if (scene.environment) scene.environment.dispose();
        };
    }, [scene, background.file]);

    return null;
};

export default Background;
