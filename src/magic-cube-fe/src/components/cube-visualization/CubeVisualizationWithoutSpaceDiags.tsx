import React from 'react';
import CubeLayer from "@/components/cube-layer/CubeLayer";

interface CubeVisualizationWithoutSpaceDiagsProps {
    cube: number[][][]; //representasi kubus dalam bentuk array 3d
}

const CubeVisualizationWithoutSpaceDiags: React.FC<CubeVisualizationWithoutSpaceDiagsProps> = ({cube}) => {
    const xLayers = cube.map((layer)=>layer);
    const yLayers = Array.from({length:5}, (_,i)=>cube.map(row=>row[i]));
    const zLayers = Array.from({length:5}, (_,i)=>cube.map(row=>row.map(col=>col[i])));
    return (
        <div style={{ padding: '20px', color: 'black', border: '2px solid white' }}>
            <h3>Bidang sumbu x</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {xLayers.map((layer, idx) => (
                    <CubeLayer key={`x-${idx}`} cubeLayer={layer} />
                ))}
            </div>
            <h3>Bidang sumbu y</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {yLayers.map((layer, idx) => (
                    <CubeLayer key={`y-${idx}`} cubeLayer={layer} />
                ))}
            </div>
            <h3>Bidang sumbu z</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {zLayers.map((layer, idx) => (
                    <CubeLayer key={`z-${idx}`} cubeLayer={layer} />
                ))}
            </div>
        </div>
    );
};

export default CubeVisualizationWithoutSpaceDiags;
