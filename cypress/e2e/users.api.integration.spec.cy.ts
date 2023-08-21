describe(`Users API Integration Tests`, () => {
  it(`GET /users`, () => {
    cy.request({ url: 'http://localhost:9000/users', method: 'get' }).then(
      (res) => {
        expect(res.status).eq(200);
        expect(res.body.data.length).to.be.greaterThan(0);
      },
    );
  });

  let testUserId: string;
  it(`POST /users`, () => {
    cy.request({
      url: 'http://localhost:9000/users',
      method: 'post',
      body: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        phone: '123-456-7890',
        birthDate: '1990-01-01',
        age: 30,
        marketingSource: 'Google Ads',
        status: 'active',
      },
    }).then((res) => {
      expect(res.status).eq(201);
      expect(res.body.firstName).eq('John');
      expect(res.body.lastName).eq('Smith');
      expect(res.body.email).eq('john@smith.com');
      expect(res.body.phone).eq('123-456-7890');
      expect(res.body.birthDate).match(/^1990-01-01/);
      expect(res.body.age).eq(30);
      expect(res.body.marketingSource).eq('Google Ads');
      expect(res.body.status).eq('active');

      testUserId = res.body._id;
    });
  });

  it(`PATCH /users/:id`, () => {
    cy.request({
      url: `http://localhost:9000/users/${testUserId}`,
      method: 'patch',
      body: {
        firstName: 'Jonathan',
      },
    }).then((res) => {
      expect(res.status).eq(200);
      expect(res.body.firstName).eq('Jonathan');
    });
  });

  it(`DELETE /users/:id`, () => {
    cy.request({
      url: `http://localhost:9000/users/${testUserId}`,
      method: 'delete',
    }).then((res) => {
      expect(res.status).eq(200);
      expect(res.body.firstName).eq('Jonathan');
      expect(res.body.lastName).eq('Smith');
      expect(res.body.email).eq('john@smith.com');
      expect(res.body.phone).eq('123-456-7890');
      expect(res.body.birthDate).match(/^1990-01-01/);
      expect(res.body.age).eq(30);
      expect(res.body.marketingSource).eq('Google Ads');
      expect(res.body.status).eq('active');
      expect(res.body.isDeleted).eq(true);
    });
  });

  it(`GET /users?firstName=John&limit=20&page=1&sort=-1&sortBy=createdAt`, () => {
    cy.request({
      url: 'http://localhost:9000/users?firstName=John&limit=20&page=1&sort=-1&sortBy=createdAt',
      method: 'get',
    }).then((res) => {
      expect(res.status).eq(200);
      expect(res.body.page).to.eq('1');
      expect(res.body.limit).to.eq('20');
      expect(res.body.sort).to.eq('-1');
      expect(res.body.sortBy).to.eq('createdAt');
      expect(res.body.data.length).to.be.greaterThan(0);
      expect(res.body.data.every((user) => user.firstName.match(/john/i)));
    });
  });

  it(`GET /users?lastName=Smith&limit=5&page=2&sort=-1&sortBy=birthDate`, () => {
    cy.request({
      url: 'http://localhost:9000/users?lastName=Smith&limit=5&page=2&sort=-1&sortBy=birthDate',
      method: 'get',
    }).then((res) => {
      expect(res.status).eq(200);
      expect(res.body.page).to.eq('2');
      expect(res.body.limit).to.eq('5');
      expect(res.body.sort).to.eq('-1');
      expect(res.body.sortBy).to.eq('birthDate');
      expect(res.body.data.length).to.be.greaterThan(0);
      expect(res.body.data.every((user) => user.lastName.match(/smith/i)));
    });
  });
});
