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

});