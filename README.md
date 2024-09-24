This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Create your MYSQL DB (or can do it automatically in step 4)

2. Create a `.env` file

put in the content: 
```bash
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```
replace the Upper Case variables with your own setup.

3. Install
```bash
npm i
```
Make sure you are using Node 18+

4. Sync the DB
```bash
npx prisma migrate deploy
```

5. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
