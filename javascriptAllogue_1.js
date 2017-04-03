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
        };

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
            let arrayTeam = [];

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
        n === 0 || (n !== 1 && even(n - 2));

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
        const or = (a, b) => a || b;

        const and = (a, b) => a && b;

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

    it('destructures the array name', function () {
        const surname = (name) => {
            const [first, second] = name;

            return second;
        };

        surname(["Reginald", "Braithwaite",""]).should.equal("Braithwaite");
    });

    it('Destructuring can nest', function () {
        const description = (nameAndOccupation) => {
            const [[first, last], occupation] = nameAndOccupation;

            return `${first} is a ${occupation}`;
        }

        description([["Reginald", "Braithwaite"], "programmer"]).should.equal("Reginald is a programmer");
    });

    it('Extracting the head and gathering everything', function () {
        const [car, ...cdr] = [1, 2, 3, 4, 5];

        car.should.equal(1);

        assert.deepEqual(cdr,[2,3,4,5]);
    });

    it('spreading, Now I not need concat()', function () {
        const oneTwoThree = ["one", "two", "three"];

        assert.deepEqual(["zero", ...oneTwoThree],["zero","one","two","three"] );
    });

    it('JavaScript tries its best to assign things', function () {
        const [what] = [];
        expect(what).to.be.undefined;

        const [why, How, who] = ["duck feet", "tiger tail"];
        expect(who).to.be.undefined;

        const [...they] = [];
        assert.deepEqual(they,[]);

        const [which, when, ...their] = ["duck feet", "tiger tail"];
        assert.deepEqual(their,[]);
    });

    it('A function can return several things at once, like a value and an error code', function () {
        const description = (nameAndOccupation) => {
            if (nameAndOccupation.length < 2) {
                return ["", "occupation missing"]
            }
            else {
                const [[first, last], occupation] = nameAndOccupation;

                return [`${first} is a ${occupation}`, "ok"];
            }
        }

        const [reg, status] = description([["Reginald", "Braithwaite"], "programmer"]);

        reg.should.equal("Reginald is a programmer");

        status.should.equal("ok");
    });

    it('destructuring parameters. if seems array...', function () {

        function bar(name){return name}
        expect(bar("smaug") === ["smaug"][0]).to.be.true;

        const numbers = (...nums) => nums;

        assert.deepEqual(numbers(1, 2, 3, 4, 5),[1,2,3,4,5]);
    });

    it('Consists of an element concatenated with a list', function () {
        assert.deepEqual([],[]);
        assert.deepEqual(["baz", ...[]],["baz"]);
        assert.deepEqual(["bar", ...["baz"]],["bar","baz"]);
        assert.deepEqual(["foo", ...["bar", "baz"]],["foo","bar","baz"]);
    });

    it('Array is Empty', function () {
        const isEmpty = ([first, ...rest]) => first === undefined;

        expect(isEmpty([])).to.be.true;
        expect(isEmpty([1])).to.be.false;
        expect(isEmpty([[]])).to.be.false;
    });

    it('linear recursion, example', function () {
        const flatten = ([first, ...rest]) => {
            if (first === undefined) {
                return [];
            }
            else if (!Array.isArray(first)) {
                return [first, ...flatten(rest)];
            }
            else {
                return [...flatten(first), ...flatten(rest)];
            }
        };

        assert.deepEqual(flatten(["foo", [3, 4, []]]),["foo",3,4]);
        assert.deepEqual(...([[]]),[]);
    });

    it('we can identify the terminal condition,' +
        ' the piece being broken off, and recomposing the solution.', function () {
        const mapWith = (fn, [first, ...rest]) =>
            first === undefined
                ? []
                : [fn(first), ...mapWith(fn, rest)];

        assert.deepEqual(mapWith((x) => x * x, [1, 2, 3, 4, 5]),[1,4,9,16,25]);

        assert.deepEqual(mapWith((x) => !!x, [null, true, 25, false, "foo"]),[false,true,true,false,true]);
    });

    it('We catenate the square of each element to the result of applying to the rest of the elements', function () {
        const sumSquaresConcatenated = ([first, ...rest]) => first === undefined
            ? 0
            : first * first + sumSquaresConcatenated(rest);

        sumSquaresConcatenated([1, 2, 3, 4, 5]).should.equal(55);
    });

    it('folding', function () {
        const foldWith = (fn, terminalValue, [first, ...rest]) =>
            first === undefined
                ? terminalValue
                : fn(first, foldWith(fn, terminalValue, rest));

        const squareAll1 = (array) => foldWith((first, rest) => [first * first, ...rest], [], array);

        assert.deepEqual(squareAll1([1, 2, 3, 4, 5]),[1,4,9,16,25])


        const mapWith = (fn, array) => foldWith((first, rest) => [fn(first), ...rest], [
        ], array),squareAll2 = (array) => mapWith((x) => x * x, array);

        assert.deepEqual(squareAll2([1, 2, 3, 4, 5]),[1,4,9,16,25])
    });

    it('default argument', function () {
        const factorial = (n, work = 1) =>
            n === 1
                ? work
                : factorial(n - 1, n * work);

        factorial(1).should.equal(1);
        factorial(6).should.equal(720);
    });

    it('destructuring assignments', function () {
        const [first, second = "two"] = ["one"];
        first.should.equal("one");
        second.should.equal("two");

        const [first2, second2 = "two"] = ["primus", "secundus"];
        first2.should.equal("primus");
        second2.should.equal("secundus")
    });

    it('literal object syntax', function () {
        const user = {
            name: { first: "Reginald",
                last: "Braithwaite"
            },
            occupation: { title: "Author",
                responsibilities: [ "JavaScript Allongé",
                    "JavaScript Spessore",
                    "CoffeeScript Ristretto"
                ]
            }
        };

        const {name: { first: given, last: surname}, occupation: { title: title } } = user;

        surname.should.equal("Braithwaite");
        title.should.equal("Author");
    });

    it('destructure parameters', function () {
        const user = {
            name: { first: "Reginald",
                last: "Braithwaite"
            },
            occupation: { title: "Author",
                responsibilities: [ "JavaScript Allongé",
                    "JavaScript Spessore",
                    "CoffeeScript Ristretto"
                ]
            }
        };

        const description = ({name: { first }, occupation: { title } }) =>
            `${first} is a ${title}`;

        description(user).should.equal("Reginald is a Author");
    });

    it('reverse', function () {
        const EMPTY = {};
        const OneTwoThree = { first: 1, rest: { first: 2, rest: { first: 3, rest: EMPTY } } };

        const reverse = (node, delayed = EMPTY) =>
            node === EMPTY
                ? delayed
                : reverse(node.rest, { first: node.first, rest: delayed });

        assert.deepEqual(reverse(OneTwoThree), {"first":3,"rest":{"first":2,"rest":{"first":1,"rest":{}}}});
    });

    it('it iterates over the entire list twice', function () {
        const EMPTY = {};
        const OneTwoThree = { first: 1, rest: { first: 2, rest: { first: 3, rest: EMPTY } } };

        const reverse = (node, delayed = EMPTY) =>
            node === EMPTY
                ? delayed
                : reverse(node.rest, { first: node.first, rest: delayed });

        const mapWith = (fn, node, delayed = EMPTY) =>
            node === EMPTY
                ? reverse(delayed)
                : mapWith(fn, node.rest, { first: fn(node.first), rest: delayed });

        assert.deepEqual(mapWith((x) => x * x, OneTwoThree), {"first":1,"rest":{"first":4,"rest":{"first":9,"rest":{}}}});
    });

    it('mutation', function () {
        const oneTwoThree = [1, 2, 3];
        oneTwoThree[3] = 'four';
        assert.deepEqual(oneTwoThree, [ 1, 2, 3, 'four' ]);
    });

    it('declaration vs mutation', function () {
        const allHallowsEve = [2012, 10, 31];
        (function (halloween) {
            halloween = [2013, 10, 31];
        })(allHallowsEve);
        assert.deepEqual(allHallowsEve, [2012, 10, 31]);

        const allHallowsEve1 = [2012, 10, 31];
        (function (halloween1) {
            halloween1[0] = 2014;
        })(allHallowsEve1);
        assert.deepEqual(allHallowsEve1, [2014, 10, 31]);
    });

    it('copy with mutation', function () {
        const EMPTY = {};
        const OneTwoThree = { first: 1, rest: { first: 2, rest: { first: 3, rest: EMPTY } } };

        const copy = (node, head = null, tail = null) => {
            if (node === EMPTY) {
                return head;
            }
            else if (tail === null) {
                const { first, rest } = node;
                const newNode = { first, rest };
                return copy(rest, newNode, newNode);
            }
            else {
                const { first, rest } = node;
                const newNode = { first, rest };
                tail.rest = newNode;
                return copy(node.rest, head, newNode);
            }
        }

        let copyOfOneTwoThree = copy(OneTwoThree);
        OneTwoThree.first = 3;

        assert.notDeepEqual(copyOfOneTwoThree, OneTwoThree);
    });

    it('var hoists the declaration, but not the assignment', function () {
        const factorial = (n) => {

            return innerFactorial(n, 1);

            var innerFactorial = function innerFactorial (x, y) {
                if (x == 1) {
                    return y;
                }
                else {
                    return innerFactorial(x-1, x * y);
                }
            }
        }

        expect(factorial.bind(factorial, 4)).throw("innerFactorial is not a function");

        const factorial2 = (n) => {

            var innerFactorial = function innerFactorial (x, y) {
                if (x == 1) {
                    return y;
                }
                else {
                    return innerFactorial(x-1, x * y);
                }
            }

            return innerFactorial(n, 1);
        }

        factorial2(4).should.equal(24);

    });

    it('var i Omnipresence', function () {
        var introductions = [],
            names = ['Karl', 'Friedrich', 'Gauss'];

        for (var i = 0; i < 3; i++) {
            introductions[i] = (soAndSo) =>
                `Hello, ${soAndSo}, my name is ${names[i]}`
        }

        introductions[1]('Raganwald').should.equal("Hello, Raganwald, my name is undefined");

        let array = [];
        for(var i = 0; i < 5; i++){
            array[i] = () => i;
        }

        array[1]().should.equal(5);
        array[4]().should.equal(5);

    });

    it('let i is human', function () {
        var introductions = [],
            names = ['Karl', 'Friedrich', 'Gauss'];

        for (let i = 0; i < 3; i++) {
            introductions[i] = (soAndSo) =>
                `Hello, ${soAndSo}, my name is ${names[i]}`
        }

        introductions[1]('Raganwald').should.equal("Hello, Raganwald, my name is Friedrich");

        let array = [];
        for(var i = 0; i < 5; i++){
            ((i) => {
                array[i] = () => i;
            })(i);
        }

        array[1]().should.equal(1);
        array[4]().should.equal(4);
    });

    it('Tortoise and Hare - an algorithm to detect a loop in a linked list, in constant space', function () {
        const EMPTY = null;

        const isEmpty = (node) => node === EMPTY;

        const pair = (first, rest = EMPTY) => ({first, rest});

        const list = (...elements) => {
            const [first, ...rest] = elements;

            return elements.length === 0
                ? EMPTY
                : pair(first, list(...rest))
        }

        const forceAppend = (list1, list2) => {
            if (isEmpty(list1)) {
                return "FAIL!"
            }
            if (isEmpty(list1.rest)) {
                list1.rest = list2;
            }
            else {
                forceAppend(list1.rest, list2);
            }
        }

        const tortoiseAndHare = (aPair) => {
            let tortoisePair = aPair,
                harePair = aPair.rest;

            while (true) {
                if (isEmpty(tortoisePair) || isEmpty(harePair)) {
                    return false;
                }
                if (tortoisePair.first === harePair.first) {
                    return true;
                }

                harePair = harePair.rest;

                if (isEmpty(harePair)) {
                    return false;
                }
                if (tortoisePair.first === harePair.first) {
                    return true;
                }

                tortoisePair = tortoisePair.rest;
                harePair = harePair.rest;
            }
        };

        const aList = list(1, 2, 3, 4, 5);

        expect(tortoiseAndHare(aList)).to.be.false;
        forceAppend(aList, aList.rest.rest);
        expect(tortoiseAndHare(aList)).to.be.true;

        const aList2 = list(2, 2, 2);
        expect(tortoiseAndHare(aList2)).to.be.true;

    });

    it('teleporting turtle, compare references not values', function () {
        const EMPTY = null;

        const isEmpty = (node) => node === EMPTY;

        const pair = (first, rest = EMPTY) => ({first, rest});

        const list = (...elements) => {
            const [first, ...rest] = elements;

            return elements.length === 0
                ? EMPTY
                : pair(first, list(...rest))
        };

        const forceAppend = (list1, list2) => {
            if (isEmpty(list1)) {
                return "FAIL!"
            }
            if (isEmpty(list1.rest)) {
                list1.rest = list2;
            }
            else {
                forceAppend(list1.rest, list2);
            }
        };

        const teleportingTurtle = (list) => {
            let speed = 1,
                rabbit = list,
                turtle = rabbit;

            while (true) {
                for (let i = 0; i <= speed; i += 1) {
                    rabbit = rabbit.rest;
                    if (rabbit == null) {
                        return false;
                    }
                    if (rabbit === turtle) {
                        return true;
                    }
                }
                turtle = rabbit;
                speed *= 2;
            }
            return false;
        };

        const aList = list(2, 2, 2,2,2);

        expect(teleportingTurtle(aList)).to.be.false;
        forceAppend(aList, aList.rest.rest);
        expect(teleportingTurtle(aList)).to.be.true;
    });

    it('The function doesnt care what kind of data structure we have, as long as its foldable. ' +
        'i understanding callLeft and callRight', function () {

        const callRight = (fn, ...args) =>
            (...remainingArgs) =>
                fn(...remainingArgs, ...args);

        const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
            first === undefined
                ? terminalValue
                : fn(first, foldArrayWith(fn, terminalValue, rest));

        const foldArray = (array) => callRight(foldArrayWith, array);

        const sumFoldable = (folder) => folder((a, b) => a + b, 0);

        sumFoldable(foldArray([1, 4, 9, 16, 25])).should.equal(55);

        const arraySum = (array) => (sumFoldable(foldArray(array)));

        arraySum([1, 4, 9, 16, 25]).should.equal(55);

    });

    it('experiment, create foldArrayWithout', function () {
        const callRight = (fn, ...args) =>
            (...remainingArgs) =>
                fn(...remainingArgs, ...args);

        const foldArrayWithout = (fn, terminalValue, first, ...rest) =>
            first === undefined
                ? terminalValue
                :  fn(first, foldArrayWithout(fn, terminalValue, ...rest));

        const foldNumber = (...number) => callRight(foldArrayWithout, ...number);

        const sumFoldable = (folder) => folder((a, b) => a + b, 0);

        sumFoldable(foldNumber(1, 4, 9, 16, 25)).should.equal(55);

        const sum = (...args) => (sumFoldable(foldNumber(...args)));

        sum(1, 4, 9, 16, 25).should.equal(55);
    });

    it('extract fuctions of loop', function () {
        const arrayIterator = (array) => {
            let i = 0;

            return () => {
                const done = i === array.length;

                return {
                    done,
                    value: array[i++]
                }
            }
        }

        const iteratorSum = (iterator) => {
            let eachIteration,
                sum = 0;

            while ((eachIteration = iterator(), !eachIteration.done)) {
                sum += eachIteration.value;
            }
            return sum;
        }

        iteratorSum(arrayIterator([1, 4, 9, 16, 25])).should.equal(55);

    });

    it('we can write a different iterator for a different data structure, iterator', function () {
        const EMPTY = null;

        const isEmpty = (node) => node === EMPTY;

        const pair = (first, rest = EMPTY) => ({first, rest});

        const list = (...elements) => {
            const [first, ...rest] = elements;

            return elements.length === 0
                ? EMPTY
                : pair(first, list(...rest))
        }

        const print = (aPair) =>
            isEmpty(aPair)
                ? ""
                : `${aPair.first} ${print(aPair.rest)}`

        const listIterator = (aPair) =>
            () => {
                const done = isEmpty(aPair);
                if (done) {
                    return {done};
                }
                else {
                    const {first, rest} = aPair;

                    aPair = aPair.rest;
                    return { done, value: first }
                }
            }

        const iteratorSum = (iterator) => {
            let eachIteration,
                sum = 0;;

            while ((eachIteration = iterator(), !eachIteration.done)) {
                sum += eachIteration.value;
            }
            return sum
        }

        const aListIterator = listIterator(list(1, 4, 9, 16, 25));

        iteratorSum(aListIterator).should.equal(55);
    });

    it('experiment, create iterator tree sum', function () {
        const arrayIterator = (array) => {
            let i = 0;

            return () => {
                const done = i === array.length;

                return {
                    done,
                    value: done ? undefined : array[i++]
                }
            }
        };

        const flattenArray = (array) => {
            for(let i = 0; i < array.length;i++){
                if(Array.isArray(array[i])){
                    let temp = array[i];
                    array.splice(i, 1);
                    array = (array.concat(temp))
                }
            }
            return array;
        };

        const treeIterator = (array) => (arrayIterator(flattenArray(array)));

        const iteratorSum = (iterator) => {
            let eachIteration,
                sum = 0;

            while ((eachIteration = iterator(), !eachIteration.done)) {
                sum += eachIteration.value;
            }
            return sum
        };

        const aTreeArrayIterator = treeIterator([1, [4, [9, [16, 25]]]]);

        assert.deepEqual(flattenArray([1, [4, [9, [16, 25]]]]),[1,4,9,16,25]);
        iteratorSum(aTreeArrayIterator).should.equal(55);

    });

    it('simple iterator', function () {
        const NumberIterator = (number = 0) =>
            () => ({ done: false, value: number++ });

        let fromOne = NumberIterator(1);

        fromOne().value.should.equal(1);
        fromOne().value.should.equal(2);
        fromOne().value.should.equal(3);
        fromOne().value.should.equal(4);
        fromOne().value.should.equal(5);
    });

    it('kestrel, idiot bird, kestrel + idiot bird', function () {
        const K = (x) => (y) => x;

        const fortyTwo = K(42);

        fortyTwo("Hello").should.equals(42);

        const I = (x) => (x);

        I(42).should.equal(42);

        K(I)("first")("second").should.equal("second");
    });

    it('Vireo', function () {
        const K = (x) => (y) => x;
        const I = (x) => (x);

        const first = K,
            second = K(I),
            vireo = (x) => (y) => (c) => c(x)(y);

        const latin = vireo("primus")("secundus");

        latin(first).should.equal("primus");
        latin(second).should.equal("secundus");
    });

    it('linked list of functions', function () {
        const K = (x) => (y) => x,
                I = (x) => (x),
                V = (x) => (y) => (c) => c(x)(y);

        const first = K,
            rest  = K(I),
            pair = V,
            EMPTY = (() => {});

        const l123 = pair(1)(pair(2)(pair(3)(EMPTY)));

        l123(first).should.equal(1);
        l123(rest)(first).should.equal(2);
        l123(rest)(rest)(first).should.equal(3);
    });

    it('iterating linked list of functions', function () {
        const K = (x) => (y) => x,
            I = (x) => (x),
            V = (x) => (y) => (c) => c(x)(y);


        const pairFirst = K,
            pairRest  = K(I),
            pair = V;

        const first = (list) => list(
            () => "ERROR: Can't take first of an empty list",
            (aPair) => aPair(pairFirst)
        );

        const rest = (list) => list(
            () => "ERROR: Can't take first of an empty list",
            (aPair) => aPair(pairRest)
        );

        const length = (list) => list(
            () => 0,
            (aPair) => 1 + length(aPair(pairRest))
        );


        const print = (list) => list(
            () => "",
            (aPair) => `${aPair(pairFirst)} ${print(aPair(pairRest))}`
        );


        const EMPTYLIST = (whenEmpty, unlessEmpty) => whenEmpty();

        const node = (x) => (y) =>
            (whenEmpty, unlessEmpty) => unlessEmpty(pair(x)(y));

        const l123 = node(1)(node(2)(node(3)(EMPTYLIST)));

        print(l123).should.equals("1 2 3 ");

    });
    
});

