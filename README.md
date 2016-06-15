### jshint-startup-check
#### intruction  

Maybe yourself or your company have coding standards, and this project will
Help you check your code meets coding standards or not meets coding standards


### How
Use jshint basically and check your code when your Nodejs project is startuping

#### Example

your project tree

```bash
├── bin
│   └── sync.js
├── config.js
├── index.js
├── node_modules
│   └── body-parser
├── src
│   ├── v2
│   │    ├── a.js
│   │    ├── b.js
│   │    ├── c.js
│   │    ├── d.js
│   │    ├── e.js
│   │    └── f.js

```

```javascript
'use strict';

const http = require('http');
const jshintCheck = require('jshint-startup-check');

const myCheckConfig = {
  jshintrc: {},                                   // option
  jshintignore: ['node_modules', '.git'],         // option
  maxError: 5000,                                 // option
  showScanFile: true,                             // option
  env: 'your project env' // in production env will not check (option)
};

// check function first argument is an array that can be directories or files in your project
// if it was empty, your whole project will be check expcept node_modules and .git(see config)

jshintCheck.check(['/src/api/v2'], myCheckConfig);

const server = http.createServer(app);

```
[jshintrc config](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)
