import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
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
        Header: "Add trainings",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => this.setCustomer(value)}
          >
            <AddIcon />
          </Button>
        )
      },
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
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Training sessions",
        accessor: "links[2].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button
            variant="contained"
            size="small"
            onClick={() => this.getTrainings(value)}
          >
            <ListAlt />
          </Button>
        )
      },
      {
        Header: "",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button
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
          </Button>
        )
      }
    ];

    const individualTrainingColumns = [
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, h:mm a")
      },
      {
        Header: "Duration (in minutes)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      }
    ];

    const addDialog = {
      width: "250px",
      height: "250px",
      marginLeft: "-15%"
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
        <SkyLight hideOnOverlayClicked ref={this.addModal}>
          <h3>Individual training sessions</h3>
          <ReactTable
            filterable={true}
            defaultPageSize={10}
            className="-striped -highlight"
            data={this.state.trainings}
            columns={individualTrainingColumns}
          />
        </SkyLight>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModal2}
          title="Add new training"
        >
          <TextField
            placeholder="Date"
            name="date"
            type="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
          <br />
          <TextField
            placeholder="Activity"
            name="activity"
            onChange={this.handleChange}
            value={this.state.activity}
          />
          <TextField
            placeholder="Duration"
            name="duration"
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
