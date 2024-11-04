import React from 'react';
import SpaceDiagonalVis from "@/components/space-diagonal/SpaceDiagonalVis";

const ComponentTest: React.FC = () => {
    const numbers: number[] = [45,50,60,70,90];

    return (
        <div>
            <SpaceDiagonalVis numbers={numbers} />
        </div>
    );
};

export default ComponentTest;
