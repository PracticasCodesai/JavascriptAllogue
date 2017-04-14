let should = require('chai').should();
let assert = require('chai').assert;
let expect = require('chai').expect;

describe('Recipes with Constructors and Classes', () => {

    it('Fluent', function () {
        class Cake {
            setFlavour (flavour) {
                return this.flavour = flavour
            }
            setLayers (layers) {
                return this.layers = layers
            }
            bake () {
                // do some baking
            }
        }

        const cake = new Cake();
        cake.setFlavour('chocolate').should.equal('chocolate');
        cake.setLayers(3);
        cake.bake();



        class Cake1 {
            setFlavour (flavour) {
                this.flavour = flavour;
                return this;
            }
            setLayers (layers) {
                this.layers = layers;
                return this;
            }
            bake () {
                // do some baking
                return this;
            }
        }


        const cake1 = new Cake1().setFlavour('arrozConLeche').setLayers(3).bake();
        cake1.flavour.should.equal('arrozConLeche');


        const fluent = (methodBody) =>
            function (...args) {
                methodBody.apply(this, args);
                return this;
            };

        Cake.prototype.setFlavour = fluent(Cake.prototype.setFlavour);
        Cake.prototype.setLayers = fluent(Cake.prototype.setLayers);
        Cake.prototype.bake = fluent(Cake.prototype.bake);

        const cake3 = new Cake().setFlavour('yogurt').setLayers(3).bake();
        cake3.flavour.should.equal('yogurt');
    });

});

describe('Colourful Mugs: Symmetry, Colour, and Charm', function () {

    it('is that green handling works for both functional (“blue”)' +
        ' and method invocation (“yellow”) code', function () {
        const requiresFinite = (fn) =>
            (n) => {
                if (Number.isFinite(n)){
                    return fn(n);
                }
                else throw "Bad Wolf";
            };
        const plusOneBlue = x => x + 1;


        const safePlusOne = requiresFinite(plusOneBlue);

        expect(safePlusOne.bind(safePlusOne,[])).to.throw("Bad Wolf");
        safePlusOne(1).should.equal(2);


        class Circle {
            constructor (radius) {
                this.radius = radius;
            }
            diameter () {
                return Math.PI * 2 * this.radius;
            }
            scaleByYellow (factor) {
                return new Circle(factor * this.radius);
            }
        }
        const two = new Circle(2);
        Circle.prototype.scaleByYellow = requiresFinite(Circle.prototype.scaleByYellow);

        expect(two.scaleByYellow.bind(two.scaleByYellow,null)).to.throw("Bad Wolf");
        expect(two.scaleByYellow.bind(two.scaleByYellow,3)).to.throw("Cannot read property 'radius' of undefined");
    });

    it('composing functions with GREEN code', function () {
        class Circle {
            constructor (radius) {
                this.radius = radius;
            }
            diameter () {
                return Math.PI * 2 * this.radius;
            }
            scaleBy (factor) {
                return new Circle(factor * this.radius);
            }
        }

        const requiresFiniteGREEN = (fn) =>
            function (n) {
                if (Number.isFinite(n)){
                    return fn.call(this, n);
                }
                else throw "Bad Wolf";
            };


        Circle.prototype.scaleBy = requiresFiniteGREEN(Circle.prototype.scaleBy);
        const safePlusOne = requiresFiniteGREEN(x => x + 1);
        const two = new Circle(2);

        two.scaleBy(3).diameter().should.equal(37.69911184307752);

        expect(two.scaleBy.bind(two.scaleBy,"three")).to.throw("Bad Wolf");

        expect(safePlusOne.bind(safePlusOne,[])).to.throw("Bad Wolf");
        safePlusOne(1).should.equal(2);
    });

    it('problem with New.Constructors are “red” functions', function () {
        class Circle {
            constructor (radius) {
                this.radius = radius;
            }
            diameter () {
                return Math.PI * 2 * this.radius;
            }
            scaleBy (factor) {
                return new Circle(factor * this.radius);
            }
        }

        const round = new Circle(1);

        round.diameter().should.equal(6.283185307179586);

        expect(Circle.bind(Circle,2)).to.throw("Class constructor Circle " +
            "cannot be invoked without 'new'");

    });

});