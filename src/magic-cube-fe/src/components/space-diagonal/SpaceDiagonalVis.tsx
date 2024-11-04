import React from "react";

interface SpaceDiagonalProps{
    numbers: number[];
}

const SpaceDiagonalVis: React.FC<SpaceDiagonalProps> = ({numbers}) => {
    const sum = numbers.reduce((acc,num) => acc + num, 0);
    const isSum315 = sum === 315;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'black' }}>
            {numbers.map((num, index) => (
                <div
                    key={index}
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        backgroundColor: isSum315 ? 'green' : 'black',
                        transform: `translate(${index * 40}px)`
                    }}
                >
                    {num}
                </div>
            ))}
        </div>
    );
}

export default SpaceDiagonalVis;