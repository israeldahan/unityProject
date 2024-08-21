import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <nav>
            <ul>
              <li>
                <a href={`/get-custumer/1`}>Customer buy</a>
              </li>
              <li>
                <a href={`/get-custumers/`}>get List Buy</a>
              </li>
              <li>
                <a href={`/create-custumer/`}>Create Customer</a>
              </li>

            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }
  