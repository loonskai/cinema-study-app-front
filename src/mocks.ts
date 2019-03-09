export const users = [
  {
    email: 'client@mail.com',
    username: 'client',
    password: 'Password123'
  }
];

export const userData = {
  username: 'Johny'
};

export const movies = [
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Dark Knight' },
  { label: '12 Angry Men' },
  { label: "Schindler's List" },
  { label: 'Pulp Fiction' },
  { label: 'The Lord of the Rings: The Return of the King' },
  { label: 'The Good, the Bad and the Ugly' },
  { label: 'Fight Club' },
  { label: 'Forrest Gump' },
  { label: 'Inception' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back' },
  { label: 'Seven Samurai' },
  { label: 'The Matrix' },
  { label: 'Leon: The Professional ' },
  { label: 'American History X' },
  { label: 'Interstellar (2014)' },
  { label: 'Casablanca' },
  { label: 'Psycho' },
  { label: 'Once Upon a Time in the West' },
  { label: 'The Pianist' }
];

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
    name: 'Avrora'
  },
  {
    id: 2,
    name: 'Oktyabr'
  },
  {
    id: 3,
    name: 'Moskva'
  },
  {
    id: 4,
    name: 'Silver Screen'
  },
  {
    id: 5,
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
