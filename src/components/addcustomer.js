import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkyLight from "react-skylight";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import "../App.css";

class addcustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    this.addModal = React.createRef();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save input data to states, save them to a variable 'customer' and send that variable to the saveCustomer function in customerlist.js
  // or get the function saveCustomer from customerlist.js as a prop
  saveCustomer = () => {
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.saveCustomer(customer);
    // This clears the previously inputted values from the textfields
    this.setState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
    this.addModal.current.hide();
  };

  render() {
    const newCustomerDialog = {
      width: "500px",
      height: "400px",
      marginLeft: "-15%",
    };

    return (
      <div>
        <div className="buttonTest">
          <Button
            style={{ width: "150px" }}
            variant="contained"
            color="primary"
            onClick={() => this.addModal.current.show()}
          >
            <AddIcon /> New customer
          </Button>
        </div>
        <SkyLight
          dialogStyles={newCustomerDialog}
          hideOnOverlayClicked
          ref={this.addModal}
          title="Add a new customer"
        >
          <TextField
          type="text"
            required={true}
            style={{ margin: "5px" }}
            label="First name"
            name="firstname"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.firstname}
          />
          <TextField
            required={true}
            style={{ margin: "5px" }}
            label="Last name"
            name="lastname"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.lastname}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Street address"
            name="streetaddress"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.streetaddress}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Postal code"
            name="postcode"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.postcode}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="City"
            name="city"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Email address"
            name="email"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <TextField
            required
            style={{ margin: "5px" }}
            label="Phone number"
            name="phone"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.phone}
          />
          <Button
            style={{ margin: "5px", width: "197px", height: "55px" }}
            variant="contained"
            color="primary"
            onClick={this.saveCustomer}
          >
            <SaveIcon />
            Save
          </Button>
        </SkyLight>
      </div>
    );
  }
}

export default addcustomer;
