# Alpaca Health Software Engineering Take-Home Project

### Demo

https://www.loom.com/share/a1ec8d67b7db4f2a875c5d00995efe87?sid=10c84d14-aff3-478e-8e7b-b7924091114c

### Approach

#### Views

I built this project as a simple CRUD app with views for:

- All notes
- Creating a note
- Updating and viewing a note

#### User Flow

The user is able to input their information, generate the AI clinical notes, and then update them on the spot. Moreover, the clinician is able to come back later and update the notes as needed.

#### Authentication

I avoided any concept of user state management to allow myself to move quickly and focus on the core functionality instead of auth.

#### Future Improvements

Although I wanted to add a rich text editor like React Quill, there wasn't enough time to do so.

#### Technology Choices

I chose to use Tortoise ORM as my ORM. I haven't used this previously, but based on my research, it works very well with FastAPI and has a smooth integration without much set up.

It was very tempting to use a component library like Shadcn or React Bootstrap, but I stuck with straight Tailwind for speedy updates to design if needed.

### Design decisions

- Kept the styling minimalistic to not distract from the core functionality.
- Used a simple color palette to make the app feel more modern.
- Added a loading state to the generate summary button.
- Added loading state on the home page while sessions are being fetched.
- I did want to add toasts for success and error messages, but ran out of time. You can see where I commented it out in the frontend code.

### Assumptions

- The AI summary should follow a specific template to be compliant. I created this myself using what I could gather online.
- There will only be one user and the functionality for multiple user profiles is irrelevant for this project.

### Running the project

You won't be able to run the project as is because I removed the API key from the `.env` file.
