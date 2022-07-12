## 회원가입, 메모 Backend API

### 사용 언어
- Node.js
- Typescript
- Postgresql


### 실행 방법
1) Postgresql Database 생성
- init.sql 파일에 테이블 생성 쿼리가 포함되어 있습니다.
해당 스크립트를 수행해주세요.

2) env/server.env 정보 생성
```
DB_HOST=호스트명
DB_USER=유저명
DB_DATABASE=데이터베이스명
DB_PASSWORD=비밀번호
DB_PORT=포트번호

TOKEN_SECRET=토큰키
```
3) package.json 파일의 의존성 설치
```bash
npm install
```
4) 서버 실행
```bash
npm run build
npm run start
```


### API
- 메모 조회 GET /memos?page_size=3&page_number=5
- 상세 메모 조회 GET /memos/:id
- 메모 생성 POST /memos
body = {
title:4444 title
content:vvv ct
user_id:note
}
- 메모 수정 PUT /memos/:id (*Authorization)
- 메모 삭제 DELETE /memos/:id (* Authorization)
- 회원 가입 POST /users/signup
body = {
id:note
password:1234
}
- 로그인 POST /users/signin
- 댓글 생성 POST /replys
body = {
memo_id:3
comment:댓글입력222
user_id:csb6225
}
- 댓글 수정 PUT /replys/:id
- 댓글 삭제 DELETE /replys/:id
