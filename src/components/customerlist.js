import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import Iconbutton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import Autorenew from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import "react-table/react-table.css";
import IndividualTrainingList from "./IndividualTrainingsList";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      showDeleteSnack: false,
      showAddCustomerSnack: false,
      showAddTrainingSnack: false,
      updateCustomerSnack: false
    };
  }

  // Show all customers on page load
  componentDidMount() {
    this.getCustomers();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Get all customers
  getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ customers: responseData.content });
      });
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

  // Save a new training
  saveTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    });
    this.setState({ showAddTrainingSnack: true });
  };

  handleSnackClose = () => {
    this.setState({
      showDeleteSnack: false,
      showAddCustomerSnack: false,
      showAddTrainingSnack: false,
      updateCustomerSnack: false
    });
  };

  // Render customer table cells in editable form
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

  render() {
    const customerColumns = [
      {
        Header: "",
        columns: [
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 40,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
              <AddTraining customer={value} saveTraining={this.saveTraining} />
            )
          },
          {
            Header: "",
            accessor: "links[2].href",
            maxWidth: 40,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
             <IndividualTrainingList customerTrainingUrl={value}/>
            )
          },
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 40,
            filterable: false,
            sortable: false,
            Cell: ({ row, value }) => (
              <Tooltip title="Save updated customer">
                <Iconbutton
                  color="primary"
                  style={{ height: 12, width: 12 }}
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
          },
          {
            Header: "",
            accessor: "links[0].href",
            maxWidth: 40,
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
              <Tooltip title="Delete this customer">
                <Iconbutton
                  color="secondary"
                  style={{ height: 12, width: 12 }}
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
            sortable: false,
            Cell: this.renderEditable
          }
        ]
      }
    ];

    return (
      <div>
        <AddCustomer saveCustomer={this.saveCustomer} />
        <div className="menuButtons">
          <Button
            style={{
              width: 150,
              marginTop: "-61%",
              marginBottom: "-20%",
              marginLeft: "330%"
            }}
            variant="contained"
            color="primary"
            onClick={this.getCustomers}
          >
            <Autorenew />
            Reload customers
          </Button>
        </div>
        <ReactTable
          filterable={true}
          defaultPageSize={13}
          className="maintable -striped -highlight"
          data={this.state.customers}
          columns={customerColumns}
        />
        <Snackbar
          message={"Customer deleted succesfully!"}
          open={this.state.showDeleteSnack}
          autoHideDuration={3000}
          onClose={this.handleSnackClose}
        />
        <Snackbar
          message={"Customer added succesfully!"}
          open={this.state.showAddCustomerSnack}
          autoHideDuration={3000}
          onClose={this.handleSnackClose}
        />
        <Snackbar
          message={"Training added succesfully!"}
          open={this.state.showAddTrainingSnack}
          autoHideDuration={3000}
          onClose={this.handleSnackClose}
        />
        <Snackbar
          message={"Customer info updated succesfully!"}
          open={this.state.updateCustomerSnack}
          autoHideDuration={3000}
          onClose={this.handleSnackClose}
        />
      </div>
    );
  }
}

export default CustomerList;
