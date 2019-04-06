"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timeStamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}
Block.calcualteBlockHash = (index, previousHash, timeStamp, data) => CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();
Block.validatedStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timeStamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "2020202020", "", "hello", 123456);
let blcokchain = [genesisBlock];
const getBlockChain = () => blcokchain;
const getLatesBlock = () => blcokchain[blcokchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1800);
const createdNewBlock = (data) => {
    const previousBlock = getLatesBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calcualteBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => Block.calcualteBlockHash(aBlock.index, aBlock.previousHash, aBlock.timeStamp, aBlock.data);
const isBlockValid = (candidatedBlock, previousBlock) => {
    if (!Block.validatedStructure(candidatedBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidatedBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidatedBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidatedBlock) !== candidatedBlock.hash) {
        return false;
    }
    else {
        return true;
    }
    ;
};
const addBlock = (candidatedBlock) => {
    if (isBlockValid(candidatedBlock, getLatesBlock())) {
        blcokchain.push(candidatedBlock);
    }
};
createdNewBlock("second block");
createdNewBlock("third block");
createdNewBlock("fourth block");
console.log(blcokchain);
//# sourceMappingURL=index.js.map