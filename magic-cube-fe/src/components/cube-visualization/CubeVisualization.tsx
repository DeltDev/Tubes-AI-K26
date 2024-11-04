import React from 'react';
import CubeLayer from "@/components/cube-layer/CubeLayer";
import SpaceDiagonalVis from "@/components/space-diagonal/SpaceDiagonalVis";


interface CubeVisualizationProps {
    iteration: number;//iterasi ke berapa
    value: number;//nilai objective function dari state
    cube: number[][][]; //representasi kubus dalam bentuk array 3d
    spaceDiags: number[][];//daftar diagonal ruang
}

const CubeVisualization: React.FC<CubeVisualizationProps> = ({iteration,value,cube,spaceDiags}) => {
    const xLayers = cube.map((layer)=>layer);
    const yLayers = Array.from({length:5}, (_,i)=>cube.map(row=>row[i]));
    const zLayers = Array.from({length:5}, (_,i)=>cube.map(row=>row.map(col=>col[i])));
    return (
        <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', border: '2px solid white' }}>
            <h2>Iterasi ke: {iteration}</h2>
            <h2>Objective Value: {value}</h2>
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
            <h4>Diagonal Ruang</h4>
            <div style={{display: 'flex', justifyContent: 'center', gap: '400px'}}>
                {spaceDiags.map((diagonal, idx) => (
                    <SpaceDiagonalVis key={`diag-${idx}`} numbers={diagonal}/>
                ))}
            </div>
        </div>
    );
};

export default CubeVisualization;
