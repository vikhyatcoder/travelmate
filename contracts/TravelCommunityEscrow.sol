// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title TravelCommunityEscrow
 * @dev Smart contract for managing travel community funds with escrow functionality
 */
contract TravelCommunityEscrow is ReentrancyGuard, Ownable, Pausable {
    
    struct Community {
        string name;
        address admin;
        uint256 totalFunds;
        uint256 targetAmount;
        bool isActive;
        mapping(address => uint256) contributions;
        address[] contributors;
        uint256 createdAt;
    }
    
    struct Expense {
        uint256 communityId;
        string description;
        uint256 amount;
        address payable recipient;
        bool approved;
        bool executed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
        uint256 createdAt;
    }
    
    mapping(uint256 => Community) public communities;
    mapping(uint256 => Expense) public expenses;
    
    uint256 public nextCommunityId = 1;
    uint256 public nextExpenseId = 1;
    uint256 public platformFeePercent = 250; // 2.5%
    uint256 public constant APPROVAL_THRESHOLD = 51; // 51% approval required
    
    event CommunityCreated(uint256 indexed communityId, string name, address admin);
    event FundsContributed(uint256 indexed communityId, address contributor, uint256 amount);
    event ExpenseProposed(uint256 indexed expenseId, uint256 indexed communityId, string description, uint256 amount);
    event ExpenseApproved(uint256 indexed expenseId, address approver);
    event ExpenseExecuted(uint256 indexed expenseId, uint256 amount, address recipient);
    event FundsWithdrawn(uint256 indexed communityId, address contributor, uint256 amount);
    
    modifier onlyCommunityAdmin(uint256 _communityId) {
        require(communities[_communityId].admin == msg.sender, "Only community admin");
        _;
    }
    
    modifier onlyCommunityMember(uint256 _communityId) {
        require(communities[_communityId].contributions[msg.sender] > 0, "Only community members");
        _;
    }
    
    modifier communityExists(uint256 _communityId) {
        require(communities[_communityId].isActive, "Community does not exist");
        _;
    }
    
    /**
     * @dev Create a new travel community
     */
    function createCommunity(
        string memory _name,
        uint256 _targetAmount
    ) external whenNotPaused returns (uint256) {
        uint256 communityId = nextCommunityId++;
        
        Community storage newCommunity = communities[communityId];
        newCommunity.name = _name;
        newCommunity.admin = msg.sender;
        newCommunity.targetAmount = _targetAmount;
        newCommunity.isActive = true;
        newCommunity.createdAt = block.timestamp;
        
        emit CommunityCreated(communityId, _name, msg.sender);
        return communityId;
    }
    
    /**
     * @dev Contribute funds to a community
     */
    function contributeFunds(uint256 _communityId) 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        communityExists(_communityId) 
    {
        require(msg.value > 0, "Contribution must be greater than 0");
        
        Community storage community = communities[_communityId];
        
        // Add to contributors list if first contribution
        if (community.contributions[msg.sender] == 0) {
            community.contributors.push(msg.sender);
        }
        
        community.contributions[msg.sender] += msg.value;
        community.totalFunds += msg.value;
        
        emit FundsContributed(_communityId, msg.sender, msg.value);
    }
    
    /**
     * @dev Propose an expense for community approval
     */
    function proposeExpense(
        uint256 _communityId,
        string memory _description,
        uint256 _amount,
        address payable _recipient
    ) external onlyCommunityAdmin(_communityId) returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_recipient != address(0), "Invalid recipient");
        require(communities[_communityId].totalFunds >= _amount, "Insufficient funds");
        
        uint256 expenseId = nextExpenseId++;
        
        Expense storage newExpense = expenses[expenseId];
        newExpense.communityId = _communityId;
        newExpense.description = _description;
        newExpense.amount = _amount;
        newExpense.recipient = _recipient;
        newExpense.createdAt = block.timestamp;
        
        emit ExpenseProposed(expenseId, _communityId, _description, _amount);
        return expenseId;
    }
    
    /**
     * @dev Approve an expense (community members vote)
     */
    function approveExpense(uint256 _expenseId) 
        external 
        onlyCommunityMember(expenses[_expenseId].communityId) 
    {
        Expense storage expense = expenses[_expenseId];
        require(!expense.executed, "Expense already executed");
        require(!expense.approvals[msg.sender], "Already approved");
        
        expense.approvals[msg.sender] = true;
        expense.approvalCount++;
        
        emit ExpenseApproved(_expenseId, msg.sender);
        
        // Check if approval threshold is met
        Community storage community = communities[expense.communityId];
        uint256 totalContributors = community.contributors.length;
        uint256 requiredApprovals = (totalContributors * APPROVAL_THRESHOLD) / 100;
        
        if (expense.approvalCount >= requiredApprovals) {
            expense.approved = true;
        }
    }
    
    /**
     * @dev Execute an approved expense
     */
    function executeExpense(uint256 _expenseId) 
        external 
        nonReentrant 
        onlyCommunityAdmin(expenses[_expenseId].communityId) 
    {
        Expense storage expense = expenses[_expenseId];
        require(expense.approved, "Expense not approved");
        require(!expense.executed, "Expense already executed");
        
        Community storage community = communities[expense.communityId];
        require(community.totalFunds >= expense.amount, "Insufficient funds");
        
        expense.executed = true;
        community.totalFunds -= expense.amount;
        
        // Calculate platform fee
        uint256 platformFee = (expense.amount * platformFeePercent) / 10000;
        uint256 netAmount = expense.amount - platformFee;
        
        // Transfer funds
        expense.recipient.transfer(netAmount);
        payable(owner()).transfer(platformFee);
        
        emit ExpenseExecuted(_expenseId, netAmount, expense.recipient);
    }
    
    /**
     * @dev Withdraw contributed funds (if community allows)
     */
    function withdrawFunds(uint256 _communityId, uint256 _amount) 
        external 
        nonReentrant 
        onlyCommunityMember(_communityId) 
    {
        Community storage community = communities[_communityId];
        require(community.contributions[msg.sender] >= _amount, "Insufficient contribution");
        require(community.totalFunds >= _amount, "Insufficient community funds");
        
        community.contributions[msg.sender] -= _amount;
        community.totalFunds -= _amount;
        
        payable(msg.sender).transfer(_amount);
        
        emit FundsWithdrawn(_communityId, msg.sender, _amount);
    }
    
    /**
     * @dev Get community details
     */
    function getCommunityDetails(uint256 _communityId) 
        external 
        view 
        returns (
            string memory name,
            address admin,
            uint256 totalFunds,
            uint256 targetAmount,
            bool isActive,
            uint256 contributorCount
        ) 
    {
        Community storage community = communities[_communityId];
        return (
            community.name,
            community.admin,
            community.totalFunds,
            community.targetAmount,
            community.isActive,
            community.contributors.length
        );
    }
    
    /**
     * @dev Get user contribution to a community
     */
    function getUserContribution(uint256 _communityId, address _user) 
        external 
        view 
        returns (uint256) 
    {
        return communities[_communityId].contributions[_user];
    }
    
    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause function
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Update platform fee (only owner)
     */
    function updatePlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 1000, "Fee cannot exceed 10%");
        platformFeePercent = _newFeePercent;
    }
}
