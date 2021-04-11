const CommercialPaper = require('../../contract/lib/paper.js');
const { login } = require("./utils/login.js");


// Main program function
module.exports = async function redeem(certificate, privateKey, issuer, paperNumber, issuingOwnerMSP, redeemDateTime) {

 try{

  const { network, gateway, company } = await login(certificate, privateKey);

    // Access PaperNet network

    // Get addressability to commercial paper contract
    console.log('Use org.papernet.commercialpaper smart contract.');

    const contract = await network.getContract('papercontract', 'org.papernet.commercialpaper');

    // redeem commercial paper
    console.log('Submit commercial paper redeem transaction.'); 
                                                                       // issuer, paperNumber, redeemingOwner, issuingOwnerMSP, redeemDateTime
    const redeemResponse = await contract.submitTransaction('redeem', issuer, paperNumber, company, issuingOwnerMSP, redeemDateTime);

    // process response
    console.log('Process redeem transaction response.');

    let paper = CommercialPaper.fromBuffer(redeemResponse);

    console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully redeemed with ${paper.owner}`);

    console.log('Transaction complete.');
    gateway.disconnect();
    return paper
  } catch (error) {

    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);

  } finally {

    // Disconnect from the gateway
    console.log('Disconnect from Fabric gateway.')
   

  }
}
// redeem(userName).then(() => {

//   console.log('Redeem program complete.');

// }).catch((e) => {

//   console.log('Redeem program exception.');
//   console.log(e);
//   console.log(e.stack);
//   process.exit(-1);

// });
