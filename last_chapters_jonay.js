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
            }

        Cake.prototype.setFlavour = fluent(Cake.prototype.setFlavour);
        Cake.prototype.setLayers = fluent(Cake.prototype.setLayers);
        Cake.prototype.bake = fluent(Cake.prototype.bake);

        const cake3 = new Cake().setFlavour('yogurt').setLayers(3).bake();
        cake3.flavour.should.equal('yogurt');
    });

});

describe('Colourful Mugs: Symmetry, Colour, and Charm', function () {


});