function ValidateChain() {
    // deserialise input chain
    var inputChainString = document.getElementById("validate_input").value;
    let chain = new CoronaCryptBlockchain(debug=true); // TUDO: deactivate debug mode
    chain.deserialize(inputChainString);

    // validate
    if (chain.checkChainValidity()) {
        document.getElementById("validate_output").value = "Valid";
    } else{
        document.getElementById("validate_output").value = "Invalid";
    }
}

function NewChain() {
    // init chain
    let chain = new CoronaCryptBlockchain(debug=true); // TUDO: deactivate debug mode
    chain.initChane();

    // serialise output chain
    document.getElementById("newchain_output").value = chain.serialize();
}

function AddBlockToChain(){
    // deserialise input chain
    var inputChainString = document.getElementById("addblock_input").value;
    let chain = new CoronaCryptBlockchain(debug=true); // TUDO: deactivate debug mode
    chain.deserialize(inputChainString);

    // new block parameters
    var inputIndex = document.getElementById("addblock_index").value;
    var inputTimestamp = document.getElementById("addblock_timestamp").value;
    var inputData = document.getElementById("addblock_data").value;
    
    // add new block
    let newBlock = new CoronaCryptBlock(inputIndex, inputTimestamp, inputData);
    chain.addNewBlock(newBlock);

    // serialise output chain
    document.getElementById("addblock_output").value = chain.serialize();
}

function ClearTextArea(textareaID){
    document.getElementById(textareaID).value = "";
}