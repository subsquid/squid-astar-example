import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface AaveLendingPoolUpdatedAddressEvent {
  lendingPool: string;
}

export interface BankUpdatedAddressEvent {
  bank: string;
}

export interface ExcessCollateralSafetyMarginUpdatedUint256Event {
  ratio: ethers.BigNumber;
}

export interface IdleCollateralUtilizationRatioUpdatedUint256Event {
  ratio: ethers.BigNumber;
}

export interface IncentivesClaimedUint256Event {
  amount: ethers.BigNumber;
}

export interface InvestDepositedUint256Event {
  amount: ethers.BigNumber;
}

export interface InvestWithdrawnUint256Event {
  amount: ethers.BigNumber;
}

export interface OperatorUpdatedAddressEvent {
  newOperator: string;
}

export interface OwnershipTransferredAddressAddressEvent {
  previousOwner: string;
  newOwner: string;
}

export interface ProfitControllerUpdatedAddressEvent {
  profitController: string;
}

export interface ProfitExtractedUint256Event {
  amount: ethers.BigNumber;
}

export interface ReservedCollateralThresholdUpdatedUint256Event {
  ratio: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "AaveLendingPoolUpdated(address)":  {
    topic: abi.getEventTopic("AaveLendingPoolUpdated(address)"),
    decode(data: EvmEvent): AaveLendingPoolUpdatedAddressEvent {
      const result = abi.decodeEventLog(
        abi.getEvent("AaveLendingPoolUpdated(address)"),
        data.data || "",
        data.topics
      );
      return  {
        lendingPool: result[0],
      }
    }
  }
  ,
  "BankUpdated(address)":  {
    topic: abi.getEventTopic("BankUpdated(address)"),
    decode(data: EvmEvent): BankUpdatedAddressEvent {
      const result = abi.decodeEventLog(
        abi.getEvent("BankUpdated(address)"),
        data.data || "",
        data.topics
      );
      return  {
        bank: result[0],
      }
    }
  }
  ,
  "ExcessCollateralSafetyMarginUpdated(uint256)":  {
    topic: abi.getEventTopic("ExcessCollateralSafetyMarginUpdated(uint256)"),
    decode(data: EvmEvent): ExcessCollateralSafetyMarginUpdatedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ExcessCollateralSafetyMarginUpdated(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        ratio: result[0],
      }
    }
  }
  ,
  "IdleCollateralUtilizationRatioUpdated(uint256)":  {
    topic: abi.getEventTopic("IdleCollateralUtilizationRatioUpdated(uint256)"),
    decode(data: EvmEvent): IdleCollateralUtilizationRatioUpdatedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("IdleCollateralUtilizationRatioUpdated(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        ratio: result[0],
      }
    }
  }
  ,
  "IncentivesClaimed(uint256)":  {
    topic: abi.getEventTopic("IncentivesClaimed(uint256)"),
    decode(data: EvmEvent): IncentivesClaimedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("IncentivesClaimed(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        amount: result[0],
      }
    }
  }
  ,
  "InvestDeposited(uint256)":  {
    topic: abi.getEventTopic("InvestDeposited(uint256)"),
    decode(data: EvmEvent): InvestDepositedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("InvestDeposited(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        amount: result[0],
      }
    }
  }
  ,
  "InvestWithdrawn(uint256)":  {
    topic: abi.getEventTopic("InvestWithdrawn(uint256)"),
    decode(data: EvmEvent): InvestWithdrawnUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("InvestWithdrawn(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        amount: result[0],
      }
    }
  }
  ,
  "OperatorUpdated(address)":  {
    topic: abi.getEventTopic("OperatorUpdated(address)"),
    decode(data: EvmEvent): OperatorUpdatedAddressEvent {
      const result = abi.decodeEventLog(
        abi.getEvent("OperatorUpdated(address)"),
        data.data || "",
        data.topics
      );
      return  {
        newOperator: result[0],
      }
    }
  }
  ,
  "OwnershipTransferred(address,address)":  {
    topic: abi.getEventTopic("OwnershipTransferred(address,address)"),
    decode(data: EvmEvent): OwnershipTransferredAddressAddressEvent {
      const result = abi.decodeEventLog(
        abi.getEvent("OwnershipTransferred(address,address)"),
        data.data || "",
        data.topics
      );
      return  {
        previousOwner: result[0],
        newOwner: result[1],
      }
    }
  }
  ,
  "ProfitControllerUpdated(address)":  {
    topic: abi.getEventTopic("ProfitControllerUpdated(address)"),
    decode(data: EvmEvent): ProfitControllerUpdatedAddressEvent {
      const result = abi.decodeEventLog(
        abi.getEvent("ProfitControllerUpdated(address)"),
        data.data || "",
        data.topics
      );
      return  {
        profitController: result[0],
      }
    }
  }
  ,
  "ProfitExtracted(uint256)":  {
    topic: abi.getEventTopic("ProfitExtracted(uint256)"),
    decode(data: EvmEvent): ProfitExtractedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ProfitExtracted(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        amount: result[0],
      }
    }
  }
  ,
  "ReservedCollateralThresholdUpdated(uint256)":  {
    topic: abi.getEventTopic("ReservedCollateralThresholdUpdated(uint256)"),
    decode(data: EvmEvent): ReservedCollateralThresholdUpdatedUint256Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ReservedCollateralThresholdUpdated(uint256)"),
        data.data || "",
        data.topics
      );
      return  {
        ratio: result[0],
      }
    }
  }
  ,
}

