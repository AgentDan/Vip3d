import React from 'react';

const Fog = ({fog}) => {
    return (
        <>
            <fog attach="fog" args={fog.args} />
        </>
    );
};

export default Fog;