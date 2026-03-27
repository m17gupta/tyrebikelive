import React from "react";
import { SeedButton } from "./SeedButton";
import "./index.scss";

const baseClass = "before-dashboard";

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__banner bg-green-50 border border-green-200 rounded p-4 mb-4`}>
        <h4>Welcome to your dashboard!</h4>
      </div>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {" with a few pages, products, and categories to jump-start your new shop, then "}
          <a href="/" target="_blank">
            visit your website
          </a>
          {" to see the results."}
        </li>
        <li>
          <a
            href="/en/admin/mongodb"
            target="_blank"
            style={{
              display: "inline-block",
              backgroundColor: "#0070f3",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              marginRight: "8px",
            }}
          >
            Manage MongoDB
          </a>
          {" Create and manage MongoDB databases and collections for your application."}
        </li>
        <li>Commit and push your changes to the repository to trigger a redeployment of your project.</li>
      </ul>
    </div>
  );
};

