import { Injectable } from '@nestjs/common';
import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

@Injectable()
export class MagicCubeService {
    private magicCube : MagicCubeClass;
    constructor() {
        this.magicCube = new MagicCubeClass();
    }

    getInitState() : void {
        this.magicCube.setCurrentState(this.magicCube.getRandomInitState());
    }
    getStateValue() : number {
        return this.magicCube.getCurrentValue();
    }
    getRandomSuccessor() : void {
        this.magicCube.setCurrentState(this.magicCube.getRandomSuccessor(this.magicCube.getCurrentState()));
    }
    getCurrentState() : number[][][] {
        return this.magicCube.getCurrentState();
    }
    getSumConstraintVal(): number {
        return this.magicCube.getSumConstraintVal();
    }
}
