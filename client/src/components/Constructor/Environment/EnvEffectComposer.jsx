import React from 'react';
import {EffectComposer, DepthOfField, Bloom, Vignette} from "@react-three/postprocessing"

const EnvEffectComposer = () => {
    return (
        <>
            <EffectComposer>
                <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={0.5}/>
                <Bloom
                    intensity={0.2}       // сила свечения
                    luminanceThreshold={0.7} // от какого яркого значения начинается bloom
                    luminanceSmoothing={0.2} // мягкость порога
                    mipmapBlur={true}        // плавный bloom
                />
            </EffectComposer>
        </>
    );
};

export default EnvEffectComposer;