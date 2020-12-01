const websiteTypeSelect = document.getElementById('calculator-form-website-type');
const technologiesSelect = document.getElementById('calculator-form-technologies');
const calculatorForm = document.querySelector('.calculator-form');

const shoppingCartInputs = document.querySelectorAll('#calculator-form-shopping-cart input');
const emailReception = document.querySelectorAll('#calculator-form-email input');

const totalCostBtn = document.querySelector('.calculator-form-total-cost');

const YES_TEXT = 'yes';

let shoppingCartSelected = false;
let receptionSelected = false;

let selectedWebsitePrice = 0;
let selectedTechnologyTypePrice = 0;

let totalPrice = 0;

const SHOPPING_CART_PRICE = 300;
const RECEPTION_PRICE = 500;

const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ',',
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: 'No available options',
    itemSelectText: 'Click to select',
    classNames: {
      containerInner: 'choices__inner tech-input-container',
      input: 'choices__input',
    },
  });


addEventListeners();
setDefaultValues();
setPricesFromSelectedNames();
renderTotalPrice();

function setPricesFromSelectedNames() {
    // Reset price on calculation
    totalPrice = 0;

    if (shoppingCartSelected) {
        totalPrice = totalPrice + SHOPPING_CART_PRICE;
    }

    if (receptionSelected) {
        totalPrice = totalPrice + RECEPTION_PRICE;
    }

    if (selectedWebsitePrice) {
        totalPrice = totalPrice + (selectedWebsitePrice || 0);
    }

    if (selectedTechnologyTypePrice) {
        totalPrice = totalPrice + (selectedTechnologyTypePrice || 0);
    }
}

function renderLoadingStatus() {
    totalCostBtn.textContent = `Calculating ...`;
}

function renderTotalPrice() {
    if (totalCostBtn) {
        totalCostBtn.textContent = `${totalPrice || 0}$`;
    }
}

function setDefaultValues() {
    selectedWebsitePrice = extractPriceFromValue(websiteTypeSelect && websiteTypeSelect.value);
    updateTechnologySelect();

    shoppingCartSelected = true;
    receptionSelected = true;
}

function calculateSelectedOption(event)  {
    event.preventDefault();

    renderLoadingStatus();
    setPricesFromSelectedNames();
    setTimeout(renderTotalPrice, 500);
}

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);

    if (price) {
        return Number(price[0].slice(1)) || 0;
    }

    return 0;
}

function updateTechnologySelect() {
    if (!technologiesMultiSelect) return;

    const selectedValues = technologiesMultiSelect.getValue();
    const idsToFind = selectedValues && selectedValues.map( item => item.value);

    let totalPrice = 0;

    if (idsToFind && idsToFind.length) {
        idsToFind.forEach( fullValue => {
            totalPrice = totalPrice + extractPriceFromValue(fullValue);
        });
    }

    console.log('totalPrice: ', totalPrice);
    selectedTechnologyTypePrice = totalPrice;
}

function addEventListeners() {
    // Add event listener to form submit
    calculatorForm.addEventListener('submit', calculateSelectedOption);

    // Add event listener to website type
    websiteTypeSelect.addEventListener('change', (event) => {
        const fullValue = event.target.value;

        selectedWebsitePrice = extractPriceFromValue(fullValue);

        console.log(selectedWebsitePrice);
    });

    // Add event listener to technologies type
    technologiesSelect.addEventListener('addItem', updateTechnologySelect);
    technologiesSelect.addEventListener('removeItem', updateTechnologySelect);

    // Add listeners to radio button keys
    [...shoppingCartInputs].forEach( input => input.addEventListener('change', toggleShoppingCart));
    [...emailReception].forEach( input => input.addEventListener('change', toggleReceptionCart));


    function toggleShoppingCart(event) {
        const element = event.target;
        const selectedValue = element.value && element.value.toLowerCase();
        
        shoppingCartSelected = selectedValue === YES_TEXT; 
    }

    function toggleReceptionCart(event) {
        const element = event.target;
        const selectedValue = element.value && element.value.toLowerCase();
        
        receptionSelected = selectedValue === YES_TEXT; 
    }
}


