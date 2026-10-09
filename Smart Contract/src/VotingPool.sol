// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

contract VotingPoolSC {

    uint256 public startTime;
    uint256 public endTime;

    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;


    constructor(uint256 _duration) {
        require(_duration >= 3600 && _duration <= 2592000, "Duration must be between 1 hour and 30 days"); 
        startTime = block.timestamp;
        endTime = block.timestamp + _duration;
    }

    modifier checkTime() {
        require(block.timestamp > startTime && block.timestamp < endTime, "Voting is not active");
        _;
    }

    function checkVote(uint256 _option) external checkTime() {
        require(_option == 0 || _option == 1, "We just got two vote options");
        require(!hasVoted[msg.sender], "User already voted");
        hasVoted[msg.sender] = true;
        votes[_option]++;
    }

    function getVotes(uint256 _option) external view returns (uint256) {
        return votes[_option];
    }
}

contract VotingPoolFactory {
    event VotingPoolCreated(address indexed poolAddress);

    function createVotingPool(uint256 duration) external {
        emit VotingPoolCreated(address(new VotingPoolSC(duration)));
    }
}