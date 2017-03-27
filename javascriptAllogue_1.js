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

});