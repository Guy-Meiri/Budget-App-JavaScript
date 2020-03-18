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
            if (numItems > 0) {
                ID = data.allItems[type][numItems - 1].id + 1;
            } else {
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

        testing: function () {
            console.log(data);
        }
    };
})();

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: ".add__btn",
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either "inc" or "exp"
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        },
        addListItem: function (obj, type) {

            var html, newHtml, element;
            //create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        },
        clearFields: function () {
            console.log("clearing fields");
            //document.querySelector(DOMstrings.inputType).textContent = '';

            var description = document.querySelector(DOMstrings.inputDescription);
            description.value = "";

            document.querySelector(DOMstrings.inputValue).value = "";
            description.focus();
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

    var updateBudget = function () {

        //calculate the budget

        //return the budget

        //display the budget to the UI
    }

    var ctrlAddItem = function () {
        var input, newItem;
        //get the filed input data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            //clear the fields of the UI
            UICtrl.clearFields();

            //calculate and update budget
            updateBudget();
        }

    }

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();



