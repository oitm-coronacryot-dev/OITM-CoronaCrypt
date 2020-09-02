// CoronaCrypt blockchain

// CoronaCrypt block
class CoronaCryptBlock {

    constructor(index, timestamp, data, precedingHash=" ", hash=" ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = hash;
    }

    // computing the hash
    // TUDO: use cryptography strong hash function !!!
    Hash() {
        var block_sting = JSON.stringify({index: this.index, timestamp: this.timestamp, data: this.data, precedingHash:this.precedingHash});
        var hash = 0;
        for (var i = 0; i < block_sting.length; i++) {
            hash = hash + block_sting.charCodeAt(i);
        }
        return hash.toString();
    }

    // compute and save hash
    computeHash() {
        this.hash = this.Hash();
    }
}

// CoronaCrypt chain
class CoronaCryptBlockchain {

    constructor(debug=false) {
        this.blockchain = [];
        this.debug = debug;
    }

    // initialize a new chain with genesis block
    initChane() {
        this.blockchain = [];
        let GenesisBlock = new  CoronaCryptBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
        GenesisBlock.computeHash();
        this.blockchain.push(GenesisBlock);
    }

    // get lastest block
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    // add new block, fill preceding hash and calculate hash
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.computeHash();
        this.blockchain.push(newBlock);
    }

    // validate chain
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            
            // check the hash of the current block
            if (currentBlock.hash !== currentBlock.Hash()) {
                if (this.debug){
                    console.log("current block hash do not matches with the calculated hash!");
                    console.log("hash in current block: "+currentBlock.hash);
                    console.log("calculated hash: "+currentBlock.Hash());
                }
                return false;
            }

            // check the hash of the preceding block
            if (currentBlock.precedingHash !== precedingBlock.Hash()) {
                if (this.debug){
                    console.log("preceding block hash do not matches with the calculated hash!");
                    console.log("precedingHash in current block: "+currentBlock.precedingHash);
                    console.log("calculated precedingHash: "+precedingBlock.Hash());
                }
                return false;
            }
        }
        if (this.debug){
            console.log("chain is valid!");
        }
        return true;
    }

    // serialize chain to JSON
    serialize(){
        return JSON.stringify(this.blockchain, null, 2);
    }

    // load a chain from JSON
    deserialize(inputstring){
        this.blockchain = [];
        var blocks = JSON.parse(inputstring);
        for (let i = 0; i < blocks.length; i++) {
            let newblock = new  CoronaCryptBlock(
                blocks[i].index,
                blocks[i].timestamp,
                blocks[i].data,
                blocks[i].precedingHash,
                blocks[i].hash,
            );
            if (this.debug){
                console.log("load block:");
                console.log(JSON.stringify(newblock, null, 2));
            }
            this.blockchain.push(newblock);
        }
    }
}
