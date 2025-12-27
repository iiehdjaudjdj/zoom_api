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

Step 3: Open your web browser and navigate to the project URL. For XAMPP, this would typically be http://localhost/moi/by group/zoom/index.html or similar depending on your server configuration.

Step 4: Obtain Zoom API credentials. You need to create a Zoom App in the Zoom Marketplace and generate an API Key and API Secret. These credentials are required for JWT token generation.

Step 5: Enter your Zoom API Key and API Secret into the input fields on the website.

Step 6: Click the Get User Profile button to retrieve and display your profile information, or click the List Meetings button to retrieve and display your meetings.

Step 7: To create a new meeting, fill in the meeting topic, select a start date and time, enter the duration in minutes, and click the Create Meeting button.

Step 8: The results will be displayed below the input sections. If there are any errors, they will be shown in a red error message box.

## Screenshots Included

Screenshot 1: Main interface showing the API Key and API Secret input fields and action buttons for fetching profile and listing meetings.

Screenshot 2: Create meeting form showing input fields for meeting topic, start date and time, and duration with the create button.

Screenshot 3: User profile display showing user ID, first name, last name, email, account type, and personal meeting ID in a clean card layout.

Screenshot 4: Meetings list display showing individual meeting cards with topic, ID, start time, duration, type, and join URL links.

Screenshot 5: Error message display showing how validation errors and API errors are presented to the user in a user-friendly format.

Screenshot 6: Loading state showing the button spinner animation that appears during API requests to prevent multiple submissions.

## Members Listed & Roles

API & Authentication Handler: Responsible for implementing JWT token generation, Zoom API authentication, and handling API requests and responses. This includes the makeZoomRequest function and generateJWTToken function.

JavaScript Logic / Data Processing: Responsible for implementing the core business logic including data fetching, data processing, and DOM manipulation. This includes the fetchUserProfile, fetchMeetings, createMeeting, displayProfile, and displayMeetings functions.

UI & CSS Designer: Responsible for creating the Apple-inspired user interface design, styling all components, ensuring responsive layout, and implementing loading states and animations. This includes all CSS styling and HTML structure.

GitHub & Documentation Manager: Responsible for creating and maintaining the README documentation, managing the GitHub repository, creating branches, handling pull requests, and ensuring proper collaboration workflow.

