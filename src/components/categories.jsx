import React, { Component } from "react";
import { Nav, Container } from "react-bootstrap";
import Loader from "react-loader-spinner";
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      filterdData: [],
      isLoading: false,
      isError: false,
      active: "1",
    };
  }

  filteruserData = (val) => {
    return this.state.userData.filter((user) => !(user.id % val));
  };

  filteruserData2 = (val, callBack) => {
    //this.setState({ filterdData: this.filteruserData(this.state.active) });
    var initialFilter = this.filteruserData(this.state.active);
    callBack(
      this,
      val?.target?.value.length
        ? initialFilter.filter(
            (x) =>
              x.title.includes(val?.target?.value) ||
              x.body.includes(val?.target?.value)
          )
        : initialFilter
    );
  };

  selectedKey(key, isSearch = false) {
    var { filterdData, backUpData } = this.state;
    filterdData = this.filteruserData(key, isSearch);
    console.log(filterdData);
    this.setState({ filterdData, active: key });
  }

  searchKey2(obj, result) {
    console.log(result);
    obj.setState({ filterdData: result });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      this.setState({
        userData,
        filterdData: userData,
        isLoading: false,
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  rendertableRows = () => {
    let i = 0;
    return (
      this.state.filterdData?.map((user) => {
        return (
          <tr>
            <td>{++i}</td>
            <td>{user.id}</td>
            <td>{user.userId}</td>
            <td>{user.title}</td>
            <td>{user.body}</td>
            <td className="delete-td">
              <button
                onClick={() => this.handleDelete(user.id)}
                type="button"
                class="btn btn-outline-danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        );
      }) ?? []
    );
  };

  render() {
    const { userData, isLoading } = this.state;

    if (isLoading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
      );
    } else {
      return userData.length > 0 ? (
        <Container>
          <div className="px-4 py-4">
            <Nav
              variant="pills"
              defaultActiveKey="1"
              onSelect={(keyvalue) => this.selectedKey(keyvalue)}
            >
              <Nav.Item>
                <Nav.Link eventKey="3">Thirds</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="5">Fifths</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="15">Magic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="1">Reset</Nav.Link>
              </Nav.Item>
              <input
                type="text"
                className="txt ml-auto"
                style={{ border: "1px solid transparent;" }}
                placeholder="Search"
                onKeyUp={(keyvalue) =>
                  this.filteruserData2(keyvalue, this.searchKey2)
                }
              />
            </Nav>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>UserId</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>{this.rendertableRows()}</tbody>
          </table>
        </Container>
      ) : (
        <div>
          <span>No users</span>
        </div>
      );
    }
  }
  handleDelete(id) {
    const filterdData = this.state.filterdData.filter((c) => c.id != id);
    this.setState({ filterdData });
  }
}

export default Categories;
