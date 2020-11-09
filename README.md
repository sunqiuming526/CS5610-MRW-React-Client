# PROTOTYPE

## Describes the API

Use IMDb rest API: https://rapidapi.com/apidojo/api/imdb8/endpoints.

Get the general movie information by the movie title.

General movie information includes the rating, release date, genre, directors and movie image.

## Search Criteria

User provides the title of the movie. 

## Summary Results

The result page renders a grid displaying the title of the movies from the API, and the data point.

## Detail Results

Clicking on one of the movie title should query the API for more detailed information about that specific movie.
After getting the details such as the date, genre, directors and image, render them below the movie title (or in a separate page).

Based on the movie: 
- Users can give comments to this movie, and check other people's comments; collect the movie on their wishlists and give their own ratings.
- Admins can edit movie information if they found API loading data is not correct. 
- Publishers can publish new movies which is not in the IMDb database and edit the movie content.

Movie query data can be stores in our own database. For every search, we load data from our own database first, if data cannot be found, than query from the IMDb API.

For example, the detailed information can get from the link below based on title.

Get genre: https://imdb8.p.rapidapi.com/title/get-genres

Note: One movie can have more than multiple genres.

Get rating: https://imdb8.p.rapidapi.com/title/get-ratings

Get image: https://imdb8.p.rapidapi.com/title/get-images

Note: return the image url 



# OTHERS 
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
