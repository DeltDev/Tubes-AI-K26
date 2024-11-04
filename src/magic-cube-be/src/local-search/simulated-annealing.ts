/* eslint-disable prettier/prettier */
import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class simulatedAnnealing{

    private static schedule(initTemperature:number, coolingRate:number, time:number):number{
        //IMPLEMENTASI FUNGSI SCHEDULE DI SINI
        // cooling ratenya pakai yg linear
        return (initTemperature - coolingRate * time);
    }

    private static calculateMoveProbability(deltaE:number, temperature:number):number{
        //IMPLEMENTASI FUNGSI PELUANG PINDAH DI SINI
        if (deltaE >= 0){return 1;}
        if (temperature <= 0){return 0;}
        return Math.exp(deltaE/temperature);
    }

    public static search(magicCube : MagicCubeClass): {
        cubeStates: Array<MagicCubeClass>,
        tValues: Array<number>,
        probabilities: Array<number>
    } {
        //IMPLEMENTASI ALGORITMA SIMULATED ANNEALING DI SINI

        // bisa diganti angkanya kalau diperlukan
        const initTemperature = 1;
        const coolingRate = 10;

        // variables or something
        const currentMagicCube : MagicCubeClass = magicCube.clone();
        const startTime = performance.now(); // start time in ms
        let time = 0;
        let temperature = initTemperature;
        const results : Array<MagicCubeClass> = [];
        const tValuesArray : Array<number> = [];
        const probabilitiesArray : Array<number> = [];

        // loop
        while (temperature > 0){
            time = (performance.now() - startTime) / 1000;
            temperature = simulatedAnnealing.schedule(initTemperature, coolingRate, time);

            const randomSuccessorState = currentMagicCube.getRandomSuccessor(currentMagicCube.getCurrentState());
            const randomSuccessorValue = currentMagicCube.objectiveFunction(randomSuccessorState);

            const probability = simulatedAnnealing.calculateMoveProbability(randomSuccessorValue - currentMagicCube.getCurrentValue(), temperature);

            if (randomSuccessorValue >= currentMagicCube.getCurrentValue()){
                currentMagicCube.setCurrentState(randomSuccessorState);
                currentMagicCube.setCurrentValue(randomSuccessorValue);
            } else {
                // valuenya lebih kecil, jadi di random
                const randomNumber = Math.random();
                if (randomNumber < probability){
                    currentMagicCube.setCurrentState(randomSuccessorState);
                    currentMagicCube.setCurrentValue(randomSuccessorValue);
                }
            }

            // tambahin hasil iterasi ini ke array
            results.push(currentMagicCube.clone());
            tValuesArray.push(time);
            probabilitiesArray.push(probability);
        }
        
        return {
            cubeStates: results,
            tValues: tValuesArray,
            probabilities: probabilitiesArray
        };
    }
}
