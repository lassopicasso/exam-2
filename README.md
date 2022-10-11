# Holidaze - Project Exam 2

![Explore | Holidaze](/src/img/holidaze.jpg?raw=true "Explore | Holidaze")

Website: [Holidaze](https://holidays.netlify.app)

This was my final bigger project in my Front End Dev studies.
The goal was to create a website called "Holidaze" for a tourism agency in Bergen.
The website let visitors be able to find hotels, B&Bs and guesthouses in the area, and let accommodation owners to receive enquiries.
There are a three parts of this project. One for the visitors, one for accommodation owners and one for website owner.

## Description

This project is designed to make it easy to navigate for different viewports. It offers only necessary elements to give it a nice user flow. And with a combination of a stylish clean website that consits of many features, it is also set to give a good user journey.

The project can offer the following webpages and modals for visitors:

- Homepage
- Explore page (list of accommodations)
- Details page
- Two modals (reviews and enquiry)
- Contact Page
- Login (website admin or accommodation owner)

For the admin or accommodation owner:

- Add hotel page (Admin)
- Messages (Admin)
- Enquiries (Accommodation owner)

### Example of a user journey of this webpage.

Enters the homepage where there are two main elements. A search bar typehead that filters through the list of accommodations fetched from the api. A list of the 4 newest accommodations, that is transformed to a draggable carousel in mobile viewport. The user can either click on one of the matched results from the search bar or one of the new offers, and be redirected to details page of this accommodation.

Details page offers, in desktop viewport, a combination of two image carousels (horizontal and vertical). They are both interactive, and functions together based on index counting, width and margin length.

The page also contains links to two modals, reviews and enquiries.
The reviews modal offers a form where a review and rating can be posted, or read reviews from other guests.
If the information and reviews about the accomodation sounds good, the user can enter the enquiry modal. This contains a form where the guest can send a enquiry to the owner. It consists of inputs such as number of guests (adults, children, rooms), date to check-in and check-out and other necessary information. All forms is supported by the npm's packages, react hook form and yup validation.

If the guest instead want to see what other accommodations are offered, the guest can navigate to the explore page from the navbar.
The explore page consists of a list of cards, a search bar typehead and a container of filter and sort features. Each card constists of a image carousel, link to reviews modal and some other necessary information.

If the user has any questions to the admin, a form on the contact page can be used. All enquiries and contact messages are posted in different content-types in strapi.

The website offers two types of authenticated users, admin and accommodation owner. Both admin and accommodation owner have access to a message page, but with different content; contact messages or enquiries, which are structured in a list of cards sorted by newest. For each card there are different options of actions. One of them is to update the status of the card to read/unread. All read/processed messages/enquiries are grouped together. There are buttons on the page that offers to switch between the two groups - unread or read.
The admin has also access to a form that adds new accommodations. Including all the necessary information, there is a also a custom made file input for images, that let the user to either add images by click or drop.

## Built With

The project is built with following tech stack.

Front-end:

- [React.js](https://reactjs.org/)
- [Sass](https://sass-lang.com/)

Back-end:

- [Strapi Headless CMS](https://strapi.io/)
- [Heroku Server](https://dashboard.heroku.com/)

Other NPM's:

- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [React Datepicker](https://reactdatepicker.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup Validation](https://www.npmjs.com/package/yup)
- [Moment](https://momentjs.com/)
- [React Helment](https://www.npmjs.com/package/react-helmet-async)

## Getting Started

To install and run this React project locally, you can do the following:

1. Clone the repo:

```bash
git clone git@github.com:lassopicasso/exam-2.git
```

2. Install the dependencies:

```
npm install
```

3. To run the app, run the following command:

```bash
npm run start
```

4. Login credentials to restricted pages

Admin:

```bash
admin@admin.com
Admin123
```

Accommodation owner:

```bash
user@user.com
User123
```

## Contact

[My Portfolio](https://lars-walderhaug.netlify.app)

[My LinkedIn page](https://www.linkedin.com/in/lars-walderhaug-5924a349/)

## Acknowledgments

Code Review - Monica Nikolaisen [GitHub Profile](https://github.com/mmunkvold)
