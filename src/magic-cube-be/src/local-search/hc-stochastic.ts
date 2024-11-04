import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class hcStochastic {
    public static search(magicCube : MagicCubeClass): Array<MagicCubeClass> {
        // Shuffle dulu
        magicCube.setCurrentState(magicCube.getRandomInitState());

        //Inisialisasi current cube dan array result
        const currentCube : MagicCubeClass = magicCube.clone();
        const result : Array<MagicCubeClass> = [];

        //Masukkan current cube ke array result sebagai state pertama
        result.push(currentCube.clone());

        //Untuk sekarang, dilakukan 500 iterasi
        for (let i = 0; i < 500; i++) {
            const randomSuccessorState = currentCube.getRandomSuccessor(currentCube.getCurrentState());
            const randomSuccessorValue = currentCube.objectiveFunction(randomSuccessorState);

            //Bandingkan random successor dengan current cube
            if (randomSuccessorValue > currentCube.getCurrentValue()) {
                currentCube.setCurrentState(randomSuccessorState);
                currentCube.setCurrentValue(randomSuccessorValue);
            }

            //Tambahkan random successor ke dalam array result
            currentCube.setCurrentState(randomSuccessorState);
            currentCube.setCurrentValue(randomSuccessorValue);
            result.push(currentCube.clone());

            //Break jika global optima tercapai
            if (randomSuccessorValue === 109) {
                break;
            }
        }

        //Kembalikan array result
        return result;
    }
}