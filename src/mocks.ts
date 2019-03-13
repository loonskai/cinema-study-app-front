export const users = [
  {
    email: 'client@mail.com',
    username: 'client',
    password: 'Password123'
  }
];

export const userData = {
  username: 'Johny',
  orders: {
    past: [
      {
        sessionId: 1,
        city: 'Minsk',
        cinema: 'Pobeda',
        date: '18.01.2019',
        time: '19:00',
        totalPrice: 10,
        movie: {
          id: 284053,
          title: 'Thor: Ragnarok'
        },
        order: [
          {
            row: 1,
            seat: 5
          },
          {
            row: 1,
            seat: 6
          }
        ]
      },
      {
        sessionId: 2,
        city: 'Minsk',
        cinema: 'Belarus',
        date: '19.12.2018',
        time: '13:00',
        totalPrice: 5,
        movie: {
          id: 263115,
          title: 'Logan'
        },
        order: [
          {
            row: 5,
            seat: 12
          }
        ]
      }
    ],
    upcoming: [
      {
        sessionId: 1,
        city: 'Minsk',
        cinema: 'Pobeda',
        date: '03.05.2019',
        time: '20:00',
        totalPrice: 18.5,
        movie: {
          id: 293660,
          title: 'Deadpool'
        },
        order: [
          {
            row: 5,
            seat: 10
          },
          {
            row: 5,
            seat: 11
          },
          {
            row: 5,
            seat: 12
          }
        ]
      }
    ]
  }
};

export const cities = [
  { label: 'Minsk' },
  { label: 'Brest' },
  { label: 'Vitebsk' },
  { label: 'Grodno' },
  { label: 'Gomel' },
  { label: 'Mogilev' }
];

export const cinemas = [
  {
    id: 1,
    city: 'Minsk',
    name: 'Avrora'
  },
  {
    id: 2,
    city: 'Minsk',
    name: 'Oktyabr'
  },
  {
    id: 3,
    city: 'Brest',
    name: 'Moskva'
  },
  {
    id: 4,
    city: 'Minsk',
    name: 'Silver Screen'
  },
  {
    id: 5,
    city: 'Brest',
    name: 'Pobeda'
  }
];

export const halls = [
  {
    id: 1,
    cinemaId: 1,
    name: 'Main Hall'
  },
  {
    id: 2,
    cinemaId: 1,
    name: '3D Hall'
  },
  {
    id: 3,
    cinemaId: 3,
    name: 'Adults only'
  }
];

export const seats = [
  {
    hallId: 1,
    rows: [
      {
        category: 'vip',
        price: 10,
        seats: 10,
        reserved: [4, 10],
        ordered: [1, 2, 3, 5, 6],
        lastInSection: false
      },
      {
        category: 'vip',
        price: 10,
        seats: 10,
        reserved: [1, 3, 6, 10],
        ordered: [2],
        lastInSection: false
      },
      {
        category: 'vip',
        price: 10,
        seats: 10,
        reserved: [1, 3, 6, 10],
        ordered: [2],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 10,
        seats: 10,
        reserved: [1, 3, 6, 10],
        ordered: [2],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 10,
        seats: 10,
        reserved: [1, 3, 6, 10],
        ordered: [2],
        lastInSection: true
      },
      {
        category: 'basic',
        price: 5,
        seats: 12,
        reserved: [8],
        ordered: [1],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 5,
        seats: 14,
        reserved: [8],
        ordered: [1],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 5,
        seats: 16,
        reserved: [8],
        ordered: [1],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 5,
        seats: 16,
        reserved: [],
        ordered: [],
        lastInSection: false
      },
      {
        category: 'basic',
        price: 5,
        seats: 16,
        reserved: [],
        ordered: [],
        lastInSection: false
      }
    ]
  }
];

export const sessions = [
  {
    id: 1,
    date: '04-03-2019',
    time: '19:00',
    hallId: 1,
    city: 'Minsk',
    cinema: "Oktybr'",
    movieId: 24428
  },
  {
    id: 2,
    date: '04-03-2019',
    time: '20:00',
    hallId: 2,
    city: 'Brest',
    cinema: 'Belarus',
    movieId: 24427
  },
  {
    id: 3,
    date: '04-03-2019',
    time: '20:00',
    hallId: 4,
    city: 'Minsk',
    cinema: 'Pobeda',
    movieId: 24428
  }
];

export const bonus = {
  popcorn: {
    price: 1.2
  },
  chips: {
    price: 0.5
  },
  soda: {
    price: 1
  }
};
