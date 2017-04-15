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

    it('adapting to handle red and charmed functions', function () {
        class CircleRed {
            constructor (radius) {
                this.radius = radius;
            }
            diameter () {
                return Math.PI * 2 * this.radius;
            }
            scaleBy (factor) {
                return new CircleRed(factor * this.radius);
            }
        }

        const CircleFactoryCHARMED = (radius) =>
            new CircleRed(radius);

        CircleFactoryCHARMED(2).scaleBy(3).diameter().should.equal(37.69911184307752);

        const FactoryFactoryBLUE = (clazz) =>
            (...args) =>
                new clazz(...args);

        assert.deepEqual([1, 2, 3, 4, 5].map(FactoryFactoryBLUE(CircleRed)),
            [{"radius":1},{"radius":2},{"radius":3},{"radius":4},{"radius":5}]);

    });

});

describe('Con Panna: Composing Class Behaviour', function () {
    it('the object mixin pattern', function () {
        class Todo {
            constructor (name) {
                this.name = name || 'Untitled';
                this.done = false;
            }
            do () {
                this.done = true;
                return this;
            }
            undo () {
                this.done = false;
                return this;
            }
        }

        const Coloured = {
            setColourRGB ({r, g, b}) {
                this.colourCode = {r, g, b};
                return this;
            },
            getColourRGB () {
                return this.colourCode;
            }
        };

        Object.assign(Todo.prototype, Coloured);

        assert.deepEqual
        (new Todo('test').setColourRGB({r: 1, g: 2, b: 3}).getColourRGB(),
        {"r":1,"g":2,"b":3});

    });
    it('functional Mixins', function () {
        class Todo {
            constructor (name) {
                this.name = name || 'Untitled';
                this.done = false;
            }
            do () {
                this.done = true;
                return this;
            }
            undo () {
                this.done = false;
                return this;
            }
        }

        const FunctionalMixin = (behaviour) =>
            target => Object.assign(target, behaviour);


        const Coloured = FunctionalMixin({
            setColourRGB ({r, g, b}) {
                this.colourCode = {r, g, b};
                return this;
            },
            getColourRGB () {
                return this.colourCode;
            }
        });

        Coloured(Todo.prototype);

        assert.deepEqual
        (new Todo('test').setColourRGB({r: 1, g: 2, b: 3}).getColourRGB(),
            {"r":1,"g":2,"b":3});
    });

    it('Symbol() delete conflicts of properties', function () {
        class Person {
            constructor (first, last) {
                this.rename(first, last);
            }
            fullName () {
                return this.firstName + " " + this.lastName;
            }
            rename (first, last) {
                this.firstName = first;
                this.lastName = last;
                return this;
            }
        };

        const IsAuthor = (function () {
            const books = Symbol();

            return {
                addBook (name) {
                    this.books().push(name);
                    return this;
                },
                books () {
                    return this[books] || (this[books] = []);
                }
            };
        })();

        const IsBibliophile = (function () {
            const books = Symbol();

            return {
                addToCollection (name) {
                    this.collection().push(name);
                    return this;
                },
                collection () {
                    return this[books] || (this[books] = []);
                }
            };
        })();

        class BookLovingAuthor extends Person {
        }

        Object.assign(BookLovingAuthor.prototype, IsBibliophile, IsAuthor);

        let bookLoving = new BookLovingAuthor('Isaac', 'Asimov')
            .addBook('I Robot')
            .addToCollection('The Mysterious Affair at Styles');

        assert.deepEqual(bookLoving.collection()[0],"The Mysterious Affair at Styles");
        assert.deepEqual(bookLoving.books()[0],"I Robot");
    });

    it('using symbols to reduce coupled properties', function () {
        class Person {
            constructor (first, last) {
                this.rename(first, last);
            }
            fullName () {
                return this.firstName + " " + this.lastName;
            }
            rename (first, last) {
                this.firstName = first;
                this.lastName = last;
                return this;
            }
        }

        class Bibliophile extends Person {
            constructor (first, last) {
                super(first, last);
                this._books = [];
            }
            addToCollection (name) {
                this._books.push(name);
                return this;
            }
            hasInCollection (name) {
                return this._books.indexOf(name) >= 0;
            }
        }

        class BookGlutten extends Bibliophile {
            buyInBulk (...names) {
                this.books().push(...names);
                return this;
            }
        }

        const BibliophilePrivate = (function () {
            const books = Symbol("books");

            return class BibliophilePrivate extends Person {
                constructor (first, last) {
                    super(first, last);
                    this[books] = [];
                }
                addToCollection (name) {
                    this[books].push(name);
                    return this;
                }
                hasInCollection (name) {
                    return this[books].indexOf(name) >= 0;
                }
            }
        })();


        class BookGluttenPrivate extends BibliophilePrivate {
            buyInBulk (...names) {
                for (let name of names) {
                    this.addToCollection(name);
                }
                return this;
            }
        }

        const bezos1 = new BookGlutten('jeff', 'bezos');
        const bezos2 = new BookGluttenPrivate('jeff', 'bezos');

        expect(bezos1).to.have.property('_books');
        expect(bezos2).not.to.have.property('_books');
    });
    
});

