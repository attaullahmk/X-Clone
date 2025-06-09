// import React from 'react';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from './Login';
// import Home from './Home';
// import Feed from './Feed';
// import Profile from './Profile';
// import Bookmarks from './BookMark';

// const Body = () => {
//     const appRouter = createBrowserRouter([
//         {
//             path: "/",
//             element: <Home/>,
//             children:[
//                 {
//                     path:"/",
//                     element:<Feed/>
//                 },
//                 {
//                     path:"/profile/:id",
//                     element:<Profile/>
//                 }
//             ]
//         },
//         {
//             path: "/login",
//             element: <Login />
//         },
//         {
//                     path: "/bookmarks",   // new route here
//                     element: <Bookmarks />
//          }
//     ])
//     return (
//         <div>
//             <RouterProvider router={appRouter} />
//         </div>
//     )
// }

// export default Body

//2

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Bookmarks from "./BookMark";
import Explore from "./Explore"; // import your Explore component
import Notification from "./Notification"; // ✅ import this at the top

// Inside `createBrowserRouter`:

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/explore", // added Explore route here
          element: <Explore />,
        },
        {
          path: "/notifications",
          element: <Notification />,
        },
        {
          path: "/bookmarks",
          // element: <Bookmarks />
          element: <Bookmarks></Bookmarks>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
