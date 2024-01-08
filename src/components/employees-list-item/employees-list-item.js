import "./employees-list-item.css";

const EmployeesListItem = (props) => {

    // Не нужна после переноса этой и функции onLike (onRise) в файл app.js. Так же после переноса компонент использует только props, и его можно переделать назад в функциональный 
    // Удалили конструктор с созданием state(урок 136)
    // onIncrease = () => {
        // CallBack конструкция. Он принимает в себя один аргумент (state.increase), для того что бы не писать this.state.increase дальше, мы сразу его деструктуризируем,
        // дальше круглые скобки вместо return, возвращаем объект из setState. В объекте устанавливаем новое значение increase противоположное предыдущему
    //     this.setState(({increase}) => ({
    //         increase: !increase
    //     }))
    // }

    const {name, salary, onDelete, onToggleIncrease, onToggleRise, increase, rise} = props;

    // Создаем динамические классы
    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        classNames += " increase";
    }

    if (rise) {
        classNames += " like"
    }

    return (
        // Изменение классов при добавлении в избранное (мой вариант)
        // <li className={increase ? "list-group-item d-flex justify-content-between increase" : "list-group-item d-flex justify-content-between"}>

        <li className={classNames}>    
            <span className="list-group-item-label"
                    onClick={onToggleRise}
                    style={{fontSize: 25, fontWeight: "red"}}>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + "$"}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleIncrease}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
    
}

export default EmployeesListItem;