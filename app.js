var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Generate a new ID
            var numItems = data.allItems[type].length;
            if(numItems > 0){
                ID = data.allItems[type][numItems -1].id + 1;
            }else{
                ID = 0;
            }
            

            //create the new item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push the new item into the data structure
            data.allItems[type].push(newItem);

            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    };
})();

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: ".add__btn"
    }
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either "inc" or "exp"
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();

var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) { //which is for older browser
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function () {
        var input, newItem;
        //get the filed input data
        input = UICtrl.getinput();

        //add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //add the item to the UI

        //calculate the budget

        //display the budget to the UI
    }

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();
