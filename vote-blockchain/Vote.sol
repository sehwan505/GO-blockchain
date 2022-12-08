// candidator

pragma solidity 0.8.7;
contract Vote {

    struct candidator {
        string name;
        uint upVote;
    }

    candidator[] public candidatorList;
    bool live;
    address owner;

    mapping(address => bool) Voted;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
        live = true; 

        emit Voting(owner);
    }

    event AddCandidtor(string name);
    event UpVote(string candidator, uint upVote);
    event FinishVote(bool live);
    event Voting(address owner);


    function addCandidtor(string memory _name) public {
        require(candidatorList.length < 5);
        require(live == true);
        candidatorList.push(candidator(_name, 0));
        
        emit AddCandidtor(_name);
    }

    function upVote(uint _indexOfCandidator) public {
        require(_indexOfCandidator < candidatorList.length);
        require(Voted[msg.sender] == false);
        candidatorList[_indexOfCandidator].upVote++;

        Voted[msg.sender] = true;

        emit UpVote(candidatorList[_indexOfCandidator].name, candidatorList[_indexOfCandidator].upVote);
    }
    
    function finishVote(string memory) public onlyOwner{
        live = false;

        emit FinishVote(live);
    }
}