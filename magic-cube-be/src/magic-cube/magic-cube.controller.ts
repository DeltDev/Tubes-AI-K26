import {Controller, Get, HttpStatus} from '@nestjs/common';
import {MagicCubeService} from "./magic-cube.service";

@Controller('magic-cube')
export class MagicCubeController {
    constructor(private readonly magicCubeService: MagicCubeService) {}

    @Get('random-init-state')
    getInitialState(){
        this.magicCubeService.getInitState();
        const initState = this.magicCubeService.getCurrentState();
        const stateValue = this.magicCubeService.getStateValue();
        return {
            status: HttpStatus.OK,
            value: stateValue,
            cubeState: initState,
        };
    }
    @Get('random-successor')
    getRandomSuccessor(){
        this.magicCubeService.getRandomSuccessor();
        const currentState = this.magicCubeService.getCurrentState();
        const stateValue = this.magicCubeService.getStateValue();
        return {
            status: HttpStatus.OK,
            value: stateValue,
            cubeState: currentState,
        }
    }
}
