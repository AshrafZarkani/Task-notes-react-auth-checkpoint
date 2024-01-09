# React Auth

## Task 1 (Login/Register)

Inside our `src` folder, we will have an `api` folder and inside it we have an `auth.js` file, here is where we put our authentication functions.

### Register

- Create a function `register` that takes `userInfo` as a parameter and send a post request to the register end-point with the `userInfo` . (This step is already done)
- Go to `Register.js` page and import `register` function from `api/auth.js`.
- Use the `useMutation` hook with the `register` function and pass it `userInfo`
- Call your mutate function inside the `handleFormSubmit` function!
- Now go to `auth.js` in the api folder and add the following code to your `register` function:

```jsx
const formData = new FormData();
for (const key in userInfo) formData.append(key, userInfo[key]);
```

- Then, replace the `userInfo` inside the post request with `formData`.
- This step will enable you to send files with the request

### Login

- Create a function `login` that takes `userInfo` as a parameter and send a post request to the login end-point with the `userInfo` . (This step is already done)
- Go to `Login.js` page and import the `login` function from `api/auth.js`.
- Use the `useMutation` hook with the `login` function and pass it `userInfo`.
- Call your mutate function inside the `handleFormSubmit` function!

## ========================

## Task 2 (Persistent Login)

### 1- Store Token (when login/register)

- In auth.js create the storeToken function

```jsx
const storeToken = (token) => {
  localStorage.setItem("token", token);
};
```

- Now go to both `login` and `register` functions and call `storeToken()` after getting the data and pass it your data.token

```jsx
const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);
    storeToken(data.token); // <--- This
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  try {
    // This is for seding the request with files
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);
    // END
    const { data } = await instance.post("/auth/register", formData);
    storeToken(data.token); // <--- This
    return data;
  } catch (error) {
    console.log(error);
  }
};
```

### 2- Check Token (when app first start)

- `npm install jwt-decode`
- In `auth.js` , import jwt_decode from `jwt-decode` and create a function `checkToken`.
- Inside it create a variable `token` that retrieves the token from your `localStorage` using getItem.
- Now check if token is available, create a variable `decode` that decodes the token and create a variable `currentTime` that gives you the current time.(Hint: use Date.now() )
- Now check if the token is expired (Hint: compare the currentTime with decode.exp), if it is expired, remove the token from `localStorage` using removeItem and return false, Otherwise return true.
- Also return false outside the if condition.

```jsx
const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const cureentTime = Date.now() / 1000;
    if (decode.exp < cureentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};
```

### 3- useContext (to make the state global)

- In your src folder, create a `context` folder, and inside it add a `UserContext` file.
- Now import `createContext` and initialize a UserContext. (Export it)

```jsx
//src/context/UserContext.js
import { createContext } from "react";
const UserContext = createContext();
export default UserContext;
```

- Now go to `App.js` and import `UserContext`.
- Create a user state and give it false as an initial value.
- Now wrap the whole app with `<UserContext.Provider>` and pass it a value of [user, setUser].
- Your App should look like this

```jsx
function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(checkToken());
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
		// ....
		// ....
		</UserContext.Provider>
```

## ========================

## Task 3 Show if user logged in

- Now go to `NavBar.js` inside your components folder, and import `useContext` (from react) and `UserContext` that we just created
- Use useContext hook for `[user and setUser]` and give it the (UserContext). Hint:

```jsx
const [user, setUser] = useContext(UserContext);
```

- Then check if the user is true, show the logout button, if false show the register and login buttons. (hint: search ternary operator).

```jsx
{
  user ? <> /*components*/ </> : <> /*components*/ </>;
}
```

## ========================

## Task 4 (logout)

- Go to `auth.js` in the api folder
- Create a function `logout` that removes the token from the localStorage using removeItem.

```jsx
const logout = () => {
  localStorage.removeItem("token");
};
```

- Now go to `NavBar.js` inside your components folder
- create a function `handleLogout` that calls the `logout` function from `api/auth.js`
- use `setUser` from the useContext to set the user to `false`
- Finally, Pass the `handleLogout` function to the onClick method of the logout button.

## ========================

## Task 5 Send token with each request (so the backend knows who are you)

### **Interceptors**

- In  `index.js` inside the api folder, use your `instance` to create an interceptor using the `interceptors.request.use()` and pass it an anonymous function.
- If the token is in the localStorage then config.headers.authorization = token.
- return config.

hint:

```jsx
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
