import * as CryptoJS from "crypto-js";
class Block{
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timeStamp:number;

    static calcualteBlockHash=(
        index:number,
        previousHash:string,
        timeStamp:number,
        data:string):string =>
        CryptoJS.SHA256(index+ previousHash+ timeStamp+data).toString();
    
    static validatedStructure=(aBlock:Block):boolean=>typeof aBlock.index ==="number" && 
                                                      typeof aBlock.hash==="string" && 
                                                      typeof aBlock.previousHash==="string"&&
                                                      typeof aBlock.timeStamp==="number"&&
                                                      typeof aBlock.data==="string";
    constructor(index:number,
        hash:string,
        previousHash:string,
        data:string,
        timeStamp:number){
            this.index=index;
            this.hash=hash;
            this.previousHash=previousHash;
            this.data=data;
            this.timeStamp=timeStamp;
        }
}

const genesisBlock:Block=new Block(0,"2020202020","","hello",123456);


let blcokchain:Block[]=[genesisBlock];
const getBlockChain=():Block[]=>blcokchain;
const getLatesBlock=(): Block=>blcokchain[blcokchain.length-1];
const getNewTimeStamp=():number=>Math.round(new Date().getTime()/1800);

const createdNewBlock=(data:string):Block=>{
    const previousBlock:Block=getLatesBlock();
    const newIndex:number=previousBlock.index+1;
    const newTimeStamp:number=getNewTimeStamp();
    const newHash:string=Block.calcualteBlockHash(
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data);
        const newBlock:Block=new Block(
            newIndex,
            newHash,
            previousBlock.hash,
            data,
            newTimeStamp);
        addBlock(newBlock);
        return newBlock;
}
const getHashForBlock=(aBlock:Block):string=>
    Block.calcualteBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timeStamp,
        aBlock.data
    );

const isBlockValid=(
    candidatedBlock:Block,
    previousBlock:Block
    ):boolean=>{
        if(!Block.validatedStructure(candidatedBlock)){
            return false;
        }else if(previousBlock.index+1 !==candidatedBlock.index){
            return false;
        }else if(previousBlock.hash !== candidatedBlock.previousHash){
            return false;
        }else if(getHashForBlock(candidatedBlock) !== candidatedBlock.hash){
            return false;
        }
            else {
            return true;
        };
}

const addBlock=(candidatedBlock:Block):void=>{
    if(isBlockValid(candidatedBlock,getLatesBlock())){
        blcokchain.push(candidatedBlock);
    }
};

createdNewBlock("second block");
createdNewBlock("third block");
createdNewBlock("fourth block");

console.log(blcokchain);



// class Human{
//     public name:string;
//     public age:number;
//     public gender:string;
//     constructor(name:string,age:number,gender:string){
//         this.name=name;
//         this.age=age;
//         this.gender=gender;
//     }
// }
// const jh=new Human("jihae",21,"f");


// const sayHi=(person:Human):string=>{
//     return 'hello '+person.name+",you are "+person.age+" and your sex is "+person.gender;
// };
// console.log(sayHi(jh));
export{};