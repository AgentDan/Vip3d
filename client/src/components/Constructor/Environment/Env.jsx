import React from 'react';
import EnvLight from "./EnvLight.jsx";
import Background from "./Background.jsx";
import Fog from "./Fog.jsx";
import EnvToneMapping from "./EnvToneMapping.jsx";
import EnvShadows from "./EnvSchadows.jsx";
import EnvEffectComposer from "./EnvEffectComposer.jsx";

const Env = ({env}) => {
    return (
        <>
            {env.lights && <EnvLight lights={env.lights}/>}
            {env.background && <Background background={env.background}/>}
            {env.fog && <Fog fog={env.fog}/>}
            {env.toneMapping && <EnvToneMapping toneMapping={env.toneMapping}/>}
            {env.shadows && <EnvShadows shadows={env.shadows}/>}
            {env.EffectComposer && <EnvEffectComposer/>}
        </>
    );
};

export default Env;