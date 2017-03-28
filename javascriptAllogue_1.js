'use strict';


let should = require('chai').should();
let assert = require('chai').assert;


describe('A Rich Aroma: Basic Numbers', () => {

    it("test green",() => {
        true.should.equal(true);
    });

    it('Bug float', function () {
        (0.1+0.1+0.1).should.equal(0.30000000000000004);
    });

});

describe('The first sip: Basic Functions', function () {

    it('minimum function Javascript', function () {
        (() => 0).should.be.a('function');
    });

    it('functions are not equals', function () {
        ((() => 0) === (() => 0)).should.equal(false);
    });

    it('commas with functions to create functions that evaluate multiple expressions', function () {
        (() => (1 + 1, 2 + 2))().should.equal(4);
    });

    it('three forms to expect undefined', function () {
        ((() => {})() === undefined).should.equal(true);
        (undefined === undefined).should.equal(true);
        (void(0) === undefined).should.equal(true);
    });

    it('pure functions with clousure inside return parameter', function () {
        let value_x = 0;
        ((x) => (y) => x)(value_x)('y').should.equal(0);
    });

    it('functions can have grandparents too', function () {
        let [value_x, value_y, value_z] = [1, 2, 3];
        let functionGrandfather = ((x) =>(y) =>(z) => x + y + z)(value_x)(value_y)(value_z);
        let funcionWithoutFathers = ((x, y, z) => x + y + z)(value_x, value_y, value_z);
        functionGrandfather.should.equal(funcionWithoutFathers);
    });

    it('create environment that it not affect at super-environment', function () {
        var environment = "create";

        (() =>{
            var environment = "exist enviroment";

        })();

        environment.should.equal("create");
    });

    it('create const without word const', function () {
        ((PI) =>() => PI.should.equal(3.14159265))(3.14159265)()
    });

    it("const always bound at environment of its function",function(){
        let diameter = ((diameter) => {
            const PI = 3.14159265;

            if (true) {
                const PI = 3;
            }
            return diameter * PI;
        })(2);

        diameter.should.equal(6.2831853);
    });

    it('=> would return 6 if const had function scope', function () {
        let diameter = ((diameter) => {
            var PI = 3.14159265;

            if (true) {
                var PI = 3;
            }
            return diameter * PI;
        })(2);

        diameter.should.equal(6);
    });

    it('functions with name', function () {
        const double = function repeat (str) {
            return str + str;
        }

        double.name.should.equal("repeat");
    });

    it('higher-order functions', function () {
        const addOne = (number) => number + 1;
        const doubleOf = (number) => number * 2;
        const doubleOfAddOne = (number) => doubleOf(addOne(number));

        doubleOfAddOne(1).should.equal(4);
    });

    it('higher-order fuctions decorators', function () {
        const not = (fn) => (x) => !fn(x);
        not((x) => true)('x').should.equal(false);
    });
    
});

describe('Building Blocks', function () {

    it('compose', function () {
        const cook = (food) => food;
        const eat = (food) => {
            let plates = [];
            plates["huevo"] = "huevo frito";
           return plates[food];
        };

        const compose = (a, b) => (c) => a(b(c));
        const cookAndEat = compose(eat, cook);

        cookAndEat("huevo").should.equal("huevo frito");
    });

    it('partial application', function () {
        const mapWith = (fn) =>
            (array) => array.map(fn);

        const squareAll = mapWith((n) => n * n);

        squareAll([1, 2, 3])[0].should.equal(1);
        squareAll([1, 2, 3])[1].should.equal(4);
        squareAll([1, 2, 3])[2].should.equal(9);
    });

    it('Magic Names-argument length', function () {
        const howMany = function () {
            return arguments['length'];
        };

        howMany().should.equal(0);
        howMany('hello').should.equal(1);
        howMany('sharks', 'are', 'apex', 'predators').should.equal(4);
    });


    it('Magic Names-argument-environment_in', function () {
        (function () {
            return (function () { return arguments[0]; })('inner');
        })('outer').should.equal("inner");
    });

    it('Magic Names-argument-environment_out', function () {
        (function () {
            return (() => arguments[0])('inner');
        })('outer').should.equal("outer");
    });


});

describe('Recipes with Basic Functions', function () {

    it('callFirst and callLast without Call', function () {
        const callFirst = (fn, larg) =>
            function (...rest) {
                return fn(larg, ...rest);
            }

        const callLast = (fn, rarg) =>
            function (...rest) {
                return fn(...rest, rarg);
            }

        const greet = (me, you) =>
            `Hello, ${you}, my name is ${me}`;

        const heliosSaysHello = callFirst(greet, 'Helios');

        heliosSaysHello('Eartha').should.equal('Hello, Eartha, my name is Helios');

        const sayHelloToCeline = callLast(greet, 'Celine');

        sayHelloToCeline('Eartha').should.equal('Hello, Celine, my name is Eartha');

    });

    it('unary parse to float', function () {
        assert.deepEqual(['1', '2', '3'].map(parseFloat),[1,2,3]);
    });

    it('three arguments for map', function () {

        let result  = [];

        [1, 2, 3].map(function (element, index, arr) {
          result[index] = {element: element, index: index, arr: arr}
        })

        assert.deepEqual(result[0], { element: 1, index: 0, arr: [ 1, 2, 3 ] });
        assert.deepEqual(result[1], { element: 2, index: 1, arr: [ 1, 2, 3 ] });
        assert.deepEqual(result[2], { element: 3, index: 2, arr: [ 1, 2, 3 ] });
    });

});