describe('Recipes with Data', function () {
    it('concat objects with Object.assign', function () {
        const inventory = {
            apples: 12,
            oranges: 12
        };

        const shipment = {
            bananas: 54,
            pears: 24
        }

        let newObject = Object.assign(inventory, shipment);

        assert.include(newObject, inventory);
        assert.include(newObject, shipment);
    });

    it('quasi-literals', function () {
        const greeting = (name) => `Hello my name is ${name}`;
        greeting('Arthur Dent').should.equal("Hello my name is Arthur Dent");
    });

    it('three basic operations with data structure', function () {
        const stack = (() => {
            const obj = {
                array: [],
                index: -1,
                push (value) {
                    return obj.array[obj.index += 1] = value
                },
                pop () {
                    const value = obj.array[obj.index];

                    obj.array[obj.index] = undefined;
                    if (obj.index >= 0) {
                        obj.index -= 1
                    }
                    return value
                },
                isEmpty () {
                    return obj.index < 0
                }
            };

            return obj;
        })();

        expect(stack.isEmpty()).to.be.true;
        stack.push('hello').should.equal("hello");
        stack.push('JavaScript').should.equal("JavaScript");
        expect(stack.isEmpty()).to.be.false;
        stack.pop().should.equal("JavaScript");
        stack.pop().should.equal("hello");
        expect(stack.isEmpty()).to.be.true;
    });

    it('Here’s an abstract “model” that supports undo and redo composed from a pair of stacks ', function () {
        const shallowCopy = (source) => {
            const dest = {};

            for (let key in source) {
                dest[key] = source[key]
            }
            return dest
        };

        const Stack = () => {
            const array = [];
            let index = -1;

            return {
                push (value) {
                    array[index += 1] = value
                },
                pop () {
                    let value = array[index];
                    if (index >= 0) {
                        index -= 1
                    }
                    return value
                },
                isEmpty () {
                    return index < 0
                }
            }
        }

        const Model = function (initialAttributes) {
            const redoStack = Stack();
            let attributes = shallowCopy(initialAttributes || {});

            const undoStack = Stack(),
                obj = {
                    set: (attrsToSet) => {
                        undoStack.push(shallowCopy(attributes));
                        if (!redoStack.isEmpty()) {
                            redoStack.length = 0;
                        }
                        for (let key in (attrsToSet || {})) {
                            attributes[key] = attrsToSet[key]
                        }
                        return obj
                    },
                    undo: () => {
                        if (!undoStack.isEmpty()) {
                            redoStack.push(shallowCopy(attributes));
                            attributes = undoStack.pop()
                        }
                        return obj
                    },
                    redo: () => {
                        if (!redoStack.isEmpty()) {
                            undoStack.push(shallowCopy(attributes));
                            attributes = redoStack.pop()
                        }
                        return obj
                    },
                    get: (key) => attributes[key],
                    has: (key) => attributes.hasOwnProperty(key),
                    attributes: () => shallowCopy(attributes)
                };
            return obj
        };

        const model = Model();
        model.set({"Doctor": "de Grasse"});
        model.set({"Doctor": "Who"});
        model.get("Doctor").should.equal("Who");
        model.undo();
        model.get("Doctor").should.equal("de Grasse");
        model.redo();
        model.get("Doctor").should.equal("Who");
    });

    it('try copy, we can not avoid aliasing', function () {
        const Queue = () => {
            const queue = {
                array: [],
                head: 0,
                tail: -1,
                pushTail (value) {
                    return queue.array[++queue.tail] = value
                },
                pullHead () {
                    if (queue.tail >= queue.head) {
                        const value = queue.array[queue.head];

                        queue.array[queue.head] = undefined;
                        queue.head += 1;
                        return value
                    }
                },
                isEmpty () {
                    return queue.tail < queue.head;
                }
            };
            return queue
        };

        const queue = Queue();
        queue.pushTail('Hello');
        queue.pushTail('JavaScript');

        const copyOfQueue = Object.assign({}, queue);

        expect(queue !== copyOfQueue).to.be.true;

        copyOfQueue.array = [];
        for (let i = 0; i < 2; ++i) {
            copyOfQueue.array[i] = queue.array[i]
        }

        queue.pullHead().should.equal("Hello");
        copyOfQueue.pullHead().should.equal("JavaScript")
    });

    it('try copy and achieve it', function () {
        const BetterQueue = () =>
            ({
                array: [],
                head: 0,
                tail: -1,
                pushTail (value) {
                    return this.array[this.tail += 1] = value
                },
                pullHead () {
                    if (this.tail >= this.head) {
                        let value = this.array[this.head];

                        this.array[this.head] = undefined;
                        this.head += 1;
                        return value
                    }
                },
                isEmpty () {
                    return this.tail < this.head
                }
            });

        let queue = BetterQueue();
        queue.pushTail('Hello');
        queue.pushTail('JavaScript');

        const copyOfQueue = Object.assign({}, queue);

        expect(queue !== BetterQueue).to.be.true;

        copyOfQueue.array = [];
        for (let i = 0; i < 2; ++i) {
            copyOfQueue.array[i] = queue.array[i]
        }

        queue.pullHead().should.equal("Hello");
        copyOfQueue.pullHead().should.equal("Hello")
    });

    it('Have they this context?', function () {
        const someObject = {
            someFunction () {
                return this;
            }
        };
        const anotherObject = {
            someFunction: someObject.someFunction
        };
        const someFunction = someObject.someFunction;

        expect(someFunction() === someObject).to.be.false;

        expect(anotherObject.someFunction() === anotherObject).to.be.true;

        expect(anotherObject.someFunction() === someObject).to.be.false;

        expect((someObject.someFunction)() == someObject).to.be.true;

        expect(someObject['someFunction']() === someObject).to.be.true;
    });

});