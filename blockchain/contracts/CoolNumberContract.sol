// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

contract CoolNumberContract {
    uint public coolNumber = 42;

    function setCoolNumber(uint _coolNumber) public {
        coolNumber = _coolNumber;
    }
    function incrementCoolNumber() public {
        coolNumber = coolNumber + 1;
    }
    function decrementCoolNumber() public {
    if (coolNumber > 0) {
        coolNumber = coolNumber - 1;
        }
    else {
        coolNumber = 0;
        }
    }
}