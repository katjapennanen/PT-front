import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import Iconbutton from "@material-ui/core/IconButton";
import ListAlt from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-table/react-table.css";
import SkyLight from "react-skylight";
import Moment from "moment";
import Addcustomer from "./addcustomer";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import * as Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "../App.css";

class Customerlist extends Component {
  constructor(params) {
    super(params);
    this.state = {
      customers: [],
      trainings: [],
      customer: "",
      date: "",
      activity: "",
      duration: "",
      showSnack: false
    };
    this.addModal = React.createRef();
    this.addModal2 = React.createRef();
  }

  componentDidMount() {
    this.listCustomers();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateTimePicker = (moment, name) =>
    this.setState({ [name]: moment.toDate() });

  // Get all customers
  listCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ customers: responseData.content });
      });
  };

  // Get individual trainings
  getTrainings = link => {
    fetch(link)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData.content
        });
      });
    this.addModal.current.show();
  };

  // Delete a customer
  deleteCustomer = link => {
    fetch(link, { method: "DELETE" }).then(response => {
      this.listCustomers();
      this.setState({ showSnack: true });
    });
  };

  // Save a new customer and get updated listing (customer comes from addcustomer.js component)
  saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    }).then(response => {
      this.listCustomers();
    });
  };

  // Set customer's url to a state
  setCustomer = customer => {
    this.setState({ customer: customer });
    this.addModal2.current.show();
  };

  // Save a new training
  saveTraining = () => {
    const training = {
      date: this.state.date,
      activity: this.state.activity,
      duration: this.state.duration,
      customer: this.state.customer
    };
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    });
    this.setState({
      date: "",
      activity: "",
      duration: ""
    });
    this.addModal2.current.hide();
  };

  handleClose = () => {
    this.setState({
      showSnack: false
    });
  };

  render() {
    const customerColumns = [
      {
        Header: "Add/List",
        columns: [
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 60,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
              <Tooltip title="Add new training">
                <Iconbutton
                  size="small"
                  color="primary"
                  onClick={() => this.setCustomer(value)}
                >
                  <AddIcon fontSize="small" />
                </Iconbutton>
              </Tooltip>
            )
          },
          {
            Header: "",
            accessor: "links[2].href",
            maxWidth: 60,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
              <Tooltip title="Show trainings for this customer">
                <Iconbutton
                  color="primary"
                  size="small"
                  onClick={() => this.getTrainings(value)}
                >
                  <ListAlt fontSize="small" />
                </Iconbutton>
              </Tooltip>
            )
          }
        ]
      },
      {
        Header: "Customer details",
        columns: [
          {
            Header: "Firstname",
            accessor: "firstname"
          },
          {
            Header: "Lastname",
            accessor: "lastname"
          },
          {
            Header: "Street address",
            accessor: "streetaddress"
          },
          {
            Header: "Postal code",
            accessor: "postcode"
          },
          {
            Header: "City",
            accessor: "city"
          },
          {
            Header: "Email",
            accessor: "email"
          },
          {
            Header: "Phone number",
            accessor: "phone"
          }
        ]
      },
      {
        Header: "Delete",
        columns: [
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 80,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
              <Tooltip title="Delete this customer">
                <Iconbutton
                  color="secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this customer (and their trainings) permanently?"
                      )
                    )
                      this.deleteCustomer(value);
                  }}
                  aria-label="Delete"
                >
                  <DeleteIcon fontSize="small" />
                </Iconbutton>
              </Tooltip>
            )
          }
        ]
      }
    ];

    const individualTrainingColumns = [
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, hh:mm a")
      },
      {
        Header: "Duration",
        maxWidth: 80,
        accessor: "duration"
      }
    ];

    const newTrainingDialog = {
      width: "300px",
      height: "350px",
      marginLeft: "-15%"
    };

    const trainingModalStyle = {
      marginTop: "-400px",
      maxWidth: "600px"
    };

    return (
      <div>
        <Addcustomer saveCustomer={this.saveCustomer} />
        <ReactTable
          filterable={true}
          defaultPageSize={10}
          className="maintable -striped -highlight"
          data={this.state.customers}
          columns={customerColumns}
        />
        <div className="flextest">
          <SkyLight
            dialogStyles={trainingModalStyle}
            hideOnOverlayClicked
            ref={this.addModal}
          >
            <div className="container">
              <h3>Individual training sessions</h3>
              <ReactTable
                filterable={true}
                defaultPageSize={10}
                className="-striped -highlight"
                data={this.state.trainings}
                columns={individualTrainingColumns}
              />
            </div>
          </SkyLight>
        </div>
        <SkyLight
          dialogStyles={newTrainingDialog}
          hideOnOverlayClicked
          ref={this.addModal2}
          title="Add new training"
        >
          <Datetime
            inputProps={{
              required: "true",
              placeholder: "  Click to select time and date*",
              id: "datetime"
            }}
            onChange={moment => this.handleDateTimePicker(moment, "date")}
            value={this.state.date}
          />
          <br />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Activity"
            name="activity"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.activity}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Duration"
            name="duration"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.duration}
          />
          <br />

          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={this.saveTraining}
          >
            <SaveIcon />
            Save
          </Button>
        </SkyLight>
        <Snackbar
          message={"Customer deleted succesfully"}
          open={this.state.showSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Customerlist;
