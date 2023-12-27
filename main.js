function checkCashRegister(price, cash, cid) {

 
   
    const totalMoney = cid.reduce((acc,money) => acc + money[1],0)
    const trimmedTotalMoney = Math.round(totalMoney * 100) / 100
    const totalChange = cash - price

    if(totalMoney < totalChange){
        return {status: "INSUFFICIENT_FUNDS", change: []}
    }    
    else if(totalMoney === totalChange){
        return {status: "CLOSED", change: cid}
    }    
    else if(totalMoney > totalChange){
        const {changeArray} = obtainChange(cid,totalChange)
        const {total} = obtainChange(cid,totalChange)
        if(total> 0)
            return {status: "INSUFFICIENT_FUNDS", change: []}
        else
            return {status: "OPEN", change: changeArray}
    }

    
    
  }
  
  function obtainChange(cid,total){
      
   let reversed = cid.reverse(); 

  const currencyValues = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01
  };

  const changeArray = []

  for (let element of reversed){

        const change = [element[0],0]

        while(total >= currencyValues[element[0]] && element[1] > 0){
            change[1] += currencyValues[element[0]]
            element[1] -= currencyValues[element[0]]
            total -= currencyValues[element[0]]
        }
        
        if(change[1] > 0)
            changeArray.push(change)

        
  }

  
  return {changeArray,total}

  }
  let number = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  console.log(number)
//console.log(obtainChange([["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]],0.5))
