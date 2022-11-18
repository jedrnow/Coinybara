import Blockchain, { BlockChainData } from '../src/blockchain';
import Block, { BlockData } from '../src/block';
import Transaction, { TransactionData } from '../src/transactions';


describe('Blockchain', ()=>{
    let gb: BlockData;
    let bc: BlockChainData;
    let t: TransactionData;
    let newB: BlockData;

    beforeEach(()=>{
        gb = new Block();
        bc = new Blockchain(gb);
        t = new Transaction('me', 'you', 7);
    });

    it('checks previous block\'s hash to be equal to current block previousHash', ()=>{
        newB = bc.getNextBlock([t]);
        expect(newB.previousHash).toEqual(gb.hash);
    });

    it('checks addBlock function', ()=>{
        let beforeBC = bc.blocks.length;
        bc.addBlock(newB);
        let afterBC = bc.blocks.length;
        expect(beforeBC).toBe(afterBC - 1);
    })
})