describe('more decorators', function () {
    it('why musician is {}', function () {
        const once = (fn) => {
            let hasRun = false;

            return function (...args) {
                if (hasRun) return;
                hasRun = true;
                return fn.apply(this, args);
            }
        };

        class Person {
            setName (first, last) {
                this.firstName = first;
                this.lastName = last;
                return this;
            }
            fullName () {
                return this.firstName + " " + this.lastName;
            }
        }

        Object.defineProperty(Person.prototype, 'setName',
            { value: once(Person.prototype.setName) });


        const logician = new Person()
            .setName('Raymond', 'Smullyan');

        const musician = new Person();
        musician.setName('Raymond', 'Smullyan');

        assert.deepEqual(musician, {});
        assert.deepEqual(logician,
            {
            "firstName": "Raymond",
            "lastName": "Smullyan"
        });

    });

    it('decorator stateful', function () {
        const once = (fn) => {
            let invocations = new WeakSet();

            return function (...args) {
                if (invocations.has(this)) return;
                invocations.add(this);
                return fn.apply(this, args);
            }
        };

        class Person {
            setName (first, last) {
                this.firstName = first;
                this.lastName = last;
                return this;
            }
            fullName () {
                return this.firstName + " " + this.lastName;
            }
        }

        Object.defineProperty(Person.prototype, 'setName',
            { value: once(Person.prototype.setName) });


        const logician = new Person()
            .setName('Raymond', 'Smullyan');

        logician.setName('Haskell', 'Curry');

        const musician = new Person()
            .setName('Miles', 'Davis');


        logician.fullName().should.equal('Raymond Smullyan');
        musician.fullName().should.equal('Miles Davis');

        assert.deepEqual(musician, {
            "firstName": "Miles",
            "lastName": "Davis"
        });
        assert.deepEqual(logician,
            {
                "firstName": "Raymond",
                "lastName": "Smullyan"
            });

    });

});

describe('More Decorator Recipes', function () {
    it('undo', function () {
        const firstName = Symbol('firstName'),
            lastName = Symbol('lastName'),
            undoStack = Symbol('undoStack'),
            redoStack = Symbol('redoStack');

        class Person {
            constructor (first, last) {
                this[firstName] = first;
                this[lastName] = last;
            }

            fullName () {
                return this[firstName] + " " + this[lastName];
            }

            rename (first, last) {
                this[undoStack] || (this[undoStack] = []);
                this[undoStack].push({
                    [firstName]: this[firstName],
                    [lastName]: this[lastName]
                });
                this[firstName] = first;
                this[lastName] = last;
                return this;
            }

            undo () {
                this[undoStack] || (this[undoStack] = []);
                let oldState = this[undoStack].pop();

                if (oldState != null) Object.assign(this, oldState);
                return this;
            }
        };

        const b = new Person('barak', 'obama');

        b.rename('Jonay', 'Godoy');
        b.fullName().should.equal('Jonay Godoy');

        b.undo();
        b.fullName().should.equal('barak obama');
    });

});