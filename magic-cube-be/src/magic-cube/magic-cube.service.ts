import { Injectable } from '@nestjs/common';
import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";
import {LocalSearch} from "../local-search/local-search";

@Injectable()
export class MagicCubeService {
    private magicCube : MagicCubeClass;

    constructor() {
        this.magicCube = new MagicCubeClass();

    }
    //service ini hanya untuk testing
    // getInitState() : void {
    //     this.magicCube.setCurrentState(this.magicCube.getRandomInitState());
    //     this.magicCube.setCurrentValue(this.magicCube.objectiveFunction(this.magicCube.getCurrentState()));
    // }
    // getStateValue() : number {
    //     return this.magicCube.getCurrentValue();
    // }
    // getRandomSuccessor() : void {
    //     this.magicCube.setCurrentState(this.magicCube.getRandomSuccessor(this.magicCube.getCurrentState()));
    //     this.magicCube.setCurrentValue(this.magicCube.objectiveFunction(this.magicCube.getCurrentState()));
    // }
    // getCurrentState() : number[][][] {
    //     return this.magicCube.getCurrentState();
    // }
    // getSumConstraintVal(): number {
    //     return this.magicCube.getSumConstraintVal();
    // }
    // getBestSuccessor() : void {
    //     this.magicCube.setCurrentState(this.magicCube.getBestSuccessor(this.magicCube.getCurrentState()));
    //     this.magicCube.setCurrentValue(this.magicCube.objectiveFunction(this.magicCube.getCurrentState()));
    // }

    hcSteepestAscent(): Array<MagicCubeClass> {
        return LocalSearch.hcSteepestAscent();
    }
    hcSidewaysMove(): Array<MagicCubeClass> {
        return LocalSearch.hcSidewaysMove();
    }
    hcRandomRestart(): Array<MagicCubeClass> {
        return LocalSearch.hcRandomRestart();
    }
    hcStochastic(): Array<MagicCubeClass> {
        return LocalSearch.hcStochastic();
    }
    simulatedAnnealing(): Array<MagicCubeClass> {
        return LocalSearch.simulatedAnnealing();
    }
}
