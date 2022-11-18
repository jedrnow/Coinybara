import Block, { BlockData } from '../src/block';
import Transaction,{ TransactionData } from '../src/transactions';

describe('Block', ()=>{
  let t: TransactionData, b: BlockData;

  beforeAll(()=>{
    t = new Transaction('you', 'me', 10);
  });

  it('get the key correctly', ()=>{
    b = new Block(1, '777', '666', 0, [t]);
    expect(b.key).toBe('[{"from":"you","to":"me","amount":10}]16660');
  });

  it('adds transactions successfully', ()=>{
    let pT = b.transactions.length;
    b.addTransaction(t);
    let aT = b.transactions.length;
    expect(aT).toEqual(pT + 1);
  })
});