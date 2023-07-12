const fs = require('fs');
const ethers = require('ethers');
const { utils, BigNumberish, BigNumber } = require('ethers');

const floatToFixed = (num, decimals = 18) => {
  return BigNumber.from(utils.parseUnits(num.toString(), decimals));
};

const fixedToFloat = (num, decimals = 18) => {
  return parseFloat(utils.formatUnits(num, decimals));
};

function encodePath(path) {
  let encoded = "0x";
  for (let i = 0; i < path.length; i++) {
    encoded += path[i].slice(2);
  }
  return encoded.toLowerCase();
}


// 将CSV转换为Objects
function convertCSVToObjectSync(filePath) {
  const objects = [];

  const fileData = fs.readFileSync(filePath, 'utf-8');

  const lines = fileData.trim().split('\n');
  const header = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};

    for (let j = 0; j < header.length; j++) {
      const trimmedKey = header[j].replace(/\s/g, '');
      obj[trimmedKey] = values[j];
    }

    objects.push(obj);
  }

  return objects;
};

// 暂停函数
function sleep(minutes) {
    const milliseconds = minutes * 60 * 1000;
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const winston = require('winston');


// 保存日志
function saveLog(projectName, message) {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.simple(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./data/${projectName}.log` }),
      ],
    });
  
    logger.info(message);
  }
   

// 获取随机浮点数
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }


// getconfig
function getConfig() {
  const CONFIG = JSON.parse(fs.readFileSync('./config.json'))
  let baseConfig, RPC, tokenAddress, contractAddress;
  baseConfig = CONFIG.baseConfig;
  if (CONFIG.baseConfig.test){
      RPC = CONFIG.Network.testNetwork.RPC;
      tokenAddress = CONFIG.Network.testNetwork.tokenAddress;
      contractAddress = CONFIG.Network.testNetwork.contractAddress;
  } else{
      RPC = CONFIG.Network.mainNetwork.RPC;
      tokenAddress = CONFIG.Network.mainNetwork.tokenAddress;
      contractAddress = CONFIG.Network.mainNetwork.contractAddress;
    };
  return [baseConfig, RPC, tokenAddress, contractAddress]
};

const getContract = (abi, address, provider) => {
  return new ethers.Contract(address, abi, provider);
}
  
module.exports = { convertCSVToObjectSync, sleep, getRandomFloat, saveLog, floatToFixed, fixedToFloat, encodePath, getConfig, getContract};
