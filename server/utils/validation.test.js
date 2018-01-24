const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let result = isRealString(345);
        expect(result).toBeFalsy();
    });

    it('should reject only spaces values', () => {
        let result = isRealString('  ');
        expect(result).toBeFalsy();
    });

    it('should accept valid values', () => {
        let result = isRealString(' dfgfdg4 ');
        expect(result).toBeTruthy();
    });
});