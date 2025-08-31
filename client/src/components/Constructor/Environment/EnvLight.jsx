import React, {useRef} from 'react';

const EnvLight = ({lights}) => {
    const spotRef = useRef()
    const spot2Ref = useRef()
    const spotTarget = useRef()

    return (
        <>
            <spotLight
                ref={spotRef}
                castShadow
                position={[0.5, 1.5, -2.5]}
                angle={35 * Math.PI / 180}
                intensity={10}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-bias={-0.005}
                penumbra={1}
            />
            <spotLight
                ref={spot2Ref}
                castShadow
                position={[1.5, 1.6, 0.2]}
                angle={35 * Math.PI / 180}
                intensity={10}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-bias={-0.005}
                penumbra={1}
            />
            <mesh ref={spotTarget} position={[0.2, -0.2, -1]} visible={false}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <ambientLight intensity={0.3} />
        </>
    );
};

export default EnvLight;