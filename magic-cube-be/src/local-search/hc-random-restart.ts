/* eslint-disable prettier/prettier */
import { MagicCubeClass } from "../magic-cube-class/magic-cube-class";
import { hcSteepestAscent } from "./hc-steepest-ascent";

export class hcRandomRestart {
    public static search(magicCube : MagicCubeClass, maxRestarts: number): Array<Array<MagicCubeClass>> {
        //Variabel untuk menyimpan semua steps dan semua restart
        const allResult : Array<Array<MagicCubeClass>> = [];

        for (let i = 0; i < maxRestarts; i++) {
            // Lakukan steepest ascent
            const currentLocalOptimaSteps = hcSteepestAscent.search(magicCube);
            const currentLocalOptimaCube = currentLocalOptimaSteps[currentLocalOptimaSteps.length - 1];
            const currentLocalOptimaValue = currentLocalOptimaCube.objectiveFunction(currentLocalOptimaCube.getCurrentState());
            
            // Simpan ke array
            allResult.push(currentLocalOptimaSteps);

            // Kalau sudah global optima, stop
            if (currentLocalOptimaValue == currentLocalOptimaCube.getSumConstraintVal()) {
                break;
            }
            
        }
        return allResult;
    }
}