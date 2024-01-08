// import "./employees-add-form.css";
import { Component } from "react";

import "./employees-add-form.scss";

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            // prop: e.target.value
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length < 3 || !this.state.salary) return;
        this.props.onAdd(this.state.name, this.state.salary)
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        // добавляем атрибуты, что бы они совпадали с нашими state. В таком случае вместо prop: e.target.value в onValueChange мы напрямую обращаемся к конкретному
                        // name="", где происходит событие, что бы отслеживать и записывать его
                        name="name"
                        // создаем управляемый компонент, в который записываем значение со state. Если создавать элемент без value={}, то введенные данные пользователем,
                        // с события onChange, будут храниться только в UI самого сайта (DOM дерева на страничке)
                        value={name}
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light" >Добавить</button>
                </form>
            </div>
        );
    };
}

export default EmployeesAddForm;