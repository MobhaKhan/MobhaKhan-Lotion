# Lotion
In this assignment, you will create a Notion-like application named Lotion with HTML, CSS, and React.

---

## :foot: Steps
- Clone the repo
- Make sure you're inside the root directory of the repo and then run `npm install` to install all the necessary packages
- Run `npm start` and you should be able to see the page open up on your default browser
- Make sure to see the demo video on D2L
- Make your changes and push to the `main` branch before the deadline to be graded
- Create a new repo under your username and add it as a new remote to the project: `git remote add personal <github-address>`
- Push your changes to your personal repo as well: `git push personal main`
- Use [Netlify](https://www.netlify.com/) to deploy your application and drop the link to your website in the [NETLIFY-ADDRESS](./NETLIFY-ADDRESS.md) file

---

## :page_with_curl: Notes
- Three external libraries were used for the demo:
    - `react-router-dom` for front-end routing, which you can install by running `npm install react-router-dom`. Read more [here](https://masoudkarimif.github.io/posts/react-101/#react-router)
    - `react-quill` for the editor, which you can install by running `npm install react-quill`. Read more [here](https://github.com/zenoamaro/react-quill)
    - `uuid` for generating universally unique identifiers, which you can install by running `npm install uuid`. Read more [here](https://www.npmjs.com/package/uuid). Based on the algorithm you choose to implement the application, you may not need this library
- There's no backend or database for the application. However, the data persists in the browser. You need to use `localStorage` to implement this. Read more [here](https://masoudkarimif.github.io/posts/javascript-101/#localstorage) on how to use it
- Three different React hooks were used to build the demo:
    - [`useState`](https://masoudkarimif.github.io/posts/react-101/#usestate)
    - [`useEffect`](https://masoudkarimif.github.io/posts/react-101/#useeffect)
    - [`useRef`](https://masoudkarimif.github.io/posts/react-101/#useref). Based on your solution, you may not need to use this hook
- The demo uses a Layout route. Read more [here](https://masoudkarimif.github.io/posts/react-101/#the-layout-route)
- You need to use a page parameter to pass the note id to the component: `/notes/1`, `/notes/2/edit`. Read more [here](https://masoudkarimif.github.io/posts/react-101/#page-parameters)
- Based on your solution, you probably need to pass props to the child/children of the Layout component. Read more [here](https://masoudkarimif.github.io/posts/react-101/#passing-props-to-outlet)
- You need to use the `useParams` and `useOutletContext` hooks from the `react-router-dom` library to access the page parameters and the data passed to the children of the Layout component. Read more [here](https://masoudkarimif.github.io/posts/react-101/#page-parameters) and [here](https://masoudkarimif.github.io/posts/react-101/#passing-props-to-outlet)
- You probably need to use the `useNavigate` hook from the `react-router-dom` library to navigate to a different page at times. (hint: when you edit a note and hit save, you navigate from the edit path `/notes/note-id/edit` to the view path `/notes/note-id`). Read more [here](https://masoudkarimif.github.io/posts/react-101/#usenavigate)
- The prompt you get when click on the Delete button is implemented using the `window.confirm` method. It returns `true` if the user confirms, and `false` if they don't:

    ```js
    const answer = window.confirm("Are you sure?");
    if (answer) {
      deleteNote(noteId);
    }
    ```
- The page icon (the L letter) is already included in the project
- The demo was built using Flexbox, but feel free to use a CSS framework
- The menu icon is the HTML unicode character `&#9776;`
- The datetime picker shown in the demo is the `<input type="datetime-local" />` HTML element
- The value you get from the `datetime-local` element is not formatted the way it's shown in the demo. In order to format it, you can use a function like this:

    ```js
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    ```

## Things you may change
- You may use a CSS framework or a different CSS method other than Flexbox. The final result needs to look like the demo
- You may change the colors, font family, and font size
- You may use a different library for the editor. The demo uses the `react-quill` library
- You may use a different library for the routing. The demo uses the `react-router-dom` library
- You may use a different library for generating ids. The demo uses the `uuid` library. You may also choose not to use a library for this based on your solution. If your solution doesn't need a UUID, it doesn't mean it's wrong

## Things you may not change (points will be deducted if you do)
- The general layout including all the buttons
- The routing. The application needs to use front-end routing to show or edit a note
- The `localStorage`. The application needs to use the browser storage to persist the data
- The editor. There needs to be a text editor to write a note
- The deployment. The application needs to be deployed on Netlify the way we saw in the class

## Bonous points
- Tags. They need to be searchable. That is, when a user is picking a tag for a note, the application should suggest similar tags
- Sorting and searching for the notes