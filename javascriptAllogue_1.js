'use strict';


let should = require('chai').should();
let assert = require('chai').assert;
let expect = require('chai').expect;


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
        expect((() => {})()).to.be.undefined;
        expect(undefined).to.be.undefined;
        expect(void(0)).to.be.undefined;
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

    it('parseInt() not behavior parseFloat()', function () {
        assert.deepEqual(['1', '2', '3'].map(parseInt),[1,NaN,NaN]);
    });

    it('How work tap? not return function but call and return parameter', function () {
        const tap = (value) =>
            (fn) => (
                typeof(fn) === 'function' && fn(value),
                    value
            );

        var isExecute = "";
        tap('espresso')((it) => {
            isExecute = `Our drink is '${it}'`;
        });
        isExecute.should.equal("Our drink is 'espresso'");

        tap('espresso')().should.equal('espresso');
    });

    it('maybe', function () {
        const maybe = (fn) =>
            function (...args) {
                if (args.length === 0) {
                    return
                }
                else {
                    for (let arg of args) {
                        if (arg == null) return;
                    }
                    return fn.apply(this, args)
                }
            }


        maybe((a, b, c) => a + b + c)(1, 2, 3).should.equal(6);


        expect(maybe((a, b, c) => a + b + c)(1, null, 3)).to.be.undefined;
    });

    it('once function', function () {
        const once = (fn) => {
            let done = false;

            return function () {
                return done ? void 0 : ((done = true), fn.apply(this, arguments))
            }
        }

        const askedOnBlindDate = once(
            () => "sure, why not?"
        );

        askedOnBlindDate().should.equal('sure, why not?');

        expect(askedOnBlindDate()).to.be.undefined;
        expect(askedOnBlindDate()).to.be.undefined;


    });

    it('fake once not save state for learning how work once', function () {

        function once(fn){
            let done = false;

            return function () {
                return done ? void 0 : ((done = true), fn.apply(this, arguments))
            }
        }

      once(() => "sure, why not?")().should.equal('sure, why not?');
      once(() => "sure, why not?")().should.equal('sure, why not?');
    });

    it('left-Variadic Functions', function () {

        function* abccc(a, b, ...c) {
            yield a;
            yield b;
            yield c;
        };

        let iterator = abccc(1, 2, 3, 4, 5);

        iterator.next().value.should.equal(1);
        iterator.next().value.should.equal(2);
        assert.deepEqual(iterator.next().value, [3,4,5]);

    });

    it('left-Variadic Functions example', function () {
        function team(coach, captain, ...players) {
            let arrayTeam = []

            arrayTeam.push(`${captain} (captain)`);
            for (let player of players) {
                arrayTeam.push(player);
            }
            arrayTeam.push(`squad coached by ${coach}`);
            return arrayTeam;
        }

        let arrayTeamReference = ["Xavi Hernández (captain)","Marc-André ter Stegen","" +
        "Martín Montoya","Gerard Piqué","squad coached by Luis Enrique"];

        assert.deepEqual(team('Luis Enrique', 'Xavi Hernández', 'Marc-André ter Stegen',
            'Martín Montoya', 'Gerard Piqué'),arrayTeamReference);

    });

    it('left-variadic destructuring', function () {
        const [first, ...butFirst] = ['why', 'hello', 'there', 'little', 'droid'];

        first.should.equal("why");
        assert.deepEqual(butFirst, ["hello","there","little","droid"]);
    });

    it('variadic compose and recursion', function () {
        const addOne = (number) => number + 1;
        const removeTwo = (number) => number - 2;
        const doubleOf = (number) => number * 2;
        const quaterOf = (number) => number / 4;

        const compose = (a, ...rest) =>
            rest.length === 0
                ? a
                : (c) => a(compose(...rest)(c))

        compose(addOne, removeTwo, doubleOf, quaterOf)(20).should.equal(9);
    });

    it('variadic compose iterative', function () {
        const addOne = (number) => number + 1;
        const removeTwo = (number) => number - 2;
        const doubleOf = (number) => number * 2;
        const quaterOf = (number) => number / 4;

        const compose = (...fns) =>
            (value) =>
                fns.reverse().reduce((acc, fn) => fn(acc), value);

        compose(removeTwo, addOne, quaterOf, doubleOf, addOne)(10).should.equal(4.5);
    });

    it('pipiline', function () {

        const addOne = (number) => number + 1;
        const removeTwo = (number) => number - 2;
        const doubleOf = (number) => number * 2;
        const quaterOf = (number) => number / 4;

        const pipeline = (...fns) =>
            (value) =>
                fns.reduce((acc, fn) => fn(acc), value);

        pipeline(addOne, removeTwo, doubleOf, quaterOf)(20).should.equal(9.5);
    });
});

describe('Picking the Bean: Choice and Truthiness', function () {
    it('truthiness and the ternary operator', function () {
        let first = true;
        (first ? "second" : "third").should.equal("second");
    });

    it('truthiness and operators', function () {
        (!5).should.equal(false);
        (!undefined).should.equal(true);
        (!!("something")).should.equal(true);
        (!!(void(0))).should.equal(false);
    });

    it('operators do not operate strictly on logical values, and they do not commute', function () {
        (1 || 2).should.equal(1);
        expect(null && undefined).to.be.null;
        expect(undefined && null).to.be.undefined;
    });

    it('control-flow operators', function () {
        const even = (n) =>
        n === 0 || (n !== 1 && even(n - 2))

        even(42).should.equal(true);
    });

    it('Function invocation uses eager evaluation,' +
        ' so if we need to roll our own control-flow semantics, ' +
        'we pass it functions, not expressions', function () {

        const or = (a, b) => a() || b()

        const and = (a, b) => a() && b()

        const even = (n) =>
            or(() => n === 0, () => and(() => n !== 1, () => even(n - 2)))

        even(7).should.equal(false);
    });

    it('In contrast to the behaviour of the ternary operator,' +
        ' and , function parameters are always eagerly evaluated', function () {
        const or = (a, b) => a || b

        const and = (a, b) => a && b

        const even = (n) =>
            or(n === 0, and(n !== 1, even(n - 2)))

        expect(even.bind(even,42)).to.throw("Maximum call stack size exceeded");
    });
});

describe('Composing and Decomposing Data', function () {

    it('Array are not equals', function () {
        expect([] === []).to.be.false;


        expect([2 + 2] === [2 + 2]).to.be.false

        const array_of_one = () => [1];
        expect(array_of_one() === array_of_one()).to.be.false;
    });

    it('we can actually reverse the statement', function () {
        const unwrap = (wrapped) => {
            const [something] =  wrapped;
            return something;
        };

        unwrap(["present"]).should.equal("present");
    });

});