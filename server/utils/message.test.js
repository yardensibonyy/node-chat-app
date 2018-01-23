const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let result = generateMessage('me', 'Hey!');
        expect(result.from).toBe('me');
        expect(result.text).toBe('Hey!');
        expect(result.createdAt).toBeTruthy();
    });
});

describe('generateLocationMessage', () => {
    it('should generate correact location object', () => {
        let from = 'Admin';
        let latitude = 111;
        let longitude = 222;
        let result = generateLocationMessage(from, latitude, longitude);
        expect(result.from).toBe(from);
        expect(result.url).toBe('https://www.google.com/maps?q=111,222');
        expect(result.createdAt).toBeTruthy();
    });
});