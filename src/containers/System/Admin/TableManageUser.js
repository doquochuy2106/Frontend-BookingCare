import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import "./TableManageUser.scss"


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers != this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (userId) => {
        console.log("check delete: ", userId)
        this.props.deleteUserRedux(userId.id)
    }

    handleEditUser = (user) => {
        console.log("check edit user: ", user)
        this.props.editUserFromParent(user)
    }



    render() {
        console.log("check listUser: ", this.props.listUsers)
        console.log("check state: ", this.state.usersRedux)
        let arrUser = this.state.usersRedux
        return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>RoleId</th>
                        <th>Phonenumber</th>
                        <th>Action</th>
                    </tr>
                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.roleId}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        <button onClick={() => { this.handleEditUser(item) }} className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                        <button onClick={() => { this.handleDeleteUser(item) }} className='btn-delete' ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId))
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
