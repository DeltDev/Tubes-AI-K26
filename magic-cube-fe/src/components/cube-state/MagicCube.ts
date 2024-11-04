export interface MagicCubeClass {
    cubeState: number[][][]; //representasi magic cube dalam bentuk array 3d
    value: number; //nilai objective function dari magic cube saat ini
    sumConstraint: number;
}