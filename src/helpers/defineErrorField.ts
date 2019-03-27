export default (message: string): string | { [key: string]: string } => {
  switch (message) {
    case 'Email or username already in use':
    case 'User not found':
      return { username: message, email: message };
    case '"username" should be at least 2 symbols length':
      return 'username';
    case '':
      return 'email';
    case 'Wrong password':
      return 'password';
    case '"city" length must be at least 2 characters long':
      return { city: 'City name is too short' };
    case '"title" length must be at least 2 characters long':
      return { title: 'Title is too short' };
    default:
      return '';
  }
};
