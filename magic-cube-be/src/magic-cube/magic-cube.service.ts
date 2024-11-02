import { Injectable } from '@nestjs/common';
import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";
import {hcSteepestAscent} from "../local-search/hc-steepest-ascent";
import {hcStochastic} from "../local-search/hc-stochastic";
import {hcRandomRestart} from "../local-search/hc-random-restart";
import {hcSidewaysMove} from "../local-search/hc-sideways-move";
import {simulatedAnnealing} from "../local-search/simulated-annealing";
import {geneticAlgorithm} from "../local-search/genetic-algorithm";

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
        return hcSteepestAscent.search();
    }
    hcSidewaysMove(): Array<MagicCubeClass> {
        return hcSidewaysMove.search();
    }
    hcRandomRestart(): Array<MagicCubeClass> {
        return hcRandomRestart.search();
    }
    hcStochastic(): Array<MagicCubeClass> {
        return hcStochastic.search();
    }
    simulatedAnnealing(): Array<MagicCubeClass> {
        return simulatedAnnealing.search();
    }
    geneticAlgortihm(): Array<MagicCubeClass> {
        return geneticAlgorithm.search();
    }
}
