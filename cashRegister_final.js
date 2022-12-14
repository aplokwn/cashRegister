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

  let totalCash = 0
  let cidLenght = Object.keys(cashUnit).length
  let diff = (cash - price) * 100 / 100
  let returnAmount = diff


  for (let element of cid) {
    totalCash += element[1]
  }
  totalCash = totalCash * 100 / 100


  if (diff === totalCash) {
    result.status = "CLOSED"
    for (let i = 0; i < cidLenght; i++) {
      change.push(cid[i])
    }
    result.change = change
  }
  else if (totalCash - diff < 0) {
    result.status = "INSUFFICIENT_FUNDS"
  }

  else {
    for (let i = cidLenght - 1; i >= 0; i--) {
      let temp = 0
      let tempName = cashUnit[i]



      while (returnAmount >= cashUnit[i][1] && temp < cid[i][1] && returnAmount > 0) {
        temp += cashUnit[i][1]
        returnAmount -= cashUnit[i][1]
        returnAmount = Math.round(returnAmount * 100) / 100
      }

      if (temp > 0 && cid[i][1] - returnAmount >= 0) {
        tempName[1] = temp
        change.push([tempName[0], tempName[1]])
        status = "OPEN"

      }
      else if (temp > 0 && cid[i][1] - returnAmount < 0) {
        status = "INSUFFICIENT_FUNDS"
      }
    }

    result.status = status
    result.change = change


  }

  return result


}




checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])