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

Check.isAllProject = false;

// 如果checkPathArr 为空那么就检查当前项目目录下除了node_modules的所有js文件
//options: {
//   jshintrc: {},
//   jshintignore: []
// }

Check._calculate = function(errorsArr) {

};

Check._jshint = function(source, options, currentFile) {
  Jshint(source, options.jshintrc);
  let errorsArr = Jshint.errors;
  let i = errorsArr.length;
  // attach file to errors;
  while (i--) {
    errorsArr[i].file = currentFile;
  }
  return errorsArr;
};

Check._defaultOptions = {
  jshintrc: jshintrc,
  jshintignore: ['node_modules']
};

Check.errorsRet = [];

Check._readFile = function(filePath) {
  let files = fs.readdirSync(filePath);
  let filesLen = files.length;
  for(let i = 0; i < filesLen; i++) {
    let _filePath = path.join(filePath, files[i]);
    let fileStats = fs.statSync(_filePath);
    if(fileStats.isDirectory()) {
      if(this.options.jshintignore.indexOf(files) !== -1) {
        continue;
      }
      this._readFile(_filePath)
    }
    else if(fileStats.isFile()) {
      let codeSource = fs.readFileSync(_filePath, 'utf8');
      // console.log('read file:', filePath);
      this.errorsRet = this.errorsRet.concat(this._jshint(codeSource, this.options, _filePath));
    }
  }
};

Check.check = function(checkPathArr, options) {
  if(!Array.isArray(checkPathArr)) {
    throw new Error('checkPathArr must be an array');
  }
  console.log(Colors.warn('checking your javascript code...'));
  options = options || {};
  this.options = extend(this._defaultOptions, options);
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
  // console.log(this.errorsRet);
  console.log(Colors.prompt('time:'), Colors.info(endTime - startTime), 'ms');
};
