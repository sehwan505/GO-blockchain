pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";

// contract to represent a goal
contract Goal {
  string public title;
  string public description;
  bool public completed;

  constructor(string memory _title, string memory _description) public {
    title = _title;
    description = _description;
    completed = false;
  }

  // function to mark the goal as completed
  function complete() public {
    require(!completed, "Goal has already been completed");
    completed = true;
  }
}

// contract to represent a reward for completing a goal
contract Reward {
  string public title;
  string public description;
  uint public tokenId;

  constructor(string memory _title, string memory _description, uint _tokenId) public {
    title = _title;
    description = _description;
    tokenId = _tokenId;
  }
}

// contract to manage goals and rewards
contract GoalTracker is SafeERC721 {
  // mapping of goal IDs to goals
  mapping(uint => Goal) public goals;

  // mapping of goal IDs to rewards
  mapping(uint => Reward) public rewards;

  // constructor to initialize the ERC721 contract
  constructor() public SafeERC721("GoalTracker", "GT") {}

  // function to create a new goal
  function createGoal(string memory _title, string memory _description) public {
    uint goalId = goals.length;
    goals[goalId] = new Goal(_title, _description);
  }

  // function to create a new reward for a goal
  function createReward(uint _goalId, string memory _title, string memory _description, uint _tokenId) public {
    require(goals[_goalId].completed, "Goal must be completed before a reward can be created");
    rewards[_goalId] = new Reward(_title, _description, _tokenId);
    _mint(msg.sender, _tokenId);
  }
}
