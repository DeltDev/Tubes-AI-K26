import { MagicCubeClass } from "../magic-cube-class/magic-cube-class";
import { hcSteepestAscent } from "./hc-steepest-ascent";

export class hcRandomRestart {
    public static search(magicCube : MagicCubeClass, maxRestarts: number): Array<MagicCubeClass> {
        //Variabel untuk menyimpan steps dan value local optima terbaik dari semua restart
        let bestLocalOptimaStates: Array<MagicCubeClass> = [];
        let bestLocalOptimaValue = -1;

        for (let i = 0; i < maxRestarts; i++) {
            // Lakukan steepest ascent
            const currentLocalOptimaSteps = hcSteepestAscent.search(magicCube);
            const currentLocalOptimaCube = currentLocalOptimaSteps[currentLocalOptimaSteps.length - 1];
            const currentLocalOptimaValue = currentLocalOptimaCube.objectiveFunction(currentLocalOptimaCube.getCurrentState());
            
            //Bandingkan hasil local optima sekarang dengan local optima terbaik sejauh ini
            if (currentLocalOptimaValue > bestLocalOptimaValue) {
                bestLocalOptimaStates = currentLocalOptimaSteps;
                bestLocalOptimaValue = currentLocalOptimaValue;
            }

            //Break jika global optima tercapai
            if (currentLocalOptimaValue === 109) {
                break;
            }
        }
        return bestLocalOptimaStates;
    }
}