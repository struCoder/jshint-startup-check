'use strict';

module.exports = {

  // JSHint Default Configuration File (as on JSHint website)
  // See http://jshint.com/docs/ for more details

  "maxerr"        : 5000000,       // {int} Maximum error before stopping

  // Enforcing
  "bitwise"       : true,     // true: Prohibit bitwise operators (&, |, ^, etc.)
  "camelcase"     : false,    // true: Identifiers must be in camelCase
  "curly"         : true,     // true: Require {} for every new block or scope
  "eqeqeq"        : true,     // true: Require triple equals (===) for comparison
  "forin"         : true,     // true: Require filtering for..in loops with obj.hasOwnProperty()
  "freeze"        : true,     // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
  "immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
  "latedef"       : false,    // true: Require variables/functions to be defined before being used
  "newcap"        : false,    // true: Require capitalization of all constructor functions e.g. `new F()`
  "noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
  "noempty"       : true,     // true: Prohibit use of empty blocks
  "nonbsp"        : true,     // true: Prohibit "non-breaking whitespace" characters.
  "nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
  "plusplus"      : false,    // true: Prohibit use of `++` and `--`
  "quotmark"      : false,    // Quotation mark consistency:
                              //   false    : do nothing (default)
                              //   true     : ensure whatever is used is consistent
                              //   "single" : require single quotes
                              //   "double" : require double quotes
  "undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
  "unused"        : true,     // Unused variables:
                              //   true     : all variables, last function parameter
                              //   "vars"   : all variables only
                              //   "strict" : all variables, all function parameters
  "strict"        : true,     // true: Requires all functions run in ES5 Strict Mode
  "maxparams"     : false,    // {int} Max number of formal params allowed per function
  "maxdepth"      : false,    // {int} Max depth of nested blocks (within functions)
  "maxstatements" : false,    // {int} Max number statements per function
  "maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
  "maxlen"        : false,    // {int} Max number of characters per line
  "varstmt"       : false,    // true: Disallow any var statements. Only `let` and `const` are allowed.

  // Relaxing
  "asi"           : false,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
  "boss"          : true,     // true: Tolerate assignments where comparisons would be expected
  "debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
  "eqnull"        : true,     // true: Tolerate use of `== null`
  "esversion"     : 6,         // {int} Specify the ECMAScript version to which the code must adhere.
  "moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
                               // (ex: `for each`, multiple try/catch, function expression…)
  "evil"          : true,     // true: Tolerate use of `eval` and `new Function()`
  "expr"          : false,     // true: Tolerate `ExpressionStatement` as Programs
  "funcscope"     : false,     // true: Tolerate defining variables inside control statements
  "globalstrict"  : true,     // true: Allow global "use strict" (also enables 'strict')
  "iterator"      : false,     // true: Tolerate using the `__iterator__` property
  "lastsemic"     : false,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
  "laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
  "laxcomma"      : false,     // true: Tolerate comma-first style coding
  "loopfunc"      : true,     // true: Tolerate functions being defined in loops
  "multistr"      : false,     // true: Tolerate multi-line strings
  "noyield"       : false,     // true: Tolerate generator functions with no yield statement in them.
  "notypeof"      : false,     // true: Tolerate invalid typeof operator values
  "proto"         : false,     // true: Tolerate using the `__proto__` property
  "scripturl"     : false,     // true: Tolerate script-targeted URLs
  "shadow"        : false,     // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
  "sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
  "supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
  "validthis"     : false,     // true: Tolerate using this in a non-constructor function

  // Environments
  "browser"       : true,     // Web Browser (window, document, etc)
  "node"          : true,

  // Custom Globals
  "globals"       : {}        // additional predefined global variables
}
