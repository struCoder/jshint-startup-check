'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const extend = util._extend;
const Colors = require('colors/safe');
const Jshint = require('jshint').JSHINT;
const jshintrc = require('./config/jshintrc');

// TODO: 如果是生产环境则无需检查!!
// init colors setting
Colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

let Check = module.exports;

// get project path
Check.projectPath = path.resolve(__dirname, '../../..');

// count totalErrors
Check.totalErrors = 0;

Check.isAllProject = false;

Check.isJsReg = /\w.*\.js/;

Check._calculate = function(errorsArr) {
  let i = errorsArr.length;
  let filePathErrorMap = {};
  while (i--) {
    if(!filePathErrorMap[errorsArr[i].file]) {
      filePathErrorMap[errorsArr[i].file] = [];
    }
    filePathErrorMap[errorsArr[i].file].push(`line ${errorsArr[i].line},`, `col ${errorsArr[i].character},`,`reason ${errorsArr[i].reason}\n`)
  }

  let showStr = '';
  let filePathArr = Object.keys(filePathErrorMap);
  let j = filePathArr.length;
  while (j--) {
    let currentErrorArr = filePathErrorMap[filePathArr[j]];
    showStr += `\n ${Colors.error(filePathArr[j])}\n ${currentErrorArr.join(' ')}`
  };
  return showStr;

};

Check._jshint = function(source, options, currentFile) {
  if(this.totalErrors > this.options.maxError) {
    throw new Error('too many errors, please check you code.');
  }
  Jshint(source, options.jshintrc);
  let errorsArr = Jshint.errors;
  let i = errorsArr.length;
  this.totalErrors += i;
  // attach file to errors;
  while (i--) {
    errorsArr[i].file = currentFile;
  }
  return errorsArr;
};

Check._defaultOptions = {
  jshintrc: jshintrc,
  jshintignore: ['node_modules', '.git'],
  maxError: 5000,
  showScanFile: true,
  env: process.env.NODE_ENV || 'development'
};

Check.errorsRet = [];

Check._readFile = function(filePath) {
  let files = fs.readdirSync(filePath);
  let filesLen = files.length;
  for(let i = 0; i < filesLen; i++) {
    let _filePath = path.join(filePath, files[i]);
    let fileStats = fs.statSync(_filePath);
    if(fileStats.isDirectory()) {
      if(this.options.jshintignore.indexOf(files[i]) !== -1) {
        continue;
      }
      this._readFile(_filePath)
    }

    // just file and javascript file
    else if(fileStats.isFile() && this.isJsReg.test(files[i])) {
      let codeSource = fs.readFileSync(_filePath, 'utf8');
      if(this.options.showScanFile) {
        console.log(Colors.info('read file:'), Colors.data(_filePath));
      }
      this.errorsRet = this.errorsRet.concat(this._jshint(codeSource, this.options, _filePath));
    }
  }
};

Check.check = function(checkPathArr, options) {
  if(!Array.isArray(checkPathArr)) {
    throw new Error('checkPathArr must be an array');
  }
  options = options || {};
  this.options = extend(this._defaultOptions, options);

  // do not check code in production env
  if(this.options.env === 'production'){
    return;
  }

  console.log(Colors.verbose('checking your javascript code...'));
  let _checkPathArr = [];
  let pathArrLen = checkPathArr.length;
  if(pathArrLen === 0) {
    this.isAllProject = true;
  }
  let startTime = Date.now();
  if(this.isAllProject) {
    this._readFile(this.projectPath);
  }
  else {
    for(let i = 0; i < checkPathArr.length; i++) {
      this._readFile(path.join(this.projectPath, checkPathArr[i]));
    }
  }

  let endTime = Date.now();
  console.log(Colors.data(this._calculate(this.errorsRet)));
  console.log(Colors.prompt('time:'), Colors.info(endTime - startTime), 'ms');
  this.totalErrors = 0;  // reset
};
