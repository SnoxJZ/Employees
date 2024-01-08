import "./app-filter.css";

const AppFilter = (props) => {
    // Создание большого кол-ва кнопок с помощью масива
    const buttonsData = [
        {name: "all", label: "Все сотрудники", colored: false},
        {name: "rise", label: "На повышение", colored: false},
        {name: "more1000", label: "З/П больше 1000$", colored: true},
    ];

    const buttons = buttonsData.map(({name, label, colored}) => {
        // Находим активную кнопку и применяем к ней стили (классы)
        // if (props.filter === name) то active true
        const active = props.filter === name;
        const clazz = active ? "btn-light" : "btn-outline-light";
        const style = colored ? {color: "red"} : null
        return (
            <button 
                className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => props.onFilterSellect(name)}
                style={style} >
                {label}
            </button>
        );
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>

        // Предыдущий вариант
        // <div className="btn-group">
        //     <button 
        //         className="btn btn-light"
        //         type="button">
        //             Все сотрудники
        //     </button>
        //     <button 
        //         className="btn btn-outline-light"
        //         type="button">
        //             На повышение
        //     </button>
        //     <button 
        //         className="btn btn-outline-light"
        //         type="button">
        //             З/П больше 1000$
        //     </button>
        // </div>
    );
}

export default AppFilter;