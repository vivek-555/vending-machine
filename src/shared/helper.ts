import { DENOMINATIONS } from "./constants";

export const isNumber = (possibleNumber: string) => !isNaN(Number(possibleNumber));

export const getChange = (balanceLeft: number): number[] => {
    const denominations = [...DENOMINATIONS];   // create deep copy
    const changeDenominations: number[] = [];

    const determineChange = (balanceLeft: number, denominationArray: number[]) => {
        if (denominationArray.length === 0) {
            return;
        }
        const biggestCoin = denominationArray[denominationArray.length - 1]; // get the biggestDenomination

        if (balanceLeft < biggestCoin) {
            denominationArray.splice(denominationArray.length - 1, 1); // removed the biggest coin
            determineChange(balanceLeft, denominationArray);
            return;
        }

        const numberOfBigCoins = Math.floor(balanceLeft / biggestCoin);
        for (let i = 0; i < numberOfBigCoins; i++) {
            changeDenominations.push(biggestCoin);
        }

        const remainder = balanceLeft % biggestCoin;
        if (remainder === 0) {
            return; // done
        } else {
            denominationArray.splice(denominationArray.length - 1, 1); // removed the biggest coin
            determineChange(remainder, denominationArray);
            return;
        }
    }

    determineChange(balanceLeft, denominations);
    return changeDenominations;
}