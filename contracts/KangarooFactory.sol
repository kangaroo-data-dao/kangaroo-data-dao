// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Kangaroo.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract KangarooFactory {
    Kangaroo public immutable kangarooTemplate;

    constructor() {
        kangarooTemplate = new Kangaroo();
    }

    Kangaroo[] private _kangaroos;

    function createKangaroo(
        address _owner,
        uint256 _index
    ) public returns (Kangaroo) {
        Kangaroo kangaroo = new Kangaroo();
        bytes32 salt = keccak256(abi.encodePacked(_owner, _index));
        address addr = Create2.computeAddress(
            salt,
            keccak256(
                abi.encodePacked(
                    type(EIP1967Proxy).creationCode,
                    abi.encode(
                        address(kangarooTemplate),
                        abi.encodeCall(Kangaroo.initialize, (_owner))
                    )
                )
            )
        );
        if (addr.code.length > 0) {
            return EIP1967Proxy(payable(addr));
        }
        proxy = new EIP1967Proxy{salt: salt}(
            address(kangarooTemplate),
            abi.encodeWithSelector(Kangaroo.initialize.selector, _owner)
        );
    }

    function getAccountAddress(
        address _owner,
        uint256 _index
    ) public view returns (address) {
        bytes32 salt = keccak256(abi.encodePacked(_owner, _index));
        return
            Create2.computeAddress(
                salt,
                keccak256(
                    abi.encodePacked(
                        type(EIP1967Proxy).creationCode,
                        abi.encode(
                            address(kangarooTemplate),
                            abi.encodeCall(Kangaroo.initialize, (_owner))
                        )
                    )
                )
            );
    }
}
