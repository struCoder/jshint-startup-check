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
Check._jshint = function(source, options) {

};

Check._defaultOptions = {
  jshintrc: jshintrc,
  jshintignore: ['node_modules']
};


Check._readFile = function(path) {
  let files = fs.readdirSync(this.projectPath);
  let filesLen = files.length;
  for(let i = 0; i < filesLen; i++) {
    let filePath = path.join(path, files[i]);
    let fileStats = fs.statSync(filePath);
    if(fileStats.isDirectory()) {
      if(this.options.jshintignore.indexOf(files) !== -1) {
        continue;
      }
      this._readFile(filePath)
    }
    else if(fileStats.isFile()) {
      let codeSource = fs.readFileSync(filePath, 'utf8');
      this._jshint(codeSource, this.options);
    }
  }
};

Check.check = function(checkPathArr, options, predef) {
  this.options = extend(this._defaultOptions, options);
  let _checkPathArr = [];
  let pathArrLen = checkPathArr.length;
  if(pathArrLen === 0) {
    Check.isAllProject = true;
    _checkPathArr.push(this.projectPath);
  }
  let startTime = Date.now();
  if(this.isAllProject) {
    let files = fs.readdirSync(this.projectPath);

  }
  else {

  }



  Jshint(source, options, predef);

  console.log(Jshint.data());
  let endTime = Date.now();
  console.log(Colors.info(endTime - startTime));
};

console.log(Check.projectPath);
Check.Jshint()
