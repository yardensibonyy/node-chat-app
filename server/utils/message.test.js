const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let result = generateMessage('me', 'Hey!');
        expect(result.from).toBe('me');
        expect(result.text).toBe('Hey!');
        expect(result.createdAt).toBeTruthy();
    });
});