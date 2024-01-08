import { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
    }

    onUpdateSearch = (e) => {
        // Получаем value, которое ввёл пользователь
        const term = e.target.value;
        // Установка локального term (из этого компонента), а не с app.js
        this.setState({term});
        // Передаем нашу строчку выше в app.js. В этом случае onUpdateSearch приходит из app.js
        this.props.onUpdateSearch(term)
    }

    render() {
        return (
            <input 
            type="text" 
            className="form-control search-input"
            placeholder="Найти сотрудника"
            value={this.state.term}
            // вызов локального onUpdateSearch
            onChange={this.onUpdateSearch} />
        );
    }
    
};

export default SearchPanel;