<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

  </a>

<h3 align="center">Cash Register</h3>

  <p align="center">
    <br />
    <a href="https://playcode.io/1002604"><strong>Live Demo @ playcode »</strong></a><br/>
    <a href="https://github.com/aplokwn/cashRegister/blob/main/cashRegister_final.js"><strong>Explore the final code »</strong></a>
    <br />
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
       <li><a href="#challenge-point">Challenge Point</a></li>
      </ul>
        <li><a href="#code-explaintion">Code Explaintion</a></li>
      </ul>
    </li>
    </ol>
</details>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a freecodecamp Javascript project just for practise.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Javascript](https://www.javascript.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Challenge Point

1. Decimal to whole number. It is easy to make mistake if we don't beware of the calulation result in js.
2. Making the correct codition to filter the cash in hand and changes comperison, then push the correct result to the change result list.

<br/>

### Code Explaintion

<br/>
<p>
First, setup variables and constances that we will use afterwards.
</p>

```javascript
let change = []
let status = ''
let result = { status: null, change: [] }

const cashUnit = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100],
]

let totalCash = 0 // variable for total cash in hand
let cidLenght = Object.keys(cashUnit).length //preset for cash-compairing
let diff = ((cash - price) * 100) / 100 // make sure difference of between cash and price is a whole number
let returnAmount = diff

// add-up all cash in hand
for (let element of cid) {
  totalCash += element[1]
}
// make sure totalCash is a whole number
totalCash = (totalCash * 100) / 100
```

<br/>
<p>Code the 2 conditions which can elimilate the OPEN status:

1. If difference equal cash in hand, status is <b>"CLOSED"</b>.
2. If cash in hand less than difference to return, status is <b>"INSUFFICIENT_FUNDS"</b>.
</p>
   <br/>

```javascript
//if difference === cash in hand, status = "CLOSED"
if (diff === totalCash) {
  result.status = 'CLOSED'
  for (let i = 0; i < cidLenght; i++) {
    change.push(cid[i])
  }
  result.change = change
}
//if cash in hand < difference to return, status = "INSUFFICIENT_FUNDS"
else if (totalCash - diff < 0) {
  result.status = 'INSUFFICIENT_FUNDS'
}
```

<br/>
<p>Use a for-loop for tracking all cash unit, keep the cash in decending order</p>
<br/>

```javascript
// OPEN status
else {
  //cash forLoop in decending order
    for (let i = cidLenght - 1; i >= 0; i--) {
      let temp = 0 // tracking variable for require return amount on our side
      let tempName = cashUnit[i] // set cashUnit
```

<br/>
<p>Use a while loop to track how we can return the change in 1 cash unit with 3 conditions:

1. The Change must be larger than the cash unit amount.
2. Temp (Require return amount) is still less than the amount in hand.
3. ReturnAmount larger than 0, it is not balance out yet.
</p>

```javascript
while (returnAmount >= cashUnit[i][1] && temp < cid[i][1] && returnAmount > 0) {
  temp += cashUnit[i][1]
  returnAmount -= cashUnit[i][1]
  returnAmount = Math.round(returnAmount * 100) / 100
}
```

<p>Here, we check if we have enough cash in hand for the change with each cash unit.
If yes, status = "OPEN"
</p>

```javascript
if (temp > 0 && cid[i][1] - returnAmount >= 0) {
  tempName[1] = temp
  change.push([tempName[0], tempName[1]])
  status = 'OPEN'
}
```

If there is a no, status = "INSUFFICIENT_FUNDS"

```javascript
 else if (temp > 0 && cid[i][1] - returnAmount < 0) {
        status = "INSUFFICIENT_FUNDS"
      }
    }
    //make sure to update the result array
    result.status = status
    result.change = change

	//go to the next cash unit within the outer for-loop
  }

```

<p align="center">
    <br />
    <a href="https://github.com/aplokwn/cashRegister/blob/main/cashRegister_final.js"><strong>Explore the code with the commented version »</strong></a>
    <br />
      <a href="https://github.com/aplokwn/cashRegister/blob/main/cashRegister_via_consoleLog.js"><strong>Explore the code with the consoleLog version »</strong></a>
    <br />
    <br />
  </p>

<p align="right">(<a href="#top">back to top</a>)</p>
