pragma solidity ^0.6.0;

import "./GoalTracker.sol";

// contract to interact with the GoalTracker contract
contract Client {
  address public goalTrackerAddress;
  GoalTracker public goalTracker;

  // constructor to initialize the GoalTracker contract
  constructor(address _goalTrackerAddress) public {
    goalTrackerAddress = _goalTrackerAddress;
    goalTracker = GoalTracker(goalTrackerAddress);
  }

  // function to create a new goal
  function createGoal(string memory _title, string memory _description) public {
    goalTracker.createGoal(_title, _description);
  }

  // function to complete a goal and receive a reward
  function completeGoal(uint _goalId, string memory _rewardTitle, string memory _rewardDescription, uint _tokenId) public {
    goalTracker.goals[_goalId].complete();
    goalTracker.createReward(_goalId, _rewardTitle, _rewardDescription, _tokenId);
  }

  // function to check if a goal has been completed
  function isGoalCompleted(uint _goalId) public view returns (bool) {
    return goalTracker.goals[_goalId].completed;
  }

  // function to check if a user has received a reward for a goal
  function hasReceivedReward(uint _goalId) public view returns (bool) {
    return goalTracker.ownerOf(goalTracker.rewards[_goalId].tokenId) == msg.sender;
  }
}
