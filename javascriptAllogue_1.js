'use strict';


let should = require('chai').should();


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

});