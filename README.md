# Chat app
### Made with react.js and nest.js
<s><b> Deployed at: https://chat-client.dezzerlol.tech/ </b></s>

### Features:
- [x] Auth with JWT refresh and access tokens
- [x] Private chats between 2 users
- [x] Group chats between multiple users
- [x] Responsive design
- [x] Dark mode 
- [x] Custom ui-kit with storybook
- [x] Some tests
- [x] i18n 
- [x] Reply to messages
- [ ] Attach files to message
- [ ] Animations

## Run client locally

```bash
cd react-chat-frontend
yarn install
yarn dev
```

## Run server locally

```bash
cd nestjs-chat-backend
yarn install
```

### Then create .env file with:
 - DATABASE_URL:
 - JWT_SECRET_KEY:

### Then push schema to database and start server:
```bash
yarn prisma db push
yarn start:dev
```

# Screenshots
![Chat Screenshot](https://raw.githubusercontent.com/dezzerlol/react-nestjs-chat/master/assets/chat_screenshot1.png)


![Chat Screenshot](https://raw.githubusercontent.com/dezzerlol/react-nestjs-chat/master/assets/chat_screenshot3.png)
