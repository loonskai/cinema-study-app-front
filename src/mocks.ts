export const users = [
  {
    email: 'client@mail.com',
    username: 'client',
    password: 'Password123'
  }
];

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
    data: [
      {
        category: 'vip',
        price: 10,
        items: [
          {
            row: 1,
            seats: [
              {
                id: 1,
                free: true
              },
              {
                id: 2,
                free: true
              },
              {
                id: 3,
                free: true
              },
              {
                id: 4,
                free: true
              },
              {
                id: 5,
                free: true
              },
              {
                id: 6,
                free: true
              },
              {
                id: 7,
                free: true
              },
              {
                id: 8,
                free: true
              },
              {
                id: 9,
                free: true
              },
              {
                id: 10,
                free: true
              }
            ]
          },
          {
            row: 2,
            seats: [
              {
                id: 1,
                free: true
              },
              {
                id: 2,
                free: true
              },
              {
                id: 3,
                free: true
              },
              {
                id: 4,
                free: false
              },
              {
                id: 5,
                free: true
              },
              {
                id: 6,
                free: true
              },
              {
                id: 7,
                free: false
              },
              {
                id: 8,
                free: false
              },
              {
                id: 9,
                free: true
              },
              {
                id: 10,
                free: true
              }
            ]
          }
        ]
      },
      {
        category: 'basic',
        price: 5,
        items: [
          {
            row: 1,
            seats: [
              {
                id: 1,
                free: false
              },
              {
                id: 2,
                free: false
              },
              {
                id: 3,
                free: true
              },
              {
                id: 4,
                free: false
              },
              {
                id: 5,
                free: true
              },
              {
                id: 6,
                free: true
              },
              {
                id: 7,
                free: true
              },
              {
                id: 8,
                free: true
              },
              {
                id: 9,
                free: true
              },
              {
                id: 10,
                free: false
              }
            ]
          },
          {
            row: 2,
            seats: [
              {
                id: 1,
                free: true
              },
              {
                id: 2,
                free: true
              },
              {
                id: 3,
                free: false
              },
              {
                id: 4,
                free: false
              },
              {
                id: 5,
                free: true
              },
              {
                id: 6,
                free: true
              },
              {
                id: 7,
                free: false
              },
              {
                id: 8,
                free: false
              },
              {
                id: 9,
                free: true
              },
              {
                id: 10,
                free: false
              }
            ]
          },
          {
            row: 3,
            seats: [
              {
                id: 1,
                free: false
              },
              {
                id: 2,
                free: true
              },
              {
                id: 3,
                free: true
              },
              {
                id: 4,
                free: false
              },
              {
                id: 5,
                free: true
              },
              {
                id: 6,
                free: true
              },
              {
                id: 7,
                free: false
              },
              {
                id: 8,
                free: true
              },
              {
                id: 9,
                free: false
              },
              {
                id: 10,
                free: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    hallId: 2,
    data: []
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
