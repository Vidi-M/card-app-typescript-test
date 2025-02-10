# Integrum ESG interview - Card App 🎴🃏

Simple card app created with Typescript Stack
Converted to a test from the [original](https://github.com/ThomiWidescreen/card-app-typescript)

## Prerequisites

NodeJS - if you don't already have it installed, check out [nvm](https://github.com/nvm-sh/nvm).

### Development set-up

If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com).

Recommended VSCode extensions:

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

# Instruction to candidates

Your assignment is to improve this application. At the moment the application is simple and can only create and remove todos.

Fork this project into your own on github

Clone it onto a machine with node and a development environment (we use VScode)
Follow the instructions below to run the back end and the front end.

Then make changes to:

- Add a dark mode. Create a settings dialog to set it - and change the styling to render a dark mode. Consider how the current setting is passed to the components (and describe it in your covering email)
- Add a scheduled date to the cards. This involves adding a column in the database, changing the backend service and changing the frontend card entry and display components
- Add tests to the backend. There are some clues [here](https://www.fastify.io/docs/latest/Guides/Testing/) and [here](https://jestjs.io/docs/using-matchers).

If you feel constrained by time (which is totally fine!), prioritize quality over quantity.

Email us the link to your repo when you're done. Please also include a short write up describing the rationale of the changes you have made.

# Features

- Mutiple Routes for each action.
- Local Backend Database
- You can View, Create, Update, Delete simple cards.

# Stack

## Front End

- React ⚛
- React Router DOM 🔀
- Tailwind CSS 🐦

## Back End

- Fastify 🚀
- Prisma ORM 🅿
- SQLite ▪

# Deploy

Git hooks are used to automatically format committed files. To setup the hooks run:

```bash
npm i
```

The front end works in port 3000 and the backend works in the port 3001.

## Back End

```bash
npm install

npm run prisma-setup

npm start
```

To have the backend restart when changes have been made to `.ts`, `.prisma` and `.sql` files:

Replace `npm start` with `npm run dev`

To run the tests:

```bash
npm run test
```

## Front End

```bash
npm install

npm start
```

To deploy a final build with static files:

```bash
npm run build

cd ./dist

npx serve -p 3000 -s
```
## Changes made by Vidisha Mistry

### Dark Mode:
I implemented a dark mode feature that allows users to toggle between light and dark themes. To achieve this, I created a settings dialog where users can switch between the two modes. The design sticks to a blue and gray color scheme for a consistent and aesthetically pleasing experience across both themes. I also ensured that the user's last selected preference (light or dark mode) is saved to local storage. This way, the mode persists even if the user refreshes or revisits the page, providing a more seamless experience.

### Scheduled Date Feature:
I added a new optional field, due_for, which allows users to set a scheduled date for each card. Since not every card requires a due date, I made this field optional. I updated the database to handle both null values (for cards without a due date) and valid dates. On the frontend, I modified the create and update forms to allow users to add or modify this optional due date. The display of cards was also adjusted to show the scheduled date and how many days are left until the due date. Additionally, I added a visual indicator where the card title turns red if the current date has reached or surpassed the scheduled date, giving users a clear warning that the task is overdue.

### Backend Tests:
I wrote 12 backend tests to ensure the CRUD functionalities of the app are working as expected. These tests cover various scenarios, including successful operations and error cases, to make sure the app behaves as intended even under edge cases. I used Jest and Fastify's .inject() method to mock the database calls, ensuring that no actual API requests are made during the test runs. This approach follows best practices, as it allows for faster, isolated, and more predictable tests.
