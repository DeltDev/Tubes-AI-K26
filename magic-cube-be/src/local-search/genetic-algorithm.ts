import {MagicCubeClass} from "../magic-cube-class/magic-cube-class";
import {Genome} from "../genome/genome";

export class geneticAlgorithm {
    public static search(magicCube : MagicCubeClass, genomeAmt : number, maxIteration : number): Array<MagicCubeClass> {
        // genomeAmt = 50; //banyak genome
        const mutationProb = 0.8; //peluang mutasi
        // maxIteration = 1000;
        const results : Array<MagicCubeClass> = [];
        let it = 1;
        //1. isi daftar genome dengan genome acak
        const genomeList : Array<Genome> = Array.from({length: genomeAmt}, () => {
            magicCube.setCurrentState(magicCube.getRandomInitState());
            return new Genome(magicCube);
        });

        //Ulangi sampai solusinya ketemu
        while(true){
            const fitnessVals = genomeList.map((genome, index) => {
                const cube = genome.genomeToCube(genome.getGenomeStrand());
                const fitness = magicCube.objectiveFunction(cube);
                return fitness;
            });

            const fitnessMax = Math.max(...fitnessVals);
            const bestGenomeIdx = fitnessVals.indexOf(fitnessMax);
            const bestGenome = genomeList[bestGenomeIdx];
            const bestCube = new MagicCubeClass();
            bestCube.setCurrentState(bestGenome.genomeToCube(bestGenome.getGenomeStrand()));
            bestCube.setCurrentValue(magicCube.objectiveFunction(bestCube.getCurrentState()));
            results.push(bestCube);
            if(fitnessMax === 109 ||it>=maxIteration){

                return results;
            }

            const chosenGenomes = this.selectGenomes(genomeList, fitnessVals);
            const newGenomeList = this.createNextGen(chosenGenomes,mutationProb);

            genomeList.length = 0;
            genomeList.push(...newGenomeList);
            it++;
        }
    }
    private static selectGenomes(genomeList : Array<Genome>, fitnessScores: Array<number>):Array<Genome>  {
        //method untuk pilih daftar genome menggunakan roulette wheel
        const fitnessSum = fitnessScores.reduce((sum:number, fitness) => sum + fitness, 0); //jumlah seluruh fitness value
        const probList = fitnessScores.map(scores => scores/fitnessSum); //daftar probabilitas setiap genome

        const chosenGenomes : Array<Genome> = [];
        for(let i = 0; i < genomeList.length; i++) {
            const chosen = this.probabilityWheelSelect(genomeList,probList); //pilih genome menggunakan probability wheel
            chosenGenomes.push(chosen);
        }

        return chosenGenomes;
    }
    private static probabilityWheelSelect(genomeList:Genome[], probList:number[]):Genome{
        //method probability menggunakan roulette wheel
        const randomVal = Math.random(); //pilih angka random di antara 0 dan 1
        let cumulativeProb = 0; //probabilitas kumulatif

        for(let i = 0; i<genomeList.length; i++) {

            cumulativeProb += probList[i]; //tambahkan probabilitas ke i

            if(randomVal < cumulativeProb){ //jika nilai random yang terpilih di bawah probabilitas kumulatif saat ini
                return genomeList[i]; //pilih genome ke i
            }
        }

        return genomeList[genomeList.length-1]; //pilih genome terakhir jika probabilitas kumulatif akhir tidak bulat menjadi 1
    }

    private static createNextGen(chosenGenomes : Genome[], mutationProb:number):Genome[]{
        //crossover dan mutasi semua genome saat ini
        const nextGen: Genome[] = [];
        for(let i = 0; i<chosenGenomes.length; i+=2){
            //pilih 1 pasangan genome
            const par1 = chosenGenomes[i];
            const par2 = chosenGenomes[i+1] || chosenGenomes[0]; //pilih genome pertama lagi jika banyak genomenya ganjil

            const [child1, child2] = this.crossover(par1,par2); //crossover pasangan genome tadi
            this.mutate(child1,mutationProb); //mutasi anak pertama
            this.mutate(child2,mutationProb); //mutasi anak kedua

            nextGen.push(child1,child2); //masukkan daftar anak baru ke generasi berikutnya
        }
        return nextGen;
    }
    private static crossover(par1:Genome, par2:Genome):[Genome,Genome]{
        //kawin silang antara dua buah gen
        const crossPoint = Math.floor(Math.random() * 125); //pilih titik crossover acak
        const gen1 = par1.getGenomeStrand();
        const gen2 = par2.getGenomeStrand();

        for(let i = crossPoint; i<125; i++){
            //lakukan kawin silang dimulai dari titik crossover sampai akhir dari kedua genome
            [gen1[i], gen2[i]] = [gen2[i], gen1[i]];
        }
        let newgen1 = new Genome();
        newgen1.setGenomeStrand(gen1);
        let newgen2 = new Genome();
        newgen2.setGenomeStrand(gen2);
        return [newgen1, newgen2];
    }

    private static mutate(gen:Genome, mutationProb:number):void{
        const genomeStrand = gen.getGenomeStrand();
        for(let i = 0; i<genomeStrand.length; i++){
            if(Math.random() <mutationProb){
                const swapIdx = Math.floor(Math.random() * 125);
                [genomeStrand[i],genomeStrand[swapIdx]] = [genomeStrand[swapIdx],genomeStrand[i]];
            }
        }
        gen.setGenomeStrand(genomeStrand);
    }
}