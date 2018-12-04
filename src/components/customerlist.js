import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import Iconbutton from "@material-ui/core/IconButton";
import ListAlt from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import SkyLight from "react-skylight";
import Moment from "moment";
import Addcustomer from "./addcustomer";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import * as Datetime from "react-datetime";
import "react-table/react-table.css";
import "react-datetime/css/react-datetime.css";

class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      individualTrainings: [],
      customer: "",
      date: "",
      activity: "",
      duration: "",
      showDeleteSnack: false,
      showAddCustomerSnack: false,
      showAddTrainingSnack: false,
      updateCustomerSnack: false
    };
    this.individualTrainingsModal = React.createRef();
    this.newTrainingModal = React.createRef();
  }

  // Show all customers on page load
  componentDidMount() {
    this.getCustomers();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Get date and time in correct format
  handleDateTimePicker = (moment, name) => {
    this.setState({ [name]: moment.toDate() });
  };

  // Get all customers
  getCustomers = () => {
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
          individualTrainings: responseData.content
        });
      });
    this.individualTrainingsModal.current.show();
  };

  // Delete a customer
  deleteCustomer = link => {
    fetch(link, { method: "DELETE" }).then(response => {
      this.getCustomers();
      this.setState({ showDeleteSnack: true });
    });
  };

  // Save a new customer and get updated listing (customer comes from addcustomer.js component)
  saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    }).then(response => {
      this.getCustomers();
      this.setState({ showAddCustomerSnack: true });
    });
  };

  // Update a customer
  updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    }).then(response => {
      this.getCustomers();
      this.setState({ updateCustomerSnack: true });
    });
  };

  // Render table cells in editable form
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  // Set customer's url to a state to be used to create new training
  setCustomer = customer => {
    this.setState({ customer: customer });
    this.newTrainingModal.current.show();
  };

  // Save a new training
  saveTraining = event => {
    event.preventDefault();
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
    this.newTrainingModal.current.hide();
    this.setState({ showAddTrainingSnack: true });
  };

  handleClose = () => {
    this.setState({
      showDeleteSnack: false,
      showAddCustomerSnack: false,
      showAddTrainingSnack: false,
      updateCustomerSnack: false
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
            accessor: "firstname",
            Cell: this.renderEditable
          },
          {
            Header: "Lastname",
            accessor: "lastname",
            Cell: this.renderEditable
          },
          {
            Header: "Street address",
            accessor: "streetaddress",
            Cell: this.renderEditable
          },
          {
            Header: "Postal code",
            accessor: "postcode",
            Cell: this.renderEditable
          },
          {
            Header: "City",
            accessor: "city",
            Cell: this.renderEditable
          },
          {
            Header: "Email",
            accessor: "email",
            Cell: this.renderEditable
          },
          {
            Header: "Phone number",
            accessor: "phone",
            Cell: this.renderEditable
          }
        ]
      },
      {
        Header: "Save",
        columns: [
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 60,
            filterable: false,
            sortable: false,
            Cell: ({ row, value }) => (
              <Tooltip title="Save updated customer">
                <Iconbutton
                  color="primary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to save all changes?"
                      )
                    )
                      this.updateCustomer(row, value);
                  }}
                >
                  <SaveIcon fontSize="small" />
                </Iconbutton>
              </Tooltip>
            )
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
        Cell: ({ value }) => Moment(value).format("DD.MM.YYYY, hh:mm a")
      },
      {
        Header: "Duration",
        maxWidth: 80,
        accessor: "duration"
      }
    ];

    const newTrainingModalStyle = {
      width: 400,
      margin: "auto -200px",
      top: "9%"
    };

    const trainingModalStyle = {
      margin: "auto -300px",
      width: 600,
      top: "9%"
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
        <SkyLight
          dialogStyles={trainingModalStyle}
          hideOnOverlayClicked
          ref={this.individualTrainingsModal}
        >
          <div className="container">
            <h3>Individual training appointments</h3>
            <ReactTable
              filterable={true}
              defaultPageSize={10}
              className="-striped -highlight"
              data={this.state.individualTrainings}
              columns={individualTrainingColumns}
            />
          </div>
        </SkyLight>
        <SkyLight
          dialogStyles={newTrainingModalStyle}
          hideOnOverlayClicked
          ref={this.newTrainingModal}
          title="Add new training appointment"
        >
          <form onSubmit={this.saveTraining}>
            <div id="newTrainingInputs">
              <p>Pick date and time</p>
              <Datetime
                inputProps={{
                  required: true,
                  placeholder: "  Click to select time and date*",
                  id: "datetime"
                }}
                input={false}
                strictParsing={false}
                onChange={moment => this.handleDateTimePicker(moment, "date")}
                value={this.state.date}
              />
              <TextField
                required={true}
                style={{ margin: 5 }}
                label="Activity"
                name="activity"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.activity}
              />
              <br />
              <TextField
                required={true}
                style={{ margin: 5 }}
                label="Duration (in minutes)"
                name="duration"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.duration}
              />
              <br />
              <Button
                type="submit"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
              >
                <SaveIcon />
                Save
              </Button>
              <Button
                onClick={() => this.newTrainingModal.current.hide()}
                style={{ margin: 10, height: 40 }}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </SkyLight>
        <Snackbar
          message={"Customer deleted succesfully!"}
          open={this.state.showDeleteSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
        <Snackbar
          message={"Customer added succesfully!"}
          open={this.state.showAddCustomerSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
        <Snackbar
          message={"Training added succesfully!"}
          open={this.state.showAddTrainingSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
        <Snackbar
          message={"Customer info updated succesfully!"}
          open={this.state.updateCustomerSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Customerlist;
