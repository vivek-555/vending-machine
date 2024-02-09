import { isNumber, getChange } from './helper';

describe('check for numerical value', () => {
    test('should return if string is numeric', () => {
        expect(isNumber("200")).toEqual(true);
        expect(isNumber("200c")).toEqual(false);
        expect(isNumber("dfdf")).toEqual(false);
    });
});

describe('get change from the balance left', () => {
    test('should return the change in the predetermined denominations', () => {
        expect(getChange(200)).toEqual([100, 100])
        expect(getChange(165)).toEqual([100, 50, 10, 5]);
        expect(getChange(175)).toEqual([100, 50, 20, 5]);
        expect(getChange(95)).toEqual([50, 20, 20, 5]);
        expect(getChange(105)).toEqual([100, 5]);
        expect(getChange(85)).toEqual([50, 20, 10, 5]);
        expect(getChange(55)).toEqual([50, 5]);
        expect(getChange(35)).toEqual([20, 10, 5]);
        expect(getChange(20)).toEqual([20])
        expect(getChange(10)).toEqual([10])
        expect(getChange(5)).toEqual([5])
        expect(getChange(0)).toEqual([])
    });
});