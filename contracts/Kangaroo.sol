// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./KDCoin.sol";

contract Kangaroo {

  struct Submission {
    string url; 
    string dealId;
    string pieceId; 
    address spAddress;
    uint totalVotes;
    uint yesVotes;
    uint noVotes;
    bool valid;
  }

  IERC20 public token;
  uint8 public stage; 
  mapping(address => bool) public members;
  mapping(string => Submission) public submissions;
  
  modifier ownerOnly() {
    require(msg.sender == owner, "Non Admin Call");
    _;
  }

  modifier memberOnly() {
    require(members[msg.sender], "Member Gated");
    _;
  }

  address public owner;

  function initialize(address _owner) {
    require(owner == address(0), "Kangaroo already initalized");
    owner = _owner;
  }

  // Set the native token of the DAO
  function setToken(address tokenAddress) public ownerOnly {
    token = IERC20(address(tokenAddress));
  }

  // Use a cron or an oracle to advance the stages
  function advance() public ownerOnly {
    stage = stage % 5;
  }

  // Join this instance of the DataDAO, if the token criteria is met
  function join() public {
    require(token.balanceOf(msg.sender) > 0, "Insufficient DAO Tokens");
    require(stage == 0, "Please join in the next hop");
    members[msg.sender] = true;
  }

  // TODO: Make this quadratic voting
  function voteForSubmission(string memory url, uint voteCount) public memberOnly {
    require(stage == 1,"Incorrect stage"); 
    // Ensure that the voter has enough tokens to vote
    require(token.balanceOf(msg.sender) >= voteCount, "Insufficient balance");
    if(submissions[url].valid) {
      submissions[url].totalVotes += voteCount;
      // This works since, the contract address is always whitelisted in the ERC 20 implementation
      token.transferFrom(msg.sender, address(this), voteCount);
    }
    else {
      Submission memory newSubmission = Submission({
        url: url,
        dealId: "",
        pieceId: "",
        spAddress: address(0),
        totalVotes: 0,
        yesVotes: voteCount,
        noVotes: 0,
        valid: true
      });
      submissions[url] = newSubmission;
    }
  }

  // Miners can submit their interest and submit proofs of storage as well
  function submitMinerProof(string memory url, string memory dealId, string memory pieceCid) public {
    require(stage == 2,"Incorrect stage"); 
    Submission memory targetSubmission = submissions[url];
    if(targetSubmission.valid)  {
      targetSubmission.dealId = dealId;
      targetSubmission.pieceId = pieceCid;
      targetSubmission.spAddress = msg.sender;
      targetSubmission.noVotes = RESET
    }
    submissions[url] = targetSubmission;
  }
}

