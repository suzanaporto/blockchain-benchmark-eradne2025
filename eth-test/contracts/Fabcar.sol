// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FabCar {
    struct Car {
        string make;
        string model;
        string color;
        string owner;
    }

    mapping(uint256 => Car) private cars;
    uint256 private carCount;

    event CarCreated(uint256 indexed carId, string make, string model, string color, string owner);
    event CarUpdated(uint256 indexed carId, string owner);

    function createCar(string memory make, string memory model, string memory color, string memory owner) public {
        cars[carCount] = Car(make, model, color, owner);
        emit CarCreated(carCount, make, model, color, owner);
        carCount++;
    }

    function getCar(uint256 carId) public view returns (string memory make, string memory model, string memory color, string memory owner) {
        require(carId < carCount, "Car does not exist");
        Car memory car = cars[carId];
        return (car.make, car.model, car.color, car.owner);
    }

    function updateCarOwner(uint256 carId, string memory newOwner) public {
        require(carId < carCount, "Car does not exist");
        cars[carId].owner = newOwner;
        emit CarUpdated(carId, newOwner);
    }

    function getCarCount() public view returns (uint256) {
        return carCount;
    }
}