pragma solidity ^0.4.24;


import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      
    bool private operational = true;                                    
    mapping (address => bool) private registeredAirlines;
    mapping (address => uint) private fundedAirlines;
    mapping(address => uint256) private authorizedContracts;
    address[] airlines;

    mapping(address => uint) private accountBalance;
    mapping(bytes32 =>address[]) private airlineinsurees;
    mapping(address =>mapping(bytes32 => uint)) insuredamount;
    mapping(address => uint) private fundedinsurance;
    mapping(bytes32 =>mapping(address => uint)) insuredpayout;
    
    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor
    (
        address firstAirline
    ) 
    public 
    {
        contractOwner = msg.sender;
        registeredAirlines[firstAirline] = true;
        airlines.push(firstAirline);
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /**
    * @dev Modifier that requires the caller airline to be registered
    */
    modifier requireIsCallerAirlineRegistered(address caller)
    {
        require( registeredAirlines[caller] == true, "Caller not registered");
        _;
    }

    /**
    * @dev Modifier that requires the airline not to be registered
    */
    modifier requireisAirlineNotRegistered(address airline)
    {
        require( registeredAirlines[airline] == false, "Airline already registered");
        _;
    }

    /**
    * @dev Modifier that requires the caller to be authorized
    */
    modifier requireIsCallerAuthorized()
    {
        require(authorizedContracts[msg.sender] == 1, "Caller is not contract owner");
        _;
    } 

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isnotinsured(address airline,string flight,uint timestamp,address passenger)                     
    external
    view
    returns(bool)
    {
        bytes32 flightkey = getFlightKey(airline,flight,timestamp);
        uint amount = insuredamount[passenger][flightkey];
        return(amount == 0);
    }

    function isAirlineRegistered(address airline)
    public
    view
    returns (bool)
    {
        return registeredAirlines[airline];
    }

    function isOperational() 
    public 
    view 
    returns(bool) 
    {
        return operational;
    }

    function setOperatingStatus
    (
        bool mode
    ) 
    external
    requireContractOwner 
    {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/
    
function authorizeCaller
    (
        address contractAddress
    )
    external
    requireContractOwner
    {
        authorizedContracts[contractAddress] = 1;
       
    }

function deauthorizeCaller
    (
        address contractAddress
    )
    external
    requireContractOwner
    {
        delete authorizedContracts[contractAddress];
    }

function registerAirline
    (  
        address airline 
    )
    external
    requireIsOperational
    requireIsCallerAuthorized  
    requireisAirlineNotRegistered(airline)                     
    returns(bool success)
    {
        require(airline != address(0));    
        registeredAirlines[airline] = true;
        airlines.push(airline);
        return registeredAirlines[airline];
    }

function getAirlines()
    external
    view
    returns(address[]) 
    {
        return airlines;
    }
    
function getPassengerFunds(address passenger)
    external
    view
    returns(uint) 
    {
        return accountBalance[passenger];
    }

function withdrawPassengerFunds(uint amount,address passenger)
    external    
    requireIsOperational                                     
    requireIsCallerAuthorized                                               
    returns(uint)
    {
        accountBalance[passenger] = accountBalance[passenger] - amount;
        passenger.transfer(amount);
        return accountBalance[passenger];
    }

function fundAirline
    (
        address airline,
        uint amount
    )
    external                            
    requireIsOperational
    requireIsCallerAuthorized
    requireIsCallerAirlineRegistered(airline)
    {
        fundedAirlines[airline] += amount;
    }

function getAirlineFunds
    (
        address airline
        
    )
    external 
    view                           
    requireIsOperational
    requireIsCallerAuthorized
    requireIsCallerAirlineRegistered(airline)
    returns(uint funds)
    {
        return (fundedAirlines[airline]);
    }
  
function buy (address  airline,string flight,uint256 _timestamp,address passenger,uint amount)          
    external
    requireIsOperational
    requireIsCallerAuthorized
    requireIsCallerAirlineRegistered(airline)                                                      
    {
        bytes32 flightkey = getFlightKey(airline,flight,_timestamp);
        airlineinsurees[flightkey].push(passenger);
        insuredamount[passenger][flightkey]= amount;
        insuredpayout[flightkey][passenger] = 0; 
    } 

    uint public  total = 0;

function creditInsurees
    (
        address airline,
        string flight,
        uint256 timestamp,
        uint factor_numerator,
        uint factor_denominator
    )
    external
    requireIsOperational
    requireIsCallerAuthorized
    {
        bytes32 flightkey = getFlightKey(airline,flight,timestamp);
        address[] storage insurees = airlineinsurees[flightkey];
        for(uint8 i = 0; i < insurees.length; i++) 
        {
            address passenger = insurees[i];
            uint256 payout;
            uint amount = insuredamount[passenger][flightkey];
            uint paid = insuredpayout[flightkey][passenger];
        
            if(paid == 0)
            {
                payout = amount.mul(factor_numerator).div(factor_denominator);               
                insuredpayout[flightkey][passenger] = payout;  
                accountBalance[passenger] += payout;
            }
        } 
    } 


function getAccountBalance(address passenger)
    external
    view
    requireIsOperational
    requireIsCallerAuthorized 
    returns(uint)
    {
      return accountBalance[passenger];
    }

function pay
    (   address airline,string flight,uint ts,
        address passenger,
        uint payout
    )
    external
    requireIsOperational
    requireIsCallerAuthorized
                            
    {
        bytes32 flightkey = getFlightKey(airline,flight,ts);
        insuredpayout[flightkey][passenger] = payout;  
        accountBalance[passenger] += payout;
    }

function fund()
    public
    payable
    {
    }

function getFlightKey
    (
        address airline,
        string memory flight,
        uint256 timestamp
    )
    pure
    internal
    returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

function() 
    external 
    payable 
    {
        fund();
    }

}
