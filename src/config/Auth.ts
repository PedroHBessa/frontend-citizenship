const LOCAL_STORAGE_KEY = 'PRODOC_ADMIN_AUTH';

type UserCredential = {
  username: string | null;
  password: string | null;
  accessToken: string | null;
};

export class Auth {
  static getCredentials(): UserCredential {
    const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);

    if (obj) {
      const user = Object.assign({}, obj);

      user.password = atob(user.password);

      return user;
    } else {
      return {
        username: null,
        password: null,
        accessToken: null,
      };
    }
  }

  static setCredentials(user: UserCredential): void {
    user.password = btoa(user.password ?? '');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  static removeCredentials(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
