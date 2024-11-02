import {Controller, Get, HttpStatus} from '@nestjs/common';
import {MagicCubeService} from "./magic-cube.service";

@Controller('magic-cube')
export class MagicCubeController {
    constructor(private readonly magicCubeService: MagicCubeService) {}

    @Get('random-init-state')
    getInitialState(){
        const initState = this.magicCubeService.getInitState();
        const stateValue = this.magicCubeService.getStateValue();
        return {
            status: HttpStatus.OK,
            value: stateValue,
            cubeState: initState,
        };
    }
}
