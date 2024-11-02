import { MagicCubeClass } from "../magic-cube-class/magic-cube-class";
import { hcSteepestAscent } from "./hc-steepest-ascent";

export class hcRandomRestart {
    public static search(magicCube : MagicCubeClass): Array<MagicCubeClass> {
        // Variabel untuk menyimpan steps dan value local optima terbaik dari semua restart
        let bestLocalOptimaStates: Array<MagicCubeClass> = [];
        let bestLocalOptimaValue = -1;

        // Sementara, jumlah restart adalah 10
        for (let i = 0; i < 10; i++) {
            // Inisialisasi random initial state
            magicCube.setCurrentState(magicCube.getRandomInitState());

            // Lakukan steepest ascent
            const currentLocalOptimaStates = hcSteepestAscent.search(magicCube);
            const currentLocalOptimaCube = currentLocalOptimaStates[currentLocalOptimaStates.length - 1];
            const currentLocalOptimaValue = currentLocalOptimaCube.getCurrentValue();
            
            // Bandingkan hasil local optima sekarang dengan local optima terbaik sejauh ini
            if (currentLocalOptimaValue > bestLocalOptimaValue) {
                bestLocalOptimaStates = currentLocalOptimaStates;
                bestLocalOptimaValue = currentLocalOptimaValue;
            }

            // Break jika global optima tercapai
            if (currentLocalOptimaValue === 109) {
                break;
            }
        }
        return bestLocalOptimaStates;
    }
}