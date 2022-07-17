import request from "supertest";
import {app} from "../src/app";
import {expect} from "chai";

const number = Math.floor(Math.random() * 100);

describe('GET /memos', () => {
    it('메모 조회 성공 시 200을 반환한다.', done => {
      request(app)
        .get('/memos')
        .query({ page_size : 3})
        .expect(200)
        .then( res => {
          expect(res.body.page_size).to.equal('3');
          done();
        })
        .catch( err => {
          console.error("######Error >>", err);
          done(err);
        })
    });
});

describe('POST /memos', () => {
  it('메모 등록 성공 시 200을 반환한다.', done => {
    request(app)
      .post('/memos')
      .set('Content-Type', 'application/json')
      .send({ title : 'memo title', content: 'memo content', user_id: 'note'})
      .expect(200)
      .then( res => {
        expect(res.body.success).to.equal(true);
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
});


describe('DELETE /memos', () => {
  it('메모 삭제 토큰 없을 경우 400을 반환한다.', done => {
    request(app)
      .delete('/memos/3')
      .set('Content-Type', 'application/json')
      .expect(400)
      .then( res => {
        // expect(res.body.success).to.equal(true);
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
});


describe('POST /users/signup', () => {
  it('회원 가입', done => {
    request(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({ id : 'test' + number, password: 'test1234'})
      .expect(200)
      .then( res => {
        expect(res.body.success).to.equal(true);
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
  it('회원 가입 중복된 아이디의 경우 400을 반환한다.', done => {
    request(app)
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({ id : 'test' + number, password: 'test1234'})
      .expect(400)
      .then( res => {
        expect(res.body.success).to.equal(false);
        done();
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
});


describe('POST /users/signin', () => {
  it('로그인 성공 시 토큰을 반환한다.', done => {
    request(app)
      .post('/users/signin')
      .set('Content-Type', 'application/json')
      .send({ id : 'test' + number, password: 'test1234'})
      .expect(200)
      .then( res => {
        expect(res.body.loginSuccess).to.equal(true);
        done();
        console.log("token>>", res.body.token);
      })
      .catch( err => {
        console.error("######Error >>", err);
        done(err);
      })
  });
});