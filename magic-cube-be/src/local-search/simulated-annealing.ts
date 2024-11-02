import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class simulatedAnnealing{

    private static schedule(time:number):number{
        //IMPLEMENTASI FUNGSI SCHEDULE DI SINI
        return null;
    }
    private static calculateMoveProbability(deltaE:number, temperature:number):number{
        //IMPLEMENTASI FUNGSI PELUANG PINDAH DI SINI
        return null;
    }
    public static search(magicCube : MagicCubeClass): {
        cubeStates: Array<MagicCubeClass>,
        tValues: Array<number>,
        probabilities: Array<number>
    } {
        //IMPLEMENTASI ALGORITMA SIMULATED ANNEALING DI SINI
        //RETURNNYA HARUS ARRAY YANG ISINYA MAGIC CUBE CLASS
        return null;
    }
}