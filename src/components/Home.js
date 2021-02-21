import React, {useState, useEffect} from "react";

import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState([]);

    const changeHandler = (event, idx) => {
        setContent(prevState => {
            prevState[idx].checked = !prevState[idx].checked;
            return [...prevState];
        })
    }

    const changeAllHandler = (event) => {
        setContent(prevState => {
            prevState.forEach(user => {
                user.checked = event.target.checked
            });
            return [...prevState];
        })
    }

    const addCheckedSectionToUsers = (users) => {
        users.forEach(user => user.checked = false);
        return users;
    }

    useEffect(() => {
        UserService.getAllUsers().then(response => {
            setUsers(response.data);
        }).catch(err => console.error(err))
    }, []);

    useEffect(() => {
        UserService.checkAccess().then();
    }, [content])


    const blockCheckedUsers = () => {
        UserService.blockUsers(findCheckedUsers())
            .then((response) => setUsers(response.data))
    }

    const unblockCheckedUsers = () => {
        UserService.unblockUsers(findCheckedUsers())
            .then((response) => setUsers(response.data))
    }

    const deleteCheckedUsers = () => {
        UserService.deleteUsers(findCheckedUsers())
            .then((response) => setUsers(response.data))
    }

    const findCheckedUsers = () => {
        let arr = [];
        content.forEach(user => {
            if (user.checked === true) {
                arr.push(user.id)
            }
        })
        return arr
    }

    const setUsers = (users) => {
        setContent(addCheckedSectionToUsers(users));
    }

    return (
        <div>
            <button onClick={blockCheckedUsers} id="block" className="btn button-default">Block</button>
            <button onClick={unblockCheckedUsers} id="unblock" className="btn button-default">Unblock</button>
            <button onClick={deleteCheckedUsers} id="delete"
                    className="btn button-default">Delete
            </button>
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th className="active">
                        <input
                            type="checkbox"
                            className="select-all checkbox"
                            name="select-all"
                            onChange={changeAllHandler}/>
                    </th>
                    <th className="success">Name</th>
                    <th className="warning">Email</th>
                    <th className="danger">Created at</th>
                    <th className="info">Last login</th>
                    <th className="status">Status</th>
                </tr>
                {content && content.map((user, index) => (
                    <tr key={user.id}>
                        <td className="active">
                            <input
                                type="checkbox"
                                checked={user.checked}
                                className="select-item checkbox"
                                name="select-item"
                                onChange={event => changeHandler(event, index)}/>
                        </td>
                        <td className="success">{user.username}</td>
                        <td className="warning">{user.email}</td>
                        <td className="danger">{user.createDate.substr(0, 19).replace("T", " ")}</td>
                        <td className="info">{user.lastLogin.substr(0, 19).replace("T", " ")}</td>
                        <td className="status">{user.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;