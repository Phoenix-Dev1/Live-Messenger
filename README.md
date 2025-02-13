# Intro

A real-time messaging app with secure authentication, live user presence, and media sharing, built with Next.js, Prisma, Pusher, and Cloudinary for a seamless chat experience.

Project Live at: https://live-messenger.vercel.app/

![live-messenger](https://github.com/Phoenix-Dev1/Live-Messenger/blob/main/public/assets/banner-msg.png)

---

## Features

- Real-Time Messaging: Instantly send and receive messages using Pusher for seamless live chat.
- User Authentication: Secure login via NextAuth.js, supporting GitHub & Google OAuth and email authentication.
- Presence Detection: Track active users in real-time with Pusher's presence channels.
- Secure Conversations: Ensures privacy with server-side authentication and protected API routes.
- Optimized Performance: Leverages Next.js for fast loading, server-side rendering, and API efficiency.

---

## Technologies used

- [React](https://react.dev/) - Front-End JavaScript library.
- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [Prisma](https://www.prisma.io/) - Type-safe ORM for database management and querying.
- [NextAuth.js](https://next-auth.js.org/) - Authentication library for Next.js with multiple provider support.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for responsive and modern UI design.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for scalable and flexible data storage.

---

## Build

1. Clone this repository

```bash
git clone https://github.com/Phoenix-Dev1/Live-Messenger.git && cd live-messenger
```

2. Install project dependencies

```bash
npm install
```

## Setup

3. Set up environment variables (Required)

- Create a .env file in the root directory.
- Add the necessary API keys and configuration.

- DATABASE_URL =
- NEXTAUTH_SECRET =
- GITHUB_ID =
- GITHUB_CLIENT_SECRET =

- GOOGLE_CLIENT_ID =
- GOOGLE_CLIENT_SECRET =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

- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME =

- NEXT_PUBLIC_PUSHER_APP_KEY =
- PUSHER_APP_ID =
- PUSHER_SECRET =

- LIVEKIT_API_KEY =
- LIVEKIT_API_SECRET =
- NEXT_PUBLIC_LIVEKIT_URL =

## Start the project

4. Build the project and start it -

```bash
npm run dev
```
