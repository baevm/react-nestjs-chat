# Chat app
### Made with react.js and nest.js
<b> Deployed at: https://chat-client.dezzerlol.tech/ </b>

### Features:
- [x] Auth with JWT refresh and access tokens
- [x] Private chats between 2 users
- [x] Group chats between multiple users
- [x] Responsive design
- [x] Dark mode 
- [ ] Custom ui-kit with storybook
- [ ] Attach files to message
- [ ] Reply to messages
- [ ] Animations
- [ ] Tests

## Run client locally

```bash
cd react-chat-frontend
yarn dev
```

## Run server locally

```bash
cd nestjs-chat-backend
```

### Create .env file with:
 - DATABASE_URL:
 - JWT_SECRET_KEY:

```bash
yarn prisma db push
yarn start:dev
```