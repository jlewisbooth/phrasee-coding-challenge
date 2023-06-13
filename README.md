# Phrasee Technical Test - Front End

This test should take overall no longer than 3 hours. Should you find yourself taking longer please submit what you have, with a note indicating how you would finish the task.

Please clone this repository in order to work on it. 

To submit, email our HR dept at peopleteam@phrasee.co please remember to include your name. Your email should include any notes that you may have for our consideration, along with either a zip file of your updated version of the application, or a link to a GitHub repository containing the updated application.

## Task
You have been supplied with a partially complete mini React application, consisting of a simple login form for a fictitious medical records app.

The application requires refactoring and completion. Please complete the functionality of the app and refactor the code in accordance with your understanding of the best practice.

Feel free to use any technology available in the React environment to achieve the results.

## Requirements

1. Validate input fields:
    - username:
        - matching email address pattern only
        - max 128 characters between '@' and '.'
        - max 6 characters after last '.' character
    - password:
        - alphanumeric only
        - min 8 characters
        - max 128 characters
        - at least one number
        - at least one capital letter
2.  Allow logging in based on the response from this API endpoint:
    https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966
    The payload should be a JSON object of the form
    {
        "username": "test.user@phrasee.co",
        "password": "testpassword"
    }
    A successful login will have a response with a 200 HTTP status code
    An unsuccessful login will have a response with a 401 HTTP status code
3.  After a successful response has been received, use it to render a page listing hospital patients following the design attached in 'digital-hospital-global-patients.jpg'.
4.  This page should not be available to users who are 'unauthenticated'. Those users should be presented with the login page instead.
5.  Please use Redux to manage the state of the app and place any HTTP requests in action dispatcher.
6.  Group patients by the "type" property and display users only whose "is_completed" value is false.
7.  Please sort users ascending within groups by "last_visit_date" or alphabetically if dates are the same.
8.  Add tests to the most crucial parts of the application logic (Testing-library/Jest preferable)

# Bonus points

    Add functionality to remove whole groups and/or users.

# Considerations

- New routes could be added in the future, some routes will require that the user has been authenticated
- Some common data may need to be accessed by future components.
- Styling code should be reusable in the future
- Class names should follow modern naming conventions
- Inputs should have behaviour appropriate to their function
- Potential future code changes should introduce minimal regression bugs without developers being aware
