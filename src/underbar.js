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
    // checks if n is undefined
    // returns first element only if true
    // return the first n elements if false
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // if n is larger than array length, set n equal to the array's length
    if (n > array.length) {n = array.length};

    // checks if n is undefined
    // returns the last element only if true
    // returns the last n elements if false
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n);;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // calls iterator and provides it value, key, collection
    // iterates through array or object as necessary
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
    // store all elements that pass the test
    let result = [];

    // implementation using _.each()
    _.each(collection, element => {
      // push element to result array if it passes the test
      if (test(element)) {result.push(element)};
    });

    // implementation using a for loop
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

    // implementation using _.filter()
    result = _.filter(collection, element => {
      // accept values that do not pas the test
      return !test(element);
    });

    // implementation using a for loop
    // for (let element of collection) {
    //   if (!test(element)) {result.push(element)};
    // }

    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let result = [];

    // implementation using _.each()
    _.each(array, element => {
      // accept values that do not already exist in the result array
      if (!result.includes(element)) {result.push(element)};
    });

    // implementation using a for loop
    // for (let element of array) {
    //   if (!result.includes(element)) {result.push(element)};
    // }

    return result
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let result = [];

    // implementation using _.each()
    _.each(collection, element => {
      // modify element using the provided iterator and push to the result array
      result.push(iterator(element));
    });

    // implementation using a for loop
    // for (let element of collection) {
    //   result.push(iterator(element));
    // }

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
        // if placeholder is not undefined, we can add it to our accumulator
        let placeholder = iterator(accumulator, element);
        // we want to avoid running our iterator twice here
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
    // check if an iterator function is provided, use _.identity() if it isnt
    if (iterator === undefined) {iterator = _.identity};

    // used reduce to iterate through the collection
    // our accumulator starts as true, until we find a value that does not pass a truth test
    return _.reduce(collection, function(isTrue, element) {
      // if an element does not pass the truth test, we can return a false and stop checking
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
    // automatically return false if the collection is empty
    if (collection.length === 0) {return false};

    // check if an iterator function is provided, use _.identity() if it isnt
    if (iterator === undefined) {iterator = _.identity}


    // implementation using a for loop
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
  _.extend = function(destination, ...sources) {
    // implementation using _.each()
    // loop through each source argument
    _.each(sources, (object) => {
      // loop through each object property, property is unpacked as (value, key)
      _.each(object, (value, key) => {
        // assign key and value to the destination object
        destination[key] = object[key];
      })
    })

    // implementation using for loops
    // for (let object of sources) {
    //   for (let key in object) {
    //     destination[key] = object[key];
    //   }
    // }

    return destination;
  };





  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(destination, ...sources) {
    //output return the original target object

    // implementation using _.each()
    // loop through each source argument
    _.each(sources, (object) => {
      // loop through each object property, property is unpacked as (value, key)
      _.each(object, (value, key) => {
        // assign key and value to the destination object only if it does not exist in the destination object
        if (destination[key] === undefined) {destination[key] = object[key]};
      })
    })

    // implementation using for loops
    // for (let object of sources) {
    //   for (let key in object) {
    //     if (destination[key] === undefined) {destination[key] = object[key]};
    //   }
    // }

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
    // store arguments passed to the function and their respective results
    let result = {};

    return function() {
      // stringify the arguments to use as a string
      let key = JSON.stringify(Array.from(arguments));

      // run the function and store the result if the key is undefined
      if (result[key] === undefined) {
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
    // capture the arguments intended for the function
    let args = Array.from(arguments).slice(2);

    // use setTimeout to apply the delay
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
  _.shuffle = function(array) {
    // use a copy of the array
    let arrayCopy = array.slice();
    let result = [];

    // get a random index and spice it from the copy array until its length is 0
    while (arrayCopy.length > 0) {
      let randomIndex = Math.floor(Math.random() * (arrayCopy.length));
      result.push(...arrayCopy.splice(randomIndex, 1))
    }

    return result;
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

    // calls functionOrKey if it's a function, uses bracket notation if its a key
    if (typeof functionOrKey === 'function') {
      _.each(collection, element => {
        result.push(functionOrKey.apply(element, args));
      })
    }
    else {
      _.each(collection, element => {
        result.push(element[functionOrKey]());
      })
    }

    return result;

  };

  // Sort the object's values
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // implements a bubble sort that uses the iterator argument
    function bubbleSort(array) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          let left, right;

          // uses iterator like a function or property as necessary
          if (typeof iterator === 'function') {
            left = iterator(array[j]), right = iterator(array[j+1]);
          }
          else {
            left = array[j][iterator], right = array[j+1][iterator];
          }

          // swap left and right if necessary, move undefined values to end of array
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
    // get the length of the longest array
    let longestLength = Math.max.apply(null, _.map(arrays, array => array.length));
    let result = [];

    // loop through each index, from 0 to the longestLength and zip together each array's element at that index
    // once out of bounds for an array an undefined is pushed instead
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

    // inner recursive function, check if each element is an array or not
    function recursiveHelper(item) {
      // push the item to our result array if it already flattened
      if (!Array.isArray(item)) {
        result.push(item)
      }

      // otherwise, the item is an array, recursively check each element
      _.each(item, element => recursiveHelper(element))
    }

    // begin checking the provided array
    recursiveHelper(nestedArray);

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(...strings) {
    let result = [];

    // iterate through each element in the first string array, and check all other arrays for that element
    _.each(strings[0], (element) => {
      // stores a true or false for each array, representing if that array has the element
      let contains = []
      // check each array, can use strings.slice(1) instead to avoid checking the first array again
      _.each(strings, (array) => {
        (array.includes(element)) ? contains.push(true) : contains.push(false);
      })

      // store the element in our result array if it exists in each string array
      if (_.every(contains, element => element === true)) result.push(element);
    })

    return result;
  }



  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(...strings) {
    let result = [];

    // iterate through each element in the first string array, and check all other arrays for that element
    _.each(strings[0], (element) => {
      // stores a true or false for each array, representing if that array has the element
      let contains = []
      // check each array, avoid checking the first string array
      _.each(strings.slice(1), (array) => {
        (array.includes(element)) ? contains.push(true) : contains.push(false);
      })

      // store the element in our result array if it only exists in the first string array
      if (_.every(contains, element => element === false)) result.push(element);
    })

    return result;
  };



  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
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
