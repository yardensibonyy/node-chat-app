const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Yarden',
            room: 'XSR700'
        }, {
            id: '2',
            name: 'Mike',
            room: 'XSR900'
        },{
            id: '3',
            name: 'George',
            room: 'XSR700'
        }];
    });

    it('should add a new user', () => {
        let users = new Users();
        let user = {
            id: 123,
            name: 'Yarden',
            room: 'just'
        };
        let result = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        expect(result).toBeTruthy();
    });
    
    it('should return list of the users in the XSR700 room', () => {
        let userListInRoom = users.getUserList('XSR700');
        expect(userListInRoom.length).toBe(2);
        expect(userListInRoom).toEqual(['Yarden', 'George']);
    });

    it('should return list of the users in the XSR900 room', () => {
        let userListInRoom = users.getUserList('XSR900');
        expect(userListInRoom.length).toBe(1);
        expect(userListInRoom).toEqual(['Mike']);
    });

    it('should return user by Id', () => {
        let user = users.getUser('1');
        expect(user.name).toBe('Yarden');
    });

    it('should not return user by Id', () => {
        let user = users.getUser('4');
        expect(user).toBeUndefined();
    });

    it('should delete and return user by Id', () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not delete user with invalid Id', () => {
        let userId = '4';
        let user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});