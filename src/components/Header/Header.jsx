import s from './Header.module.css'
import Navigation from "../Navigation/Navigation"

const Header = () => {
    return (
        <header className={s.header}>
            <Navigation />
        </header>
    )
}

export default Header