![AppleDealer](https://github.com/Kumchenko/adealer-admin/assets/60291758/469ba79d-96ad-498a-8415-db321cfd0d56)

# AppleDealer

[Live Demo](https://appledealer.vercel.app/)

#### Summary

It's the main repository of **AppleDealer project**.

Since the Frontend and Backend have been splitted, now this repository contains only Client Frontend.

Other parts:

-   [ADealer Admin (Frontend of Admin panel)](https://github.com/Kumchenko/adealer-admin)
-   [ADealer Server (Backend core)](https://github.com/Kumchenko/adealer-server)

This part of project was invented for creating Orders, requesting Calls, tracking statuses of orders and viewing main information about company, it's works and availability of discount programs.

This project implements:

-   Fully **internationalized** UI, including date and time strings. You can choose any of followed languages during using App and change them ever:
    -   Ukrainian
    -   English
    -   Russian
-   Smooth **page transitions** and **transitions** in general for many UI components(Modal, Slider, Images) for better user experience.
-   **Spinners** are used in all places with a loading action.
-   **Modal window** for requesting call back and in general **configurable modal**, which can show errors during usage, if something goes wrong.
-   **Slider** with examples of workshops.
-   Many **configurable components**, like header menu with support of **dropdown menu**, form inputs, modal window and other.
-   **Detailed errors** for wrong actions, such like 'Phone number is wrong', 'Order not found' instead of 'Error was occured'.
-   Easy configurable header navigation points, social network points, slides in
    > /src/constants/
-   **Responsive design** for tablets and phones.
-   **Controlled** forms with **validation**.
-   Custom Error page.

#### Technology stack

Next.js, TypeScript, i18next, Redux-Toolkit, React, React-Spring, Formik, Yup, GMaps, Swiper, SCSS, FontAwesome, Prettier

#### Table of contents

-   [Getting started](#getting-started)
-   [Usage](#usage)
    -   [Pages](#pages)
        -   [Index page](#index-page)
        -   [Order and Thanks pages](#order-and-thanks-page)
        -   [Check and Status pages](#check-and-status-page)
    -   [Modal windows](#modal-windows)
-   [Notes](#notes)
-   [Contacts](#contacts)

---

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Kumchenko/appledealer.git
```

2. Install all project dependencies:

```bash
npm i
```

3. Run your [ADealer Server](https://github.com/Kumchenko/adealer-server) and set API address to NEXT_PUBLIC_API_URL in .env.development file

```
# URL address of ADealer API
NEXT_PUBLIC_API_URL="http://HOST:PORT"
```

4. Enable Maps Embed API, get your own Maps Embed API Key on [Google Cloud](https://console.cloud.google.com/google/maps-apis/api-list) and set it to .env.development

```
# Api key for Map on index page
NEXT_PUBLIC_MAPS_API_KEY="Your Embed Google Maps api key"
```

5. Now you can run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Usage

### Pages

This App has 5 pages. Description of each of them is given below.

#### Index page

![Index page](https://github.com/Kumchenko/appledealer/assets/60291758/3d4f1baa-dfc0-457e-b678-55562985b20a)

This page contains main info about company, such like Open Hours, location, which presented with using embed GMap, timer which shows countdown of discount ending, slider with works, items which show algorithm of repair.

---

#### Order and Thanks page

![Order and Thanks pages Flow](https://github.com/Kumchenko/appledealer/assets/60291758/b7247f75-3c5c-46a7-a647-868e92722e02)

Above you can see pages flow from _Order_ to _Check_.

-   _Order page_ was invented for creating orders by clients using controlled validation form.
-   _Thanks page_ shows the thanks message to the client for the order and shows summary info about created order.

---

#### Check and Status page

![Check and Status pages Flow](https://github.com/Kumchenko/appledealer/assets/60291758/035143db-10ef-4fc5-a8f9-bf060811ac56)

Above you can see pages flow from _Check_ to _Status_.

-   _Check page_ contains controlled form with validation, which can redirect you to status page of your Order, if client inputed correct Order ID and tel number which was attached to Order, otherwise modal window will popped up with message what's wrong.
-   _Status page_ shows status of order.

---

### Modal windows

Here you can see how Modal windows look.

-   _'Call Me'_  and Informational modal:

![Call Me and Informational modal](https://github.com/Kumchenko/appledealer/assets/60291758/029134e3-baeb-4a2d-a801-75f5a5c1e4c1)

-   _Error_ modal:

![Error modal](https://github.com/Kumchenko/appledealer/assets/60291758/8ebfeeb0-a97a-461b-a157-f9b49ba6c4e8)

---

## Notes

Additional information you can find on:

-   [ADealer Server](https://github.com/Kumchenko/adealer-server)
-   [ADealer Admin](https://github.com/Kumchenko/adealer-admin)

Or in docs of required technology.

---

## Contacts

Kyrylo Kumchenko – kirillkumchenko@gmail.com

Project link: <https://github.com/Kumchenko/appledealer>
