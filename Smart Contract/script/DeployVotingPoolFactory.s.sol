// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

import { Script } from "forge-std/Script.sol";
import { VotingPoolFactory } from "../src/VotingPool.sol";

contract DeployVotingPoolFactory is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        new VotingPoolFactory();
        vm.stopBroadcast();
    }
}