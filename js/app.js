"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const navigation = document.querySelector(".navigation"),
          display = document.querySelector(".display"),
          time = document.querySelector(".time"),
          calcIcon = document.querySelector(".calc__icon"),
          applications = document.querySelectorAll(".app"),
          calcApp = document.querySelector(".calc__app"),
          home = document.querySelector(".home"),
          input = document.querySelector(".inputs__block input"),
          result = document.querySelector(".inputs__block .result"),
          btns = document.querySelectorAll(".buttons .btn"),
          power = document.querySelector(".power");

    // Turn on/off phone P.S: set off/on classes on display of phone
    power.addEventListener("click", e => {
        if (!power.classList.contains("power__active")) {
            power.classList.add("power__active");
            display.classList.remove("turn__off");
        } else {
            power.classList.remove("power__active");
            display.classList.add("turn__off");
        }
    })

    // Set hours
    const now = new Date();
    time.textContent = now.getHours() + ":" + now.getMinutes();

    // For open calculator
    calcIcon.addEventListener("click", (e) => {
        calcApp.classList.add("app_active");
    });

    // For skip all applications
    home.addEventListener("click", () => {
        clearDisplay(applications);
    })

    function clearDisplay(apps) {
        apps.forEach(app => {
            app.classList.remove("app_active");
        })
    }
    
    const valuesObj = {
        num1: null,
        num2: null,
        symbol: null
    }

    // On click of buttons
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("clear")) {
                input.value = 0;
                result.textContent = "";
            } else if (btn.classList.contains("plus_or_minus")) {
                forPlusOrMinus(btn);
            } else if (btn.classList.contains("num")) {
                forNumbers(btn);
            } else if (btn.classList.contains("equal")) {
                onEqual(valuesObj);
            } else {
                forSymbols(btn);
            }
        })
    })

    // For type symbols or numbers
    function forPlusOrMinus(btn) {
        if (input.value[0] == "+") {
            // input.value = input.value.slice(0, -1)
            input.value = "-" + input.value.slice(1);

        } else if (input.value[0] =="-") {
            // input.value = input.value.slice(0, -1)
            input.value = "+" + input.value.slice(1);
        } else {
            input.value = "+" + input.value;
        }
    }

    function forNumbers(btn) {
        if (input.value.length == 1 && input.value == 0) {
            input.value = +btn.value;
        } else {
            input.value += +btn.value;
        }
    }

    function forSymbols(btn) {
        if (input.value[input.value.length - 1] != btn.value) {
            if (btn.value == ".") {
                input.value += btn.value;
                // valuesObj.num1 = input.value;
            } else {
                valuesObj.num1 = input.value;
                console.log(valuesObj.num1);
                valuesObj.symbol = btn.value;
                input.value += btn.value;
            }
        } else {
            return;
        }
    }

    // For show result
    function onEqual(obj) {
        let val = input.value;
        result.textContent = eval(input.value);
    }

});
