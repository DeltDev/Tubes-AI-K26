import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";

export class Genome {
    private genomeStrand:number[];
    constructor(magicCube?:MagicCubeClass){
        if(magicCube){
            this.genomeStrand = this.cubeToGenome(magicCube);
        } else {
            this.genomeStrand = Array.from({length:125}, (_, i) => i + 1);
        }
    }
    public getGenomeStrand():number[]{ //dapatkan genome
        return this.genomeStrand;
    }

    public setGenomeStrand(genomeStrand:number[]){ //ganti genome
        if(genomeStrand.length ===125){
            this.genomeStrand = genomeStrand;
        } else {
            throw new Error("Panjang Genome harus 125");
        }
    }

    private cubeToGenome(magicCube:MagicCubeClass):number[]{ //konversi dari cube ke genome
        const ret : number[] = [];
        const cubeState: number[][][] = magicCube.getCurrentState();
        for(let x = 0; x<5; x++){
            for(let y = 0; y<5; y++){
                for(let z = 0; z<5; z++){
                    ret.push(cubeState[x][y][z]);
                }
            }
        }
        return ret;
    }

    public genomeToCube(genomeStrand:number[]):number[][][]{ //konversi dari genome ke cube
        const cubeState: number[][][] = Array.from({length:5}, ()=>Array.from({length:5}, ()=>Array(5).fill(0)));

        let idx =  0;
        for(let x = 0; x<5; x++){
            for(let y = 0; y<5; y++){
                for(let z = 0; z<5; z++){
                    cubeState[x][y][z] = genomeStrand[idx++];
                }
            }
        }

        return cubeState;
    }
}
