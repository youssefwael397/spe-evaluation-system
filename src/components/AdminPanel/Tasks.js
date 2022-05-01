import * as React from "react";
import { useState, useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";

export default function Tasks() {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState("");
  const typeList = [
    {
      name: "All",
      value: "a",
    },
    {
      name: "Task",
      value: "t",
    },
    {
      name: "Meeting",
      value: "m",
    },
  ];

  const monthList = [
    {
      name: "JANUARY",
      value: "1",
    },
    {
      name: "FEBRUARY",
      value: "2",
    },
    {
      name: "MARCH",
      value: "3",
    },
    {
      name: "APRIL",
      value: "4",
    },
    {
      name: "MAY",
      value: "5",
    },
    {
      name: "JUNE",
      value: "6",
    },
    {
      name: "JULY",
      value: "7",
    },
    {
      name: "AUGUST",
      value: "8",
    },
    {
      name: "SEPTEMBER",
      value: "9",
    },
    {
      name: "OCTOBER",
      value: "10",
    },
    {
      name: "NOVEMBER",
      value: "11",
    },
    {
      name: "DECEMBER",
      value: "12",
    },
  ];

  const getTasks = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setTasks([])
    let api_url = ``;

    if (type === "a") {
      if (isChecked) {
        api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&month=${month}`;
      } else {
        api_url = `${API_PATH}/tasks?committee=${user.first_com_name}`;
      }
    }

    if (type !== "a") {
      if (isChecked) {
        api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&type=${type}&month=${month}`;
      } else {
        api_url = `${API_PATH}/tasks?committee=${user.first_com_name}&type=${type}`;
      }
    }

    setError("");
    await fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          if (data.tasks.length < 1) {
            setError(
              `There is no ${type === "m"
                ? "meetings"
                : type === "t"
                  ? "tasks"
                  : "meetings or tasks"
              }.`
            );
          }
          setTasks([...data.tasks]);
          setIsLoading(false)
        }
      });
  };

  return (
    <div className="mx-auto">
      <div className="AdminPanel my-4 shadow rounded bg-white p-4 w-100">
        <div className="AdminPanel-name my-2">
          <h4 className="mb-4">Tasks or Meetings</h4>
          <div className="task-options my-2">
            <form onSubmit={(e) => getTasks(e)}>
              <FormControl className="w-100">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  required
                  onChange={(e) => setType(e.target.value)}
                >
                  {typeList.map((type) => (
                    <MenuItem value={type.value}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="my-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  aria-label="..."
                />
                <label for="checkboxNoLabel" className="mx-2">Month</label>
              </div>

              <FormControl className="w-100 mt-2">
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  label="Month"
                  onChange={(e) => setMonth(e.target.value)}
                  disabled={!isChecked}
                  required={isChecked ? isChecked : !isChecked}
                  className="col-lg-12 col-sm-12 col-xs-12 mb-2"
                >
                  {monthList.map((month) => (
                    <MenuItem value={month.value}>{month.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br />
              <br />

              <Button
                type="submit"
                className="w-25 rounded"
                variant="contained"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Members Container */}

          {tasks.length > 0 ? (
            <h3 className="mt-3">
              {tasks.length}{" "}
              {type === "m"
                ? "meetings"
                : type === "t"
                  ? "tasks"
                  : "tasks and meetings"}
            </h3>
          ) : <h3 className="mt-3">{error}</h3>}


          {
            isLoading ? <Box className="text-center mx-auto ">
              <CircularProgress />
            </Box> : null
          }

          <div className="row">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div className="col-md-12 col-sm-12 border border-light shadow-lg p-3 my-4 bg-body rounded">
                  <div>
                    <span className="fs-2 fw-bold text-primary">
                      <TaskIcon className="fs-3" />{" "}
                    </span>
                    <Link
                      className="text-decoration-none"
                      exact
                      to={`task/${task.task_id}`}
                    >
                      <span className="fs-3 me-4 text-primary">
                        {task.task_name}
                      </span>
                    </Link>
                    <div className="my-2">
                      <span className="fs-5 mx-4 text-secondary">
                        type: {task.type === 't' ? "task" : "meeting"}
                      </span>
                      <br />
                      <span className="fs-5 mx-4 text-secondary">
                        members: {task.Users.length}
                      </span>
                      <br />
                      <span className="fs-5 mx-4 text-secondary ">
                        month: {task.month}
                      </span>
                      <br />
                      <span className="fs-5 mx-4 text-secondary ">
                        marks: {task.task_value}
                      </span>

                    </div>
                  </div>

                  <br />

                </div>
              ))
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
