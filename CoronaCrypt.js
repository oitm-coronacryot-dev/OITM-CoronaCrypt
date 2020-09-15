// CoronaCrypt blockchain

// CoronaCrypt block
class CoronaCryptBlock {

    constructor(index, timestamp, measurement, data, comment=" ", precedingHash=" ", hash=" ") {
        this.index = index;
        this.timestamp = timestamp;
        this.measurement = measurement;
        this.data = data;
        this.comment = comment;
        this.precedingHash = precedingHash;
        this.hash = hash;
    }

    // computing the hash
    // TUDO: use cryptography strong hash function !!!
    Hash() {
        var blockString = JSON.stringify({
            index: this.index, 
            timestamp: this.timestamp, 
            measurement: this.measurement, 
            data: this.data, 
            comment: this.comment, 
            precedingHash:this.precedingHash
        });
        var hash = 0;
        for (var i = 0; i < blockString.length; i++) {
            hash = hash + blockString.charCodeAt(i);
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

        if (this.debug){
            console.log("Debug mode active !!!");
            console.log("\n\n\n");
        }
    }

    // initialize a new chain with genesis block
    initChane() {
        this.blockchain = [];
        let GenesisBlock = new CoronaCryptBlock(0, "1577836800", "Initial Block", "0.0", "Initial Block in the Chain", "0")
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
        
        // if there's just one block in the chain
        if (this.blockchain[0].hash !== this.blockchain[0].Hash()) {
            if (this.debug){
                console.log("current block hash do not matches with the calculated hash!");
                console.log("hash in current block: "+this.blockchain[0].hash);
                console.log("calculated hash: "+this.blockchain[0].Hash());
                console.log("\n\n\n");
            }
            return false;
        }

        // if there're muliple blocks
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            
            // check the hash of the current block
            if (currentBlock.hash !== currentBlock.Hash()) {
                if (this.debug){
                    console.log("current block hash do not matches with the calculated hash!");
                    console.log("hash in current block: "+currentBlock.hash);
                    console.log("calculated hash: "+currentBlock.Hash());
                    console.log("\n\n\n");
                }
                return false;
            }

            // check the hash of the preceding block
            if (currentBlock.precedingHash !== precedingBlock.Hash()) {
                if (this.debug){
                    console.log("preceding block hash do not matches with the calculated hash!");
                    console.log("precedingHash in current block: "+currentBlock.precedingHash);
                    console.log("calculated precedingHash: "+precedingBlock.Hash());
                    console.log("\n\n\n");
                }
                return false;
            }
        }

        // tha chain is valid
        if (this.debug){
            console.log("chain is valid!");
            console.log("\n\n\n");
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
                blocks[i].measurement,
                blocks[i].data,
                blocks[i].comment,
                blocks[i].precedingHash,
                blocks[i].hash,
            );
            if (this.debug){
                console.log("load block:");
                console.log(JSON.stringify(newblock, null, 2));
                console.log("\n\n\n");
            }
            this.blockchain.push(newblock);
        }
    }
}
