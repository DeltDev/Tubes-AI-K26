import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class hcSteepestAscent {
    public static search(magicCube : MagicCubeClass): Array<MagicCubeClass>{
        // Instantiate resultnya, yaitu state-state yang dikunjungi
        const result : Array<MagicCubeClass> = [];

        // Membuat objek MagicCubeClass
        const currentMagicCube : MagicCubeClass = magicCube.clone();

        // Masukkan initial state ke dalam result
        result.push(currentMagicCube.clone());

        // Looping hingga menemukan local maximum atau global maximum
        while (true) {

            // console.log(currentMagicCube.getCurrentValue());

            // Mengambil best successor
            const bestSuccessorState = currentMagicCube.getBestSuccessor(currentMagicCube.getCurrentState());
            const bestSuccessorValue = currentMagicCube.objectiveFunction(bestSuccessorState);

            // Jika best successor value <= current magic cube value, break karena mencapai
            // local maximum atau global maximum
            if (bestSuccessorValue <= currentMagicCube.getCurrentValue()) {
                break
            } else {
                // Jika best successor value > current magic cube value, pindah ke successor tersebut
                currentMagicCube.setCurrentState(bestSuccessorState);
                currentMagicCube.setCurrentValue(bestSuccessorValue);

                // Masukkan state ke result
                result.push(currentMagicCube.clone());
            }

        }

        // console.log(result);

        return result;
    }
}