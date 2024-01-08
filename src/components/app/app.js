import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

// Функциональный компонент мы переделываем в классовый для динамичекской работы с даными (масивом data)
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 800, increase: true, rise: true, id: 1},
                {name: "Alex M.", salary: 2100, increase: true, rise: false, id: 2},
                {name: "Carl W.", salary: 4300, increase: false, rise: false, id: 3},
            ],
            term: "",
            filter: "all",
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // Ищем элемент внутри масива по его индексу. Метод принимает callBack функ., если она возвращает true, так же возвращает номер элем., на котором сработала функ.
            // Срвавниваем id из списка, с id, которое передается в функцию
            // const index = data.findIndex(elem => elem.id === id);

            // Для того что бы соблюсти принципы иммутабельности мы создаем новый масив с теми же данными, что и у старого

            // Не лучший вариант! Используем метод slice(), который копирует часть масива и создет новый. Берем с первого элемента(индекс 0) до элемента, который мы получили(index)
            // const before = data.slice(0, index)
            // Копируцем все остальные элемнеты, которые идут после найденно
            // const after = data.slice(index + 1)
            // const newArr = [...before, ...after]
            // return{
            //     data: newArr
            // }

            // Либо же просто воспользуемся методом filter()
            return{
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // name и salary передаем из employees-add-form.js
    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleIncrease = (id) => {
        // Как вариант, но объемный (выдергиваем рандомный элемент из рандомного места)
        // this.setState(({data}) => {
            // Находим индекс элемента, с которым будем работать
            // const index = data.findIndex(elem => elem.id === id);

            // Создем копию нашего объекта, для того что бы мы могли в нем что-то поменять
            // const old = data[index];
            // Создаем новый объект. Благодаря синтаксису деструктуризации (разворота) {...old}, все свойства, что были в объекте old развернуться и создадут новый, не наруш. иммут.
            // Так же можем добавить новые свойства и если они будут совпадать с теми, что уже есть, они заменят старые
            // const newItem = {...old, increase: !old.increase};
            // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            // return {
            //     data: newArr
            // }
        // })

        this.setState(({data}) => ({
            // возвращаем объект со свойством data. Если на масиве data использовать метод map, то создастся новый масив. item - каждый отдельный объект масива
            data: data.map(item => {
                // Если мы находим нужный нам объект, мы возвращаем именно новый, измененный объект с теми же предыдущими свойствами но с новым increase
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        // Проверяем не пришло ли пустое поле, непример после того как его стерли
        if (term.length === 0) {
            return items;
        }

        // Фильтр каждого элемента по name
        return items.filter(item => {
            // CalBack функция должна что-то возвращать, по этому исп. return. Метод indexOf() позволяет искать подстроки (кусочки строк), если ничего не находит, то возвр. -1
            // По условию, кусочек строки (term), найденый во всей строке (item), должен быть с индексом > -1
            return item.name.indexOf(term) > -1
        })
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case "rise":
                // Берем каждый элемент масива и возвращаем нужный. item.rise то же самое, что и if (item.rise) return
                return items.filter(item => item.rise);
            case "more1000":
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterSellect = (filter) => {
        this.setState({filter});
    }

    render() {
        const employees = this.state.data.length;
        // filter отфильтрует только те объекты, у которых increase true и создаст новый масив
        const increased = this.state.data.filter(item => item.increase).length;
        const {data, term, filter} = this.state;
        // Отфильтрованный масив data, который приходит от другого компонента
        // const visibleData = this.searchEmp(data, term);
        // Комбинирование фильтра и поиска, то есть фильтруем отфильтрованный масив. Сначала фильтр по поиску, а потом по фильтрам
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSellect={this.onFilterSellect} />
                </div>
    
                {/* Свойства компонентов см. employees-list */}
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem} // Передаем данные ниже по иерархии
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/> 
                <EmployeesAddForm onAdd={this.addItem }/>
            </div>
        );
    }

}

export default App;




// Предыдущий функционального компонента
// function App() {

//     const data = [
//         {name: "John C.", salary: 800, increase: true, id: 1},
//         {name: "Alex M.", salary: 2100, increase: true, id: 2},
//         {name: "Carl W.", salary: 4300, increase: false, id: 3},
//     ];

//     return (
//         <div className="app">
//             <AppInfo/>

//             <div className="search-panel">
//                 <SearchPanel/>
//                 <AppFilter/>
//             </div>

//             {/* Свойства компонентов см. employees-list */}
//             <EmployeesList 
//                 data={data}
//                 onDelete={id => console.log(id)}/>
//             <EmployeesAddForm/>
//         </div>
//     );
// }

// export default App;