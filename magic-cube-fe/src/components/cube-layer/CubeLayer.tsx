import React from "react";

interface CubeLayerProps {
    cubeLayer:number[][];
}

const CubeLayer: React.FC<CubeLayerProps> = ({cubeLayer}) => {
    const layerSize = 5;
    const highlightCnt: number[][] = Array.from({length:layerSize}, () => Array(layerSize).fill(0)); //menentukan tingkat keterangan kotak
    //cek apakah 5 buah angka di dalam suatu garis (kolom,baris,diagonal) jumlahnya sama dengan 315
    const isSum315 = (numbers: number[]): boolean => {
        return numbers.reduce((sum, num) => sum + num, 0) === 315;
    };

    //tentukan baris dan kolom mana saja yang jumlahnya 315

    for (let i = 0; i < layerSize; i++) {
        if (isSum315(cubeLayer[i])) {
            for (let j = 0; j < layerSize; j++) {
                highlightCnt[i][j] += 1;
            }
        }

        const col = cubeLayer.map(row => row[i]);
        if (isSum315(col)) {
            for (let j = 0; j < layerSize; j++) {
                highlightCnt[j][i] += 1;
            }
        }
    }

    //tentukan diagonal bidang yang jumlahnya sama dengan 315
    const diag1 = cubeLayer.map((row, idx) => row[idx]);
    const diag2 = cubeLayer.map((row, idx) => row[layerSize - idx - 1]);

    if(isSum315(diag1)){
        for (let i = 0; i < layerSize; i++) {
            highlightCnt[i][i] += 1;
        }
    }
    if(isSum315(diag2)){
        for (let i = 0; i < layerSize; i++) {
            highlightCnt[i][layerSize - i - 1] += 1;
        }
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${layerSize}, 40px)`, gap: '5px', margin: '20px', backgroundColor: 'black'}}>
            {cubeLayer.map((row, rowIdx) =>
                row.map((num, colIdx) => {
                    const highlightLevel = highlightCnt[rowIdx][colIdx];
                    const backgroundColor = highlightLevel > 0 ? `rgba(0, 128, 0, ${0.3 * highlightLevel})` : 'black';
                    return (
                        <div
                            key={`${rowIdx}-${colIdx}`}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: backgroundColor,
                                border: '1px solid white',
                            }}
                        >
                            {num}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default CubeLayer;