function getJsonAbi(): any {
  return [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_bank",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_collat",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_oru",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_profitController",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_aaveLendingPool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "lendingPool",
          "type": "address"
        }
      ],
      "name": "AaveLendingPoolUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "bank",
          "type": "address"
        }
      ],
      "name": "BankUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ratio",
          "type": "uint256"
        }
      ],
      "name": "ExcessCollateralSafetyMarginUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ratio",
          "type": "uint256"
        }
      ],
      "name": "IdleCollateralUtilizationRatioUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "IncentivesClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "InvestDeposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "InvestWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOperator",
          "type": "address"
        }
      ],
      "name": "OperatorUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "profitController",
          "type": "address"
        }
      ],
      "name": "ProfitControllerUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "ProfitExtracted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ratio",
          "type": "uint256"
        }
      ],
      "name": "ReservedCollateralThresholdUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "EXCESS_COLLATERAL_SAFETY_MARGIN_MIN",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "IDLE_COLLATERAL_UTILIZATION_RATIO_MAX",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "RESERVE_COLLATERAL_THRESHOLD_MIN",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "aToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "aaveLendingPool",
      "outputs": [
        {
          "internalType": "contract ILendingPool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "balanceOfAToken",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bank",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "calcCollateralReserveRatio",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "collat",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "enterInvest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "excessCollateralBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_excess",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "excessCollateralSafetyMargin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exitInvest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "profit",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "extractProfit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "globalCollateralBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "idleCollateralUtilizationRatio",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "investingAmt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isAboveThreshold",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "oru",
      "outputs": [
        {
          "internalType": "contract IOrcusERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "profitController",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rebalanceIfUnderThreshold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rebalanceInvest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reservedCollateralThreshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_aaveLendingPool",
          "type": "address"
        }
      ],
      "name": "setAaveLendingPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_bank",
          "type": "address"
        }
      ],
      "name": "setBank",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_excessCollateralSafetyMargin",
          "type": "uint256"
        }
      ],
      "name": "setExcessCollateralSafetyMargin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idleCollateralUtilizationRatio",
          "type": "uint256"
        }
      ],
      "name": "setIdleCollateralUtilizationRatio",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_profitController",
          "type": "address"
        }
      ],
      "name": "setProfitController",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_reservedCollateralThreshold",
          "type": "uint256"
        }
      ],
      "name": "setReservedCollateralThreshold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amt",
          "type": "uint256"
        }
      ],
      "name": "transferCollatTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amt",
          "type": "uint256"
        }
      ],
      "name": "transferOruTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
