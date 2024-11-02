import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";
import {hcSteepestAscent} from "./hc-steepest-ascent";

export class hcRandomRestart {
    public static search(): Array<MagicCubeClass>{
        //IMPLEMENTASI ALGORITMA HILL CLIMBING RANDOM RESTART DI SINI
        //RETURNNYA HARUS ARRAY YANG ISINYA MAGIC CUBE CLASS

        //RETURN HASIL STEEPEST ASCENT PALING BAGUS DARI SEMUA RESTART
        let bestLocalOptimaStates: Array<MagicCubeClass> = [];
        let bestLocalOptimaValue = -1;

        //INISIALISASI VARIABEL UNTUK LOOPING
        let currentLocalOptimaStates: Array<MagicCubeClass> = [];
        let currentLocalOptimaCube: MagicCubeClass;
        let currentLocalOptimaValue = -1;

        // SEMENTARA, JUMLAH RESTARTNYA ADALAH 10
        for (let i = 0; i < 10; i++) {
            currentLocalOptimaStates = hcSteepestAscent.search();
            currentLocalOptimaCube = currentLocalOptimaStates[currentLocalOptimaStates.length - 1];
            currentLocalOptimaValue = currentLocalOptimaCube.objectiveFunction(currentLocalOptimaCube.getCurrentState());
            
            if (currentLocalOptimaValue > bestLocalOptimaValue) {
                bestLocalOptimaStates = currentLocalOptimaStates;
                bestLocalOptimaValue = currentLocalOptimaValue;
            }

            // BREAK JIKA VALUE SAAT INI SAMA DENGAN OBJECTIVE FUNCTION VALUE MAKSIMUM
            if (currentLocalOptimaValue == 109) {
                break
            }
        }
        return bestLocalOptimaStates;
    }
}