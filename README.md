# Zoom API Website

## Project Description

This website allows users to interact with the Zoom API by providing their API Key and API Secret. Users can fetch and display their user profile information, list their meetings, and create new meetings. The website features an Apple-inspired user interface design with a clean and modern look. The application uses 90% of the viewport width for optimal display and includes loading indicators to prevent double-clicking during API requests. The website uses JWT token-based authentication to securely access the Zoom API endpoints.

## API Details Used

The website uses the Zoom API version 2 to fetch and create meeting data. Three main endpoints are utilized:

Get User Profile Endpoint: https://api.zoom.us/v2/users/me
This endpoint retrieves user profile data including ID, first name, last name, email, account type, and personal meeting ID. The endpoint requires JWT authentication using API Key and API Secret.

List Meetings Endpoint: https://api.zoom.us/v2/users/me/meetings
This endpoint retrieves a list of meetings for the authenticated user. The page_size parameter is set to 10 meetings per request. The endpoint returns meeting details including topic, ID, start time, duration, type, and join URL.

Create Meeting Endpoint: https://api.zoom.us/v2/users/me/meetings
This endpoint creates a new scheduled meeting with the provided topic, start time, duration, and settings. The endpoint requires a request body with meeting details and returns the created meeting information including join URL.

All endpoints require JWT token authentication which is generated using the API Key and API Secret provided by the user. The JWT token is included in the Authorization header as a Bearer token.

## Instructions to Run the Project

Step 1: Ensure you have a web server running. You can use XAMPP, WAMP, or any local development server. Place the project files in the htdocs directory if using XAMPP.

Step 2: Open the project folder in your web server directory. The main file is index.html located in the zoom folder.

Step 3: Open your web browser and navigate to the project URL.

Step 4: Obtain Zoom API credentials. You need to create a Zoom App in the Zoom Marketplace and generate an API Key and API Secret. 

Step 5: Enter your Zoom API Key and API Secret into the input fields on the website.

Step 6: Click the Get User Profile button to retrieve and display your profile information, or click the List Meetings button to retrieve and display your meetings.

Step 7: To create a new meeting, fill in the meeting topic, select a start date and time, enter the duration in minutes, and click the Create Meeting button.

Step 8: The results will be displayed below the input sections. If there are any errors, they will be shown in a red error message box.

## Screenshots Included
<img width="742" height="876" alt="image" src="https://github.com/user-attachments/assets/582a42dd-e8f8-40a0-9fd4-bf24ab12f5dd" />
<img width="610" height="378" alt="image" src="https://github.com/user-attachments/assets/eb046ccc-9f35-446c-a763-758840708c0f" />

## Members Listed & Roles

API & Authentication Handler: Moises Urbano

JavaScript Logic / Data Processing: Moises Urbano

UI & CSS Designer: Tyron Aromin & Angelo Mandasig

GitHub & Documentation Manager: John Alfred O. Ventura

