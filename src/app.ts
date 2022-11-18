// external library
import express from 'express';
import * as bodyParser from 'body-parser';

// classes
import Blockchain from "./blockchain";
import Block from "./block";
import Transaction, { TransactionData } from './transactions';

// setup express REST API
const app = express();
app.use(bodyParser.json());

// initialize blockchain
let genesisBlock = new Block();
let bc = new Blockchain(genesisBlock);

// transactions
let transactions: TransactionData[] = [];

app.get('/', function(req,res){
    res.json(bc.blocks);
});

app.post('/transaction', function(req,res){
    let {from, to, amount} = req.body;

    let t = new Transaction(from, to, amount);
    transactions = [...transactions, t];
    res.json(t);
});

app.get('/mine', function(req,res){
    let newB = bc.getNextBlock(transactions);
    transactions = [];
    bc.addBlock(newB);
    res.json(bc);
});


// start the server at port 3000
app.listen(3000, function(){
    console.log('post started at 3000');
});