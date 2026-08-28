// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

contract payableContract {

    uint256 public startTime;
    uint256 public endTime;

    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;

    constructor(uint256 _duration) {
        require(_duration >= 600 && _duration <= 604800, "You must introduce a valid duration");
        startTime = block.timestamp;
        endTime = block.timestamp + _duration;
    }

    modifier checkTime() {
        require(block.timestamp > startTime && block.timestamp < endTime, "Voting is not active");
        _;
    }

    function vote(uint256 _option) external checkTime() {
        require(_option == 0 || _option == 1, "We just got two vote options");
        require(!hasVoted[msg.sender], "User already voted");
        hasVoted[msg.sender] = true;
        votes[_option]++;
    }

    function getVotes(uint256 _option) external view returns (uint256) {
        return votes[_option];
    }
}