(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = val => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {n = array.length};

    return n === undefined ? array[array.length - 1] : array.slice(array.length - n);;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else if (collection.constructor === Object) {
      for (let property in collection) {
        iterator(collection[property], property, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let result = [];

    _.each(collection, item => {
      if (test(item)) {
        result.push(item);
      }
    });

    // for (let element of collection) {
    //   if (test(element)) {result.push(element)};
    // }

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    let result = [];
    return _.filter(collection, function(item) {
      return !(test(item));
    });
    // _.filter(collection, test, item => {
    //   if (!test(item)) {
    //     result.push(item);
    //   }
    // });

    // for (let element of collection) {
    //   if (!test(element)) {result.push(element)};
    // }

    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let result = [];

    _.each(array, item => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });

    return result
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let result = [];

    // _.each(collection, item => {
    //   result.push(iterator(item));
    // });

    // return result

    for (let element of collection) {
      result.push(iterator(element));
    }

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // iterate through each element in collection
    for (let index in collection) {
      // store element for ease of use
      let element = collection[index];

      // if we don't have an accumulator set the element as our accumulator
      if (accumulator === undefined) {
        accumulator = element;
      }
      else {
        // use a placeholder to store the value of running our iterator
        // if placeholder is not
        let placeholder = iterator(accumulator, element);
        if (placeholder !== undefined) {
          accumulator = placeholder
        }
      }
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // check if an iterator function is provided
    if (iterator === undefined) {iterator = _.identity};

    return _.reduce(collection, function(isTrue, element) {
      if (!isTrue) {
        return false;
      }

      return Boolean(iterator(element));
    }, true)

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (collection.length === 0) {return false};

    if (iterator === undefined) {iterator = _.identity}

    for (let element of collection) {
      if (Boolean(iterator(element))) {return true};
    }

    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */




  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  // var destination = { a: 'a', b: value};
  // var source1 = { a: 'b', c : 2 };
  //var sourde2 = {a:f, e:$}
  // var extended = _.extend(destination, source);
  // result { a: 'f', b: value, c : 2, e:$}

  //obj1{key1 = value}

function print(args)
{
  console.log(args)
}



  _.extend = function(destination, ...sources) {
    _.each(sources, (object) => {
      _.each(object, (value, key) => {
        destination[key] = object[key];
      })
    })

    return destination;
  };





  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(destination, ...sources) {
    //output return the original target object

    _.each(sources, (object) => {
      _.each(object, (value, key) => {
        if (destination[key] === undefined) {destination[key] = object[key]};
      })
    })

    return destination;
  };





  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time.
    //Subsequent calls
    // should return the previously returned value.

  // var increment = _.once(function() {
  //   num++;
  // });

  // increment();
  // increment();
  // increment();

  // _.once(function)
    // what happens when we call function with out wrapping it in once

  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };


  // expect(memoAdd(1, 2)).to.equal(3);
  // expect(memoAdd(3, 4)).to.equal(7);
  // expect(memoAdd(1, 3)).to.equal(4);
    // result {
      //[1, 2]: 3,
      //[3, 4]: 7,
      //[1, 3]: 4,
  //}



  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //var memoSpy = _.memoize(spy);
  //memoSpy(10);
  //memoSpy =_.memoize(spy())
  _.memoize = function(func) {
    // track the func and its objects
    // console.log(func);
    //things become what their functions' return
    let result = {};

    return function() {
      let key = JSON.stringify(Array.from(arguments));

      // run the function and store the result if the key is undefined
      if (result[key] === undefined) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        // console.log('Arguments: ', Array.from(arguments));
        // console.log(func.apply(this, arguments));
        //console.log(...Array.from(arguments));

        // result[key] = func(...Array.from(arguments));//as above so below
        result[key] = func.apply(this, arguments);
      }

      return result[key];
    }

  };






  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //input: is a func and a ammount of time to wait
    //output func result after an ammount of time has elapsed
      //constraint not holding up the whole program with a while loop
        //kinda like a charge up
    //ignore return until

    let args = Array.from(arguments).slice(2);


    setTimeout(() => {func.apply(this, args)}, 100);
  };





  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array, result = []) {
    //inputs are an array
    //outputs are going to be the same array but random order
    //get a random value from the size of the array and make it the index
    //push that index value into the result array and call the function again
    let arrayCopy = array.slice();
    if (arrayCopy.length === 0) {
      return result;
    }
    let indexToPush = Math.floor(Math.random() * (arrayCopy.length + 1))
    result.push(...arrayCopy.splice(indexToPush, 1));
    return _.shuffle(arrayCopy, result);
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  // var reverse = function() {
  //   return this.split('').reverse().join('');
  // };

  _.invoke = function(collection, functionOrKey, args) {

    let result = [];

    if (typeof functionOrKey === 'function') {//if it is a function treat like a function
      for(let element of collection){
        result.push(functionOrKey.apply(element, args));
      }
    }else{//if it is not a function treat it like a key
      for(let element of collection){
        result.push(element[functionOrKey]());
      }
    }

    return result;

  };

  // Sort the object's values
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {


    function bubbleSort(array) {

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          let left, right;

          //
          if (typeof iterator === 'function') {
            left = iterator(array[j]), right = iterator(array[j+1]);
          }
          else {
            left = array[j][iterator], right = array[j+1][iterator];
          }

          // sort if necessary, move undefineds to end of array
          if (left > right || left === undefined) {
            let temp = array[j+1];
            array[j+1] = array[j];
            array[j] = temp;
          }
        }

      }
      return array;
    }



    return bubbleSort(collection);

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(...arrays) {
    let longestLength = Math.max.apply(null, _.map(arrays, array => array.length));
    let result = [];

    _.each([...Array(longestLength).keys()], (index) => {
      let zippedElement = [];
      _.each(arrays, (array) => {
        (index < array.length) ? zippedElement.push(array[index]) : zippedElement.push(undefined);
      })
      result.push(zippedElement);
    })

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array

  // var nestedArray = [1, [2], [3, [[[4]]]]]; => [1, 2, 3, 4]
  _.flatten = function(nestedArray) {
    let result = [];

    function recursiveHelper(item) {
      (!Array.isArray(item)) ? result.push(item) : _.each(item, (element) => {recursiveHelper(element)})
    }

    recursiveHelper(nestedArray);

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(...strings) {
    //like the common character but chekcing for elements instead
    // I= Arrays of strings
    // O= A single array of strings that exist in all elements
    // C=
    // E=

    // var stooges = ['moe', 'curly', 'larry'];
    // var leaders = ['moe', 'groucho'];
    let result = [];

    _.each(strings[0], (element) => {
      let contains = []
      _.each(strings, (array) => {
        (array.includes(element)) ? contains.push(true) : contains.push(false);
      })

      if (_.every(contains, element => element === true)) result.push(element);
    })

    return result;
  }



  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(...strings) {
    let result = [];

    _.each(strings[0], (element) => {
      let contains = []
      _.each(strings.slice(1), (array) => {
        (array.includes(element)) ? contains.push(true) : contains.push(false);
      })

      if (_.every(contains, element => element === false)) result.push(element);
    })

    return result;
  };


  // if (arrays.length < 2) {//base case
  //   return arrays[0];
  // }
  // let returnVariable = [];
  // for (let element of arrays[0]) {//checks the elements in the first to the second
  //   if (!arrays[1].includes(element)) {
  //     returnVariable.push(element);
  //   }
  // }
  // arrays.splice(1, 1);//gets rid of the second element
  // arrays[0] = [...returnVariable];//allows the first element to be updated
  // return _.difference(...arrays);
    // let result = []

    // console.log(Array.from(arguments))
    // arrays[0]
    // //loop through the first element
    // for(let element of arrays[0])
    // {//loop through the arrays
    //   let contains = []
    //   for(let array of arrays.slice(1)){
    //     contains.push(array.includes(element));
    //   }

    //   if _.every(contains, x => x === false) {result.push(element)}
    // }

    // return result


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  // within the scope of fn
  _.throttle = function(func, wait) {
    let startTime = Date.now();

    return function () {
      let elapsedTime = (Date.now() - startTime)

      if (elapsedTime > wait) {
        func.apply(this, arguments)
      }
    }

  };
}());
