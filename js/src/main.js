(function() {
  const arrayData = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  function addNumbers(arg1, arg2) {
    return arg1 + arg2;
  }

  const Jom = {
    one: 'ONE',
    describe: function() {
      console.log(this.one);
    },
    name: function(name) {
      Jom.toLog(this+name);
    },
    nameFull: function(first, last) {
      Jom.toLog(this+first+' '+last);
    },
    functionTest: function(arg1, arg2) {
      Jom.toLog(this(arg1, arg2));
    },
    applyTest: function(args){
      Array.prototype.slice.call(arguments).map((e) => {
        console.log('NUMBER: '+e);
      });
    },
    toLog: function(data) {
      console.log(data);
    }
  };

  const displayNumber = {
    one: '?? will this work?',
    two: function() {
      return 'YES!!';
    }
  }

  Jom.describe();
  Jom.describe.call(displayNumber);

  Jom.toLog.call(this, displayNumber.two());

  Jom.applyTest.apply(this, arrayData);

  Jom.toLog.call(displayNumber.one, 'TEST');

  Jom.name.call('my name is: ', 'Jon');
  Jom.nameFull.call('my full name is: ', 'Jon', 'Z');
  Jom.functionTest.call(addNumbers, 5, 99);
})();
