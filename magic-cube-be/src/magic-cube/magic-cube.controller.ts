import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
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
            tValues: null,
            probabilities: null,
            cubeStates: results
        }
    }
    @Get('hill-climbing-sideways-move/:sidewaysMoveMax')
    hcSidewaysMove(@Param('sidewaysMoveMax') sidewaysMoveMax: number) {
        const results = this.magicCubeService.hcSidewaysMove(sidewaysMoveMax);
        return {
            status: HttpStatus.OK,
            tValues: null,
            probabilities: null,
            cubeStates: results
        };
    }
    @Get('hill-climbing-random-restart/:maxRestarts')
    hcRandomRestart(@Param('maxRestarts') maxRestarts: number){
        const results = this.magicCubeService.hcRandomRestart(maxRestarts);
        return{
            status: HttpStatus.OK,
            tValues: null,
            probabilities: null,
            cubeStates: results
        }
    }
    @Get('hill-climbing-stochastic')
    hcStochastic(){
        const results = this.magicCubeService.hcStochastic();
        return{
            status: HttpStatus.OK,
            tValues: null,
            probabilities: null,
            cubeStates: results
        }
    }
    @Get('simulated-annealing')
    simulatedAnnealing(){
        const results = this.magicCubeService.simulatedAnnealing();
        return{
            status: HttpStatus.OK,
            tValues: results.tValues,
            probabilities: results.probabilities,
            cubeStates: results.cubeStates
        }
    }
    @Get('genetic-algorithm')
    geneticAlgorithm(){
        const results = this.magicCubeService.geneticAlgortihm();
        return{
            status: HttpStatus.OK,
            tValues: null,
            probabilities: null,
            cubeStates: results
        }
    }
}
