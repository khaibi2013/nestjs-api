import User from '../../users/user.entity';

const mockedUser: User = {
    id: 4,
    email: 'khaibi9961@gmail.com',
    name: 'hieu',
    password: '12345678',
    address: {
        id: 1,
        street: 'thanh xuan',
        city: 'hanoi',
        country: 'thuong dinh',
    },
    posts: []
};

export default mockedUser;