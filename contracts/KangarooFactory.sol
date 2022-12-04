// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Kangaroo.sol";

contract KangarooFactory {
  event ContractCreated(address newAddress);
  Kangaroo[] private _kangaroos;
  function createKangaroo() public returns (Kangaroo){
    Kangaroo kangaroo = new Kangaroo(); 
    _kangaroos.push(kangaroo);
    emit ContractCreated(address(kangaroo));
    return kangaroo;
  }

  function allFoundations()
        public
        view 
        returns (Kangaroo[] memory coll)
    {
        return _kangaroos;
    }
}