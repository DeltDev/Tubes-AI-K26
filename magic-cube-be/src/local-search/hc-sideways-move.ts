import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class hcSidewaysMove{
    public static search(magicCube : MagicCubeClass, sidewaysMoveMax : number): Array<MagicCubeClass>{
        // Shuffle dulu
        magicCube.setCurrentState(magicCube.getRandomInitState());

        // Instantiate resultnya, yaitu state-state yang dikunjungi
        const result : Array<MagicCubeClass> = [];

        // Jumlah maksimum berapa kali sideways move
        // const sidewaysMoveMax : number = 5;
        let sidewaysMoveTimes : number = 0;

        // Membuat objek MagicCubeClass
        const currentMagicCube : MagicCubeClass = magicCube.clone();

        // Masukkan initial state ke dalam result
        result.push(currentMagicCube.clone());

        // Looping hingga menemukan local maximum (yang tidak memiliki neighbor best successor
        // dengan value yang sama) atau global maximum
        while (true) {

            // console.log(currentMagicCube.getCurrentValue());

            // Mengambil best successor
            const bestSuccessorState = currentMagicCube.getBestSuccessor(currentMagicCube.getCurrentState());
            const bestSuccessorValue = currentMagicCube.objectiveFunction(bestSuccessorState);

            // Jika best successor value < current magic cube value, break karena mencapai
            // local maximum atau global maximum
            if (bestSuccessorValue < currentMagicCube.getCurrentValue() || sidewaysMoveTimes == sidewaysMoveMax) {
                break
            } else {

                // Kalau melakukan sideways move, dapat dilakukan sejumlah maksimum kali
                if (bestSuccessorValue == currentMagicCube.getCurrentValue()) {
                    sidewaysMoveTimes++;
                } else {
                    sidewaysMoveTimes = 0;
                }

                // Jika best successor value >= current magic cube value, pindah ke successor tersebut
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