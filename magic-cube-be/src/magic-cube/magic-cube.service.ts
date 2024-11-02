import { Injectable } from '@nestjs/common';
import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

@Injectable()
export class MagicCubeService {
    private magicCube : MagicCubeClass;
    constructor() {
        this.magicCube = new MagicCubeClass();
    }

    getInitState() : MagicCubeClass {
        this.magicCube.setCurrentState(this.magicCube.getRandomInitState());
        return this.magicCube;
    }
    getStateValue() : number {
        return this.magicCube.getCurrentValue();
    }
}
