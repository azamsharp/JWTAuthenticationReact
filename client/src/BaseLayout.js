import Login from "./Login";
import { NavLink } from 'react-router-dom'
import Menu from './Menu'


function BaseLayout(props) {
    return (
        <div>
            <Menu />
            {props.children}
        </div>
    )
}

export default BaseLayout