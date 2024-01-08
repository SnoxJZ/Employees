import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css";

const EmployeesList = ({data, onDelete, onToggleIncrease, onToggleRise}) => {

    // Достаём элементы с масива в app.js (Урок 128)
    const elements = data.map(item => {
        // Деструктуризация отсортированного масива для присвоения уникального идентификатора каждому компоненту списка (В itemProps идёт всё кроме самого id)
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
                key={id} 
                {...itemProps} // То же самое, что name={item.name} salary={item.salary}
                onDelete={() => onDelete(id)} // Свывязываем компоненты на разных уровнях (С app.js (onDelete(id)), в этот и в employees-list-item). По другому - передача компонентов по иерархии
                onToggleIncrease={() => onToggleIncrease(id)}
                onToggleRise={() => onToggleRise(id)} /> 
        )
    })

    // console.log(elements);

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;