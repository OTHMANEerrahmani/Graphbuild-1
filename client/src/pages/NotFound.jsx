import { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className="bg-slate-50  h-screen flex  justify-center flex-row ">
        <div className="w-1/2 shadow-md  bg-white p-4 h-32 mt-24 flex flex-col justify-center ">
          <h2 className="font-semibold text-xl py-2">Sorry :)</h2>
          <p>That page cannot be found</p>
          <Link to="/" className="hover:underline">
            Back to the homepage...
          </Link>
        </div>
      </div>
    );
  }
}
