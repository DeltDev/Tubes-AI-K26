import {Controller, Get, HttpStatus} from '@nestjs/common';
import {MagicCubeService} from "./magic-cube.service";

@Controller('magic-cube')
export class MagicCubeController {
    constructor(private readonly magicCubeService: MagicCubeService) {}
    //Route di bawah ini hanya untuk testing
    // @Get('random-init-state')
    // getInitialState(){
    //     this.magicCubeService.getInitState();
    //     const initState = this.magicCubeService.getCurrentState();
    //     const stateValue = this.magicCubeService.getStateValue();
    //     return {
    //         status: HttpStatus.OK,
    //         value: stateValue,
    //         cubeState: initState,
    //     };
    // }
    // @Get('random-successor')
    // getRandomSuccessor(){
    //     this.magicCubeService.getRandomSuccessor();
    //     const currentState = this.magicCubeService.getCurrentState();
    //     const stateValue = this.magicCubeService.getStateValue();
    //     return {
    //         status: HttpStatus.OK,
    //         value: stateValue,
    //         cubeState: currentState,
    //     }
    // }
    // @Get('best-successor')
    // getBestSuccessor(){
    //     this.magicCubeService.getBestSuccessor();
    //     const currentState = this.magicCubeService.getCurrentState();
    //     const stateValue = this.magicCubeService.getStateValue();
    //     return {
    //         status: HttpStatus.OK,
    //         value: stateValue,
    //         cubeState: currentState,
    //     }
    // }
    @Get('hill-climbing-steepest-ascent')
    hcSteepestAscent(){
        const results = this.magicCubeService.hcSteepestAscent();
        return{
            status: HttpStatus.OK,
            results: results
        }
    }
    @Get('hill-climbing-sideways-move')
    hcSidewaysMove(){
        const results = this.magicCubeService.hcSidewaysMove();
        return{
            status: HttpStatus.OK,
            results: results
        }
    }
    @Get('hill-climbing-random-restart')
    hcRandomRestart(){
        const results = this.magicCubeService.hcRandomRestart();
        return{
            status: HttpStatus.OK,
            results: results
        }
    }
    @Get('simulated-annealing')
    simulatedAnnealing(){
        const results = this.magicCubeService.simulatedAnnealing();
        return{
            status: HttpStatus.OK,
            results: results
        }
    }
}
