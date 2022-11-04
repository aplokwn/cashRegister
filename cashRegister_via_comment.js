function checkCashRegister (price, cash, cid) {
  let change = []
  let status = ""
  let result = { status: null, change: [] }

  const cashUnit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]]

  let totalCash = 0 //
  let cidLenght = Object.keys(cashUnit).length //preset for cash-compairing
  let diff = (cash - price) * 100 / 100 // make sure difference of between cash and price is a whole number
  let returnAmount = diff

  // add-up all cash in hand
  for (let element of cid) {
    totalCash += element[1]
  }
  // make sure totalCash is a whole number
  totalCash = totalCash * 100 / 100


  //if difference === cash in hand, status = "CLOSED"
  if (diff === totalCash) {
    result.status = "CLOSED"
    for (let i = 0; i < cidLenght; i++) {
      change.push(cid[i])
    }
    result.change = change
  }
  //if cash in hand < difference to return, status = "INSUFFICIENT_FUNDS"
  else if (totalCash - diff < 0) {
    result.status = "INSUFFICIENT_FUNDS"
  }

  //MOST difficult part, but can solve by simple conditional logic and variable tracking!!!
  //If we have enough cash to give the change (just by number)
  else {

    // use a for loop for tracking all cash unit, keep the cash from decending
    for (let i = cidLenght - 1; i >= 0; i--) {
      let temp = 0 // tracking variable for return amount on our side
      let tempName = cashUnit[i] // set cashUnit


      // while loop to track how we can return the change in 1 cash unit with 3 conditions
      // 1) The Change must be larger than the cash unit amount
      // 2) temp is still less than the amount in hand 
      // 3) returnAmount > 0, it is not balance as 0
      while (returnAmount >= cashUnit[i][1] && temp < cid[i][1] && returnAmount > 0) {
        temp += cashUnit[i][1]
        returnAmount -= cashUnit[i][1]
        returnAmount = Math.round(returnAmount * 100) / 100
      }

      //Here, we check if we have enough cash in hand for the change with each cash unit
      // If yes, status = "OPEN"
      if (temp > 0 && cid[i][1] - returnAmount >= 0) {
        tempName[1] = temp
        change.push([tempName[0], tempName[1]])
        status = "OPEN"

      }
      // If there is a no, status = "INSUFFICIENT_FUNDS"
      else if (temp > 0 && cid[i][1] - returnAmount < 0) {
        status = "INSUFFICIENT_FUNDS"
      }
    }
    //make sure to update the result array
    result.status = status
    result.change = change

    //go to the next cash unit
  }

  return result


}




checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])