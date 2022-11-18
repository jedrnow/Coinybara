import sha256 from 'js-sha256';
import Block, { BlockData } from "./block";
import { TransactionData } from "./transactions";

export interface BlockChainData{
    blocks: BlockData[];
    //difficulty: number;
    addBlock(block: BlockData): void;
    getNextBlock(transactions: TransactionData[]): BlockData;
    getPreviousBlock(): BlockData;
    generateHash(block: BlockData): string;
}

export default class Blockchain implements BlockChainData{
    public blocks: BlockData[];
    //public difficulty: number;

    constructor(genesisBlock: BlockData){
        this.blocks = [];
        //this.difficulty = 2;
        this.addBlock(genesisBlock);
    }

    public addBlock(block: BlockData): void {
        if(this.blocks.length === 0){
            block.previousHash = '0000000000';
            block.hash = this.generateHash(block);
        }
        this.blocks = [...this.blocks, block];
    }

    public getNextBlock(transactions: TransactionData[]): BlockData {
        let block = new Block();

        transactions.map(function(t: TransactionData){
            block.addTransaction(t);
        });

        let previousBlock = this.getPreviousBlock();
        block.index = this.blocks.length;
        block.previousHash = previousBlock.hash;
        block.hash = this.generateHash(block);
        return block;
    }

    public getPreviousBlock(): BlockData {
        return this.blocks[this.blocks.length - 1];
    }

    public generateHash(block: BlockData): string {
        let hash = sha256(block.key);

        // mining
        while(!hash.startsWith('0')){ //083a
            block.nonce += 1;
            hash = sha256(block.key);
            //console.log(hash);
        }
        return hash;
    }
}