import faker from '@faker-js/faker';
import { axiosGraphql } from './axiosGraphql';

export async function makeUserMock(times: number) {
  let makeResult = [];
  for (const time of Array(times).keys()) {
    faker.locale = 'en';
    const userName = faker.name.lastName();
    faker.locale = 'ko';

    const email = faker.internet.email();
    const password = '1234qwer';
    const phoneNumber = faker.phone.phoneNumber();
    const avatar = faker.internet.avatar();
    const statusMessage = faker.lorem.sentence();
    const setting = { avatar, statusMessage };
    const userInfo = { userName, password, email, phoneNumber, setting };
    const query = `mutation registerMock($userName: String!, $password: String!, $email: String!, $phoneNumber: String!, $setting: settingInput!) {
      registerMock(userName: $userName, password: $password, email: $email, phoneNumber: $phoneNumber, setting: $setting) }
      `;
    await axiosGraphql(query, userInfo);
    makeResult.push(userInfo);
  }

  return makeResult;
}
