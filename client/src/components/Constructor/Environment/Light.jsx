import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

const LightWithHelper = () => {
    const spotRef = useRef();
    const spot2Ref = useRef();
    const spotTarget = useRef();
    const { scene } = useThree();
    const arrow1Ref = useRef();
    const arrow2Ref = useRef();

    useEffect(() => {
        if (spotRef.current && spot2Ref.current && spotTarget.current) {
            // назначаем цель
            spotRef.current.target = spotTarget.current;
            spot2Ref.current.target = spotTarget.current;

            const dir1 = new THREE.Vector3().subVectors(
                spotTarget.current.position,
                spotRef.current.position
            ).normalize();

            const dir2 = new THREE.Vector3().subVectors(
                spotTarget.current.position,
                spot2Ref.current.position
            ).normalize();

            const length = 2;
            const arrowHelper1 = new THREE.ArrowHelper(dir1, spotRef.current.position.clone(), length, 0xff0000);
            const arrowHelper2 = new THREE.ArrowHelper(dir2, spot2Ref.current.position.clone(), length, 0x00ff00);

            arrow1Ref.current = arrowHelper1;
            arrow2Ref.current = arrowHelper2;

            scene.add(arrowHelper1);
            scene.add(arrowHelper2);

            return () => {
                scene.remove(arrowHelper1);
                scene.remove(arrowHelper2);
            };
        }
    }, [scene]);

    // обновляем стрелки на каждом кадре
    useFrame(() => {
        if (spotRef.current && spotTarget.current && arrow1Ref.current) {
            const dir1 = new THREE.Vector3().subVectors(
                spotTarget.current.position,
                spotRef.current.position
            ).normalize();
            arrow1Ref.current.setDirection(dir1);
            arrow1Ref.current.position.copy(spotRef.current.position);
        }

        if (spot2Ref.current && spotTarget.current && arrow2Ref.current) {
            const dir2 = new THREE.Vector3().subVectors(
                spotTarget.current.position,
                spot2Ref.current.position
            ).normalize();
            arrow2Ref.current.setDirection(dir2);
            arrow2Ref.current.position.copy(spot2Ref.current.position);
        }
    });

    return (
        <>
            <spotLight
                ref={spotRef}
                castShadow
                position={[0.5, 1, -2.5]}
                angle={15 * Math.PI / 180}
                intensity={4.2}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.005}
                penumbra={1}
            />
            <spotLight
                ref={spot2Ref}
                castShadow
                position={[0.5, 1, 0.5]}
                angle={45 * Math.PI / 180}
                intensity={4.2}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.005}
                penumbra={1}
            />
            <mesh ref={spotTarget} position={[0.2, -0.2, -1]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh position={[0.5, 1, -2.5]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="blue" />
            </mesh>
            <ambientLight intensity={0.1} />
        </>
    );
};

export default LightWithHelper;
