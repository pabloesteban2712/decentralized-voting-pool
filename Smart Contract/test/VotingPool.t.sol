// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {VotingPoolSC} from "../src/VotingPool.sol";

contract VotingPoolSCTest is Test {
    
    VotingPoolSC public VotingPoolInstance;
    uint256 public duration;
    
    function setUp() public {
        duration = 7200; // secs
        VotingPoolInstance = new VotingPoolSC(duration);
        assertEq(VotingPoolInstance.getVotes(0),1); 
    }

    function testVoteCounts() public {
        VotingPoolInstance.checkVote(0);
        assertEq(VotingPoolInstance.getVotes(0), 1);
    }
    
    function testCheckVoteTwice() public {
        VotingPoolInstance.checkVote(0); // FIRST VOTE

        vm.expectRevert();
        VotingPoolInstance.checkVote(1); // SECOND VOTE
    }

    function testRejectsInvalidOption() public {
        vm.expectRevert();
        VotingPoolInstance.checkVote(2);
    }
}