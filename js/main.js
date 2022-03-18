// calcu html const
const historyScreen = document.querySelector(".history");
const working_area = document.querySelector(".working-area");
const temp_result = document.querySelector(".temp-result");

const number = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");

const all_clear = document.querySelector(".all-clear");
const last_entity_clear = document.querySelector(".last-entity-clear");

const equal_btn = document.querySelector(".equal-btn");
// var

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// display num when clicked on working_area & Check on the Dot
number.forEach( number => {
    number.addEventListener("click",(e) => {
        // Check on the Dot
        if( e.target.innerText === '.' && !haveDot ) {
            haveDot = true;
        } else if ( e.target.innerText === '.' && haveDot ) {
            return;
        }
        // display num on working_area
        dis2Num += e.target.innerText;
        working_area.innerText = dis2Num;
    })
});

// use operation btns
operation.forEach( operation => {
    operation.addEventListener("click",(e) => {
        if( !dis2Num ) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if( dis1Num && dis2Num && lastOperation ) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
});

// save in history and temp_result || clear working_area
function clearVar( name = '' ){
    dis1Num += dis2Num + ' ' + name + ' ';
    historyScreen.innerText = dis1Num;
    working_area.innerText = '';
    dis2Num = '';
    temp_result.innerText = result;
};

// Operation
function mathOperation() {
    if( lastOperation === 'x' ) {
        result = parseFloat( result ) * parseFloat( dis2Num )
    } else if ( lastOperation === '/' ) {
        result = parseFloat( result ) / parseFloat( dis2Num )
    } else if ( lastOperation === '+' ) {
        result = parseFloat( result ) + parseFloat( dis2Num )
    } else if ( lastOperation === '-' ) {
        result = parseFloat( result ) - parseFloat( dis2Num )
    } else if ( lastOperation === '%' ) {
        result = parseFloat( result ) % parseFloat( dis2Num )
    }
};

// click on =
equal_btn.addEventListener("click",(e)=>{
    if( !dis1Num || !dis2Num ) return;
    haveDot = false;
    mathOperation();
    clearVar();
    working_area.innerText = result;
    temp_result.innerText = '';
    dis2Num = result;
    dis1Num = '';
});

// clear all fields 
all_clear.addEventListener("click",(e)=>{
    historyScreen.innerText = '0';
    working_area.innerText = '0';
    temp_result.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
});

// clear last entity only
last_entity_clear.addEventListener("click",(e)=>{
    working_area.innerText = '';
    dis2Num = '';
});


// use keyboard
window.addEventListener("keydown",(e)=>{
    if(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ){
        clickNumberElm(e.key)
    } else if(
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ){
        clickOperationElm(e.key);
    } else if ( e.key === "*" ) {
        clickOperationElm('x');
    } else if ( e.key == "Enter" || e.key == "=" ) {
        clickEqualBtnElm();
    } else if ( e.key == "Escape" ) {
        clickAllClearElm();
    } else if ( e.key == "Backspace" ) {
        clicklastEntityClearElm();
    }

});

function clickNumberElm(key){
    number.forEach( Button => {
        if( Button.innerText === key ){
            Button.click();
        }
    } )
}

function clickOperationElm(key){
    operation.forEach( Button => {
        if( Button.innerText === key ){
            Button.click();
        }
    } )
}

// enter ===> click on equal_btn
function clickEqualBtnElm(){
    equal_btn.click();
}

// Escape ===> click on all_clear
function clickAllClearElm(){
    all_clear.click();
}

// Backspace ===> click on last_entity_clear
function clicklastEntityClearElm(){
    last_entity_clear.click();
}










