import React from 'react';
import SpaceDiagonalVis from "@/components/space-diagonal/SpaceDiagonalVis";
import CubeLayer from "@/components/cube-layer/CubeLayer";

const ComponentTest: React.FC = () => {
    const numbers: number[] = [45,50,60,70,90];
    const layer = [
        [1,50,3,4,50],
        [50, 60, 70, 60, 55],
        [11,70,70,14,15],
        [16,80,18,19,20],
        [55,55,23,24,25]
    ];
    return (
        <div>
            <SpaceDiagonalVis numbers={numbers} />
            <CubeLayer cubeLayer={layer}/>
        </div>
    );
};

export default ComponentTest;
