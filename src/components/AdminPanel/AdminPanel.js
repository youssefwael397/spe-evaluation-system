import * as React from "react";
import "./AdminPanel.css";
import Members from './Members/Members';
import AddTask from './AddTask';
import Tasks from './Tasks';
import Member from './Member/Member';

function AdminPanel() {

  return (
    <div className="container-xl mx-auto">

      {/* Add Task */}
      <AddTask />

      {/* Add Task */}
      <Tasks />

      {/* Members */}
      <Members />

    </div>
  );
}
export default AdminPanel;
