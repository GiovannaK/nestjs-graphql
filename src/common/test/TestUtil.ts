import { User } from '../../user/entities/user.entity';

export default class TestUtil {
  static giveMeAvalidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'valid name';
    user.id = '39ac1395-5729-4667-836a-62fdeb7f8a3d';
    return user;
  }
}
